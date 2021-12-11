import React from 'react'
import Link from 'next/link'

const Header = () => {
    return (
        <header className="py-4 bg-gray-800 text-white shadow-md">
            <div className="mx-auto container flex flex-col sm:flex-row justify-center items-center sm:justify-between gap-2 px-4">
                <Link href="/">
                    <a>
                        <p className="text-xl">Alexandre<span className="font-bold">Bekor</span></p>
                    </a>
                </Link>

                {/* <nav className="space-x-6">
                    <Link href="/about">
                        <a>Sobre</a>
                    </Link>
                    <Link href="/contact">
                        <a>Contato</a>
                    </Link>
                </nav> */}
            </div>
        </header>
    )
}

export default Header