// Importing necessary hooks and components from React and external libraries
import { GoogleGenerativeAI } from '@google/generative-ai'
import { useCallback, useEffect, useState } from 'react'
import Email from './components/Email'
import LanguageBar from './components/LanguageBar'

// Interface for defining column properties
interface Column {
    name: string
    label: string
    type: 'string' | 'number'
}

// Functional component App
const App = () => {
    // State variables to manage API data, loading state, selected language, and prompt parameters
    const [apiData, setApiData] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [language, setLanguage] = useState<string>('English')
    const [promptParameters, setPromptParameters] = useState<string>('')
    const [error, setError] = useState<string>('')

    // Function to fetch data from the API
    const fetchData = useCallback(async (promptParameters: string, language: string) => {
        setIsLoading(true) // Setting loading state to true
        const generation_config = { temperature: 0.5 }
        const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY) // Initializing GoogleGenerativeAI with API key
        const model = genAI.getGenerativeModel({ model: 'gemini-pro', generationConfig: generation_config }) // Getting generative model
        const prompt = `${JSON.stringify(
            promptParameters
        )} Generate an email in ${language} to ask for a 10% discount. Provide information about the discounted price, the model and the make.`
        try {
            const result = await model.generateContent(prompt) // Generating content based on prompt
            const response = result.response
            const text = response.text() // Extracting text from response
            setApiData(text)
            setIsLoading(false)
            setError('') // Clear any previous error
        } catch (error: unknown) {
            console.error(error)
            if (error instanceof Error) {
                setError(error.message || 'An error occurred') // Set the error state to the error message
            }
            setIsLoading(false)
        }
    }, [])

    // useEffect hook to handle messages received from the window
    useEffect(() => {
        const onMessage = (event: MessageEvent) => {
            if (event?.data) {
                const { data, columns } = event.data
                // Extracting prompt parameters from received data
                const parameters = columns.map((col: Column, index: number) => ({ [col.label]: data[0][index] }))
                setPromptParameters(parameters)
            }
        }
        // Adding event listener for message event
        window.addEventListener('message', onMessage, false)
        // Removing event listener when component unmounts
        return () => window.removeEventListener('message', onMessage)
    }, [])

    // useEffect hook to fetch data from Google's generative AI when promptParameters or language changes
    useEffect(() => {
        fetchData(promptParameters, language)
    }, [fetchData, promptParameters, language])

    // Rendering LanguageBar and Email components
    return (
        <div className='flex-col space-y-4 '>
            {/* LanguageBar component with handleClick function to set selected language */}
            <LanguageBar handleClick={(selected) => setLanguage(selected)} />
            {/* Email component with isLoading and apiData props */}
            <Email
                isLoading={isLoading}
                text={apiData}
                error={error}
            />
        </div>
    )
}

// Exporting the App component as default
export default App
