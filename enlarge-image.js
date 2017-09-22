(function(){
	/*
	 * @Author Thomas Cui
	 * @time 2017-09-22
	 * 
	 * 该js文件依赖 jQuery， 基于 photoSwipe 插件
	 * 
	 * 该方法直接在 body 的最后 添加用于显示放大图片的元素，并通过插件 photoswipe 来放大图片
	 * 
	 * @param parentSelector 父级选择器，
	 * @param imgSelector 需要放大的选择器
	 * @param linkSecletor 存放放大图片的选择器，可选。
	 *        如果填了，则放大的图片按该选择器的 src 为图片源，
	 *        如果没填，则按图片本身，也就是imgSelector 的src图片原
	 * 
	 * eg：
	 *  <div class="imgs">
	 *    <img class="postimg enlarge-image" ng-show="item.spicurl1!=''" data-img-index="0" ng-src="{{item.spicurl1}}">
	 *    <img class="largeimage" style="display: none;" ng-src="{{item.bpicurl1}}">
	 *    <img class="postimg enlarge-image" ng-show="item.spicurl2!=''" data-img-index="1" ng-src="{{item.spicurl2}}">
	 *    <img class="largeimage" style="display: none;" ng-src="{{item.bpicurl2}}">
	 *    <img class="postimg enlarge-image" ng-show="item.spicurl3!=''" data-img-index="2" ng-src="{{item.spicurl3}}">
	 *    <img class="largeimage" style="display: none;" ng-src="{{item.bpicurl3}}">
	 *  </div>
	 * 
	 *   myPhotoSwipe(".imgs", '.enlarge-image', '.largeimage');
	 * 或者 去掉 类名是 largeimage 的元素
	 *   myPhotoSwipe(".imgs", '.enlarge-image');
	 * 
	 * */
	window.myPhotoSwipe = function(parentSelector,imgSelector,linkSecletor){
		initView();
		
		$(document).on("click",parentSelector,function(e){
		  $(this).attr('data-pswp-uid', 1);
			onThumbnailsClick(e, $(this),imgSelector,linkSecletor);
		});
	}
	
	function parseThumbnailElements(imgs,largeimgs) {
		var items = [],item, img;
		for(var i = 0,l=imgs.length; i < l; i++) {
		  img = imgs[i];
			
			var largeimg = largeimgs[i];
			item = {
			  el: img,
				src: largeimg.src,
				w: parseInt(largeimg.naturalWidth, 10),
				h: parseInt(largeimg.naturalHeight, 10)
			};
		  items.push(item);
		}
		return items;
	};
	
	function onThumbnailsClick(e, $ele, imgSelector,linkSecletor) {
	  // 判断事件源是不是需要放大的图
		e = e || window.event;
		e.preventDefault ? e.preventDefault() : e.returnValue = false;
		var eTarget = e.target || e.srcElement;
		if(!$(eTarget).hasClass(imgSelector.substr(1,imgSelector.length))){
		  return;
		}
		
		// 判断需要放大的图片 是第几张
		var imgs = $ele.find(imgSelector+":visible");
		var index = $(eTarget).data("img-index");
		if(index == null) {
		  return false;
		}
		
		// 获得放大图片后的各种属性
		var largeImages = $ele.find(linkSecletor);
		if(largeImages || largeImages.length == 0) {
			largeImages = imgs;
		}
		var items = parseThumbnailElements(imgs, largeImages);
		
		var pswpElement = document.querySelectorAll('.pswp')[0];
		
		var options = {
			tapToClose: true,
			closeEl:false,
			captionEl: false,
			index:parseInt(index, 10),
			fullscreenEl: false,
			shareEl: false,
			galleryUID: $ele.attr('data-pswp-uid'),
			getThumbBoundsFn: function(index) {
				var pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
					rect = items[index].el.getBoundingClientRect(); 
				return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
			}
		};
		if( isNaN(options.index) ) {
			return;
		}
		var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
		gallery.init();
	};
	
	function initView(){
		$("body").append(`
			<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
				<div class="pswp__bg"></div>
				<div class="pswp__scroll-wrap">
					<div class="pswp__container">
						<div class="pswp__item"></div>
						<div class="pswp__item"></div>
						<div class="pswp__item"></div>
					</div>
					<div class="pswp__ui pswp__ui--hidden">
						<div class="pswp__top-bar">
							<div class="pswp__counter"></div>
							<button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
							<button class="pswp__button pswp__button--share" title="Share"></button>
							<button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
							<button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
							<div class="pswp__preloader">
								<div class="pswp__preloader__icn">
								  <div class="pswp__preloader__cut">
									<div class="pswp__preloader__donut"></div>
								  </div>
								</div>
							</div>
						</div>
						<div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
							<div class="pswp__share-tooltip"></div> 
						</div>
						<button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
						</button>
						<button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
						</button>
						<div class="pswp__caption">
							<div class="pswp__caption__center"></div>
						</div>
					</div>
				</div>
			</div>`);
	}
})();