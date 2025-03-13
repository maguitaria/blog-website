import fs from 'fs-extra'
import path from 'path'
import axios from 'axios'
import dotenv from 'dotenv'

// Load environment variables from .env
dotenv.config()

const DEEPL_API_KEY = process.env.DEEPL_API_KEY
const BLOG_PATH = path.join(process.cwd(), 'src/content/blog')

// DeepL API Request Function
async function translateText(text, targetLang) {
	try {
		const response = await axios.post('https://api-free.deepl.com/v2/translate', null, {
			params: {
				auth_key: DEEPL_API_KEY,
				text,
				target_lang: targetLang.toUpperCase()
			}
		})
		return response.data.translations[0].text
	} catch (error) {
		console.error(`❌ Translation failed: ${error.message}`)
		return null
	}
}

// Function to Translate Blog Posts
async function translateBlogPost(slug, sourceLang, targetLang) {
	const sourcePath = path.join(BLOG_PATH, sourceLang, `${slug}.md`)
	const targetPath = path.join(BLOG_PATH, targetLang, `${slug}.md`)

	if (!fs.existsSync(sourcePath)) {
		console.error(`❌ Source blog post not found: ${sourcePath}`)
		return
	}

	if (fs.existsSync(targetPath)) {
		console.log(`✅ Translation already exists: ${targetPath}`)
		return
	}

	console.log(`🌍 Translating '${slug}' from ${sourceLang} → ${targetLang}...`)

	// Read source post
	const content = fs.readFileSync(sourcePath, 'utf8')
	const [metaData, ...bodyLines] = content.split('---\n')
	const body = bodyLines.join('---\n')

	// Modify metadata (add language-specific slug)
	const metadata = metaData
		.split('\n')
		.map((line) => {
			if (line.startsWith('slug:')) {
				return `slug: "${slug}-${targetLang}"` // Ensure unique slug
			}
			return line
		})
		.join('\n')

	// Translate post body
	const translatedBody = await translateText(body, targetLang)
	if (!translatedBody) {
		console.error(`❌ Failed to translate '${slug}' to ${targetLang}`)
		return
	}

	const translatedPost = `---\n${metadata}\n---\n\n${translatedBody}`
	fs.outputFileSync(targetPath, translatedPost)
	console.log(`✅ Translated post saved: ${targetPath}`)
}

// Main Function to Translate All Posts
async function main() {
	const posts = fs.readdirSync(path.join(BLOG_PATH, 'en')).filter((file) => file.endsWith('.md'))

	for (const postFile of posts) {
		const slug = postFile.replace('.md', '')
		await translateBlogPost(slug, 'en', 'uk') // English → Ukrainian
		await translateBlogPost(slug, 'en', 'ru') // English → Russian
	}

	console.log('🎉 All missing translations completed!')
}

main()
