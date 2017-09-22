# extend-photoswipe
仿朋友圈的图片点击放大功能

基于 jQuery 和 PhotoSwipe 插件。
	<p>
        这里主要给出一个js文件，做到<i>仿朋友圈的图片点击放大显示</i>。<br>
        资源地址: <a href="https://github.com/ThomasCui/extend-photoswipe">GitHub地址</a> <br>
        Demo地址：<a href="http://thomascui.cn/blog/image/photoswipe/index.html">仿朋友圈点击放大功能</a> <br>
        QuickStudy地址：<a href="http://thomascui.cn/blog/image/photoswipe/demo.html">快速上手</a> 
    </p>
   <p>使用步骤：</p>
    <p>1. 引入官方css资源</p>
    <p>2. 引入官方JavaScript 资源</p>
    <p>3. 引入我提供的enlarge-image资源</p>
    <p>4. html 的 img 部分加入属性 data-img-index，每一个集合从0开始递增</p>
    <p>5. js 执行方法：myPhotoSwipe(".imgs", '.enlarge-image', '.largeimage')</p>
    <br>
	<p>
		PhotoSwipe 本身是不依赖任何 js 库的，它的使用说明官方也有，只需要给出每个 item 放大之后的 路径、宽、高即可。
	</p>
	<p>
		在使用过程中发现，item 的路径是很好指定的，可以放在元素的任何位置。而放大之后图片的宽高就不那么随意了。
	</p>
	<p>
		要考虑到：图片是否是等宽高展示？图片是同步还是异步被加载出来？图片是否除了缩略图外也给出了原图地址？
	</p>
	<p>
		1. 当所有的图片放大之后都是固定宽高时，这样的是很好做处理的，别人也在 PhotoSwipe 的基础上做了拓展，他的该页面加载比较慢，在加载出来前请勿操作。<br>
		例如：github地址：<a href="https://github.com/datenstrom/yellow-plugins/tree/master/gallery">Yellow CMS plugin</a> <br>
		Demo: <a href="https://developers.datenstrom.se/plugins/gallery">Yellow CMS Demo</a> <br>
	</p>
	<p>
		2. 但是当所有图片都不是等宽高时（例如：<strong>朋友圈</strong>），每个人上传的每张图片的宽高都可能不相同，item 的宽高也就需要设置成不相同的，并且是要根据<strong>原图</strong>而不是缩略图进行设置。
	</p>
  
  
