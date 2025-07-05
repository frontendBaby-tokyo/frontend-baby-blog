# 翻訳未反映箇所の修正実装プラン

## 概要

このドキュメントは、`src/i18n/ui.ts`で定義されている翻訳が適切に反映されていない箇所を特定し、修正するための詳細な実装プランを記載しています。

## 調査結果

### 1. ハードコードされたテキストの問題

#### 1.1 メインページ（Priority: High）
**ファイル**: `src/pages/index.astro`
**問題箇所**: 23行目 "Latest Posts"
**既存翻訳キー**: `posts.latest`
```astro
<!-- 現在 -->
<h2 class='text-lg font-medium tracking-wide mb-4 text-gray-900 dark:text-white'>
    Latest Posts
</h2>

<!-- 修正後 -->
<h2 class='text-lg font-medium tracking-wide mb-4 text-gray-900 dark:text-white'>
    {t('posts.latest')}
</h2>
```

#### 1.2 ブログ投稿詳細ページ（Priority: High）
**ファイル**: `src/layouts/BlogPost.astro`
**問題箇所**: 33行目 "Published"
**既存翻訳キー**: `date.published`
```astro
<!-- 現在 -->
<p class='text-center text-sm text-opacity-50'>
    Published <FormattedDate date={pubDate} />
</p>

<!-- 修正後 -->
<p class='text-center text-sm text-opacity-50'>
    {t('date.published')} <FormattedDate date={pubDate} />
</p>
```

#### 1.3 投稿カード（Priority: Medium）
**ファイル**: `src/components/PostCard.astro`
**問題箇所**: 59行目 "Read Post"
**対応**: 新しい翻訳キー `posts.readPost` を追加
```astro
<!-- 現在 -->
Read Post <span>

<!-- 修正後 -->
{t('posts.readPost')} <span>
```

#### 1.4 フッター（Priority: Medium）
**ファイル**: `src/components/Footer.astro`
**問題箇所**: 9行目 "All rights reserved."
**既存翻訳キー**: `footer.copyright`
```astro
<!-- 現在 -->
&copy; {today.getFullYear()}
{siteConfig.author}. All rights reserved.

<!-- 修正後 -->
&copy; {today.getFullYear()}
{siteConfig.author}. {t('footer.copyright')}
```

#### 1.5 カテゴリコンポーネント（Priority: Medium）
**ファイル**: `src/components/Category.astro`
**問題箇所**: 4, 10, 14行目 "View All"
**既存翻訳キー**: `categories.all`
```astro
<!-- 現在 -->
const { name = 'View All', activeCategory } = Astro.props

<!-- 修正後 -->
const { name = t('categories.all'), activeCategory } = Astro.props
```

### 2. 日付フォーマットの多言語対応（Priority: High）

#### 2.1 FormattedDateコンポーネント
**ファイル**: `src/components/FormattedDate.astro`
**問題**: 英語固定の日付フォーマット
**修正**: 言語に応じた日付フォーマット

```astro
<!-- 現在 -->
{
    date.toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
}

<!-- 修正後 -->
{
    date.toLocaleDateString(lang === 'ja' ? 'ja-JP' : 'en-US', {
        year: 'numeric',
        month: lang === 'ja' ? 'long' : 'short',
        day: 'numeric'
    })
}
```

### 3. 読了時間の多言語対応（Priority: Medium）

#### 3.1 readTimeの修正
**ファイル**: `src/utils/readTime.ts`
**問題**: "min read" が英語固定
**修正**: 言語に応じたテキスト生成

```typescript
// 現在
data.astro.frontmatter.minutesRead = readingTime.text

// 修正後
const minutes = Math.ceil(readingTime.minutes)
data.astro.frontmatter.minutesRead = minutes
data.astro.frontmatter.readingTime = readingTime
```

#### 3.2 コンポーネントでの表示修正
各使用箇所で `posts.minutesRead` 翻訳キーを使用

### 4. 検索プレースホルダーの対応（Priority: Low）

#### 4.1 Searchコンポーネント
**ファイル**: `src/components/Search.astro`
**対応**: PagefindUIの設定で多言語プレースホルダーを設定

### 5. ページネーションの対応（Priority: Low）

#### 5.1 Paginationコンポーネント
**ファイル**: `src/components/Pagination.astro`
**対応**: アクセシビリティ改善のため、aria-labelに翻訳テキストを追加

## 新規追加する翻訳キー

```typescript
// 日本語
ja: {
    // 既存のキー...
    'posts.readPost': '記事を読む',
    'readTime.suffix': '分で読めます',
}

// 英語
en: {
    // 既存のキー...
    'posts.readPost': 'Read Post',
    'readTime.suffix': 'min read',
}
```

## 実装優先度

### Phase 1: 高優先度（即座に実装推奨）
1. メインページの "Latest Posts" → `posts.latest`
2. ブログ詳細ページの "Published" → `date.published`
3. 日付フォーマットの多言語対応

### Phase 2: 中優先度（段階的実装）
1. 投稿カードの "Read Post" → 新キー `posts.readPost`
2. フッターの翻訳適用
3. カテゴリの "View All" 対応
4. 読了時間の多言語対応

### Phase 3: 低優先度（改善項目）
1. 検索プレースホルダー
2. ページネーション
3. その他のアクセシビリティ改善

## 実装チェックリスト

### Phase 1
- [ ] `src/pages/index.astro` - Latest Posts の翻訳対応
- [ ] `src/layouts/BlogPost.astro` - Published の翻訳対応  
- [ ] `src/components/FormattedDate.astro` - 日付フォーマット多言語対応

### Phase 2
- [ ] `src/i18n/ui.ts` - 新しい翻訳キー追加
- [ ] `src/components/PostCard.astro` - Read Post の翻訳対応
- [ ] `src/components/Footer.astro` - フッター翻訳対応
- [ ] `src/components/Category.astro` - View All の翻訳対応
- [ ] `src/utils/readTime.ts` - 読了時間の多言語対応

### Phase 3
- [ ] `src/components/Search.astro` - 検索プレースホルダー対応
- [ ] `src/components/Pagination.astro` - ページネーション翻訳対応

## 注意事項

1. **既存の翻訳キーとの整合性**: 既存の翻訳キーを最大限活用し、新規キーは最小限に抑制
2. **型安全性**: TypeScriptの型チェックを通るよう、翻訳キーの型定義を適切に更新
3. **後方互換性**: 既存の機能を壊さないよう、段階的な実装を推奨
4. **テスト**: 各言語で正しく表示されることを確認

## 承認フロー

各フェーズの実装前に、以下の確認をお願いします：
1. 修正箇所の妥当性
2. 翻訳テキストの適切性  
3. 実装優先度の調整

承認されたフェーズのみ実装を進行します。
