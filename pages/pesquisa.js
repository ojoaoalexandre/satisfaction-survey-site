import React, { useState } from 'react'
import Link from 'next/link'

const Pesquisa = () => {
    const [ form, setForm ] = useState({
        Nome: '',
        Email: '',
        Whatsapp: ''
    })

    const save = async () => {
        try {
            const response = await fetch('/api/save', {
                method: 'POST',
                body: JSON.stringify(form)
            })
            const data = await response.json()
        } catch (err) {
            console.log(data)
        }
    }

    const onChange = event => {
        const value = event.target.value
        const key = event.target.name
        setForm(old => ({
            ...old,
            [key]: value
        }))
    }

    return (
        <div>
            <h1>Pesquisa</h1>
            <label>Nome:</label>
            <input type="text" onChange={ onChange } name="Nome" value={ form.Nome } />
            <label>Email:</label>
            <input type="text" onChange={ onChange } name="Email" value={ form.Email } />
            <label>Whatsapp:</label>
            <input type="text" onChange={ onChange } name="Whatsapp" value={ form.Whatsapp } />
            <button onClick={ save }>Enviar</button>
        </div>
    )
}

export default Pesquisa