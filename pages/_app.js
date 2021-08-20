import React from 'react'
import '../styles/globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'

const App = ({Component, pageProps}) => {
    return (
        <div>
            <Header />
            <main className="container mx-auto">
                <Component {...pageProps} />
            </main>
            <Footer />
        </div>
    )
}

export default App