### Umi+TS配置

项目环境构建依照**umi.js**官网脚手架命令构建即可。

这里主要记录一些配置

项目的配置文件初始配置文件在**umirc.ts** 中此时的配置文件是一个文件，当我们的**router**和**webpack**等一些其他配置都要配置的时候放在一个文件中显然有些不太合适。其实官方还给了一种解决办法，官方文档提到配置文件在**.umirc.ts**或**config/config.ts**中，所以我们可以创建一个**config**文件夹并创建**config.ts**文件内容就是**umirc.ts**的内容，注意要删除**.umirc.ts**文件。其余配置可通过**import**导入。



#### 1.函数式组件写法

```typescript
import * as React from 'react';
import { Button } from 'antd';

const CheckUser: React.FC<{}> = () => {

  return (
    <div style={{padding: '10px 20px'}}>
      <h1>userPage</h1>
      <Button type='primary'>click</Button>
    </div>
  )
}

export default CheckUser;

// Class 组件写法
import React, { PureComponent, Component } from 'react';

interface stateFace {
  isShow: Boolean,
}

class IndexPage extends PureComponent<{}, stateFace>{
  constructor(props: any) {
    super(props);
    this.state = {
      isShow: false
    };
    console.log('constructor');
  }
  changeState = () => {
    this.setState({
      isShow: true
    })
  };
  render() {
    // const { isShow } = this.state;
    console.log('render');
    return (
      <div>
        <button onClick={this.changeState}>点击</button>
        <div>{this.state.isShow}</div>
      </div>
    );
  }
}

export default IndexPage;
```



#### 2.ts+react中引入lodash模块提示错误

![image-20210426163148654](C:\Users\MR.mr\AppData\Roaming\Typora\typora-user-images\image-20210426163148654.png)

解决方法有2种

1.不推荐

首先全局安装lodash模块，cmd: npm i --save lodash; 再src下添加声明文件 declaration.d.ts

```typescript
declare module 'lodash';
// 但是这种方法有个不好的地方引入模块的api提示没了
```

2.推荐

npm i --save @types/XXX  提示正常。且不再需要原module。可以uninstall 



#### 3.dva引入方式

```typescript
import * as React from 'react';
import { Button } from 'antd';
import { connect } from 'dva';

const CheckUser: React.FC<{props: any}> = (props) => {
  console.log(props, 'props')

  return (
    <div style={{padding: '10px 20px'}}>
      <h1>userPage</h1>
      <Button type='primary'>click</Button>
    </div>
  )
}

export default connect((userState: any) => ({userState}))(CheckUser);
```



#### 4.项目yarn start 自动打开浏览器配置

 [typesearch]( https://www.typescriptlang.org/dt/search) 

```typescript
// 2.x 版本
 检查 .env 文件，如果有 BROWSER=none，去掉；
// 3.x 版本
可通过第三方插件来解决
安装 open-browser-webpack-plugin模块
// 注意 typeScript 依旧不能识别这个模块，但是 typesearch 上查不到对应版本，所以只能上面问题2的第一种办法来解决了

import openBrowser from 'open-browser-webpack-plugin';
export default defineConfig({
  chainWebpack(config) {
    config
      .plugin('open-browser-webpack-plugin')
      .use(openBrowser, [{ url: 'http://localhost:8001' }]); // 此处url与项目启动的url保持一致
  },
  ... // 其他配置参数
}
```

