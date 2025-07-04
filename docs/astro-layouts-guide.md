# Astro Layouts 構造分析ガイド

## 📖 このドキュメントについて

このドキュメントは、Astroの知識がないフロントエンド開発者向けに、当プロジェクトの`layouts`ディレクトリの構造と動作原理を詳しく解説します。

## 🎯 Astroの基礎知識

### Astroとは？
Astroは、コンテンツ重視のWebサイト（ブログ、マーケティングサイト、eコマースなど）を構築するためのWebフレームワークです。

### 重要な概念：実行タイミング

#### 1. ビルド時実行（Build-time）
```astro
---
// このコードはビルド時にのみ実行される
const posts = await fetchPosts()
const currentDate = new Date()
console.log("ビルド時にのみ表示される") // サーバーのコンソールに表示
---
```

#### 2. クライアント時実行（Client-side）
```astro
<script>
  // このコードはブラウザで実行される
  console.log("ブラウザのコンソールに表示される")
  document.addEventListener('click', () => {
    // ユーザーのインタラクション処理
  })
</script>
```

### コンポーネント構文の基本
```astro
---
// フロントマター（ビルド時実行）
import SomeComponent from './Component.astro'
const data = "サーバーサイドで処理"
---

<!-- テンプレート部分 -->
<div>
  <SomeComponent />
  <p>{data}</p>
</div>

<script>
  // クライアントサイドスクリプト
</script>

<style>
  /* スタイル */
</style>
```

## 🏗️ Layouts ディレクトリ構造

```
src/layouts/
├── BaseLayout.astro      # 基本レイアウト（全ページ共通）
└── BlogPost.astro        # ブログ記事専用レイアウト
```

## 📄 BaseLayout.astro 詳細分析

### 全体構造
```astro
---
// 1. インポート（ビルド時）
import BaseHead from '@/components/BaseHead'
import Header from '@/components/Header'
// ... その他のコンポーネント

// 2. Props定義（ビルド時）
const { title, description, image, articleDate } = Astro.props
---

<!-- 3. HTMLテンプレート -->
<html>
  <head>
    <!-- メタデータ、CSS、フォントなど -->
  </head>
  <body>
    <!-- レイアウト構造 -->
  </body>
</html>
```

### 実行タイミングの詳細

#### ビルド時実行部分
```astro
---
// ✅ ビルド時に実行される
import BaseHead from '@/components/BaseHead'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProviderTheme from '@/components/ProviderTheme'
import ProviderAnimations from '@/components/ProviderAnimations'
import TwSizeIndicator from '@/components/TwSizeIndicator'
import EditBlog from '@/components/editBlog'

// Props の受け取り（ビルド時）
const { title, description, image, articleDate } = Astro.props
---
```

**重要なポイント：**
- インポート文はビルド時に解決される
- `Astro.props`はビルド時に利用可能
- このセクションのコードはクライアントに送信されない

#### HTML生成部分
```astro
<html lang='en' class='scroll-smooth'>
  <head>
    <!-- ビルド時に各コンポーネントが展開される -->
    <BaseHead title={title} description={description} ogImage={image} articleDate={articleDate} />
    <ProviderTheme />
    <ProviderAnimations />
  </head>

  <body class='bg-white text-stone-950 dark:bg-[#0a0910] dark:text-white'>
    <main class='px-5 sm:mx-auto sm:max-w-2xl sm:px-8 lg:px-0 antialiased md:max-w-6xl grid gap-12 mt-4 overflow-hidden md:overflow-visible'>
      <Header />
      <slot /> <!-- 子コンテンツが挿入される -->
      <Footer />
    </main>
    <TwSizeIndicator />
    <EditBlog />
  </body>
</html>
```

### コンポーネントの役割

#### 1. BaseHead
- **実行タイミング**: ビルド時
- **役割**: メタタグ、CSS、フォントの読み込み
- **Props**: `title`, `description`, `ogImage`, `articleDate`

#### 2. ProviderTheme & ProviderAnimations
- **実行タイミング**: ビルド時（HTML生成）+ クライアント時（JS実行）
- **役割**: テーマ切り替えとアニメーションの設定

#### 3. Header & Footer
- **実行タイミング**: ビルド時（構造生成）+ クライアント時（インタラクション）
- **役割**: ナビゲーションとサイト情報

#### 4. slot要素
```astro
<slot />
```
- Astroの特殊要素
- 子コンポーネントのコンテンツがここに挿入される
- Reactの`{children}`に相当

### CSS とスタイリング

#### インラインスタイル（ビルド時処理）
```astro
<style>
  body {
    margin-left: calc(100vw - 100%); /* prevent layout shift */
  }
</style>
```

#### Tailwind CSS クラス（ビルド時処理）
```astro
<body class='bg-white text-stone-950 dark:bg-[#0a0910] dark:text-white'>
```

**重要なポイント：**
- Tailwind クラスはビルド時にCSSに変換される
- `dark:`プレフィックスはダークモード用スタイル

## 📝 BlogPost.astro 詳細分析

### レイアウトの継承構造
```astro
---
// TypeScript型定義（ビルド時）
import type { CollectionEntry } from 'astro:content'
import type { MarkdownHeading } from 'astro'

// BaseLayoutを継承
import BaseLayout from '@/layouts/BaseLayout'

// Props型定義
type Props = {
  id: CollectionEntry<'blog'>['id']
  data: CollectionEntry<'blog'>['data']
  headings: MarkdownHeading[]
  readTime: string
}

// Props受け取り（ビルド時）
const { data, readTime, headings, id } = Astro.props
const { title, description, pubDate, heroImage, tags } = data

// 日付フォーマット（ビルド時）
const articleDate = pubDate.toISOString()
---
```

### レイアウトの使用方法
```astro
<BaseLayout
  title={title}
  description={description}
  image={heroImage?.src}
  articleDate={articleDate}
>
  <!-- ここのコンテンツがBaseLayoutの<slot />に挿入される -->
  <article>
    <header>
      <!-- 記事のヘッダー情報 -->
    </header>
    
    <!-- ヒーロー画像（条件付きレンダリング） -->
    {heroImage && (
      <Image
        src={heroImage}
        width={1000}
        height={500}
        quality={100}
        format='jpg'
        loading='eager'
        class='rounded-md w-full max-h-[300px] md:max-h-[500px] my-8 object-cover'
        alt={`img of ${title}`}
      />
    )}
    
    <div>
      <slot /> <!-- ブログ記事のMarkdownコンテンツ -->
    </div>
  </article>
</BaseLayout>
```

### クライアントサイドスクリプト

```astro
<script>
  // ✅ クライアント（ブラウザ）で実行される
  const fnObserver = () => {
    function handleIntersection(entries, observer) {
      // 見出しの表示状態を監視
      entries.forEach((entry) => {
        const index = document.querySelector(`aside a[href="#${entry.target.id}"]`)
        
        if (entry.isIntersecting) {
          // アクティブな見出しのスタイル変更
          index?.classList.remove('bg-slate-200', 'dark:bg-slate-800')
          index?.classList.add('bg-indigo-600', 'dark:bg-indigo-700', 'text-white', 'font-bold')
        } else {
          // 非アクティブな見出しのスタイル変更
          index?.classList.add('bg-slate-200', 'dark:bg-slate-800')
          index?.classList.remove('bg-indigo-600', 'dark:bg-indigo-700', 'text-white', 'font-bold')
        }
      })
    }

    // Intersection Observer の設定
    const headings = document.querySelectorAll('div.prose h1, div.prose h2, div.prose h3, div.prose h4, div.prose h5, div.prose h6')
    const options = {
      root: null,
      rootMargin: ' 15% 0px 0% 0px ',
      threshold: 1
    }

    const observer = new IntersectionObserver(handleIntersection, options)
    headings.forEach((heading) => observer.observe(heading))
  }

  // 初期実行
  fnObserver()
  
  // Astroのページ遷移後にも実行
  document.addEventListener('astro:after-swap', fnObserver)
</script>
```

**重要なポイント：**
- `<script>`内のコードはクライアントで実行される
- `astro:after-swap`はAstroのビューTransition API用のイベント
- Intersection Observer APIを使って目次の現在位置を追跡

## 🔄 レイアウトの使用パターン

### 1. 基本ページでの使用
```astro
---
// src/pages/index.astro
import BaseLayout from '@/layouts/BaseLayout.astro'
---

<BaseLayout title="ホーム" description="サイトのホームページ">
  <h1>ウェルカム</h1>
  <p>サイトのコンテンツ</p>
</BaseLayout>
```

### 2. ブログ記事での使用
```astro
---
// src/pages/post/[...slug].astro
import BlogPost from '@/layouts/BlogPost.astro'
---

<BlogPost {id} {data} {headings} {readTime}>
  <!-- Markdownで書かれた記事内容 -->
</BlogPost>
```

## 🎨 スタイリング戦略

### 1. グローバルスタイル
- `src/styles/global.css`がBaseHeadでインポート
- ビルド時にバンドルされる

### 2. Tailwind CSS
- ユーティリティファーストアプローチ
- ビルド時に使用されたクラスのみCSSが生成される

### 3. コンポーネントスコープスタイル
```astro
<style>
  /* このスタイルはこのコンポーネントにのみ適用 */
  .my-component {
    color: blue;
  }
</style>
```

## 🚀 パフォーマンスの考慮事項

### 1. ビルド時最適化
- 未使用のJavaScriptは出力されない
- CSS は使用されたもののみバンドル
- 画像は自動的に最適化される（Astro Image）

### 2. クライアント時最適化
- 必要な部分のみがハイドレーションされる
- View Transitionsでスムーズなページ遷移

### 3. SEO最適化
- サーバーサイドレンダリングによる高速な初期ロード
- メタタグの動的生成
- 構造化データの自動生成

## 📚 開発のベストプラクティス

### 1. レイアウトの階層化
```
BaseLayout（基本構造）
├── BlogPost（ブログ用）
├── LandingPage（ランディングページ用）
└── Documentation（ドキュメント用）
```

### 2. Props型定義
```typescript
// TypeScriptを使用してProps型を明確に定義
interface Props {
  title: string
  description?: string
  image?: string
}
```

### 3. コンポーネントの分離
- レイアウト = 全体構造
- コンポーネント = 再利用可能な部品
- ページ = 具体的なコンテンツ

## 🔧 トラブルシューティング

### よくある問題

#### 1. スタイルが適用されない
- Tailwindクラスのタイポチェック
- `global.css`のインポート確認
- ビルド後の確認

#### 2. JavaScriptが動作しない
- `<script>`タグがクライアント実行用か確認
- コンソールエラーの確認
- DOMの準備完了を待つ

#### 3. レイアウトが崩れる
- Flexbox/Gridの設定確認
- レスポンシブブレークポイントの確認
- オーバーフローの設定確認

## 📊 まとめ

このプロジェクトのレイアウト構造は以下の特徴があります：

1. **明確な責任分離**: BaseLayoutは共通構造、BlogPostは記事特化
2. **型安全性**: TypeScriptによる型定義
3. **パフォーマンス重視**: ビルド時最適化とクライアント時の必要最小限の実行
4. **SEO対応**: メタタグとstructured dataの自動生成
5. **アクセシビリティ**: セマンティックなHTML構造

Astroの「ビルド時実行」と「クライアント時実行」の概念を理解することで、効率的で高性能なWebサイトを構築できます。
