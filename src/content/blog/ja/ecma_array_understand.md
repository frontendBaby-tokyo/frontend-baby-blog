---
description: ECMAScriptにおけるArrayの仕様を調べてみた
pubDate: 2025-08-09T02:00:00.000Z
recommended: true
tags:
  - tags.tech.ecmascript
  - tags.tech.javascript
  - tags.tech.array
title: ECMAScriptを読解してJavaScriptのArrayの仕様を理解する
---

## 注

本記事は、以前私が[Qiitaに投稿](https://qiita.com/fontendBaby/items/11badd2a6a2fc7991de3)したものの再掲になります。後日、本記事をより噛み砕いた記事を作成する予定です。

## はじめに

筆者はJavaScriptで毎日のように実装しているのですが、言語仕様であるECMAScriptをこれまで全く読んだことがありませんでした。言語仕様をきちんと理解して使っているわけではなく、「問題なく動くのでなんとなく使っている」というのが正直なところです。

今回、JavaScriptの仕様を正確に理解したいと考え、その言語仕様であるECMAScriptを読んでみることにしました。とはいえECMAScript全体だと範囲が広すぎるので、今回は、Reactなどでもよく使用する配列（Array）に焦点を絞ってECMAScriptの仕様を確認することにしました。以下、学んだ内容を共有させていただきます。

## ECMAScriptについて

JavaScriptの仕様を理解するうえで、ECMAScriptの位置づけをざっくりと整理しておきます。  

### JavaScriptの公式ドキュメントは存在しない  

- JavaScript自体の公式のドキュメントは存在しない。  
- [MDN](https://developer.mozilla.org/ja/docs/Web)は広く参照されており、実質的な公式ドキュメントのような扱いを受けているものの、厳密には公式ではない。  

### JavaScriptの仕様はECMAScriptに記載されている  

- ECMAScriptを読むことで、JavaScriptのコア仕様を正確に理解できる。  
- JavaScriptの実行エンジン（V8など）は、ECMAScriptの仕様に基づいて実装されている。  

### ECMAScriptはJavaScriptのすべてを定めているわけではない  

- ECMAScriptが定義しているのは、JavaScriptのコア言語仕様である。（例: データ型、関数、オブジェクトなど） 

#### ECMAScriptの範囲外のもの  
たとえば以下のようなAPIは、ECMAScriptの仕様ではなく、別の団体によって定義されている。  
- **DOM API** （WHATWGで定義）  
- **Fetch API** （WHATWGで定義）  
- **Node.js API** （Node.js独自の仕様）

## 本記事の根拠とするもの  

1. **ECMAScriptの記述**  
   ECMAScriptの公式仕様に記載がある内容は、最も信頼できる情報である。  
2. **JS実行エンジンでの確認**  
   ECMAScriptの仕様に基づく動作を、実際にプログラムを実行して確認する。  
   JavaScriptの実行エンジンはECMAScriptの仕様に忠実に実装されている（はずである）ため、動作を確認できれば、仕様の理解がより確実なものとなる。  
   複数の実行エンジンで確認するほうが信頼性は高まるが、今回はそこまでは行わず、Google Chromeの開発者ツールで実行を確認した。  

本記事のここから先の内容は、上記の二点を根拠とします。  
なお、本記事の内容には筆者の解釈や推測が含まれる可能性があり、その点はあらかじめご了承ください。  

## Arrayはオブジェクトである

> The ECMAScript language types are Undefined, Null, Boolean, String, Symbol, Number, BigInt, and Object.

ECMAScriptにおけるデータ型について、[6 ECMAScript Data Types and Values](https://tc39.es/ecma262/#sec-ecmascript-data-types-and-values)にて上記のとおり記述されています。
Array(配列)はデータ型として定義されていないことがわかります。

[23.1 Array Objects](https://tc39.es/ecma262/#sec-array-objects)を読むと、**Arrays are exotic objects（**配列は特殊なオブジェクトである**）**
との記載があり、ECMAScriptにおいてArrayはオブジェクトの一種として定義されていることが確認できます。

```js
const arr = new Array();
const arr2 = []
console.log(typeof arr); // object
console.log(typeof arr2); // object
```

実際に[typeof演算子](https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#sec-typeof-operator)で確認してみると、`object`であることがわかります。

ちなみに、`console.log()`は、ECMAScriptの仕様には含まれていません。console オブジェクトの仕様は、WHATWGが策定する [Console Standard](https://console.spec.whatwg.org/#log) によって定義されています。
## Arrayは exotic objects(特殊なオブジェクト)である 
### ordinary objectとexotic object
まず、4.4 Terms and Definitionsに**ordinary object**と**exotic object**の項目があり、それぞれ簡単に定義付けされています。

1. [4.4.9 ordinary object](https://tc39.es/ecma262/multipage/overview.html#sec-ordinary-object)  
> すべてのオブジェクトがサポートしなければならない必須の内部メソッドのデフォルトの振る舞いを持つ(意訳)
2. [4.4.10 exotic object](https://tc39.es/ecma262/multipage/overview.html#sec-exotic-object)
> 一つ以上のordinary objectの必須内部メソッドを持たないオブジェクト（意訳）

**ordinary object**と**exotic object**についての詳細は、[10 Ordinary and Exotic Objects Behaviours](https://tc39.es/ecma262/multipage/ordinary-and-exotic-objects-behaviours.html#sec-ordinary-and-exotic-objects-behaviours)に記述されています。（今回の記事ではその詳細には立ち入りません。）

### Arrayが特殊なオブジェクトであることの意味
Arrayがexotic objects(特殊なオブジェクト)であるというのは、どういう意味でしょうか？ 
[10.4.2 Array Exotic Objects](https://tc39.es/ecma262/multipage/ordinary-and-exotic-objects-behaviours.html#array-exotic-object)に記述があり、その内容を要約すると、以下の通りです。

- **配列インデックスプロパティキー**  
   配列のプロパティ名が配列インデックスであるプロパティは「要素（element）」と呼ぶ。
- **lengthプロパティ**  
   必ずlengthプロパティが存在し、その値は0以上で2**32未満の整数である。このプロパティはnon-configurableという特性を持つ。
- **インデックスとlengthの関係**  
   lengthプロパティの値は常に配列内のインデックスの最大値よりも大きくなる。
- **lengthプロパティの自動調整**  
   配列に新しいインデックスプロパティが追加されたり変更されたりすると、lengthプロパティが自動的に更新される。（例：インデックスが4の要素を追加すると、lengthは5になる。）
- **プロパティの削除**  
   「length」プロパティが変更された場合、その値以上のインデックスを持つすべてのプロパティが削除される。（例：lengthが3に設定された場合、インデックス3以上のすべての要素が削除される。）

### プログラムを実行して確認する
上記の各項目について、プログラム実行で確認できるものを確認していきます。  
#### 配列インデックスプロパティキー
「要素（element）」という呼び方については、プログラム実行で確認できるものではありません。
```js
const fruits = ["apple", "orange", "banana"]
// プロパティキーが配列インデックスであることを確認
0 in fruits; // true
2 in fruits; // true
6 in fruits; // false
// 配列の各値は、プロパティのキーではない
"apple" in fruits // false
```
#### lengthプロパティ
`2.`のlengthプロパティについては、確認可能です。
```js
const arr = [0, 1, 2]

/*
*lengthプロパティ存在確認
*/
// lengthプロパティが存在することを確認
console.log("length" in arr) // true

// arrのプロトタイプオブジェクトにlengthプロパティが存在することを確認
// ※プロトタイプについては後ほど触れる
console.log("length" in Object.getPrototypeOf(arr)) // true
console.log(Object.getPrototypeOf(arr) === Array.prototype) // true (arrのプロトタイプオブジェクトはArray.prototypeである)

/*
*lengthの範囲を確認
*/
// length を負の値にしようとした場合（RangeErrorが発生する）
console.log(arr.length = -1)　// "Uncaught RangeError: Failed to set the 'length' property on 'Array': Invalid array length"

// length を 2**32 以上にしようとした場合（RangeErrorが発生する）
console.log(arr.length = 2**32)　// "Uncaught RangeError: Failed to set the 'length' property on 'Array': Invalid array length"

// length を 少数の値にしようとした場合（RangeErrorが発生する）
console.log(arr.length = 1.8)　// "Uncaught RangeError: Failed to set the 'length' property on 'Array': Invalid array length"

// length を 文字列にしようとした場合（RangeErrorが発生する）
console.log(arr.length = "あいうえお") // "Uncaught RangeError: Failed to set the 'length' property on 'Array': Invalid array length"

// lengthに適切な価を設定できることを確認
console.log(arr.length = 100) // 100 (設定できた)
console.log(arr.length = "20") // 20 (設定できた)
console.log(arr.length = 2**32 - 1) // 4294967295（設定できた）

/*
*non-configurableな特性を確認
*/
const arr2 = ["a", "b"]
// arr2のlengthプロパティの構成を記述したオブジェクトを確認
console.log(Object.getOwnPropertyDescriptor(arr2, "length"))　
// 以下の出力を見ると、configurableがfalseとなっており、non-configurableであることが確認できる。
// {
//     "value": 2,
//     "writable": true,
//     "enumerable": false,
//     "configurable": false
// }

// lengthプロパティが削除できないことを確認
delete arr2.length // false
console.log(arr2.length) // 2 (delete演算子でlengthプロパティを削除できていない)

// configurableをtrueに変更できないことを確認
Object.defineProperty(arr2, "length", {
   configurable: true,
})　// "Uncaught TypeError: Cannot redefine property: length at Function.defineProperty (<anonymous>)"

// enumerableをtrueに変更できないことを確認
Object.defineProperty(arr2, "length", {
   enumerable: true,
}) // "Uncaught TypeError: Cannot redefine property: length at Function.defineProperty (<anonymous>)"

// writableはtrue => falseに変更可能
Object.defineProperty(arr2, "length", {
   writable: false,
}); //  (エラーにならない)

// falseに設定すると、trueへ変更することはできない
Object.defineProperty(arr2, "length", {
   writable: true,
})　// "Uncaught TypeError: Cannot redefine property: length at Function.defineProperty (<anonymous>)"
```
まず、[in演算子](https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#sec-relational-operators)で、Arrayオブジェクトの`arr`にlengthプロパティが存在していることを確認しました。さらに、`arr`のプロトタイプオブジェクトにlengthプロパティの存在を確認しました。実は、Arrayオブジェクトは`Array.prototype`を継承しているので、`Array.prototype`のlengthプロパティが`arr`にも存在しているのです。この仕組みについては、後ほど触れます。

次に、lengthが適切な値（0以上で2**32未満の整数）しか設定できないことを確認しました。

最後に、lengthプロパティがnon-configurableであることを確認しました。[Object.getOwnPropertyDescriptor](https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.getownpropertydescriptor)メソッドにより、プロパティの構成を取得したところ、configurableプロパティの値が確かにfalseになっています。

configurableというプロパティの特性については、[6.1.7.1 Property Attributes](https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-property-attributes)に記載があり、要約すると「`false`の場合、プロパティを削除したり、属性を変更したりできない」とされています。
実際にdelete演算子でlengthプロパティの削除を試みても、削除することができません。また、[Object.defineProperty](https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.defineproperty)メソッドでconfigurableやenumerableを変更しようとしてもエラーが返されます。ただしwritableに関しては、trueからfalseに変更することが可能です。しかし、一度falseに変更すると、false=>trueの変更はできなくなります。その辺のアルゴリズムは、[6.2.6.5 ToPropertyDescriptor](https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-topropertydescriptor)で定義されているようですが、本記事の趣旨から外れるので詳細に立ち入らないことにします。
ちなみに、通常の配列オブジェクトで`arr.length = 100`のようにlengthプロパティの値を上書き可能なのは、writable属性がtrueであるからです。writable属性をfalseに変更すると、lengthプロパティを上書きすることはできなくなります。

## Array Constructor

JavaScriptでは、`new Array(10)`のようにArrayコンストラクタで配列を作成できます。  
[23.1.1 The Array Constructor](https://tc39.es/ecma262/#sec-array-constructor)には、Arrayコンストラクタの仕様が記述されています。以下、要約します。

- **グローバルオブジェクトのプロパティ**  
   Arrayコンストラクタは、グローバルオブジェクトの"Array"プロパティの初期値である。

- **配列の作成**   
   Arrayコンストラクタは、コンストラクタとして呼び出された場合、新しい配列（Arrayオブジェクト）を作成し、初期化する。（`new Array()`と呼び出すと、新しい配列が作成される。） 
   また、Arrayコンストラクタは、関数として呼び出された場合にも新しい配列を作成し、初期化する。つまり、`Array(...)`と呼び出すのは、`new Array(...)`と同じ動作をする。

- **引数による動作の違い**  
   Arrayコンストラクタの動作は、渡された引数の数や型によって異なる。

- **クラス定義での使用**  
   Arrayコンストラクタは、クラス定義の`extends`句の値として使用できる。Arrayの動作を継承するためには、サブクラスのコンストラクタ内で`super`呼び出しを行い、Arrayコンストラクタを呼び出す必要がある。

### プログラムを実行して確認する
上記の内容を、プログラムの実行で確認していきます。

#### グローバルオブジェクトのプロパティ
```js
console.log(Array === window.Array); // true (ブラウザ環境)
```

ブラウザ環境におけるグローバルオブジェクトは、windowオブジェクトです。`Array === window.Array`がtrueであるため、グローバルオブジェクトの"Array"プロパティの初期値であることが確認できました。 


ブラウザ環境におけるグローバルオブジェクトであるwindowオブジェクトは、ECMAScriptの仕様ではなく、[WHATWGの仕様](https://html.spec.whatwg.org/multipage/nav-history-apis.html#the-window-object)になります。ちなみにNode.jsでは、グローバルオブジェクトは`global`になるため、`global.Array === Array`がtrueになります。  

ECMAScriptにおけるグローバルオブジェクトの定義は、[19 The Global Object](https://tc39.es/ecma262/#sec-global-object)に記載されています。軽く要約すると、「グローバルオブジェクトはスクリプトの実行前に生成されており、new演算子をつけてコンストラクタとして使用することができず、関数としての呼び出しができず、ホスト環境によって独自のプロパティを持つことができる」とのことです。その他はグローバルオブジェクトの値プロパティ・関数プロパティ・コンストラクタプロパティが列挙されており、その中に[Arrayコンストラクタが記載されています](https://tc39.es/ecma262/#sec-constructor-properties-of-the-global-object-array)。

#### 配列の作成
```js
console.log(new Array()); // [] (new演算子でコンストラクタとして呼び出すと、配列が作成された) 
console.log(Array()); // [] (関数として呼び出すと、配列が作成された)
console.log(typeof Array); // 'function' (Array自体は関数である)
```
ちなみに、Arrayの場合は、上記の通り関数呼び出しでもコンストラクタ呼び出しでも動作結果は変わりませんが、Array以外のコンストラクタにおいても必ず当てはまるわけではありません。たとえば、`Date()`では文字列が作成されますが、`new Date()`だとオブジェクトが作成されることが確認できます。

#### 引数による動作の違い
```js
console.log(new Array()); // [] 
console.log(new Array(10)); // [empty × 10]
console.log(new Array(0, 1)); // [0, 1]
console.log(new Array("a")); // ['a']
```
Arrayが呼び出されたときの内部的なアルゴリズムは[23.1.1.1 Array ( ...values )](https://tc39.es/ecma262/#sec-array)にて定義されており、引数による動作の違いも細かく書かれています。

#### クラス定義での使用
```js
class CustomArray extends Array {
  // コンストラクタを定義し、親クラスのコンストラクタを呼び出します
  constructor(...args) {
    super(...args); // Arrayコンストラクタを呼び出し、引数を渡します
  }

  // 新しいメソッドを追加します
  customMethod() {
    return this.map(element => element * 2); // 配列の各要素を2倍にする例
  }
}

// CustomArrayのインスタンスを作成します
const myArray = new CustomArray(1, 2, 3, 4);

console.log(myArray); // [1, 2, 3, 4]
console.log(myArray.length); // 4 (Arrayの動作を継承しているので、lengthプロパティが使える)
console.log(myArray.customMethod()); // [2, 4, 6, 8]
```

## ArrayはObjectを継承している

Arrayはオブジェクトの一種であることは先程確認できましたが、このことについて深堀りしていきます。  
Arrayコンストラクタのプロパティに[Array.prototype](https://tc39.es/ecma262/#sec-array.prototype)があります。  
[23.1.3 Properties of the Array Prototype Object](https://tc39.es/ecma262/#sec-properties-of-the-array-prototype-object)では、Array.prototypeのプロトタイプがObject.prototypeであると記述されています。

```js
const arr = []
// arrのプロトタイプオブジェクトはArray.prototype
console.log(Object.getPrototypeOf(arr) === Array.prototype); // true
// Array.prototypeプロトタイプオブジェクトはObject.prototype
console.log(Object.getPrototypeOf(Array.prototype) === Object.prototype); // true

// 非推奨メソッドだが、__proto__で調べることも可能
console.log(arr.__proto__ === Array.prototype);  // true
console.log(arr.__proto__.__proto__ === Object.prototype); // true
console.log(arr.__proto__.__proto__.__proto__ === null);  // true （Objectの最上位）

// instanceof演算子で確認
console.log(arr instanceof Array);  // true （Arrayのインスタンス）
console.log(arr instanceof Object); // true （Objectのインスタンス）

// Object.prototypeのプロパティが使えることを確認
console.log("toString" in Object.prototype) // true (toStringメソッドはObject.prototypeのプロパティ)
console.log(arr.toString()) // "" (toStringメソッドを使える)
```

配列オブジェクトarrはArray.prototypeを継承していますが、Array.prototypeはObject.prototypeを継承していることが確認できました。つまり、すべての配列オブジェクトはObjectを継承しているので、Array.prototypeのプロパティ（lengthやpopなど）だけでなく、Object.prototypeのプロパティ（toStringなど）も使用することが可能です。

### 配列オブジェクトには配列の要素以外のプロパティを設定できる

JavaScriptにおける配列はオブジェクトであるため、配列の要素以外のプロパティを設定できるという変わった特徴があります。  
先述の通り、配列オブジェクトには配列インデックスプロパティ(例：0, 1)やlengthプロパティという特殊なプロパティがあるので、exotic object(特殊なオブジェクト)として定義されていました。ですが、ordinary object（通常のオブジェクト）であるObjectを継承しているため、通常のオブジェクトとしての動作させることも可能です。

```js
const arr = [0, 1]
arr["description"] = "これは配列です。"
arr["print"] = function() {
   this.forEach(item => console.log(item))
}

console.log(arr) // [0, 1, description: 'これは配列です。', print: ƒ]
console.log(arr.length) // 2 (lengthには影響していない)
console.log(arr["description"]) // "これは配列です。"
arr.print() 
// 0
// 1
```

上記の通り、配列オブジェクトarrにdescriptionプロパティとprintプロパティが追加できることを確認しました。この二つの新しいプロパティは、配列の要素には該当しないため、lengthには影響していません。  
上記のように、メタデータのプロパティを持たせたり、独自のメソッドを組み込むといったことが可能になります。  

では、pushプロパティやforEachプロパティを設定してみたらどうなるのでしょうか？
```js
const arr = [0, 1]
arr["push"] = () => {}
arr["forEach"] = null

console.log(arr.push) // () => {}
arr.push(4)
console.log(arr.length) // 2 (pushプロパティを空の関数にしたので、lengthは変化しない)
arr.forEach(item => console.log(item)) // arr.forEach is not a function (通常のforEachの使い方ができない)
console.log(arr.forEach) // null
```
この通り、新たに設定したpush, forEachプロパティが上書きされ、本来の使いかたができなくなってしまいました。

## 配列のようなオブジェクトを実装してみる

「配列」という独立したデータ型は存在せず、配列は`Object`の一種として実装されています。インデックスプロパティ(例：0, 1)やlengthプロパティという特殊なプロパティが存在し、pushやpopといった特殊なメソッドが用意されているというだけで、根本的にはオブジェクトです。したがって、JavaScriptで配列を取り扱う場合、絶対にArrayオブジェクトを利用しなければならないというわけではありません。  
通常のオブジェクトを工夫して、配列のように振る舞わせることも理論的には可能なはずです。もちろん、実務でそんなことをするメリットは基本的に全くないですし、言語側で用意してくれている仕組みを利用するので何の問題もありません。今回は実験的に、言語側で用意しているArrayを使わず、通常のオブジェクトで配列のようなオブジェクトを簡単に実装してみます。

```javascript
// 配列のようなオブジェクトを作成
const arrayLike = {
  0: "a",
  1: "b",
  2: "c",
  length: 3,
  push: function (item) {
    this[this.length] = item;
    this.length++;
  },
  pop: function () {
    if (this.length === 0) return undefined;
    const lastItem = this[this.length - 1];
    delete this[this.length - 1];
    this.length--;
    return lastItem;
  },
}

// 初期状態
console.log(arrayLike); // {0: 'a', 1: 'b', 2: 'c', length: 3, push: ƒ, pop: ƒ}

// pushメソッドの使用
arrayLike.push("d");
console.log(arrayLike); // {0: 'a', 1: 'b', 2: 'c', 3: 'd', length: 4, push: ƒ, pop: ƒ}

// popメソッドの使用
console.log(arrayLike.pop()); // "d"
console.log(arrayLike); // {0: 'a', 1: 'b', 2: 'c', length: 3, push: ƒ, pop: ƒ}
```
