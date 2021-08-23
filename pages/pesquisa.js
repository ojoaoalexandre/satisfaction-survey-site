import React, { useState } from 'react'
import PageTitle from '../components/PageTitle'

const Pesquisa = () => {
    const [ form, setForm ] = useState({
        Nome: '',
        Email: '',
        Whatsapp: '',
        Nota: ''
    })

    const [ success, setSuccess ] = useState(false)
    const [ back, setBack ] = useState({})
    const notas = [0, 1, 2, 3, 4, 5]

    const save = async () => {
        try {
            const response = await fetch('/api/save', {
                method: 'POST',
                body: JSON.stringify(form)
            })
            const data = await response.json()
            setSuccess(true)
            setBack(data)
        } catch (err) {

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
            <PageTitle title="Pesquisa" />
            <h1>Pesquisa</h1>
            { !success &&
            <div>
                <label>Nome:</label>
                <input type="text" onChange={ onChange } name="Nome" value={ form.Nome } />
                <label>Email:</label>
                <input type="text" onChange={ onChange } name="Email" value={ form.Email } />
                <label>Whatsapp:</label>
                <input type="text" onChange={ onChange } name="Whatsapp" value={ form.Whatsapp } />
                
                { notas.map(nota => {
                    return (<label>{ nota }<input type="radio" name="Nota" value={nota} onChange={ onChange } /></label>)
                    })
                }
                <button onClick={ save }>Enviar</button>
            </div>
            }
            { success &&
            <div>
                <p>Obrigado por contribuir com sua sugestão ou crítica!</p>
                { back.showCoupon &&
                <div>
                    <p>Aqui está o seu Cupom:</p>
                    <p>{ back.Cupom }</p>
                    <p>{ back.Promoção }</p>
                </div>
                }
            </div>
            }
        </div>
    )
}

export default Pesquisa