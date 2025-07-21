import { useState, useEffect } from 'react'
import { SunIcon } from './SunIcon'
import { MoonIcon } from './MoonIcon'

export const ToggleTheme = () => {
	const [isDarkMode, setIsDarkMode] = useState(false)

	useEffect(() => {
		const bodyThemeIsDark = document.documentElement.classList.contains('dark')
		setIsDarkMode(bodyThemeIsDark)

		const handleThemeChange = (event: CustomEvent) => {
			const newTheme = event.detail.theme
			setIsDarkMode(newTheme === 'dark')
		}

		document.addEventListener('theme-change', handleThemeChange as EventListener)

		return () => {
			document.removeEventListener('theme-change', handleThemeChange as EventListener)
		}
	}, [])

	const toggle = () => {
		const themeChangeEvent = new CustomEvent('theme-change', {
			detail: {
				theme: isDarkMode ? 'light' : 'dark'
			}
		})
		document.dispatchEvent(themeChangeEvent)
	}

	return (
		<button
			onClick={toggle}
			className='group w-full h-full p-2 rounded-md transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-gray-800'
			aria-label='Toggle Theme'
		>
			{isDarkMode ? <SunIcon /> : <MoonIcon />}
		</button>
	)
}
