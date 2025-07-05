# 推薦記事システム実装調査報告書

## 現状分析

### 現在のPopularPostsシステム
- **ファイル**: `/src/components/PopularPosts.astro`
- **実装**: 最新の記事3件を自動表示
- **問題点**: 手動で推薦記事を選択できない

### プロジェクト構造
- **フレームワーク**: Astro + TinaCMS
- **コンテンツ管理**: Astro Content Collections
- **CMS**: TinaCMS（ブラウザベース管理画面）
- **スキーマファイル**: `/src/content/config.ts`, `/tina/config.ts`

## 実装提案

### 🎯 推奨案: フロントマターrecommendedフィールド方式

#### 概要
各ブログ記事のフロントマターに`recommended: boolean`フィールドを追加し、TinaCMSの管理画面からチェックボックスで推薦記事を選択できるようにする。

#### 実装手順

##### 1. コンテンツスキーマの更新
**ファイル**: `/src/content/config.ts`
```typescript
const blog = defineCollection({
	schema: ({ image }) =>
		z.object({
			title: z.string().max(80),
			description: z.string(),
			pubDate: z.string().or(z.date()).transform((val) => new Date(val)),
			heroImage: image(),
			category: z.enum(CATEGORIES),
			tags: z.array(z.string()),
			draft: z.boolean().default(false),
			recommended: z.boolean().default(false) // 追加
		})
})
```

##### 2. TinaCMSスキーマの更新
**ファイル**: `/tina/config.ts`
```typescript
{
	type: 'boolean',
	name: 'recommended',
	label: 'Recommended Post',
	description: 'Mark this post as recommended to appear in the sidebar'
}
```

##### 3. コンポーネントの変更
**ファイル**: `/src/components/PopularPosts.astro` → `/src/components/RecommendedPosts.astro`
```astro
---
import { getRecommendedPosts } from '@/utils'
import FormattedDate from './FormattedDate.astro'

const posts = await getRecommendedPosts(3)
---

<div class='bg-gray-50 dark:bg-gray-800 rounded-lg p-4'>
	<h3 class='text-lg font-semibold mb-4 text-gray-900 dark:text-white'>
		Recommended Posts
	</h3>
	<!-- 既存のHTML構造を維持 -->
</div>
```

##### 4. ユーティリティ関数の追加
**ファイル**: `/src/utils/post.ts`
```typescript
export const getRecommendedPosts = async (max?: number) => {
	return (await getCollection('blog'))
		.filter((post) => !post.data.draft && post.data.recommended)
		.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
		.slice(0, max)
}
```

##### 5. サイドバーの更新
**ファイル**: `/src/components/Sidebar.astro`
```astro
---
import RecommendedPosts from './RecommendedPosts.astro'
import TagsList from './TagsList.astro'
---

<aside class='space-y-6'>
	<RecommendedPosts />
	<TagsList />
</aside>
```

#### メリット
- ✅ **シンプル**: 既存構造を最小限の変更で実現
- ✅ **直感的**: TinaCMSでチェックボックス一つで管理
- ✅ **保守性**: 記事と推薦状態が一体管理される
- ✅ **パフォーマンス**: 静的生成時に処理、実行時負荷なし

#### デメリット
- ❌ **表示順序**: 推薦記事の表示順序は日付順のみ
- ❌ **カテゴリ別推薦**: カテゴリ別の推薦機能は別途実装が必要

## 代替案

### 案2: 独立したRecommendationsコレクション

#### 概要
推薦記事リストを独立したコレクションとして管理する方式。

#### 実装例
```typescript
// /src/content/config.ts
const recommendations = defineCollection({
	schema: z.object({
		title: z.string(),
		posts: z.array(z.string()), // 記事IDの配列
		order: z.number().default(0),
		category: z.string().optional()
	})
})
```

#### メリット
- ✅ **柔軟性**: 表示順序、カテゴリ別推薦が可能
- ✅ **拡張性**: 推薦理由、期間限定推薦なども実装可能

#### デメリット
- ❌ **複雑性**: 実装とメンテナンスが複雑
- ❌ **管理負荷**: 記事IDの手動管理が必要

### 案3: フロントマター + 表示順序フィールド

#### 概要
recommendedフラグに加え、recommendedOrderフィールドを追加して表示順序を制御。

```typescript
recommended: z.boolean().default(false),
recommendedOrder: z.number().optional()
```

#### メリット
- ✅ **順序制御**: 推薦記事の表示順序を制御可能
- ✅ **シンプル**: 基本構造は案1と同じ

## 実装優先度

### Phase 1: 基本実装（推奨案）
1. ✅ スキーマ更新（recommended フィールド追加）
2. ✅ TinaCMS設定更新
3. ✅ RecommendedPostsコンポーネント作成
4. ✅ ユーティリティ関数追加

### Phase 2: 機能拡張（オプション）
1. 🔄 recommendedOrderフィールド追加
2. 🔄 カテゴリ別推薦機能
3. 🔄 推薦理由フィールド

### Phase 3: 高度な機能（将来的）
1. ⏳ 閲覧数ベースの自動推薦
2. ⏳ タグベースの関連記事推薦
3. ⏳ 期間限定推薦機能

## 技術的考慮事項

### パフォーマンス
- **静的生成**: ビルド時に推薦記事リストを生成
- **キャッシュ**: getRecommendedPosts関数の結果をキャッシュ
- **最適化**: 不要なデータの読み込みを避ける

### SEO効果
- **内部リンク**: 推薦記事による内部リンク強化
- **サイト回遊**: ユーザーの滞在時間向上
- **関連性**: 手動選択による高品質な関連記事表示

### アクセシビリティ
- **セマンティック**: 適切なHTML構造の維持
- **ARIA**: 必要に応じてaria-label追加
- **キーボード**: 既存のリンクナビゲーション維持

## 結論

**推奨実装**: フロントマターrecommendedフィールド方式

この方式により、以下が実現されます：
- 🎯 **直感的な管理**: TinaCMSで簡単に推薦記事を選択
- 🚀 **高いパフォーマンス**: 静的生成による高速表示
- 🔧 **保守性**: シンプルな構造で長期メンテナンス容易
- 📈 **拡張性**: 将来的な機能追加に対応可能

実装完了後は、各記事のTinaCMS管理画面で「Recommended Post」チェックボックスをオンにするだけで、サイドバーの推薦記事として表示されるようになります。
