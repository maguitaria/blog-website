import en from '../../locales/en.json'
import uk from '../../locales/uk.json'
import ru from '../../locales/ru.json'
import { siteConfig } from '@/data/site.config'

const translations = { en, uk, ru }
// Safe way to check localStorage (only in browser)
export function getCurrentLang(): string {
	if (typeof window !== 'undefined') {
		const storedLang = localStorage.getItem('lang')
		const urlLang = new URLSearchParams(window.location.search).get('lang')
		return siteConfig.getLocale(storedLang || urlLang || siteConfig.i18n.defaultLocale)
	}
	return siteConfig.i18n.defaultLocale // Default to English on server-side
}

// Translation function
export function t(key: string, lang: string = getCurrentLang()): string {
	return translations[lang]?.[key] || key
}

// Set new language (browser only)
export function setLang(newLang: string): void {
	if (typeof window !== 'undefined') {
		localStorage.setItem('lang', newLang)
		window.location.search = `?lang=${newLang}` // Updates URL
	}
}
