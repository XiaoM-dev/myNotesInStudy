#### 记录开发中或学习中遇到的一些问题及解决办法

#### JS回调地狱

开发过程中遇到页面加载时要预先请求一些配置，根据配置中的一些参数再去请求数据。

或者在一个页面操作完进入下一个页面时需要对数据就行一些处理。

例如：根据页面数据查询A接口(根据子机查询主机)，A接口返回数据再查询B接口(根据返回的所有主机查询其下的所有子机)，再根据B的数据查询C。

一般会用**Promise**、**async/await**来解决请求异步的问题，但不免会将方法写为：

```javascript
utils
.request({
    ...reqParams,
})
.then(resA => {
    utils
    .request({
        ...reqParams,
        data: ...resA,
    })
    .then(resB => {
         utils
        .request({
            ...reqParams,
            data: ...resB,
        })
        .then(resC => {
             
         })
    })
})

// 改写
const reqA = (reqParams) => {
    return new Promise((resolve, reject) => {
        utils
        .request({
            ...reqParams,
        })
        .then(resA => {
            // 处理
            resolve(resA);
        })
        .catch(err => {
            reject(err);
        })
    })
}


// reqB、reqC 同理
reqA(paramsA)
.then(resA => {
    return reqB(resA);
})
.then(resB => {
    return reqC(resB)
})
.then(resc => {
    
})

// async/await
const reqFun = async() => {
// async的函数返回的是一个Promise对象所以reqFun().then()是合理的
    const resA = await reqA(paramsA)
    const resB = await reqB(resA)
    const resC = await reqC(resB)
}
```

#### 生成器(generator)

#### js深浅拷贝

深浅拷贝的不同要先知道一点存储机制，在js的数据存储中分为堆、栈。栈内存较小，但拥有访问快的特点，所以一般js的基础类型的数据如string、Number会直接存储在这里。但还有引用数据类型Object、Array这些数据数据量可能很大，这时是将这些数据存在堆内存中，而我们的栈内存存下一个地址这个地址指向该数据在堆内存中的位置，这里我感觉这地址的作用和C中的指针有点类似。

知道了存储大概什么个情况，那我们就知道了我们在将一些数据赋值的时候实际是有差异的：

```javascript
let a = 'string' // 直接存储在栈中
let testObj = {name: 'firstItem', havior: [{name: 'innerItem', code: '1'}]};//栈中存储的只是一个地址，最终数据存在堆内存中
let b = a // 因为数据存在栈中，赋值是栈中数据的复制，所以直接得到一个新的、值相同的字符串
b = 'newString';
console.log(a, b) // 'string', 'newString'
let endObj = testObj // 栈中只是存储了地址，复制的也是地址，最终这个地址都指向堆中的同一个元素 这种我们称为 浅拷贝
resultObj.havior[0].code = '2';
console(testObj, endObj) // 都为{name: 'firstItem', havior: [{name: 'innerItem', code: '2'}]}
```

所以这里就引出了浅拷贝的概念，浅拷贝只是拷贝了数据在栈内存中的地址，并没有真正的找到对应的数值。

其他的浅拷贝方式还有：assign， ES6的扩展运算符



对应浅拷贝的就是深拷贝，而我们深拷贝要解决的就是如何找到对应的真正的数值并对其复制。

深拷贝的方法：

```javascript
let objCopy = JSON.parse(JSON.stringify(obj));// 一般简单的结构应用较多
```

就是利用 JSON. stringify 将js对象序列化（JSON字符串），再使用JSON. parse来反序列化（还原）js对象；序列化的作用是存储和传输。（对象本身存储的是一个地址映射，如果断电，对象将不存在，所以要将对象的内容转换成字符串的形式再保存在磁盘上）。不过，这种实现深拷贝的方法有局限性，它只适用于一般数据的拷贝（对象、数组）。

```javascript
{
    function Person(name) {
        this.name = name;
    }
    let obj = {
        age: 18,
        reg: new RegExp('\\w+'),
        err: new Error('error message'),// 正则和err对象置空，
        fn: function () {
            console.log('fn');
        },
        hh: undefined, // function和undefined直接丢失,
        NaN: NaN,
        isInfinite: 1.7976931348623157E+10308,
        minusInfinity: -1.7976931348623157E+10308, // NaN、Infinity和-Infinity,会变成null；
        p1: new Person('p1') // 构造函数 constructor 丢失， 
    };
	// obj.obj = obj; //存在循环引用的直接报错

    let objCopy = JSON.parse(JSON.stringify(obj));
    console.log('obj', obj);
    console.log('objCopy', objCopy);
}
// 如此结构用上述方法得到的
{
    age: 18,
    reg: {},
    err: {},
    hh: null,
    isInfinite: null,
    minusInfinity: null,
    p1: {name: 'p1'}
}
```

#### ts+react中引入lodash模块提示错误

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



#### JS一些书写技巧

```javascript
// 函数短调用
// Longhand
function A() {
  console.log("A");
}
function B() {
  console.log("B");
}

var c = 5;
if (c == 10) {
  A();
} else {
  B();
}

// Shorthand
(c === 1 ? A : B)(); // 函数三元判断调用

// 重复一个字符串多次
// Longhand 
let Tom = ''; 
for(let i = 0; i < 5; i ++) { 
  Tom += 'Tom '; 
} 
console.log(str); // Tom Tom Tom Tom Tom 

// Shorthand 
'Tom '.repeat(5); // Tom Tom Tom Tom Tom
```

#### js 原生Sort探究

关于排序如果要探讨起来就还得说到几种排序算法了，这里先对js原生的排序方法sort进行一个探究。sort采用`原地算法`来对数组进行排序。

何为原地算法：是一种使用小的，固定数量的额外之空间来转换资料的算法。简单来说，就是在不新建大量额外空间（就是固定空间，无论数据多大，都不改变的那种）的基础上对原数据进行操作。

sort()参数可选，参数为一个回调函数。

##### 无参数情况下的限制

无参情况下会将元素按照转换为的字符串的各个字符的Unicode位点进行排序。

因为转为Unicode排序所以可能会出现问题，例如：

```javascript
const arr = [2,46,78,12,45,789,0,4];
arr.sort() // [0, 12, 2, 4, 45, 46, 78, 789]
可通过传入回调来进行排序
arr.sort((a,b) => a-b)//升序排 a为当前排序元素，b为与其对比的元素
```

那么传入回调的情况下sort的排序算法是怎样的喃？

--->先来回顾下几种常见的排序算法：

##### 排序算法

###### 1.冒泡排序（Bubble Sort)



#### Js书写规范

##### 使用解构赋值

```javascript
// bad
function getFullName(user) {
  const firstName = user.firstName;
  const lastName = user.lastName;
}

// good
function getFullName(obj) {
  const { firstName, lastName } = obj;
}

// best
function getFullName({ firstName, lastName }) {
}

// 返回多个值时对象返回，然后解构取出
// bad
function processInput(input) {
  return [left, right, top, bottom];
}

// good
function processInput(input) {
  return { left, right, top, bottom };
}

const { left, right } = processInput(input);
```



##### 对象

```javascript
// 对象尽量静态化，一旦定义，就不得随意添加新的属性。如果添加属性不可避免，要使用Object.assign方法。
// bad
const a = {};
a.x = 3;

// if reshape unavoidable
const a = {};
Object.assign(a, { x: 3 });

// good
const a = { x: null };
a.x = 3;

// 如果对象的属性名是动态的，可以在创造对象的时候，使用属性表达式定义。
// bad
const obj = {
  id: 5,
  name: 'San Francisco',
};
obj[getKey('enabled')] = true;

// good
const obj = {
  id: 5,
  name: 'San Francisco',
  [getKey('enabled')]: true,
};

// 对象的属性、方法书写尽量简洁
var ref = 'some value';

// bad
const atom = {
  ref: ref,
  value: 1,
  addValue: function (value) {
    return atom.value + value;
  },
};

// good
const atom = {
  ref,
  value: 1,
  addValue(value) {
    return atom.value + value;
  },
};
```



##### 数组

```javascript
// 使用 Array.from 方法，将类似数组的对象转为数组。
const foo = document.querySelectorAll('.foo');
const nodes = Array.from(foo);
```



##### 函数

```javascript
// 那些使用匿名函数当作参数的场合，尽量用箭头函数代替。因为这样更简洁，而且绑定了 this。
// bad
[1, 2, 3].map(function (x) {
  return x * x;
});

// good
[1, 2, 3].map((x) => {
  return x * x;
});

// best
[1, 2, 3].map(x => x * x);

// 箭头函数取代Function.prototype.bind，不应再用 self/_this/that 绑定 this
// bad
const self = this;
const boundMethod = function(...params) {
  return method.apply(self, params);
}

// acceptable
const boundMethod = method.bind(this);

// best
const boundMethod = (...params) => method.apply(this, params);

// 简单的、单行的、不会复用的函数，建议采用箭头函数。如果函数体较为复杂，行数较多，还是应该采用传统的函数写法。所有配置项都应该集中在一个对象，放在最后一个参数，布尔值不可以直接作为参数。

// bad
function divide(a, b, option = false ) {
}

// good
function divide(a, b, { option = false } = {}) {
}
```

