# Language Switch Bug Investigation Report

## 問題の概要

`LanguageSwitch.astro`コンポーネントの`getAlternatePath`関数が不正なパスを生成している問題を調査しました。

### 発生している問題
- **期待される結果**: `/ja/tags/css` → `/en/tags/css`
- **実際の結果**: `/ja/tags/css` → `/jaen/tags/css`

## 調査結果

### 1. `getAlternatePath`関数の現在の実装

```typescript
export function getAlternatePath(
	currentPath: string,
	currentLang: Languages,
	targetLang: Languages
): string {
	// baseパスを取得
	const basePath = import.meta.env.BASE_URL || ''

	// 現在のパスからbaseパスと言語プレフィックスを除去
	let pathWithoutBase = currentPath
	if (basePath && currentPath.startsWith(basePath)) {
		pathWithoutBase = currentPath.substring(basePath.length)
	}
	const pathWithoutLang = pathWithoutBase.replace(new RegExp(`^/${currentLang}`), '')

	return `${basePath}${targetLang}${pathWithoutLang}`
}
```

### 2. バグの原因分析

#### 問題1: スラッシュの処理不備
現在の実装では以下の問題があります：

1. **言語プレフィックス除去の問題**
   - `currentPath = "/ja/tags/css"`
   - `currentLang = "ja"`
   - `pathWithoutLang = pathWithoutBase.replace(new RegExp('^/ja'), '')`
   - 結果: `pathWithoutLang = "/tags/css"` ✅ これは正常

2. **新しいパス生成の問題**
   - `return basePath + targetLang + pathWithoutLang`
   - `basePath = ""` (空文字)
   - `targetLang = "en"`
   - `pathWithoutLang = "/tags/css"`
   - 結果: `"" + "en" + "/tags/css" = "en/tags/css"` ❌ 先頭のスラッシュがない

3. **実際のバグの原因**
   しかし、コンソールログでは`"/jaen/tags/css"`となっているため、別の問題があります：
   - `targetLang = "ja"`になっている
   - `pathWithoutLang = "en/tags/css"`になっている

#### 問題2: 言語判定の問題
`LanguageSwitch.astro`での言語判定に問題がある可能性：

```typescript
const currentLang = getLangFromUrl(Astro.url)
const targetLang: Languages = currentLang === 'ja' ? 'en' : 'ja'
```

### 3. デバッグ情報の詳細分析

コンソールログの結果：
```
Target: {
  targetLang: "ja",
  alternatePath: "/jaen/tags/css"
}
```

この結果から推測される処理フロー：
1. `currentLang`が正しく取得されていない可能性
2. `targetLang`が`"ja"`になっている → `currentLang`は`"en"`のはず
3. `alternatePath`が`"/jaen/tags/css"`になっている → 言語除去処理に問題

### 4. `getLangFromUrl`関数の分析

```typescript
export function getLangFromUrl(url: URL): Languages {
	const [, lang] = url.pathname.split('/')
	if (lang in ui) return lang as Languages
	return defaultLang
}
```

この関数の問題点：
- URL構造によっては正しく言語を取得できない可能性
- `defaultLang`は`'ja'`なので、言語が検出されない場合は常に`'ja'`を返す

### 5. 想定される実際の処理フロー

**URL**: `/ja/tags/css`の場合：
1. `getLangFromUrl()` → パス`/ja/tags/css`を`/`で分割 → `['', 'ja', 'tags', 'css']`
2. `lang = 'ja'` → これは正常
3. `currentLang = 'ja'`
4. `targetLang = 'en'` (ja→enの切り替え)

しかし、ログでは`targetLang: "ja"`となっているため、何らかの理由で逆になっている。

## 修正提案

### 修正案1: `getAlternatePath`関数の修正

```typescript
export function getAlternatePath(
	currentPath: string,
	currentLang: Languages,
	targetLang: Languages
): string {
	// baseパスを取得
	const basePath = import.meta.env.BASE_URL || ''

	// 現在のパスからbaseパスと言語プレフィックスを除去
	let pathWithoutBase = currentPath
	if (basePath && currentPath.startsWith(basePath)) {
		pathWithoutBase = currentPath.substring(basePath.length)
	}
	
	// 言語プレフィックスを除去（より確実な方法）
	const pathWithoutLang = pathWithoutBase.replace(new RegExp(`^/${currentLang}(/|$)`), '') || '/'
	
	// 新しいパスを生成（スラッシュの処理を正確に）
	const normalizedPath = pathWithoutLang.startsWith('/') ? pathWithoutLang : `/${pathWithoutLang}`
	return `${basePath}/${targetLang}${normalizedPath}`
}
```

### 修正案2: デバッグ強化版

```typescript
export function getAlternatePath(
	currentPath: string,
	currentLang: Languages,
	targetLang: Languages
): string {
	console.log('getAlternatePath inputs:', { currentPath, currentLang, targetLang })
	
	const basePath = import.meta.env.BASE_URL || ''
	console.log('basePath:', basePath)

	let pathWithoutBase = currentPath
	if (basePath && currentPath.startsWith(basePath)) {
		pathWithoutBase = currentPath.substring(basePath.length)
	}
	console.log('pathWithoutBase:', pathWithoutBase)
	
	const pathWithoutLang = pathWithoutBase.replace(new RegExp(`^/${currentLang}(/|$)`), '') || '/'
	console.log('pathWithoutLang:', pathWithoutLang)
	
	const normalizedPath = pathWithoutLang.startsWith('/') ? pathWithoutLang : `/${pathWithoutLang}`
	const result = `${basePath}/${targetLang}${normalizedPath}`
	console.log('result:', result)
	
	return result
}
```

## 推奨アクション

1. **即座に実行すべき修正**:
   - `getAlternatePath`関数の修正（修正案1）
   - デバッグログの追加による問題の詳細確認

2. **検証が必要な項目**:
   - `getLangFromUrl`関数が正しく動作しているか
   - `LanguageSwitch.astro`での言語判定ロジック
   - 実際のURL構造との整合性

3. **長期的改善**:
   - ユニットテストの追加
   - エッジケースの対応
   - エラーハンドリングの強化

## テストケース

修正後は以下のテストケースで動作確認を行う：

```typescript
// テストケース例
const testCases = [
  {
    input: { currentPath: '/ja/tags/css', currentLang: 'ja', targetLang: 'en' },
    expected: '/en/tags/css'
  },
  {
    input: { currentPath: '/en/categories/tech', currentLang: 'en', targetLang: 'ja' },
    expected: '/ja/categories/tech'
  },
  {
    input: { currentPath: '/ja', currentLang: 'ja', targetLang: 'en' },
    expected: '/en'
  },
  {
    input: { currentPath: '/', currentLang: 'ja', targetLang: 'en' },
    expected: '/en/'
  }
]
```

---

**作成日**: 2025-07-09  
**調査対象**: `/src/components/LanguageSwitch.astro`, `/src/i18n/utils.ts`  
**問題**: 言語切り替え時のパス生成バグ  
**優先度**: 高（ユーザー体験に直接影響）
