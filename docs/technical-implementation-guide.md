# 技術的実装詳細ガイド

## 🏗️ プロジェクト構造深堀り

### Content Collections システム

#### スキーマ定義 (`src/content/config.ts`)
```typescript
// ブログ記事のデータ構造定義
const blog = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string().max(80),      // SEO最適化を考慮した文字数制限
      description: z.string(),        // メタディスクリプション
      pubDate: z.string().or(z.date()).transform((val) => new Date(val)),
      heroImage: image(),             // Astro最適化画像
      category: z.enum(CATEGORIES),   // 事前定義カテゴリのみ許可
      tags: z.array(z.string()),      // 柔軟なタグシステム
      draft: z.boolean().default(false) // 下書き機能
    })
})
```

#### コンテンツファイル構造
```
src/content/blog/
├── astro.mdx              # Astroチュートリアル記事
├── macbook.mdx            # 製品レビュー記事
├── create-astro-component.mdx  # 技術解説記事
└── [その他のMDXファイル]
```

### ユーティリティ関数システム

#### ポスト取得機能 (`src/utils/post.ts`)
```typescript
// 公開記事のみを日付順で取得
export const getPosts = async (max?: number) => {
  return (await getCollection('blog'))
    .filter((post) => !post.data.draft)        // 下書きを除外
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()) // 新着順
    .slice(0, max)                             // 任意の件数制限
}

// カテゴリ別フィルタリング
export const filterPostsByCategory = async (category: string) => {
  const posts = await getPosts()
  return posts.filter((post) => post.data.category === category)
}

// タグによる記事検索
export const getPostByTag = async (tag: string) => {
  const posts = await getPosts()
  const lowercaseTag = tag.toLowerCase()
  return posts.filter((post) => {
    return post.data.tags.some((postTag) => postTag.toLowerCase() === lowercaseTag)
  })
}
```

#### スラッグ化ユーティリティ (`src/utils/sluglify.ts`)
```typescript
// URL安全な文字列への変換
export function sluglify(text: string): string {
  return text
    .toString()
    .normalize('NFD')                    // Unicode正規化
    .replace(/[\u0300-\u036f]/g, '')     // アクセント除去
    .toLowerCase()                       // 小文字化
    .trim()                             // 前後空白除去
    .replace(/\s+/g, '-')               // スペースをハイフンに
    .replace(/[^\w\-]+/g, '')           // 英数字とハイフンのみ
    .replace(/\-\-+/g, '-')             // 連続ハイフンを単一に
}
```

## 🎨 スタイリングシステム

### Tailwind CSS設定 (`tailwind.config.cjs`)
```javascript
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',  // クラスベースのダークモード
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            // @tailwindcss/typography カスタマイズ
            maxWidth: 'none',
            color: 'inherit',
            a: { color: 'inherit' }
          }
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),  // 記事本文の美しいタイポグラフィ
  ]
}
```

### CSS Architecture
```
src/styles/
└── global.css          # グローバルスタイル定義
    ├── Tailwind directives
    ├── カスタムCSSプロパティ
    └── ダークモード対応
```

## 🔍 検索システム (Pagefind)

### 実装の仕組み
1. **ビルド時インデックス生成**: `pagefind --site dist`
2. **クライアントサイド検索**: JavaScriptベースの高速検索
3. **多言語対応**: 日本語コンテンツに最適化

### 検索コンポーネント (`src/components/Search.astro`)
```astro
---
// 検索UIの実装
---
<div id="search">
  <!-- Pagefindが自動的にレンダリング -->
</div>

<script>
  import { PagefindUI } from '@pagefind/default-ui'
  
  // 検索UIの初期化
  new PagefindUI({ 
    element: "#search",
    showSubResults: true,    // サブ結果表示
    excerptLength: 200       // 抜粋文字数
  })
</script>
```

## 🔧 開発ツールチェーン

### ESLint設定 (`.eslintrc.cjs`)
```javascript
module.exports = {
  extends: ['plugin:astro/recommended'],           // Astro専用ルール
  parser: '@typescript-eslint/parser',             // TypeScript対応
  overrides: [
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',               // .astroファイル専用パーサー
      rules: {
        'astro/no-set-html-directive': 'error'     // セキュリティルール
      }
    }
  ]
}
```

### Prettier設定 (`prettier.config.cjs`)
```javascript
module.exports = {
  plugins: [
    'prettier-plugin-astro',                      // .astroファイル対応
  ],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',                          // Astro専用パーサー
      },
    },
  ],
}
```

## 📱 レスポンシブデザイン

### ブレークポイント戦略
```css
/* Tailwind CSS ブレークポイント */
sm: 640px   /* スマートフォン（縦向き）*/
md: 768px   /* タブレット */
lg: 1024px  /* ラップトップ */
xl: 1280px  /* デスクトップ */
2xl: 1536px /* 大型ディスプレイ */
```

### グリッドレイアウト実装
```astro
<!-- BaseLayout.astro のメインコンテナ -->
<main class="
  px-5                    /* モバイル: 20px左右パディング */
  sm:mx-auto sm:max-w-2xl sm:px-8  /* タブレット: 中央寄せ + 最大幅 */
  md:max-w-6xl           /* デスクトップ: より大きな最大幅 */
  lg:px-0                /* 大画面: パディング除去 */
  grid gap-12 mt-4       /* CSS Grid レイアウト */
">
```

## 🚀 パフォーマンス最適化

### 画像最適化
```typescript
// astro.config.mjs での画像設定
export default defineConfig({
  image: {
    domains: ['example.com'],           // 外部画像ドメイン許可
    formats: ['webp', 'avif'],          // 最新フォーマット対応
  }
})
```

### バンドル最適化
```javascript
// Vite設定によるチャンク分割
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        vendor: ['motion'],             // サードパーティライブラリ分離
        components: ['./src/components'] // コンポーネント分離
      }
    }
  }
}
```

## 🔐 セキュリティ考慮事項

### Content Security Policy
```html
<!-- BaseHead.astro -->
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self' 'unsafe-inline';">
```

### XSS対策
```astro
<!-- HTMLエスケープの自動適用 -->
<p>{userInput}</p>  <!-- 自動的にエスケープされる -->

<!-- 意図的な生HTML挿入（注意が必要） -->
<div set:html={trustedHtmlContent} />
```

## 📊 アナリティクス統合

### Google Analytics 4 実装例
```astro
---
// BaseHead.astro
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'
---

<!-- Google Analytics -->
{GA_MEASUREMENT_ID && (
  <>
    <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}></script>
    <script is:inline define:vars={{ GA_MEASUREMENT_ID }}>
      window.dataLayer = window.dataLayer || [];
      function gtag() { dataLayer.push(arguments); }
      gtag('js', new Date());
      gtag('config', GA_MEASUREMENT_ID);
    </script>
  </>
)}
```

## 🔄 CI/CD パイプライン

### GitHub Actions設定例
```yaml
name: Deploy to Netlify
on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install Bun
        run: curl -fsSL https://bun.sh/install | bash
      
      - name: Install dependencies
        run: bun install
      
      - name: Build
        run: bun run build
      
      - name: Deploy to Netlify
        uses: netlify/actions/cli@master
        with:
          args: deploy --prod --dir=dist
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

---

この技術詳細ガイドにより、プロジェクトの内部構造と実装パターンを深く理解できるはずです。
