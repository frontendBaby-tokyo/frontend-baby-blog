# Astroコンポーネント開発ガイド

## 📖 Astroコンポーネントの基本概念

Astroは **Component Islands** アーキテクチャを採用しており、従来のSPAとは異なるアプローチでWebサイトを構築します。

### 主要な特徴
- **静的優先**: デフォルトでは静的HTML生成
- **部分的なハイドレーション**: 必要な部分のみJavaScript実行
- **フレームワーク非依存**: React、Vue、Svelteなど複数フレームワーク対応

## 🧩 コンポーネント構造

### .astroファイルの構文
```astro
---
// Component Script (Frontmatter)
// サーバーサイドで実行されるTypeScript/JavaScript
import Component from './Component.astro'
import { getContent } from '@/utils'

const data = await getContent()
const title = "ページタイトル"
---

<!-- Component Template -->
<!-- HTMLテンプレート（JSX風の記法） -->
<div class="container">
  <h1>{title}</h1>
  <Component data={data} />
</div>

<style>
  /* Scoped CSS */
  .container {
    max-width: 1200px;
  }
</style>

<script>
  // Client-side JavaScript
  console.log('クライアントサイドで実行')
</script>
```

## 📁 既存コンポーネント分析

### レイアウトコンポーネント

#### `BaseLayout.astro`
- 全ページ共通のベースレイアウト
- HTML構造の基盤を提供
- テーマプロバイダーとアニメーションプロバイダーを含む

#### `BlogPost.astro`
- ブログ記事専用レイアウト
- 記事メタデータの表示
- 目次とシェア機能を統合

### UIコンポーネント

#### ナビゲーション系
- **Header.astro**: サイトヘッダー
- **Footer.astro**: サイトフッター
- **HeaderLink.astro**: ナビゲーションリンク

#### コンテンツ表示系
- **PostCard.astro**: ブログ記事カード
- **ListPosts.astro**: 記事一覧表示
- **ListRelatedPosts.astro**: 関連記事表示
- **Pagination.astro**: ページネーション

#### 機能系
- **Search.astro**: 検索機能
- **Share.astro**: SNSシェア
- **ToggleTheme.astro**: ダークモード切り替え
- **TableOfContents.astro**: 目次生成

#### ユーティリティ系
- **FormattedDate.astro**: 日付フォーマット
- **Category.astro**: カテゴリ表示
- **Tag.astro**: タグ表示

### アイコンコンポーネント
`/src/components/icons/` ディレクトリに各種SVGアイコンが整理されています。

## 🔧 コンポーネント開発のベストプラクティス

### 1. TypeScript活用
```astro
---
// Props型定義
interface Props {
  title: string
  description?: string
  image?: string
}

const { title, description, image } = Astro.props

// 型安全性の確保
const formattedTitle: string = title.toUpperCase()
---
```

### 2. 再利用可能な設計
```astro
---
// デフォルト値の設定
interface Props {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}

const { 
  variant = 'primary', 
  size = 'md' 
} = Astro.props
---

<button class={`btn btn-${variant} btn-${size}`}>
  <slot />
</button>
```

### 3. スタイルスコープ
```astro
<!-- 自動的にスコープされるCSS -->
<style>
  .container {
    /* このスタイルはこのコンポーネントのみに適用 */
  }
</style>

<!-- グローバルスタイル（必要な場合） -->
<style is:global>
  body {
    font-family: system-ui;
  }
</style>
```

### 4. クライアントサイドスクリプト
```astro
<!-- インタラクティブな機能 -->
<button id="toggle-btn">切り替え</button>

<script>
  document.getElementById('toggle-btn')?.addEventListener('click', () => {
    // クライアントサイドのロジック
  })
</script>
```

## 🚀 パフォーマンス最適化

### Islands Pattern
```astro
---
// 重いコンポーネントは必要な時のみロード
import HeavyComponent from './HeavyComponent.vue'
---

<!-- クライアントサイドでのみロード -->
<HeavyComponent client:load />

<!-- ビューポートに入った時にロード -->
<HeavyComponent client:visible />

<!-- アイドル時にロード -->
<HeavyComponent client:idle />
```

### 画像最適化
```astro
---
import { Image } from 'astro:assets'
import heroImage from '@/assets/images/hero.jpg'
---

<!-- 自動最適化される画像 -->
<Image 
  src={heroImage} 
  alt="Hero Image"
  width={800}
  height={400}
  loading="lazy"
/>
```

## 🔄 状態管理

### Astroでの状態管理
```astro
---
// サーバーサイドでの状態（ビルド時に決定）
const posts = await getCollection('blog')
const currentPage = Number(Astro.url.searchParams.get('page') || 1)
---

<!-- クライアントサイドでの状態管理 -->
<script>
  // 簡単な状態管理
  let theme = localStorage.getItem('theme') || 'light'
  
  function toggleTheme() {
    theme = theme === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', theme)
    document.documentElement.classList.toggle('dark')
  }
</script>
```

## 🧪 テスト戦略

### コンポーネントテストの考え方
1. **スタティックレンダリング**: HTMLの出力をテスト
2. **プロップス処理**: 正しいプロップスが渡されているかテスト
3. **スタイル適用**: CSS classが正しく適用されているかテスト

## 📚 学習パス

### 1. 基本概念の理解
- Astroの Islands アーキテクチャ
- コンポーネントライフサイクル
- 静的生成 vs サーバーサイドレンダリング

### 2. 実践的な開発
- 既存コンポーネントの読解と修正
- 新しいコンポーネントの作成
- Tailwind CSSでのスタイリング

### 3. 高度な機能
- Content Collections の活用
- MDXコンポーネントの作成
- パフォーマンス最適化

## 🔗 参考リソース

- [Astro Components Documentation](https://docs.astro.build/en/core-concepts/astro-components/)
- [Astro Component Tutorial](https://docs.astro.build/en/tutorial/2-pages/1/)
- [Component Props](https://docs.astro.build/en/core-concepts/astro-components/#component-props)

---

このガイドを参考に、Astroコンポーネントの理解を深めて効率的な開発を進めてください。
