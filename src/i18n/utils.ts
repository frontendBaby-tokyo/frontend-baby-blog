import { ui, defaultLang } from './ui'

export type UIKeys = keyof (typeof ui)[typeof defaultLang]
export type Languages = keyof typeof ui

export function getLangFromUrl(url: URL): Languages {
	const [, lang] = url.pathname.split('/')
	if (lang in ui) return lang as Languages
	return defaultLang
}

export function useTranslations(lang: Languages) {
	return function t(key: UIKeys): string {
		return ui[lang][key] || ui[defaultLang][key]
	}
}

export function getLocalizedPath(path: string, lang: Languages): string {
	// 既にプレフィックスが付いている場合は、それを置き換える
	const pathWithoutLang = path.replace(/^\/(ja|en)/, '')
	return `/${lang}${pathWithoutLang}`
}

export function getAlternatePath(
	currentPath: string,
	currentLang: Languages,
	targetLang: Languages
): string {
	// 現在の言語プレフィックスを対象言語に置き換える
	const pathWithoutLang = currentPath.replace(new RegExp(`^/${currentLang}`), '')
	return `/${targetLang}${pathWithoutLang}`
}

export function getPathWithoutLang(path: string): string {
	// 言語プレフィックスを除去したパスを返す
	return path.replace(/^\/(ja|en)/, '') || '/'
}

export function isCurrentLang(path: string, lang: Languages): boolean {
	return path.startsWith(`/${lang}/`) || path === `/${lang}`
}
