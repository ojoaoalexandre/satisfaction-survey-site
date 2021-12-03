import React from 'react'
import Link from 'next/link'

const Header = () => {
    return (
        <header className="py-4 bg-gray-800 text-white shadow-md">
            <div className="mx-auto container flex flex-col sm:flex-row justify-center items-center sm:justify-between">
                <Link href="/">
                    <p className="text-xl">Alexandre<span className="font-bold">Bekor</span></p>
                </Link>

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
            </div>
        </header>
    )
}

export default Header