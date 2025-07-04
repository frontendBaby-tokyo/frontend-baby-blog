# 開発ワークフロー & トラブルシューティングガイド

## 🚀 開発ワークフロー

### 1. 環境セットアップ

#### 前提条件
- Node.js 18+ 
- Bun 1.2.17+ (推奨パッケージマネージャー)
- Git

#### 初期セットアップ
```bash
# リポジトリクローン
git clone https://github.com/frontendBaby-tokyo/frontend-baby-blog.git
cd frontend-baby-blog

# 依存関係インストール
bun install

# 開発サーバー起動（Tina CMS付き）
bun run dev
```

### 2. 日常的な開発フロー

#### ブログ記事作成
```bash
# 1. Tina CMS経由での作成（推奨）
# http://localhost:3000/admin にアクセス

# 2. 手動でのMDXファイル作成
# src/content/blog/new-post.mdx
```

#### コンポーネント開発
```bash
# 新しいコンポーネント作成
touch src/components/NewComponent.astro

# 既存コンポーネントの修正
# src/components/ 内の該当ファイルを編集
```

#### スタイル調整
```bash
# Tailwind CSSクラス追加
# コンポーネント内で直接 class 属性を修正

# カスタムCSS追加（必要な場合）
# src/styles/global.css に追加
```

### 3. ビルドとデプロイ

#### ローカルビルド確認
```bash
# プロダクションビルド
bun run build

# ビルド結果のプレビュー
bun run preview

# 検索インデックス生成
bun run postbuild
```

#### 品質チェック
```bash
# リンター実行
bun run lint

# フォーマッター実行
bun run format

# フォーマットチェック
bun run format:check
```

## 🐛 トラブルシューティング

### よくある問題と解決方法

#### 1. ビルドエラー

**エラー**: `Error: Cannot find module '@/components/...'`
```bash
# 解決方法: パスエイリアス確認
# tsconfig.json の paths 設定を確認
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**エラー**: `Image optimization error`
```bash
# 解決方法: 画像ファイル確認
# 1. ファイルパスの確認
# 2. 画像ファイル形式の確認（対応形式: jpg, png, webp, avif）
# 3. ファイルサイズの確認
```

#### 2. 開発サーバーの問題

**問題**: `Tina CMS が起動しない`
```bash
# 解決方法:
# 1. ポート3000が使用されていないか確認
lsof -ti:3000

# 2. Tina設定確認
# tina/config.ts の設定を確認

# 3. 環境変数確認
# TINA_CLIENT_ID と TINA_TOKEN が設定されているか
```

**問題**: `Hot reloading が動作しない`
```bash
# 解決方法:
# 1. ブラウザキャッシュクリア
# 2. 開発サーバー再起動
bun run dev

# 3. node_modules 再インストール
rm -rf node_modules bun.lock
bun install
```

#### 3. スタイリング問題

**問題**: `Tailwind CSSクラスが適用されない`
```bash
# 解決方法:
# 1. purge設定確認
# tailwind.config.cjs の content 配列を確認

# 2. ファイル拡張子確認
# .astro, .tsx, .vue ファイルが含まれているか

# 3. クラス名確認
# 動的なクラス名ではなく、完全なクラス名を使用
```

**問題**: `ダークモードが正常に動作しない`
```bash
# 解決方法:
# 1. HTML要素の class="dark" 確認
# 2. CSS変数の定義確認
# 3. JavaScript の localStorage 確認
```

#### 4. Content Collections エラー

**エラー**: `Content collection schema validation failed`
```bash
# 解決方法:
# 1. フロントマターの型確認
# src/content/config.ts のスキーマと一致するか確認

# 2. 必須フィールドの確認
title: # 必須
description: # 必須
pubDate: # 必須
category: # CATEGORIES 内の値のみ
```

**エラー**: `Image reference error`
```bash
# 解決方法:
# 1. 画像パスの確認
heroImage: '../../assets/images/image.jpg'

# 2. 画像ファイルの存在確認
# src/assets/images/ 内にファイルが存在するか
```

### 5. パフォーマンス問題

**問題**: `ページ読み込みが遅い`
```bash
# 診断方法:
# 1. Lighthouse でパフォーマンス測定
# 2. ネットワークタブでリソース確認
# 3. バンドルサイズ分析

# 解決方法:
# 1. 画像最適化
# 2. 不要なJavaScriptの削除
# 3. CDN利用検討
```

**問題**: `検索機能が遅い`
```bash
# 解決方法:
# 1. Pagefind インデックスサイズ確認
# 2. 検索対象コンテンツの最適化
# 3. 検索UIの設定調整
```

## 🔧 デバッグ手法

### 1. Astro DevTools
```bash
# 開発者ツールでのデバッグ
# 1. ブラウザの開発者ツールを開く
# 2. Network タブでリクエスト確認
# 3. Console タブでエラー確認
```

### 2. ログ出力
```astro
---
// サーバーサイドログ（ビルド時に出力）
console.log('Server-side log:', data)
---

<script>
  // クライアントサイドログ（ブラウザで出力）
  console.log('Client-side log:', data)
</script>
```

### 3. 型チェック
```bash
# TypeScript型チェック
bun run astro check

# より詳細な型チェック
npx tsc --noEmit
```

## 📚 開発のコツ

### 1. 効率的なコンポーネント開発
- 小さなコンポーネントから始める
- Props の型定義を最初に行う
- 再利用性を考慮した設計

### 2. パフォーマンス重視の開発
- 画像は必ず最適化
- JavaScript は最小限に
- CSS は Tailwind を活用

### 3. SEO対応
- メタデータの適切な設定
- 構造化データの活用
- アクセシビリティの考慮

## 🚨 緊急時対応

### サイトダウン時
```bash
# 1. ビルドエラーの確認
bun run build 2>&1 | tee build.log

# 2. 最後の正常なコミットに戻す
git log --oneline -10
git reset --hard [commit-hash]

# 3. 緊急デプロイ
git push origin main --force
```

### データ破損時
```bash
# 1. Tina CMS データの確認
# tina/__generated__/ の内容確認

# 2. Content Collections の確認
# src/content/blog/ の内容確認

# 3. バックアップからの復旧
# Git履歴からの復旧を検討
```

## 📞 サポートリソース

### 公式ドキュメント
- [Astro Documentation](https://docs.astro.build/)
- [Tina CMS Documentation](https://tina.io/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### コミュニティ
- [Astro Discord](https://astro.build/chat)
- [GitHub Issues](https://github.com/frontendBaby-tokyo/frontend-baby-blog/issues)

### 開発者向けツール
- [Astro DevTools](https://github.com/withastro/astro-devtools)
- [VS Code Astro Extension](https://marketplace.visualstudio.com/items?itemName=astro-build.astro-vscode)

---

このガイドを参考に、効率的で安全な開発を進めてください。問題が発生した際は、まずこのトラブルシューティングセクションを確認してください。
