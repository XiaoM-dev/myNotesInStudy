(function() {
  var currIndex;      //起始点的索引
  var list            //viewPort节点
  var lis;            //viewPort 下的li标签们
  var liwidth;        //轮播的宽度
  var len;            //轮播图片的数量
  var pointList;      //小圆点的ul
  var pLis;           //小圆点list
  var timeId;         //定时器ID

  init();             //页面打开执行的函数,一些页面开始要执行操纵就放在这里面

  function init() {
    currIndex = 1;    
    var li_1 = document.querySelector('.viewPort>li:first-child');
    var li_last = document.querySelector('.viewPort>li:last-child');
    list = document.querySelector('.viewPort');
    //在最开始和最末尾分别clon 最后一张图 和 第一张图
    var copy_1 = li_1.cloneNode(true);
    var copy_last = li_last.cloneNode(true);
    list.appendChild(copy_1);
    list.insertBefore(copy_last,li_1);
    
    lis = document.querySelectorAll('.viewPort>li');
    liwidth = lis[0].clientWidth;
    len = lis.length;

    list.style.width = liwidth * len + 'px';      //轮播总宽度
    list.style.left = -liwidth + 'px'             //初始位置设定


    document.querySelector('#prve').addEventListener('click',function() {
      slidePrve();
    }, true);         //为向左按钮添加左滑事件

    document.querySelector('#next').addEventListener('click', function() {
      slideNext();
    });               //为向右按钮添加右滑事件

    pointList = document.querySelector('.pointList');
    pLis = pointList.children;

    for (let i=0; i<pLis.length; i++) {//为每个小圆点添加索引
      pLis[i].index = i;
    }

    pointList.addEventListener('click', function(e) {
      //事件委托给小圆点的ul,由他去调用切换图片减少监听器设置的个数
      currIndex = e.target.index + 1;
      slideTo(currIndex)
    }, true)

    var slider = document.querySelector('#slider')
    
    slider.addEventListener('mouseenter', function() {
      //鼠标移入调用stop()函数, mouseover也可以
      stop(); 
    }, true);

    slider.addEventListener('mouseout', function() {
      //鼠标移出调用auto()函数
      auto();
    }, true);

    auto();     //最开始便要调用auto以达到自动轮播
  }

  function slidePrve() {
    currIndex--;
    slideTo(currIndex);
  }
  
  function slideNext() {
    currIndex++;
    slideTo(currIndex)
  }

  function slideTo(index) { //设定跳转
    if (index < len) {
      list.style.left = - index * liwidth + 'px';
      list.style.transition = 'all .5s';
      list.removeEventListener('transitionend', moveto, true)
    }

    if (index == 0 || index == len - 1) {
      currIndex = index = ((index == 0) ? (len - 2) : 1);
      console.log(currIndex, index)
      list.addEventListener('transitionend', moveto, true);
    }
    // console.log(index, currIndex, list.style.transition)
    
    //为小圆点设置焦点,设置在这里是因为点击小圆点和切图都会改变焦点
    var focusIndex;
    if (index === len-1) {
      focusIndex = 0;
    }else if (index === 0) {
      focusIndex = pLis.length - 1;
    }else {
      focusIndex = index - 1;
    }
    document.querySelector('.pointOn').className = '';
    pLis[focusIndex].className = 'pointOn';
  }

  function auto() {
    clearInterval(timeId);
    timeId = setInterval(function() {
      slideNext();
    }, 2000);
  }

  function stop() {
    clearInterval(timeId);
  }

  function moveto() {
    list.style.left = - currIndex * liwidth + 'px'
    list.style.transition = 'all 0s'
  }


})()