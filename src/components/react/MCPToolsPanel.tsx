import { useState, useEffect } from 'react'
import { getAvailableTools, executeTool } from '@/utils/mcp'

interface Tool {
	name: string
	description?: string
	inputSchema?: {
		type: string
		properties?: Record<string, unknown>
	}
}

export default function MCPToolsPanel() {
	const [tools, setTools] = useState<Tool[]>([])
	const [selectedTool, setSelectedTool] = useState<string>('')
	const [toolResult, setToolResult] = useState<string>('')
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string>('')

	useEffect(() => {
		// 利用可能なツールを読み込む
		loadTools()
	}, [])

	const loadTools = async () => {
		try {
			setIsLoading(true)
			const availableTools = await getAvailableTools()
			setTools(availableTools)
			setError('')
		} catch (err) {
			setError(`ツールの読み込みに失敗しました: ${err}`)
			console.error('ツールの読み込みエラー:', err)
		} finally {
			setIsLoading(false)
		}
	}

	const handleExecuteTool = async () => {
		if (!selectedTool) return

		try {
			setIsLoading(true)
			setError('')

			// 基本的な引数でツールを実行
			const result = await executeTool(selectedTool, {})
			setToolResult(JSON.stringify(result, null, 2))
		} catch (err) {
			setError(`ツールの実行に失敗しました: ${err}`)
			console.error('ツール実行エラー:', err)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className='p-4 border rounded-lg bg-white dark:bg-gray-800'>
			<h3 className='text-lg font-semibold mb-4'>MCP ツール</h3>

			{error && (
				<div className='mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded'>
					{error}
				</div>
			)}

			{isLoading ? (
				<div className='text-center py-4'>
					<span className='text-gray-500'>読み込み中...</span>
				</div>
			) : (
				<>
					<div className='mb-4'>
						<label className='block text-sm font-medium mb-2'>利用可能なツール:</label>
						<select
							value={selectedTool}
							onChange={(e) => setSelectedTool(e.target.value)}
							className='w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600'
						>
							<option value=''>ツールを選択してください</option>
							{tools.map((tool) => (
								<option key={tool.name} value={tool.name}>
									{tool.name} - {tool.description || 'No description'}
								</option>
							))}
						</select>
					</div>

					<button
						onClick={handleExecuteTool}
						disabled={!selectedTool || isLoading}
						className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed'
					>
						ツールを実行
					</button>

					{toolResult && (
						<div className='mt-4'>
							<h4 className='text-sm font-medium mb-2'>実行結果:</h4>
							<pre className='bg-gray-100 dark:bg-gray-900 p-3 rounded text-sm overflow-auto'>
								{toolResult}
							</pre>
						</div>
					)}
				</>
			)}
		</div>
	)
}
