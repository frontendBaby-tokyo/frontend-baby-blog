#!/usr/bin/env node

import { spawn } from 'child_process'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/**
 * Astro MCPサーバーを起動する
 */
function startMCPServer() {
	console.log('Astro MCPサーバーを起動中...')
	
	const serverPath = join(__dirname, '../node_modules/astro-mcp/dist/index.js')
	
	const server = spawn('node', [serverPath], {
		stdio: ['pipe', 'pipe', 'pipe'],
		env: {
			...process.env,
			ASTRO_PROJECT_ROOT: __dirname,
			NODE_ENV: 'development'
		}
	})

	server.stdout.on('data', (data) => {
		console.log(`MCP Server: ${data.toString()}`)
	})

	server.stderr.on('data', (data) => {
		console.error(`MCP Server Error: ${data.toString()}`)
	})

	server.on('close', (code) => {
		console.log(`MCPサーバーが終了しました。終了コード: ${code}`)
	})

	server.on('error', (error) => {
		console.error('MCPサーバーの起動に失敗しました:', error)
	})

	// プロセス終了時にサーバーも終了
	process.on('SIGINT', () => {
		console.log('MCPサーバーを終了しています...')
		server.kill('SIGINT')
		process.exit(0)
	})

	return server
}

// スクリプトが直接実行された場合
if (import.meta.url === `file://${process.argv[1]}`) {
	startMCPServer()
}

export { startMCPServer }
