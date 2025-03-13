import { atom } from '@nanostores/react'

export const langStore = atom(localStorage.getItem('lang') || 'en')

export function setLang(newLang) {
	langStore.set(newLang)
	localStorage.setItem('lang', newLang)
}
