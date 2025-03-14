import en from '../../locales/en.json'
import uk from '../../locales/uk.json'
import ru from '../../locales/ru.json'
import { siteConfig } from '@/data/site.config'

const translations = { en, uk, ru }

// ✅ Get stored or URL-defined language
export function getCurrentLang(): string {
	if (typeof window !== 'undefined') {
		const storedLang = localStorage.getItem('lang')
		const urlParams = new URLSearchParams(window.location.search)
		const urlLang = urlParams.get('lang')
		return storedLang || urlLang || 'en' // ✅ Default to "en"
	}
	return 'en' // Default for server-side rendering
}

// ✅ Translation function with fallback
export function t(key: string, lang: string = getCurrentLang()): string {
	return translations[lang]?.[key] || translations['en'][key] || key
}

// ✅ Set new language and update URL without removing parameters
export function setLang(newLang: string): void {
	if (typeof window !== 'undefined') {
		localStorage.setItem('lang', newLang)

		// ✅ Update URL without removing other query parameters
		const urlParams = new URLSearchParams(window.location.search)
		urlParams.set('lang', newLang)
		window.history.replaceState(null, '', `${window.location.pathname}?${urlParams.toString()}`)

		// ✅ Reload to apply changes dynamically
		window.location.reload()
	}
}
