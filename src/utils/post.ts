import { getCollection } from 'astro:content'
import type { Languages } from '@/i18n/utils'

export const getPosts = async (lang: Languages, max?: number) => {
	return (await getCollection('blog', ({ id }) => id.startsWith(`${lang}/`)))
		.filter((post) => !post.data.draft)
		.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
		.slice(0, max)
}

export const getRecommendedPosts = async (max?: number) => {
	return (await getCollection('blog'))
		.filter((post) => !post.data.draft && post.data.recommended)
		.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
		.slice(0, max)
}

export const getTags = async () => {
	const posts = await getCollection('blog')
	const tags = new Set()
	posts
		.filter((post) => !post.data.draft)
		.forEach((post) => {
			post.data.tags.forEach((tag) => {
				if (tag != '') {
					tags.add(tag)
				}
			})
		})

	return Array.from(tags)
}

export const getPostByTag = async (lang: Languages, tag: string) => {
	const posts = await getPosts(lang)
	return posts
		.filter((post) => !post.data.draft)
		.filter((post) => {
			return post.data.tags.some((postTag) => postTag === tag)
		})
}
