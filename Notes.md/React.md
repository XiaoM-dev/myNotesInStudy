### React 知识点

#### 1. 生命周期函数

生命周期在一个框架的学习中十分重要，了解组件的生命周期可以让我们更清楚在什么时候做什么事。

##### 挂载时：

- constructor()
- static getDerivedStateFromProps()
- render()
- componentDidMount()

##### 更新时：

当组件的 props 或 state 发生变化时会触发更新。

- static getDerivedStateFromProps()
- shouldComponentUpdate()
- render()
- getSnapshotBeforeUpdate()
- componentDidUpdate()

##### 卸载：

- componentWillUnmount()

##### 错误处理：

- static getDerivedStateFromError()
- componentDidCatch()

##### 其他API

- forceUpdate()

##### Class属性

- defaultProps
- displayName



##### render()

算的上React中第一重要的函数了，因为每个Class组件必定要实现该方法。

render被调用时会 检测 `this.props` 和 `this.state` 的变化返回一下类型之一：

- **React 元素**

- **数组或 fragments**。
  fragments 就是 react 中的空表签 <></> 这种写法的标签并不会渲染成真实的Dom节点，在我们子组件需要返回多行但不想在外多包裹一层div时可以使用

  ```react
  <React.Fragment key={'id'}>
  </React.Fragment> //key 是唯一可以传递给 Fragment 的属性
  ```

- **Portals(传送门)**

  ```react
  ReactDOM.createPortal(child, container)
  // 第一个元素为要渲染的子元素，第二个参数是子元素要挂载的DOM节点
  ```

  一般情况下子元素默认挂载到最近的父节点上，但Portals提供了一种将子元素挂载到其他节点的方式。

  冒泡的时间要在**react树**中所在父节点，而非真实DOM树中的父节点。

- **字符串或数值类型**。它们在 DOM 中会被渲染为文本节点

- **布尔类型或 `null`**。什么都不渲染。

render() 应当为纯函数。如果 `shouldComponentUpdate()` 返回 false，则不会调用 `render()`。



##### constructor()

**如果不初始化 state 或不进行方法绑定，则不需要为 React 组件实现构造函数。**

反之，构造函数用于初始化state和方法绑定，初始化state直接为this.state赋值就可以了。
**不要将props的值赋值给this.state，直接this.props.XXX就行了，不然props更新state的值不更新，而且还浪费空间。**



##### componentDidMount()

`componentDidMount()` 会在组件挂载后（插入 DOM 树中）立即调用。依赖于 DOM 节点的初始化应该放在这里。如需通过网络请求获取数据，此处是实例化请求的好地方。也能在此获取DOM节点。

这个方法是比较适合添加订阅的地方。如果添加了订阅，请不要忘记在 `componentWillUnmount()` 里取消订阅



##### componentDidUpdate()

```react
componentDidUpdate(prevProps, prevState, snapshot) 
```

会在更新后会被立即调用。首次渲染不会执行此方法。如果你对更新前后的 props 进行了比较，也可以选择在此处进行网络请求。

**在这里调用this.setState()需要在条件判断当中，否则this.setState()调用过后会调用该函数，造成死循环**

`shouldComponentUpdate()`返回值为 false，则不会调用 `componentDidUpdate()`。



##### componentWillUnmount()

组件销毁前调用，一般会在此处清除计时器，网络请求(应该是websocket之类的)或者创建的订阅。



##### shouldComponentUpdate()

```react
shouldComponentUpdate(nextProps, nextState)
```

主要用作性能优化，观察、对比 state 和 props 的变化是否需要重新渲染来减少渲染消耗。 

可以用于级联表格，A表(汇总表)，B(明细表)，A表选择某一项，B表展示对应明细。当A表数据依旧为上次查询数据时(对比 `this.props` 与 `prevProps`)若相同则可不必调用请求刷新表格数据，减少渲染。

其实并不推荐使用，还可以考虑`React.PureComponent`



##### React.PureComponent(非生命周期函数, 混入了一个奇怪的API)

`React.PureComponent` 与 `React.Component`很相似。两者的区别在于 `React.Component`并未实现 `shouldComponentUpdate()`而 `React.PureComponent` 中以浅层对比 prop 和 state 的方式来实现了该函数。

如果赋予 React 组件相同的 props 和 state，`render()` 函数会渲染相同的内容，那么在某些情况下使用 `React.PureComponent` 可提高性能。

`React.PureComponent` 中的 `shouldComponentUpdate()` 仅作对象的浅层比较。



##### static getDerivedStateFromProps()

```react
static getDerivedStateFromProps(props, state)
```

`getDerivedStateFromProps` 会在调用 render 方法之前调用，并且在初始挂载及后续更新时都会被调用。它应返回一个对象来更新 state，如果返回 null 则不更新任何内容。

`getDerivedStateFromProps` 的存在只有一个目的：让组件在 **props 变化**时更新 state。



#### 2. React Hook

##### 2.1 state Hook

Class 组件中的state通过 `this.state` 与 `this.setState` 来获取与设置。而在Hook中使用:

```tsx
import * as React from 'react';
import { Button } from 'antd';
import { connect } from 'dva';

interface Props {
  children?: React.ReactNode,
  //count?: number,
}

const marginRightStyle = {
  marginRight: '8px',
}

const CheckUser: React.FC<{}> = (props) => {

  const initCount = (props: Props) => {
    let count:number = 1;
    return count = props.count || count;
  }

  const [count, setCount] = React.useState(() => {
    const initialCount = initCount(props);
    return initialCount;
  });
  
  const [obj, setObj] = React.useState({name: 'obj', weigth: '80Kg', height: '175cm'});

  const addCount = (clickType: String):void => {
    let reNum = count;
    // if(clickType === 'add'){
    //   setCount(++reNum);
    // }else if(clickType === 'reduce'){
    //   setCount(--reNum);
    // }else 
    if(clickType === 'reset'){
      setCount(0);
    }
  }

  return (
    <div style={{padding: '10px 20px'}}>
      <h1>userPage{count}</h1>
      <Button type='primary' onClick={() => setCount(count => count + 1)} style={marginRightStyle}>+</Button>
      <Button type='primary' onClick={() => setCount(count => count - 1)} style={marginRightStyle}>-</Button>
      <Button type='primary' onClick={() =>{ addCount('reset') }} style={marginRightStyle}>RESET</Button>
    </div>
  )
}

export default connect((userState: any) => ({userState}))(CheckUser);

```



##### 2.2 Effect Hook

副作用Hook，顾名思义这个API是用来让你在函数组件中执行副作用操作

```react
import React, { useState, useEffect } from 'react';

useEffect(() => {
   // Update the document title using the browser API
   document.title = `You clicked ${count} times`;
   return () => {// 返回一个函数，代表在副作用结束时调用该函数
   }
}, [count]);// 将count作为第二个参数传递, react 会与上次count进行对比若相同则跳过这次effect;

// 这个hook会在组件创建完成和更新时被调用 等同于 Class 组件的 componentDidMount() 和 componentDidUpdate()
```



##### 2.3  useContext



#### 3. React中原理解析

	##### 3.1 this.setState() 原理 (触发多个count++为什么只加了一次)

3.1.1 `this.setState() `更新是如何更新的

​	当调用 `setState` 时， 会重新调用`render`函数，然后根据最新的 `	state` 来创建 `ReactElement` 对象， 再根据最新的 `ReactElement` 对象， 对 `DOM` 进行修改；

​	`setState()` 将对组件 `state` 的更改排入队列，并通知 `React` 需要使用更新后的 `state` 重新渲染此组件及其子组件。这是用于更新用户界面以响应事件处理器和处理服务器数据的主要方式

​	将 `setState()` 视为 **请求** 而不是立即更新组件的命令。为了更好的感知性能，`React` 会延迟调用它，然后通过一次传递更新多个组件。`React` 并不会保证 `state` 的变更会立即生效。

​	`setState()` 并不总是立即更新组件。它会批量推迟更新。这使得在调用 `setState()` 后立即读取 `this.state` 成为了隐患。为了消除隐患，请使用 `componentDidUpdate` 或者 `setState` 的回调函数（`setState(updater, callback)`），这两种方式都可以保证在应用更新后触发。

答：在同一周期内会对多个 `setState` 进行批处理这种形式的 `setState()` 也是异步的，后调用的 `setState()` 将覆盖同一周期内先调用的 `setState` 的值；

解决：

```jsx
this.setState((state) => {
	return { count: state.count+1 };
})
```



3.1.2 `setState()` 可能是异步的 如何看待这种设计

​	`setState` 设计为异步，可以显著提升性能；

​	如果每次调用 `setState` 都进行一次更新，那么意味着 `render` 函数会被频繁调用，界面重新渲染，导致效率低下；

​	所以最好就是获取多个更新，之后进行批量更新；

​	如果同步更新了 `state` ，但是还没有执行 `render` 函数，那么 `state` 和 `props` 不能保持同步；？



- 在组件生命周期或 `React` 合成事件中，`setState` 是异步；
- 在 `setTimeout` 或者原生 `dom` 事件中，`setState` 是同步；
