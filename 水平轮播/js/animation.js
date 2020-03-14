/*
  el: 想要的到style的元素的DOM节点
  property: 想要得到的元素节点的style的哪一项，如：width，height
  target: 想要将元素变化的最终样式的参数
*/
function getstyle(el, property) {
  if(getComputedStyle) {
    return getComputedStyle(el)[property]
  } else {
    return el.currentyle[property]
  }
}

function animation(el, properties, target) {
  clearInterval(el.timerId) //清除计算器，避免重复调用同一元素时越来越快

  el.timerId = setInterval(function() {
    for (var property in properties) {
      var current; //current 就是当前目标元素节点的style参数
      var target = properties[property];

      if (property === 'opacity') {
        current = Math.round(parseFloat(getstyle(el, 'opacity')) * 100) //opacity介于0-1之间，所以取浮点型，为了便于计算在将其*100，后面修改style时要将其/100
      } else {
        current = parseInt(getstyle(el, property))
      }
      
      var speed = (target - current) / 10 //修改speed来控制动画切换速度
      speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed)

      if (property === 'opacity') {
        el.style.opacity = (current + speed) / 100
      } else {
        el.style[property] = current + speed + 'px'
      }
    }
    
    
  }, 20)
}