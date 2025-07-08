# getAlternatePath関数 解説ガイド

## 概要

`getAlternatePath`関数は、多言語対応のWebサイトにおいて、現在のURLを別の言語のURLに変換するためのユーティリティ関数です。この関数は言語切り替え機能の核となる部分で、ユーザーが言語を切り替えた際に適切なURLにリダイレクトするために使用されます。

## 関数シグネチャ

```typescript
export function getAlternatePath(
	currentPath: string,
	currentLang: Languages,
	targetLang: Languages
): string
```

## パラメータ

| パラメータ | 型 | 説明 |
|-----------|----|----|
| `currentPath` | `string` | 現在のURL パス（例: `/en/blog/post-1` または `/frontend-baby-blog/ja/about`） |
| `currentLang` | `Languages` | 現在の言語コード（例: `'ja'`, `'en'`） |
| `targetLang` | `Languages` | 変換先の言語コード（例: `'ja'`, `'en'`） |

## 戻り値

- **型**: `string`
- **説明**: ターゲット言語に変換されたURLパス

## 機能詳細

この関数は以下の処理を順次実行します：

### 1. baseパスの正規化
```typescript
let basePath = import.meta.env.BASE_URL || ''
if (basePath === '/') {
    basePath = ''
}
```
- `import.meta.env.BASE_URL`からベースパスを取得
- ベースパスが`"/"`の場合は空文字列として扱う
- これにより、異なるデプロイ環境（GitHub Pages等）でも正しく動作

### 2. ベースパスの除去
```typescript
let pathWithoutBase = currentPath
if (basePath && currentPath.startsWith(basePath)) {
    pathWithoutBase = currentPath.substring(basePath.length)
}
```
- 現在のパスからベースパスを除去
- 例: `/frontend-baby-blog/ja/about` → `/ja/about`

### 3. 言語プレフィックスの除去
```typescript
const pathWithoutLang = pathWithoutBase.replace(new RegExp(`^/?${currentLang}(/|$)`), '') || '/'
```
- 現在の言語プレフィックスを除去
- 複数のパターンに対応：
  - `/en/` → `/`
  - `/en` → `/`
  - `en/` → `/`

### 4. 新しいパスの生成
```typescript
const normalizedPath = pathWithoutLang.startsWith('/') ? pathWithoutLang : `/${pathWithoutLang}`
const result = `${basePath}/${targetLang}${normalizedPath}`
```
- パスの正規化（先頭に`/`を追加）
- ベースパス + ターゲット言語 + 正規化されたパスを組み合わせ

## 使用例

### 例 1: 基本的な使用
```typescript
// 英語ページから日本語ページへの変換
const currentPath = '/en/blog/my-post'
const result = getAlternatePath(currentPath, 'en', 'ja')
// 結果: '/ja/blog/my-post'
```

### 例 2: ベースパスがある環境
```typescript
// GitHub Pagesなどでベースパスが設定されている場合
// BASE_URL = '/frontend-baby-blog'
const currentPath = '/frontend-baby-blog/en/about'
const result = getAlternatePath(currentPath, 'en', 'ja')
// 結果: '/frontend-baby-blog/ja/about'
```

### 例 3: ルートページの変換
```typescript
// ルートページの言語切り替え
const currentPath = '/ja'
const result = getAlternatePath(currentPath, 'ja', 'en')
// 結果: '/en/'
```

### 例 4: 複雑なパスの変換
```typescript
// ネストされたパスの変換
const currentPath = '/en/categories/technology/posts'
const result = getAlternatePath(currentPath, 'en', 'ja')
// 結果: '/ja/categories/technology/posts'
```

## デバッグ情報

この関数には詳細なコンソールログが含まれており、デバッグ時に各ステップの処理結果を確認できます：

```typescript
console.log('getAlternatePath inputs:', { currentPath, currentLang, targetLang })
console.log('normalized basePath:', basePath)
console.log('pathWithoutBase:', pathWithoutBase)
console.log('pathWithoutLang:', pathWithoutLang)
console.log('getAlternatePath result:', result)
```

## 関連する関数

### `getLocalizedPath`
- より単純な言語パス生成関数
- ベースパスの複雑な処理は行わない

### `getPathWithoutLang`
- パスから言語プレフィックスのみを除去
- `getAlternatePath`の簡易版

### `isCurrentLang`
- 指定されたパスが特定の言語に対応しているかを判定

## 使用箇所

この関数は主に以下の場面で使用されます：

1. **言語切り替えコンポーネント** (`LanguageSwitch.astro`)
   - ユーザーが言語を切り替える際のURL生成

2. **ナビゲーションメニュー**
   - 多言語対応のメニューリンク生成

3. **SEO対応**
   - `hreflang`属性のための代替言語URL生成

## 注意点

- この関数は現在日本語（`ja`）と英語（`en`）の2言語にのみ対応
- 新しい言語を追加する場合は、正規表現パターンの更新が必要
- ベースパスの処理は環境変数`BASE_URL`に依存するため、デプロイ環境での設定が重要

## エラーハンドリング

現在の実装では明示的なエラーハンドリングは含まれていませんが、以下の場合に予期しない結果が生成される可能性があります：

- 無効な言語コードが渡された場合
- 不正な形式のパスが渡された場合
- `BASE_URL`が正しく設定されていない場合

これらの問題を避けるため、呼び出し側で適切な検証を行うことを推奨します。
