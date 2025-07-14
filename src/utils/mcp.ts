import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js'

// MCP クライアントのインスタンス
let mcpClient: Client | null = null

/**
 * MCPクライアントを初期化する
 */
export async function initializeMCPClient(): Promise<Client> {
	if (mcpClient) {
		return mcpClient
	}

	try {
		// Astro MCP サーバーへの接続を設定
		const transport = new StdioClientTransport({
			command: 'node',
			args: ['node_modules/astro-mcp/dist/index.js'],
			env: {
				...process.env,
				ASTRO_PROJECT_ROOT: process.cwd()
			}
		})

		mcpClient = new Client(
			{
				name: 'astro-blog-client',
				version: '1.0.0'
			},
			{
				capabilities: {
					tools: {}
				}
			}
		)

		await mcpClient.connect(transport)
		console.log('MCPクライアントが正常に初期化されました')

		return mcpClient
	} catch (error) {
		console.error('MCPクライアントの初期化に失敗しました:', error)
		throw error
	}
}

/**
 * MCPクライアントを取得する
 */
export function getMCPClient(): Client | null {
	return mcpClient
}

/**
 * MCPクライアントを閉じる
 */
export async function closeMCPClient(): Promise<void> {
	if (mcpClient) {
		await mcpClient.close()
		mcpClient = null
		console.log('MCPクライアントが閉じられました')
	}
}

/**
 * 利用可能なツールを取得する
 */
export async function getAvailableTools() {
	const client = await initializeMCPClient()
	const result = await client.listTools()
	return result.tools
}

/**
 * ツールを実行する
 */
export async function executeTool(name: string, arguments_: Record<string, unknown>) {
	const client = await initializeMCPClient()
	const result = await client.callTool({
		name,
		arguments: arguments_
	})
	return result
}
