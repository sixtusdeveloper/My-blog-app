import { useSelector } from 'react-redux';  // Import the useSelector hook from react-redux

export default function ThemeProvider({ children }) {
    const { theme } = useSelector(state => state.theme);  // Get the theme from the state
  return (
    <div className={theme}>
        <div className='bg-white text-gray-700 dark:text-gray-200 dark:bg-[rgb(16,23,42)] h-[100vh] min-h-screen'>

        {children}

        </div>
    </div>
  )
}
