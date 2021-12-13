import React, { useState } from 'react'
import useSWR from 'swr'
import Star from '../components/Form/Star'
import Message from '../components/Message'
import SEO from '../components/SEO'

const fetcher = (...args) => fetch(...args).then(res => res.json())

const Index = () => {
    const [form, setForm] = useState({})
    const [saveInput, setSaveInput] = useState({})
    const { data, error } = useSWR('/api/getMessage', fetcher)
    const [hoverStar, setHoverStar] = useState({
        attendance: '',
        product: ''
    })

    const stars = [1, 2, 3, 4, 5]

    const save = async event => {
        event.preventDefault()
        const response = await fetch(`/api/save`, {
            method: 'POST',
            body: JSON.stringify({ form, data })
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

    const hover = event => {
        event.preventDefault()
        const value = event.target.value
        const key = event.target.name

        setHoverStar(old => ({
            ...old,
            [key]: value
        }))

    }

    const unHover = event => {
        event.preventDefault()
        const value = event.target.value
        const key = event.target.name

        setHoverStar(old => ({
            ...old,
            [key]: ''
        }))
    }


    return (
        <>
            <SEO title='Início' />
            <section className="py-4 grid grid-cols-1 md:grid-cols-2 container mx-auto px-4 gap-8 place-items-center">
                <div className="flex flex-col h-full justify-center">
                    <div className="flex flex-col max-w-md gap-4">
                        <div>
                            <h2 className="text-xl">
                                <span className='font-bold'>Olá, tudo bem?</span>
                                <span>👋</span>
                            </h2>
                            <p className="text-3xl">Estamos em busca de melhorar cada vez mais nossos serviços e sua opinião é nosso principal indicador!</p>
                        </div>
                        <div className="px-4 py-2 bg-blue-50 border-l-4 border-gray-800 rounded-sm">
                            {!data && <p>Carregando...</p>}
                            {!error && data && data.showMessage &&
                                <p>{data.message}</p>
                            }
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full items-center">
                    {!saveInput.subscribe &&
                        <form className="flex flex-col w-full max-w-md gap-3">

                            {/* name field */}
                            <div className="flex flex-col">
                                <label className="font-semibold">Nome</label>
                                <input type="text" name="name" onChange={event => change(event)} className="border rounded-sm px-2" />
                                {saveInput.fieldsRequiredEmpty && saveInput.fieldsRequiredEmpty.includes('name') &&
                                    <Message message="Insira seu nome" />
                                }
                            </div>

                            {/* email field */}
                            <div className="flex flex-col">
                                <label className="font-semibold">Email</label>
                                <input type="email" name="email" onChange={event => change(event)} className="border rounded-sm px-2" />
                                {saveInput.fieldsRequiredEmpty && saveInput.fieldsRequiredEmpty.includes('email') &&
                                    <Message message="Insira seu email" />
                                }
                            </div>

                            {/* attendance field */}
                            <section className='flex flex-col gap-2'>
                                <header className='flex flex-col'>
                                    <h2 className='flex gap-1'>
                                        <span>🤖</span>
                                        <span className='font-bold'>Atendimento</span>
                                    </h2>
                                    <p className='text-sm max-w-sm'>Nos informe uma nota para a qualidade do atendimento</p>
                                </header>
                                <div className='flex gap-2 h-8'>
                                    {stars.map(star => {
                                        return (
                                            <div key={star} onMouseEnter={event => hover(event)} onMouseLeave={event => unHover(event)} className={`${(form.attendance >= star || hoverStar.attendance >= star) ? 'text-yellow-500' : 'text-gray-300'}`} >
                                                <Star name="attendance" value={star} size="8" handleClick={change} />
                                            </div>
                                        )
                                    })}
                                </div>
                                {saveInput.fieldsRequiredEmpty && saveInput.fieldsRequiredEmpty.includes('attendance') &&
                                    <Message message="Informe sua nota" />
                                }
                            </section>

                            {/* product field */}
                            <section className='flex flex-col gap-2'>
                                <header className='flex flex-col'>
                                    <h2 className='flex gap-1'>
                                        <span>🤖</span>
                                        <span className='font-bold'>Produtos</span>
                                    </h2>
                                    <p className='text-sm max-w-sm'>Nos informe uma nota para a qualidade dos produtos e/ou serviços prestados</p>
                                </header>
                                <div className='flex gap-2 h-8'>
                                    {stars.map(star => {
                                        return (
                                            <div key={star} onMouseEnter={event => hover(event)} onMouseLeave={event => unHover(event)} className={`${(form.product >= star || hoverStar.product >= star) ? 'text-yellow-500' : 'text-gray-300'}`} >
                                                <Star name="product" value={star} size="8" handleClick={change} />
                                            </div>
                                        )
                                    })}
                                </div>
                                {saveInput.fieldsRequiredEmpty && saveInput.fieldsRequiredEmpty.includes('product') &&
                                    <Message message="Informe sua nota" />
                                }
                            </section>

                            {/* message field */}
                            <div className="flex flex-col">
                                <label className="font-semibold">Sua Opinião</label>
                                <textarea name="message" rows="3" onChange={event => change(event)} className="border rounded-sm"></textarea>
                                {saveInput.fieldsRequiredEmpty && saveInput.fieldsRequiredEmpty.includes('message') &&
                                    <p>Falta o nome aqui</p>
                                }
                            </div>

                            <div className='flex'>
                                <button onClick={event => save(event)} className=' px-4 py-1 rounded-sm bg-gray-800 text-white'>Enviar Avaliação</button>
                            </div>
                        </form>}
                    {saveInput.subscribe && data.showMessage &&
                        <div className='flex flex-col p-8 bg-gray-50 rounded-sm w-full max-w-md border-b-4 border-red-800'>
                            <p className='text-center text-5xl' >🥳</p>
                            <h2 className='text-lx font-bold'>Parabéns!</h2>
                            <p><span className='font-semibold'>{saveInput.subscribe.Nome}</span>, seu cupom para utilização na próxima compra é o <span className='font-semibold'>{saveInput.subscribe.Cupom}</span>.
                            </p>

                        </div>
                    }
                    {saveInput.subscribe && !data.showMessage &&
                        <div className='flex flex-col p-8 bg-gray-50 rounded-sm w-full max-w-md border-b-4 border-red-800'>
                            <p className='text-center text-5xl' >🤓</p>
                            <h2 className='text-lx font-bold'>Obrigado!</h2>
                            <p>
                                <span className='font-semibold'>{saveInput.subscribe.Nome}</span>, agradecemos a sua avaliação e estaremos nos esforçando para evoluir nossos serviços a cada feedback.</p>

                        </div>
                    }
                </div>
            </section>
        </>
    )
}

export default Index