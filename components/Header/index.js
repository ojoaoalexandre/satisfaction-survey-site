import React from 'react'
import Link from 'next/link'

const Header = () => {
    return (
        <header className="flex justify-between px-10 py-4 bg-gray-100 shadow-md">
            <h1 className="font-bold">
                <Link href="/">
                    <a>Satisfaction Survey</a>
                </Link>
            </h1>
            <nav className="space-x-6">
                <Link href="/sobre">
                    <a>Sobre</a>
                </Link>
                <Link href="/contato">
                    <a>Contato</a>
                </Link>
                <Link href="/pesquisa">
                    <a>Pesquisa</a>
                </Link>
            </nav>
        </header>
    )
}

export default Header