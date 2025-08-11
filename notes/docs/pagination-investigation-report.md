# ページネーション機能の現状調査と導入方法レポート

## 現状分析

### 1. 既存のページネーション関連ファイル

#### `src/components/Pagination.astro`
- **状況**: ✅ 既に存在
- **機能**: 前ページ・次ページのナビゲーション機能を持つコンポーネント
- **実装内容**:
  - ArrowLeft、ArrowRightアイコンを使用した前後ナビゲーション
  - `page.start > 0` で前ページボタンの表示制御
  - `page.currentPage < page.lastPage` で次ページボタンの表示制御
  - ダークモード対応済み

#### サイト設定（`src/data/site.config.ts`）
- **paginationSize**: 6（1ページあたりの記事数設定済み）

#### 国際化対応（`src/i18n/ui.ts`）
- **pagination.prev**: 前ページ・Previous
- **pagination.next**: 次ページ・Next
- 翻訳設定済み

### 2. 現在のページ構成と記事表示方法

#### トップページ (`src/pages/[lang]/index.astro`)
- **現状**: ❌ ページネーション未実装
- **記事取得**: `MAX_POSTS = 5` で固定数表示
- **表示**: `ListPostsSimple` コンポーネントで記事一覧表示

#### タグページ (`src/pages/[lang]/tags/[...tag]/index.astro`)
- **現状**: ❌ ページネーション未実装
- **記事取得**: `getPostByTag()` で全記事取得
- **表示**: `ListPostsSimple` コンポーネントで記事一覧表示

#### タグ一覧ページ (`src/pages/[lang]/tags/index.astro`)
- **現状**: ✅ ページネーション不要（タグ一覧のため）

### 3. 実装されていない理由

現在の実装では、Astroの **`paginate`** 関数が使用されていません。
- トップページ: 最新5件のみ表示
- タグページ: 該当記事を全て表示

## ページネーション導入方法

### 1. Astroのpaginate機能について

Astroでは、`getStaticPaths()`内で`paginate()`関数を使用してページネーションを実装します。

#### 基本的な実装パターン:
```typescript
export async function getStaticPaths({ paginate }) {
  const posts = await getPosts();
  
  return paginate(posts, {
    pageSize: 6
  });
}
```

### 2. 必要な修正ファイル

#### A. トップページの修正 (`src/pages/[lang]/index.astro`)
**修正前**:
```typescript
export async function getStaticPaths() {
  return [{ params: { lang: 'ja' } }, { params: { lang: 'en' } }]
}

const MAX_POSTS = 5 // 固定値
const posts = await getPosts(lang as Languages, MAX_POSTS)
```

**修正後**:
```typescript
export async function getStaticPaths({ paginate }) {
  const allPosts = await getCollection('blog')
  const jaPage = allPosts.filter(({ id }) => id.startsWith('ja/'))
  const enPage = allPosts.filter(({ id }) => id.startsWith('en/'))
  
  return [
    ...paginate(jaPage, { params: { lang: 'ja' }, pageSize: siteConfig.paginationSize }),
    ...paginate(enPage, { params: { lang: 'en' }, pageSize: siteConfig.paginationSize })
  ]
}
```

#### B. タグページの修正 (`src/pages/[lang]/tags/[...tag]/index.astro`)
**現在の課題**:
- 動的ルート `[...tag]` とpaginate機能の併用が複雑
- タグごと、言語ごとにページネーションが必要

**解決方法**:
新しいルート構造の提案: `/[lang]/tags/[tag]/[...page].astro`

#### C. ページネーション専用ページの新規作成
以下のファイルを新規作成する必要があります:

1. **`src/pages/[lang]/[...page].astro`** (トップページのページネーション用)
2. **`src/pages/[lang]/tags/[tag]/[...page].astro`** (タグページのページネーション用)

### 3. 実装手順

#### Phase 1: トップページのページネーション
1. `src/pages/[lang]/[...page].astro` を新規作成
2. `src/pages/[lang]/index.astro` を修正（1ページ目専用に）
3. 既存の `Pagination.astro` コンポーネントを活用

#### Phase 2: タグページのページネーション
1. 現在の `src/pages/[lang]/tags/[...tag]/index.astro` を修正
2. ページネーション用ルートの実装
3. URL構造の調整 (`/tags/vue/2` など)

### 4. URL構造の変更

#### 現在:
- トップページ: `/ja/`, `/en/`
- タグページ: `/ja/tags/vue/`, `/en/tags/vue/`

#### 変更後:
- トップページ: `/ja/`, `/ja/2/`, `/ja/3/`, ...
- タグページ: `/ja/tags/vue/`, `/ja/tags/vue/2/`, `/ja/tags/vue/3/`, ...

### 5. 課題と注意点

#### A. SEO関連
- canonical URLの適切な設定
- ページ番号のインデックス制御
- `<link rel="prev">` / `<link rel="next">` の実装

#### B. UX関連
- 既存URLからのリダイレクト対応
- ページ番号表示（1, 2, 3, ... の数字ナビゲーション）
- "全X件中Y-Z件目"などの情報表示

#### C. パフォーマンス
- 静的生成時のビルド時間増加
- 多言語対応による生成ページ数の増加

## 推奨実装プラン

### 優先度 High: トップページのページネーション
1. **影響範囲**: 限定的
2. **実装難易度**: 中
3. **ユーザー価値**: 高

### 優先度 Medium: タグページのページネーション  
1. **影響範囲**: 中程度（URL構造変更あり）
2. **実装難易度**: 高
3. **ユーザー価値**: 中

## 次のアクション

1. **Phase 1の実装開始**: トップページのページネーション
2. **テスト環境での動作確認**
3. **SEO影響の検証**
4. **Phase 2の詳細設計**

---

**作成日**: 2025年8月11日  
**調査者**: GitHub Copilot
