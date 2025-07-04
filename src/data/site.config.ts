interface SiteConfig {
	site: string
	author: string
	title: string
	description: string
	lang: string
	ogLocale: string
	shareMessage: string
	paginationSize: number
}

export const siteConfig: SiteConfig = {
	site: 'https://samplesample', // Write here your website url
	author: 'frontendBaby-tokyo', // Site author
	title: 'frontendBaby-Tokyo', // Site title.
	description: 'Tech blog by frontendBaby-tokyo. Main content focuses on frontend technologies.', // Description to display in the meta tags
	lang: 'ja-JP',
	ogLocale: 'ja_JP',
	shareMessage: 'Share this post', // Message to share a post on social media
	paginationSize: 6 // Number of posts per page
}
