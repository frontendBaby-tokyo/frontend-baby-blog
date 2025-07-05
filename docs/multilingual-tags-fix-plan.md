# 多言語対応タグページ修正方針

## 問題の分析

### 現在の状況
1. **既存のタグページ構造**: `/src/pages/tags/` に以下のファイルが存在
   - `index.astro` - タグ一覧ページ
   - `[...tag]/index.astro` - 個別タグページ

2. **多言語設定**: astro.config.mjsで以下の設定済み
   - `defaultLocale: 'ja'`
   - `locales: ['ja', 'en']`
   - `prefixDefaultLocale: true`

3. **問題点**: 
   - `/tags/javascript` にアクセスできない
   - `/en/tags/javascript` にアクセスしたいが、対応するファイルが存在しない
   - 多言語対応後、言語プレフィックス付きのURLのみ有効になっている

### 根本原因
Astroの多言語設定で `prefixDefaultLocale: true` にしているため、すべてのページに言語プレフィックスが必要となり、元の `/tags/javascript` URLが無効になっている。

## 修正方針

### アプローチ1: 動的言語対応の単一ファイル実装（推奨）
既存のタグページファイルを多言語対応に改修し、コードの重複を完全に避ける

**実装内容:**
1. **既存ファイルの多言語対応化**
   - `/src/pages/[lang]/tags/index.astro` - 言語パラメータ付きタグ一覧
   - `/src/pages/[lang]/tags/[...tag]/index.astro` - 言語パラメータ付き個別タグページ

2. **getStaticPathsでの言語生成**
   - 各ページで `getStaticPaths()` を使用して `ja` と `en` のパスを動的生成
   - 1つのファイルで全言語に対応

3. **既存ファイルの移行**
   - `/src/pages/tags/` 配下のファイルを `/src/pages/[lang]/tags/` に移動・改修
   - ロジックは既存のまま、言語パラメータの処理のみ追加

### アプローチ2: 共通コンポーネント化（代替案）
言語別ファイルを作成するが、ロジックを完全に共通コンポーネント化する

### アプローチ3: リダイレクト設定（非推奨）
既存URLから新しいURLへのリダイレクトを設定する方法もあるが、SEOや保守性の観点から推奨しない

## 実装の詳細（アプローチ1: 動的言語対応）

### 1. 言語パラメータ付きページファイル
**ファイル構造:**
```
/src/pages/[lang]/tags/index.astro
/src/pages/[lang]/tags/[...tag]/index.astro
```

**各ページの実装:**
- `getStaticPaths()` で `['ja', 'en']` の全パスを生成
- `Astro.params.lang` で現在の言語を取得
- 既存のロジックをそのまま活用し、必要に応じて言語フィルタリングを追加

### 2. utilsの拡張（必要に応じて）
言語別のデータ取得関数を追加（既存関数の拡張でも可）

### 3. i18n対応
- タイトルやテキストを `ui.ts` から取得
- `getLangFromUrl()` などのヘルパー関数を活用

## メリット（アプローチ1）
1. **完全なコード重複回避**: 1つのファイルで全言語に対応、ロジックの重複なし
2. **保守性最大化**: 修正時は1つのファイルのみ修正すれば全言語に反映
3. **拡張性**: 新しい言語追加時もgetStaticPathsの配列に追加するだけ
4. **一貫性**: 他の多言語ページと同じ `[lang]` パターンを使用
5. **パフォーマンス**: ビルド時に全言語の静的ページを生成

## 作業手順（アプローチ1）
1. `/src/pages/[lang]/tags/` ディレクトリの作成
2. 既存の `/src/pages/tags/index.astro` を `/src/pages/[lang]/tags/index.astro` に移動・改修
3. 既存の `/src/pages/tags/[...tag]/index.astro` を `/src/pages/[lang]/tags/[...tag]/index.astro` に移動・改修
4. 各ファイルで `getStaticPaths()` を追加し、言語パラメータ対応
5. i18n対応のタイトル・テキスト修正
6. 既存の `/src/pages/tags/` ディレクトリを削除
7. 動作確認とテスト

## 注意点
- 既存のタグページへの内部リンクは更新が必要
- Navigation componentのリンクも言語プレフィックス付きに更新
- 検索エンジンへの影響を最小限にするため、適切なcanonicalタグの設定を推奨
