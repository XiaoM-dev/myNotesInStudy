### TypeScript

初学JS我们便知道JS是弱语言，何为弱语言，是指在这门语言编写的程序中变量的类型校验弱。

```javascript
let a = 0;
a = 'string';
a = [0];
a = {0: 'string'};
```

上述代码可以看出在js中数据的类型是可以随意改变的，最开始我创建变量a是一个**Number**类型的数据，后面变成了**String**、**Array**、**Object**。这些在js中都是能正常操作的。这也许在我们初学js的时候会很舒服，我们不用太关心数据类型不同从而导致的数据类型转换的事情。但当我们开始进入到一个项目当中而且当这个项目逐渐变大时，问题便会逐渐暴露出来。因为数据的类型一开始没有规范，可能到了后来我们连这个数据应该是对象还是数组都不清楚了。包括一些函数传入参数、返回值。注释做的不好的情况下维护难度也大大增加了。

**TypeScript**的出现就是为了解决这个问题。同时也尽量减少我们在程序编写过程中就出现的错误。



#### 写法

在TypeScript中变量的什么 let 变量名: 数据类型 = 值；如：

```typescript
let isBoolean: boolean = false;
let string: string = 'string';
```

##### 数组

let 变量名: 数据类型[] = 值 或 let 变量名: Array<数据类型> = 值;

```typescript
let arr: number[] = [1, 2]; 
let arr: Array<string> = ['1', '2'];
// 注意数组的创建因为规定了数组内元素的类型，内部所有元素都应当为规定类型的数据，所有一下方式是错误的
let arr: number[] = ['1', 2]; // Error
let arr: Array<string> = [{0: '0'}, '2']; //Error
```

##### 元组 Tuple

因为上面数组的一些限制所有引出了元组，元组类型允许表示一个**已知元素数量和类型**的数组，各元素的类型不必相同。

```typescript
let x: [string, number];
x = ['hello', 10]; // OK
x = [10, 'hello']; // Error
```

##### 枚举 enum

**枚举 **类型是对JavaScript标准数据类型的一个补充。 像C#等其它语言一样，使用枚举类型可以为一组数值赋予友好的名字。枚举和ES6的map数据结构有点相似

```typescript
enum Color {Red, Green, Blue}
let c: Color = Color.Green; // ok
let c: Color = Color.Pink;// error 提示color上没有属性pink
```

##### 任意值 any

**任意值**为那些在编程阶段还不清楚类型的变量指定一个类型。 这些值可能来自于动态的内容，比如来自用户输入或第三方代码库。这种情况下使用`any`，当你只知道一部分数据的类型时，`any`也是有用的，如：

```typescript
let arr: any[] = [1, '1', true];
arr[1] = 'add';
```

##### 空值 void

**空值**，如果是学过其他语言像**Java**这些的可能会感觉有些熟悉，他常用在函数(Java中类似的作用)。

````javascript
function getFun(): void{// 表示函数无返回值
	//处理
}

let noValue: void = undefined;
````

##### Null和Undefined

```typescript
let u: null = null;
let u: undefined = undefined;
```

##### Never

`never`类型表示的是那些永不存在的值的类型。 例如，`never`类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型； 变量也可能是`never`类型，当它们被永不为真的类型保护所约束时。

##### object、Object、{}

###### 1. object类型

TS 2.2中引入了一个新的类型用于表示非原始类型





#### 类型断言

在我看来类型断言即告诉编译器，此处的变量类型为什么，类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。

断言的2种方式

```typescript
let someValue: any = "this is a String";
let strLength: number = (<string>someValue).length;
// as 版
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
//ps:当你在TypeScript里使用JSX时，只有as语法断言是被允许的。
```



#### 变量声明

`var`、`let`、`const`，这里涉及var的变量提升，js变量声明的作用域问题。

解构数组：解构可以不为变量设置类型

对象展开

```typescript
class C {
  p = 12;
  m() {
  }
}
let c = new C();
let clone = { ...c };
clone.p; // ok
clone.m(); // error!`
```



#### 接口(interface)

```typescript
interface inerfaceName {
	i1: string; //
	i2?: number; // 可选属性
    readonly x: number;// 只读
}
```

变量使用const，属性使用readonly

##### 可索引类型

```typescript
interface StringArray {
    [index: string]: string;
}

let myArray: StringArray;
myArray = {
    '0': 'str1',
    '1': 'str2',
};

let myStr: string = myArray['1']; // str2
```



##### 类类型实现接口

好家伙，这拗口的名字，这里的接口的作用就与c#、java中基本一样了可以用它来明确一个类。

```typescript
interface ClockInterface {
    currentTime: Date;
    setTime(d: Date);
}

class Clock implements ClockInterface {
    currentTime: Date;
    setTime(d: Date) {
        this.currentTime = d;
    }
    constructor(h: number, m: number) { }
}
```

接口也可以通过extends继承，与类继承类似。

*************

#### 类

类在JS中以原型与原型链实现，ES6开始支持直接以**class**(语法糖)声明一个类，如：

```typescript
class Person {
	name: string;
	constructor(theName: string){
        this.name = theName;
    }
    
    behavior(habit: string){
        console.log(`${this.name} like ${habit}`);
    }
}

// 实例化对象
let a = new Person('A');
a.behavior('play game with firends');
```

如果对其他面向对象语言有所了解你应该还知道几个关键字：**public**(公共的)、**private**(私有的)、**protected**(受保护的)、**static**(静态的)。

在其他面向对象语言类中变量的声明一般是要带上**修饰符(也就是上面几个关键字)**的，但上述代码中我们并没有使用到这些关键字，事实上是系统默认用了public。

##### public

```typescript
class Person {
	public name: string;
	public constructor(theName: string){
        this.name = theName;
    }
    
    public behavior(habit: string){
        console.log(`${this.name} like ${habit}`);
    }
}

// 实例化对象
let a = new Person('A');
a.behavior('play game with firends');
```

##### private

当成员标记为**private**私有，表示他不能在声明他的类的外部被访问。

```typescript
class Person {
	private name: string;
	constructor(theName: string){
        this.name = theName;
    }
}

// 实例化对象
let a = new Person('A');
console.log(a.name)// 属性“name”为私有属性，只能在类“Person”中访问。
```

另外关于**private**还有几点要注意

```typescript
class Person {
    private name: string;
    constructor(theName: string){
        this.name = theName;
    }
}

class Man extends Person { // private 属性可被继承
    constructor(){
        super('Man');
    }
    behavior(habit: string){
        console.log(`${this.name} like ${habit}`);//属性“name”为私有属性，只能在类“Person”中访问。
    }
}

class NoName {
    private name: string;
    constructor(theName: string){
        this.name = theName;
    }
}

let person = new Person('Person');
let man = new Man();
let noName = new NoName('NoName');

person = man;// console.log(person) => Man {name: man};
person = noName;//不能将类型“NoName”分配给类型“Person”。类型具有私有属性“name”的单独声明。
// 不同类声明的相同的private属性不兼容
```

##### protected

```typescript
class Person {
    protected name: string;
    constructor(theName: string){
        this.name = theName;
    }
}

class Man extends Person { // protected 属性可被继承
    constructor(name: string){
        super(name);
    }
    behavior(habit: string){
        console.log(`${this.name} like ${habit}`);// this.name可以被访问
    }
}

let man = new Man('man');

man.behavior('like games')// Man like like games
console.log(man.name)//属性“name”受保护，只能在类“Person”及其子类中访问。
```

##### 参数属性

```typescript
// 上述代码初始化的成员用了修饰符，使用了theName来赋值给this.name，参数属性可以让我们一步完成，达到相同的效果。
class Person {
    constructor(private name: string){}
    
    behavior(habit: string){
        console.log(`${this.name} like ${habit}`);// this.name可以被访问
    }
}
```

##### static

这些属性存在于类本身上面而不是类的实例上。 每个实例想要访问这个属性的时候，都要在该属性前面加上类名。

```typescript
class Dog {
    static eyesNum: number = 2;
    deteails = () => {
        console.log(`The dog has ${Dog.eyesNum} eyes`)
    }
}

let dog = new Dog();
dog.deteails()
```



##### 取存器

getter/setter => **get**、**set**

```typescript
let passcode = "secret passcode";

class Employee {
    private _fullName: string = '';

    get fullName(): string {
        return this._fullName;
    }

    set fullName(newName: string) {
        if (passcode && passcode == "secret passcode") {// 判断密码是否正确，正确则允许修改
            this._fullName = newName;
        }
        else {
            console.log("Error: Unauthorized update of employee!");
        }
    }
}

let employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
    alert(employee.fullName);
}
```

##### 静态属性(static)



##### 抽象类(abstract)

看到这块有点坐不住了，类这一章给我感觉就是在重学面向对象语言里类的特性，抽象类在Java和C++中也都有。具体作用也一样。

一般作为**派生类**的**基类**，派生类简单的理解就是子类，而派生出这些类的类就叫基类。

它们一般不会直接被实例化。 不同于接口，抽象类**可以包含成员的实现细节**。 `abstract`关键字是用于定义抽象类和在抽象类内部定义抽象方法。

抽象类中的抽象方法不包含具体实现并且必须在派生类中实现。(成员可以实现，方法不实现，就是搭好类的架子具体怎么做每个子类具体实现)

```javascript
abstract class Department {

    constructor(public name: string) {
    }

    printName(): void {
        console.log('Department name: ' + this.name);
    }

    abstract printMeeting(): void; // 必须在派生类中实现
}
```



#### 函数



#### 泛型（generic）

在软件工程设计中代码的重用非常重要，而在函数接口中如果我们使用any来定义接口传入参数的类型，这样做确实可以接收任意类型的参数，但是同时我们也会丢失传入参数的一些信息，传入参数与返回数据应当为相同数据类型。这时 **泛型** 可以解决这个问题，泛型定义的接口同样可以接收任意类型的数据，但是返回数据的类型必须与入参相同类型。

```typescript
function identity<T>(arg: T): T {
    return arg;
}
let output = identity("myString");  // type of output will be 'string'
//此时会自动帮我们检测到入参为String，那么outPut也应该为String
```





