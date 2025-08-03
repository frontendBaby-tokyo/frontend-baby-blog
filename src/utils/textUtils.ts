/**
 * エスケープされた改行文字を実際の改行文字に変換する
 *
 * @description 文字列中の `\\n` を実際の改行文字 `\n` に置換します。
 * マークダウンやその他のテキストデータで、エスケープされた改行文字を
 * 実際の改行として表示したい場合に使用します。
 *
 * @param text - 変換対象の文字列
 * @returns 改行文字が正規化された文字列
 *
 * @example
 * ```typescript
 * const text = "Hello\\nWorld\\nTest"
 * const normalized = normalizeLineBreaks(text)
 * console.log(normalized) // "Hello\nWorld\nTest"
 * ```
 */
export function normalizeLineBreaks(text: string): string {
	return text.replace(/\\n/g, '\n')
}
