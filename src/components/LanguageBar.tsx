// Importing the useState and useCallback hooks from React
import { useCallback, useState } from 'react'

// Defining the props interface for the LanguageBar component
// handleClick is a function prop that will be used to handle click events on the language buttons
interface LanguageBarProps {
    handleClick: (selected: string) => void
}

// Functional component LanguageBar accepting handleClick function as prop
const LanguageBar = ({ handleClick }: LanguageBarProps) => {
    // Array of languages to be displayed in the LanguageBar
    const languageList = ['English', 'French', 'Dutch', 'Spanish', 'Portuguese', 'Greek', 'Japanese']

    // State variable 'active' to keep track of the currently selected language
    // Initially set to the first language in the languageList array
    const [active, setActive] = useState<string>(languageList[0])

    // Function to determine the style of the button based on whether it's the currently selected language
    // Uses the useCallback hook for performance optimization
    const getButtonStyle = useCallback(
        (language: string) => {
            return language === active
                ? 'bg-blue-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                : 'bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        },
        [active]
    )

    // Function to handle the click event on a language button
    // Sets the clicked language as the active language and calls the handleClick prop with the selected language
    // Uses the useCallback hook for performance optimization
    const handleButtonClick = useCallback(
        (language: string) => {
            handleClick(language)
            setActive(language)
        },
        [handleClick]
    )

    // Render the LanguageBar component
    return (
        <div className='flex items-center space-x-4 py-2 border-solid border-b-2 border-slate-300'>
            <h2>Choose a language:</h2>
            <ul className='flex flex-row space-x-4'>
                {languageList.map((language) => (
                    <li key={language}>
                        <button
                            onClick={() => handleButtonClick(language)}
                            className={getButtonStyle(language)}>
                            {language}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

// Exporting the LanguageBar component as default
export default LanguageBar
