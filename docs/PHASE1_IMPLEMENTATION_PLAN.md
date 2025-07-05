# フェーズ1: 基盤整備 実装プラン

## 1. 実装概要

### 1.1 目的
- Astro公式i18n機能の導入
- 基本的なUI文言の多言語化システム構築
- 言語切替の基盤となる仕組みの実装

### 1.2 対象範囲
- Astro設定ファイルの更新
- UI文言集の作成
- 翻訳ヘルパー関数の実装
- 基本的なHTMLのlang属性修正

### 1.3 技術スタック
- Astro公式i18n機能
- TypeScript
- 既存のTailwind CSS構成を維持

## 2. 実装手順

### 2.1 ステップ1: Astro i18n設定

#### 作業内容
1. `astro.config.mjs`の更新
   - i18n設定の追加
   - デフォルト言語: 日本語（ja）
   - サポート言語: 日本語（ja）、英語（en）
   - プレフィックス設定: 全ての言語にプレフィックスを付与

#### 期待される動作
- `/ja/` → 日本語
- `/en/` → 英語
- `/` → 日本語へのリダイレクト

#### 変更ファイル
- `astro.config.mjs`

### 2.2 ステップ2: UI文言集の作成

#### 作業内容
1. `src/i18n/`ディレクトリの作成
2. `src/i18n/ui.ts`の作成
   - 日本語・英語の文言定義
   - ナビゲーション、基本UI要素の翻訳

#### 対象文言（初期セット）
```typescript
export const ui = {
  ja: {
    'nav.home': 'ホーム',
    'nav.categories': 'カテゴリー',
    'nav.tags': 'タグ',
    'nav.about': 'About',
    'categories.all': 'すべて',
    'posts.latest': '最新記事',
    'posts.recommended': 'おすすめ記事',
    'posts.readMore': '続きを読む',
    'posts.minutesRead': '分で読めます',
    'search.placeholder': '記事を検索...',
    'footer.copyright': 'All rights reserved.',
    'theme.toggle': 'テーマ切替',
    'date.updated': '更新日',
    'date.published': '公開日',
  },
  en: {
    'nav.home': 'Home',
    'nav.categories': 'Categories',
    'nav.tags': 'Tags',
    'nav.about': 'About',
    'categories.all': 'All',
    'posts.latest': 'Latest Posts',
    'posts.recommended': 'Recommended Posts',
    'posts.readMore': 'Read More',
    'posts.minutesRead': 'min read',
    'search.placeholder': 'Search posts...',
    'footer.copyright': 'All rights reserved.',
    'theme.toggle': 'Toggle Theme',
    'date.updated': 'Updated',
    'date.published': 'Published',
  },
} as const
```

#### 変更・作成ファイル
- `src/i18n/ui.ts`（新規作成）

### 2.3 ステップ3: 翻訳ヘルパー関数の実装

#### 作業内容
1. `src/i18n/utils.ts`の作成
   - URLから言語情報を取得する関数
   - 翻訳関数の実装
   - 型安全性の確保

#### 主要関数
```typescript
// URLから現在の言語を取得
export function getLangFromUrl(url: URL): keyof typeof ui

// 翻訳関数を返すファクトリー
export function useTranslations(lang: keyof typeof ui): (key: keyof typeof ui[typeof defaultLang]) => string

// 言語に応じたパスを生成
export function getLocalizedPath(path: string, lang: string): string

// 代替言語のパスを生成
export function getAlternatePath(currentPath: string, currentLang: string, targetLang: string): string
```

#### 変更・作成ファイル
- `src/i18n/utils.ts`（新規作成）

### 2.4 ステップ4: 既存設定の修正

#### 作業内容
1. HTML lang属性の動的設定
   - `src/layouts/BaseLayout.astro`の更新
   - 現在の固定値 `lang='en'` を動的に設定

2. サイト設定の一致性確保
   - `src/data/site.config.ts`の確認
   - 必要に応じて多言語対応の準備

#### 変更ファイル
- `src/layouts/BaseLayout.astro`
- `src/data/site.config.ts`（確認・微調整）

### 2.5 ステップ5: 基本的な言語切替機能

#### 作業内容
1. `src/components/LanguageSwitch.astro`の作成
   - 現在の言語を検出
   - 代替言語へのリンク生成
   - シンプルなUI実装

#### UI仕様
- ヘッダー部分に配置
- 現在言語の表示
- クリックで言語切替
- 国旗アイコン + 言語名の表示

#### 変更・作成ファイル
- `src/components/LanguageSwitch.astro`（新規作成）
- `src/components/Header.astro`（言語切替コンポーネントの組み込み）

## 3. 実装詳細

### 3.1 ファイル構成（実装後）

```
src/
  i18n/
    ui.ts           # UI文言集
    utils.ts        # 翻訳ヘルパー関数
  components/
    LanguageSwitch.astro  # 言語切替コンポーネント
    Header.astro    # ヘッダー（更新）
  layouts/
    BaseLayout.astro # ベースレイアウト（更新）
  data/
    site.config.ts  # サイト設定（確認・調整）
astro.config.mjs    # Astro設定（更新）
```

### 3.2 型定義

#### UI文言の型安全性
```typescript
// 翻訳キーの型安全性を確保
type UIKeys = keyof typeof ui[typeof defaultLang]
type Languages = keyof typeof ui

// 翻訳関数の型定義
type TranslationFunction = (key: UIKeys) => string
```

### 3.3 URL構造（実装後）

```
/                   # ルート（日本語にリダイレクト）
/ja/                # 日本語トップページ
/en/                # 英語トップページ
/ja/category/tech/  # 日本語カテゴリページ
/en/category/tech/  # 英語カテゴリページ
/ja/tags/react/     # 日本語タグページ
/en/tags/react/     # 英語タグページ
```

## 4. テスト項目

### 4.1 機能テスト

#### 基本機能
- [ ] `/ja/`でアクセス時、適切な日本語UIが表示される
- [ ] `/en/`でアクセス時、適切な英語UIが表示される
- [ ] ルート（`/`）から`/ja/`へのリダイレクトが正常に動作する
- [ ] 言語切替ボタンが正常に動作する
- [ ] URL構造が期待通りに生成される

#### ブラウザテスト
- [ ] Chrome での動作確認
- [ ] Firefox での動作確認
- [ ] Safari での動作確認
- [ ] モバイルブラウザでの動作確認

#### HTML検証
- [ ] HTML lang属性が正しく設定される
- [ ] SEO要素（title, description等）が適切に処理される

### 4.2 パフォーマンステスト

- [ ] ページ読み込み速度に影響がない
- [ ] バンドルサイズの大幅な増加がない
- [ ] Lighthouse スコアの維持

### 4.3 後方互換性

- [ ] 既存のURLが正常にアクセスできる
- [ ] 既存のカテゴリー・タグが正常に表示される
- [ ] 既存の記事が正常に表示される

## 5. 品質保証

### 5.1 コード品質

#### TypeScript
- 型安全性の確保
- eslint / prettier による整形
- 既存のコーディング規約に従う

#### 性能
- 不要な再計算を避ける
- 静的な翻訳データの活用
- コンポーネントの軽量化

### 5.2 保守性

#### ドキュメント
- 実装内容の記録
- 使用方法の説明
- 拡張時の考慮事項

#### 拡張性
- 新しい言語の追加が容易
- 新しい文言の追加が容易
- フェーズ2以降への準備

## 6. リスク分析

### 6.1 技術的リスク

| リスク | 影響度 | 対策 |
|--------|--------|------|
| Astro i18n機能の制限 | 中 | 十分な事前調査、代替案の準備 |
| 既存コンポーネントへの影響 | 低 | 段階的実装、十分なテスト |
| パフォーマンス劣化 | 低 | 軽量な実装、測定・監視 |

### 6.2 運用リスク

| リスク | 影響度 | 対策 |
|--------|--------|------|
| 翻訳の漏れ・間違い | 中 | レビュープロセス、型チェック |
| SEOへの影響 | 低 | URL構造の慎重な設計 |
| ユーザー混乱 | 低 | 直感的なUI設計 |

## 7. 成果物

### 7.1 実装成果物

- 多言語対応されたAstroプロジェクト
- UI文言集（日本語・英語）
- 翻訳ヘルパー関数群
- 言語切替機能

### 7.2 ドキュメント

- 実装手順書（本ドキュメント）
- 使用方法ガイド
- フェーズ2への移行準備資料

## 8. 次ステップ（フェーズ2準備）

### 8.1 フェーズ2への橋渡し

- カテゴリー多言語化の基盤準備
- URL構造の拡張準備
- 翻訳システムの拡張準備

### 8.2 運用開始

- 本番デプロイ
- ユーザーフィードバック収集
- パフォーマンス監視

---

**実装開始予定**: 承認後即時  
**予想工数**: 1-2日  
**完了予定**: 2025年7月8日  
**次フェーズ**: カテゴリー多言語化（フェーズ2）

---

*作成日: 2025年7月6日*  
*対象: frontend-baby-blog プロジェクト*  
*フェーズ: Phase 1 - 基盤整備*
