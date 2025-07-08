/**
 * 与えられた文字列内のすべての空白文字をハイフン（-）に置換して、スラッグ形式の文字列を生成します。
 *
 * @param text 変換対象の文字列
 * @returns スラッグ化された文字列
 */
export function sluglify(text: string) {
	return text.replace(/\s+/g, '-')
}

export function unsluglify(text: string) {
	return text.replace(/-/g, ' ')
}
