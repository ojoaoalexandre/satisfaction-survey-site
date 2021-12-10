import React, { useState } from 'react'
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

const Index = () => {
    const [form, setForm] = useState({})
    const [saveInput, setSaveInput] = useState({})
    const { data, error } = useSWR('/api/getMessage', fetcher)

    const save = async event => {
        event.preventDefault()
        const response = await fetch(`/api/save`, {
            method: 'POST',
            body: JSON.stringify(form)
        })
        setSaveInput(await response.json())
    }

    const change = event => {
        event.preventDefault()
        const value = event.target.value
        const key = event.target.name
        setForm(old => ({
            ...old,
            [key]: value
        }))
    }


    return (
        <section className="flex flex-col sm:flex-row flex-grow container mx-auto px-4 gap-2">
            <div className="flex flex-col sm:w-1/2 h-full justify-center">
                <div className="flex flex-col max-w-md gap-4">
                    <h2 className="text-xl font-semibold">Olá, tudo bem?</h2>
                    <p className="text-3xl font-bold">Estamos em busca de melhorar cada vez mais nossos serviços e sua opinião é nosso principal indicador!</p>

                    <div className="px-4 py-2 bg-gray-800 text-white rounded-md">
                        {!data && <p>Carregando...</p>}
                        {!error && data && data.showMessage &&
                            <p>{data.message}</p>
                        }
                    </div>
                </div>
            </div>
            <div className="flex flex-col sm:w-1/2 justify-between py-10">
                {!saveInput.subscribe &&
                    <form className="flex flex-col w-full max-w-md gap-2">
                        <p>{JSON.stringify(saveInput)}</p>
                        <header className="grid grid-cols-3 place-items-center">
                            <div className="bg-gray-800 px-4 py-2 rounded-full">
                                <p className="text-sm">1</p>
                            </div>
                            <p className="px-2 py-4 rounded-full bg-gray-800 text-white text-sm">2</p>
                            <p className="px-2 py-4 rounded-full bg-gray-800 text-white text-sm">3</p>
                        </header>
                        <div className="flex flex-col">
                            <label className="font-semibold">Nome</label>
                            <input type="text" name="name" onChange={event => change(event)} className="border rounded-sm px-2" />
                            {saveInput.fieldsRequiredEmpty && saveInput.fieldsRequiredEmpty.includes('name') &&
                                <p>Falta o nome aqui</p>
                            }
                        </div>
                        <div className="flex flex-col">
                            <label className="font-semibold">Email</label>
                            <input type="email" name="email" onChange={event => change(event)} className="border rounded-sm px-2" />
                            {saveInput.fieldsRequiredEmpty && saveInput.fieldsRequiredEmpty.includes('email') &&
                                <p>Falta o nome aqui</p>
                            }
                        </div>
                        <div className="flex gap-4 text-sm text-gray-800">
                            <button name="note" value="1" onClick={event => change(event)} className={`px-4 rounded-sm ${form.note >= 1 ? 'bg-red-500' : 'bg-gray-200'} font-bold`}>1</button>
                            <button name="note" value="2" onClick={event => change(event)} className={`px-4 rounded-sm ${form.note >= 2 ? 'bg-red-700' : 'bg-gray-200'}`}>2</button>
                            <button name="note" value="3" onClick={event => change(event)} className={`px-4 rounded-sm ${form.note >= 3 ? 'bg-yellow-500' : 'bg-gray-200'}`}>3</button>
                            <button name="note" value="4" onClick={event => change(event)} className={`px-4 rounded-sm ${form.note >= 4 ? 'bg-green-500' : 'bg-gray-200'}`}>4</button>
                            <button name="note" value="5" onClick={event => change(event)} className={`px-4 rounded-sm ${form.note >= 5 ? 'bg-green-800' : 'bg-gray-200'}`}>5</button>
                            {saveInput.fieldsRequiredEmpty && saveInput.fieldsRequiredEmpty.includes('note') &&
                                <p>Falta a nota aqui</p>
                            }
                        </div>
                        <div className="flex flex-col">
                            <label>Sua Opinião</label>
                            <textarea name="message" rows="5" onChange={event => change(event)} className="border rounded-sm"></textarea>
                            {saveInput.fieldsRequiredEmpty && saveInput.fieldsRequiredEmpty.includes('message') &&
                                <p>Falta o nome aqui</p>
                            }
                        </div>
                        <button onClick={event => save(event)}>Gerar Cupom</button>
                    </form>}
                {saveInput.subscribe &&
                    <div>
                        <p>Parabéns!</p>
                    </div>
                }
            </div>
        </section>
    )
}

export default Index