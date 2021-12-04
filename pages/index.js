import React, { useState } from 'react'
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

const Index = () => {
    const { data, error } = useSWR('/api/getMessage', fetcher)

    return (
        <section className="flex flex-col sm:flex-row flex-grow container mx-auto px-4 gap-2">
            <div className="flex flex-col sm:w-1/2 h-full justify-center">
                <div className="flex flex-col max-w-md gap-4">
                    <h2 className="text-xl font-semibold">Olá, tudo bem?</h2>
                    <p className="text-5xl font-bold">Ficaríamos muito gratos se pudesse nos deixar a sua opinião!</p>

                    <div className="px-4 py-2 bg-gray-800 text-white rounded-sm">
                        {!data && <p>Carregando...</p>}
                        {!error && data && data.showMessage &&
                            <p>{data.message}</p>
                        }
                    </div>
                </div>
            </div>
            <div className="flex flex-col sm:w-1/2 justify-between py-10">
                <form className="flex flex-col w-full max-w-md gap-2">
                    <div>
                        <h2>Dados para o cupom</h2>
                    </div>
                    <div className="flex flex-col">
                        <label className="font-semibold">Nome</label>
                        <input type="text" className="border rounded-sm px-2" />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-semibold">Email</label>
                        <input type="email" className="border rounded-sm px-2" />
                    </div>

                    <div>
                        <h2>Nossos Produtos</h2>
                    </div>
                    <label className="font-semibold">Email</label>
                    <input type="email" />

                    <button>Avaliar</button>
                </form>
            </div>
        </section>
    )
}

export default Index