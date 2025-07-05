export const languages = {
	ja: '日本語',
	en: 'English'
} as const

export const defaultLang = 'ja' as const

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
		'pagination.prev': '前のページ',
		'pagination.next': '次のページ',
		'related.posts': '関連記事'
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
		'pagination.prev': 'Previous',
		'pagination.next': 'Next',
		'related.posts': 'Related Posts'
	}
} as const
