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
	const basePath = import.meta.env.BASE_URL || ''
	return `${basePath}/${lang}${pathWithoutLang}`
}

export function getAlternatePath(
	currentPath: string,
	currentLang: Languages,
	targetLang: Languages
): string {
	console.log('getAlternatePath inputs:', { currentPath, currentLang, targetLang })

	// baseパスを取得して正規化
	let basePath = import.meta.env.BASE_URL || ''
	// basePathが"/"の場合は空文字列として扱う
	if (basePath === '/') {
		basePath = ''
	}
	console.log('normalized basePath:', basePath)

	// 現在のパスからbaseパスを除去
	let pathWithoutBase = currentPath
	if (basePath && currentPath.startsWith(basePath)) {
		pathWithoutBase = currentPath.substring(basePath.length)
	}
	console.log('pathWithoutBase:', pathWithoutBase)

	// 言語プレフィックスを除去
	// パターン1: /en/ -> /
	// パターン2: /en -> /
	// パターン3: en/ -> /
	const pathWithoutLang = pathWithoutBase.replace(new RegExp(`^/?${currentLang}(/|$)`), '') || '/'
	console.log('pathWithoutLang:', pathWithoutLang)

	// 新しいパスを生成
	const normalizedPath = pathWithoutLang.startsWith('/') ? pathWithoutLang : `/${pathWithoutLang}`
	const result = `${basePath}/${targetLang}${normalizedPath}`
	console.log('getAlternatePath result:', result)

	return result
}

export function getPathWithoutLang(path: string): string {
	// 言語プレフィックスを除去したパスを返す
	return path.replace(/^\/(ja|en)/, '') || '/'
}

export function getTagKeyFromSlug(lang: Languages, slug: string): string | undefined {
	const langUI = ui[lang]
	for (const key in langUI) {
		if (key.endsWith('.slug') && langUI[key as UIKeys] === slug) {
			return key.replace('.slug', '')
		}
	}
	return undefined
}

export function isCurrentLang(path: string, lang: Languages): boolean {
	return path.startsWith(`/${lang}/`) || path === `/${lang}`
}
