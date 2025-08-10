---
description:  連載「どうしてもVue.jsが分からないので森の博士の研究所に押しかけてみたら、人生が激変した子タヌキの話」\nフロントエンドエンジニアを夢見る子タヌキ・ポン吉が、森の奥の研究所で天才博士と出会い、Vue.jsの不思議な世界に飛び込む！
pubDate: 2025-08-06T12:00:00.000Z
recommended: false
tags:
  - tags.tech.vue
  - tags.character.ponkichi
  - tags.series.ponkichi-to-vue
  - tags.genre.tech-light-novel
title: 第10話 「SetupとComposition API」
---

## どうしてもVue.jsが分からないので森の博士の研究所に押しかけてみたら、人生が激変した子タヌキの話

### 注

この物語は、フロントエンド技術を楽しく学ぶことを目的に、生成AIを活用して執筆されています。
技術的な情報の正確性には細心の注意を払っていますが、その内容がすべて真実であることを保証するものではありません。
あくまで学習の補助ツールとして、肩の力を抜いてお楽しみください。

---

### 登場人物紹介

*   **フロントエンド博士**: 森の奥の研究所に住む、フロントエンドのことなら何でも知っている物知り博士。ポン吉の素朴な疑問にいつも優しく（そして面白おかしく）答えてくれる。
*   **ポン吉**: 好奇心旺盛な子タヌキ。将来の夢はフロントエンドエンジニア。最近Vue.jsを学び始めたが、その奥深さに興味津々。新しい知識をゲットすると、思わず「ポン！」と飛び跳ねる特技あり。

---

### 第10話🦝「SetupとComposition API」

`Props`の型安全性を学んだポン吉。今日は、博士が「Vue 3の心臓部」と呼んだ`setup`関数の謎に迫る。

**ポン吉**: 「博士！`setup`関数について教えてください！前回、`props`を引数に取っていましたけど、あれは何をしているんですか？」

**博士**: 「うむ。`setup`関数は、Vue 3から導入された『Composition API』という新しいコンポーネントの書き方の中心となる場所じゃ。まずは、Composition APIがなぜ生まれたかを知るのが良いじゃろう。」

博士は、Options APIで書かれたコンポーネントを表示した。

```typescript
// Options API（従来の書き方）
export default defineComponent({
  data() {
    return {
      count: 0
    }
  },
  computed: {
    doubleCount() {
      return this.count * 2
    }
  },
  methods: {
    increment() {
      this.count++
    }
  }
})
```

**博士**: 「従来のOptions APIでは、`data`はここに、`methods`はここに、`computed`はここにと、機能の種類ごとに関連するコードがバラバラに配置されておった。小さなコンポーネントなら良いが、大きくなると、一つの機能に関するロジックがファイルのあちこちに散らばってしまい、見通しが悪くなるという問題があったんじゃ。」

**ポン吉**: 「確かに...。『このボタンの処理はどこに書いてあるんだろう？』って、あちこち探さないといけなくなりそうですね。」

**博士**: 「その通りじゃ。そこで登場したのがComposition APIじゃ。これは、機能ごとに関連するコードを一つの場所にまとめて書くことができる、新しいスタイルなんじゃよ。そして、そのための舞台となるのが`setup`関数なんじゃ。」

博士は、`setup`関数を使ったカウンターコンポーネントの例を示した。

```typescript
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  setup() {
    // 1. リアクティブな状態の定義
    const count = ref(0) // ref()で包むとリアクティブになる

    // 2. 状態を更新するメソッドの定義
    function increment() {
      count.value++
    }

    // 3. 状態から派生する値の定義
    const doubleCount = computed(() => count.value * 2)

    // 4. テンプレートに公開するものを返す
    return {
      count,
      increment,
      doubleCount
    }
  }
})
```

**ポン吉**: 「わあ！`data`や`methods`がない！代わりに、`setup`関数の中に、カウンターに関するものが全部まとまっています！`ref`とか`computed`っていう新しい関数もありますね。」

**博士**: 「そうじゃな。`ref`はリアクティブなデータを作るための関数じゃ。そして、`setup`関数から返されたオブジェクトのプロパティが、コンポーネントのテンプレートで使えるようになる。」

**ポン吉**: 「なるほど！Options APIみたいに、あちこちに書かなくても、関連するコードが`setup`の中に全部あるから、すごく分かりやすいです！ポン！」

**博士**: 「うむ。これがComposition APIの大きな利点じゃ。そして、ここで7つのパラメータの二番目、`RawBindings`が関わってくる。」

**ポン吉**: 「`RawBindings`...！どういうことですか？」

**博士**: 「`RawBindings`は、この`setup`関数が返すオブジェクトの『型』を定義するパラメータなんじゃ。この例で言えば、`{ count: Ref<number>, increment: () => void, doubleCount: ComputedRef<number> }`のような型が、`RawBindings`として推論される。」

**博士**: 「この型情報があるから、TypeScriptは`setup`から返されたものが何であるかを正確に把握し、テンプレート内での型チェックや、`this`の型推論をより強力に行うことができるんじゃよ。」

ポン吉は、`setup`関数がただの新しい書き方というだけでなく、TypeScriptと連携して、より堅牢で分かりやすいコードを書くための強力な仕組みであることを理解した。

**ポン吉**: 「`setup`とComposition API、そして`RawBindings`。全部がつながって、安全で整理されたコンポーネントが作れるんですね！」

**博士**: 「その通りじゃ！しかし、ポン吉よ。毎回`defineComponent`と`setup`を書いて、最後に`return`するのは、少し面倒だと思わんか？」

**ポン吉**: 「え...？あ、はい、少し...。」

**博士**: 「ふふふ。実は、Vueにはもっとシンプルに書ける、さらなる魔法があるんじゃ。次回は、その魔法の呪文`<script setup>`と、型推論の不思議な力について見ていこう。」

**ポン吉**: 「ええっ！もっと簡単になるんですか！？楽しみです！」

---

### **🌟 今日のまとめ**

- **Composition API** は、機能ごとに関連コードをまとめるための新しい書き方。
- **`setup`** 関数は、Composition APIの処理を記述する中心的な場所。
- **`ref`** を使うと、リアクティブなデータを作成できる。
- `setup`から返されたオブジェクトが、テンプレートで使用可能になる。
- 7つのパラメータの一つ、**`RawBindings`** は、`setup`が返すオブジェクトの型を定義する。

### **次回予告　「型推論の不思議な力」**  
`defineComponent`も`setup`も`return`も不要になる魔法の呪文、`<script setup>`が登場！なぜ、あれだけで全てがうまくいくのか？TypeScriptの「型推論」の強力なパワーに迫ります！

###  👨‍🏫 博士からの補足

ポン吉は今回、`count.value++`という書き方に少し戸惑っていたかもしれんな。「なぜ`count++`じゃダメなの？」と思った読者も多いじゃろう。

今回は少し難しい話になるが、この疑問の答えには、JavaScriptとVueの深い技術的な背景があるんじゃ。完全に理解できなくても大丈夫じゃから、「ふーん、そんな理由があるのか」程度に聞いてくれれば十分じゃよ。

実は、この`.value`は、JavaScriptという言語の根深い制約と、Vueが編み出した巧妙な解決策が生み出した、美しい「妥協の産物」なんじゃよ。

まず、リアクティビティ（値の変化を自動で検知する仕組み）を実現するには、「**値が変わった瞬間を捕まえる**」必要がある。Vue 2では`Object.defineProperty`を使っておった：

```javascript
// Vue 2のリアクティビティ（簡略化）
let data = {}
Object.defineProperty(data, 'count', {
  get() { 
    console.log('値が読み取られた！')
    return this._count 
  },
  set(newValue) { 
    console.log('値が変更された！', newValue)
    this._count = newValue
    // DOM 更新は キューイングされて次の tick でまとめて行われる
  }
})
```

じゃが、これには大きな問題があった。**新しいプロパティを後から追加できない**し、**配列のインデックス操作を検知できない**んじゃ。

Vue 3では、この問題を**Proxy**で解決した：

```javascript
// Vue 3のリアクティビティ（簡略化）
const reactive = (obj) => {
  return new Proxy(obj, {
    get(target, key) {
      console.log(`${key}が読み取られた！`)
      return target[key]
    },
    set(target, key, value) {
      console.log(`${key}が${value}に変更された！`)
      target[key] = value
      // DOMを更新
      return true
    }
  })
}
```

これで**オブジェクト**のリアクティビティは完璧になった。じゃが、ここで新たな問題が生まれる。

**プリミティブ値（数値、文字列、真偽値）はオブジェクトじゃない！**

```javascript
let count = 5  // これは数値、Proxyで包めない
count = 6      // この変更をどうやって検知する？
```

そこでVueが考えた解決策が、**プリミティブ値をオブジェクトで包む**ことじゃった：

```javascript
// ref()の本質（超簡略化）
function ref(value) {
  return reactive({
    value: value  // プリミティブ値をvalueプロパティに格納
  })
}

const count = ref(5)
// count は { value: 5 } のようなオブジェクト
// count.value = 6 とすることで、Proxyが変更を検知！
```

つまり、`count.value++`という書き方は、「**JavaScriptの制約を乗り越えるために、Vueが編み出した美しいハック**」なんじゃよ。

面白いことに、テンプレート内では`.value`を書く必要がない：

```vue
<template>
  <!-- .valueを書かなくて良い！ -->
  <div>{{ count }}</div>
</template>
```

これは、Vueのコンパイラが自動的に`.value`を補完してくれるからじゃ。つまり、開発者の書きやすさも考慮された、とても思いやりのある設計なんじゃな。

この`.value`という一見面倒な書き方の裏には、JavaScript言語の限界との戦い、パフォーマンスの追求、そして開発者体験への配慮が、すべて込められているんじゃよ。

---
*第10話 おわり*