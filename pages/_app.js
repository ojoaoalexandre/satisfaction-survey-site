import React from 'react'
import '../styles/globals.css'

const App = ({Component, pageProps}) => {
    return (
        <div>
            <h1>Hello</h1>
            <Component {...pageProps} />
        </div>
    )
}

export default App