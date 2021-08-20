import React from 'react'
import Header from '../Header'
import Footer from '../Footer'

const Layout = ({ children }) => {
    return (
        <div className="h-screen">
            <Header />
                <main className="container mx-auto">
                    { children }
                </main>
            <Footer />
        </div>
    )
}

export default Layout