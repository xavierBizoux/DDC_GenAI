// Define the props for the Email component
interface EmailProps {
    isLoading: boolean // A boolean indicating if the email is currently loading
    text: string // The text content of the email
    error: string // An error message, if any error occurred
}

// Define the Email component
const Email = ({ isLoading, text, error }: EmailProps) => {
    // If the email is loading, display a spinner
    if (isLoading) {
        return <p>Generating email ...</p> // Display a spinner while loading
    }

    // If there's an error, display the error message
    if (error) {
        return <p>Error: {error}</p> // Display an error message if there's an error
    }

    // If there's no error and the email is not loading, display the email text
    return (
        <p
            className='text-align-left' // Align the text to the left
            style={{ whiteSpace: 'pre-wrap' }}>
            {' '}
            // Preserve the white spaces in the email text
            {text}
        </p>
    )
}

// Export the Email component as the default export
export default Email
