import { getCollection } from 'astro:content'
import { CATEGORIES } from '@/data/categories'
import { getCurrentLang } from 'src/components/utils/i18n'

export const getCategories = async () => {
	const posts = await getCollection('blog')
	const categories = new Set(
		posts.filter((post) => !post.data.draft).map((post) => post.data.category)
	)
	return Array.from(categories).sort((a, b) =>
		CATEGORIES.indexOf(a) < CATEGORIES.indexOf(b) ? -1 : 1
	)
}

export const getPosts = async (max?: number) => {
	return (await getCollection('blog'))
		.filter((post) => !post.data.draft)
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
					tags.add(tag.toLowerCase())
				}
			})
		})

	return Array.from(tags)
}

export async function getPostByTag(tag: string) {
	const posts = await getCollection('blog')

	// ✅ Detect current language from URL
	const lang = getCurrentLang()

	// ✅ Filter posts by tag AND language
	return posts.filter((post) => post.data.tags.includes(tag) && post.data.lang === lang)
}

export const filterPostsByCategory = async (category: string) => {
	const posts = await getPosts()
	return posts
		.filter((post) => !post.data.draft)
		.filter((post) => post.data.category.toLowerCase() === category)
}
