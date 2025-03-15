import en from '../../locales/en.json'
import uk from '../../locales/uk.json'
import ru from '../../locales/ru.json'
import { siteConfig } from '@/data/site.config'

const translations = { en, uk, ru }

export function getCurrentLang(urlSearch: URLSearchParams | null = null): string {
	if (urlSearch) {
		return urlSearch.get('lang') || 'en' // ✅ Read from URL
	}

	if (typeof window !== 'undefined') {
		const urlParams = new URLSearchParams(window.location.search)
		return urlParams.get('lang') || 'en' // ✅ Client-side detection
	}

	return 'en' // Default to English if nothing is found
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
