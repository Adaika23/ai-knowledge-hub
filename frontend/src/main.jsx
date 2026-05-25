/*
========================================
MAIN ENTRY FILE
This file starts the React application
========================================
*/

/* Import React StrictMode */
import { StrictMode } from 'react'

/* Import React root renderer */
import { createRoot } from 'react-dom/client'

/*
Import the MAIN global stylesheet

IMPORTANT:
We now use styles.css instead of index.css
*/
import './styles.css'

/* Import the main App component */
import App from './App.jsx'

/*
Render the application into the HTML root div
*/
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)