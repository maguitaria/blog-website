interface SiteConfig {
	i18n: {
		locales: string[]
		defaultLocale: string
		localeDetection: boolean // Automatically detect browser language
	}
	site: string
	author: string
	title: string
	description: string
	lang: string
	ogLocale: string
	shareMessage: string
	paginationSize: number
	getLocale: (lang: string) => string
}

export const siteConfig: SiteConfig = {
	i18n: {
		locales: ['en', 'uk', 'ru'], // Supported languages
		defaultLocale: 'en', // Default language
		localeDetection: true // Automatically detect browser language
	},
	site: 'https://blog-website-gold-one.vercel.app/', // Write here your website url
	author: 'Mariia Glushenkova', // Site author
	title: 'Blog about life and tech', // Site title.
	description: 'Here I am sharing all of my thoughts and experiences. Thank you for being with me!', // Description to display in the meta tags
	lang: 'en-GB',
	ogLocale: 'en_GB',
	shareMessage: 'Share this post', // Message to share a post on social media
	paginationSize: 6, // Number of posts per page
	getLocale: (lang) => (['en', 'uk', 'ru'].includes(lang) ? lang : 'en') // Ensure valid language selection
}
