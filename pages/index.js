import React from 'react'
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

const Index = () => {
    const {data, error } = useSWR('/api/get-message', fetcher)
    return (<pre>{JSON.stringify(data)}</pre>)
    return (
        <div>
            <h1>Início</h1>
            <p>Mensagem</p>
        </div>
    )
}

export default Index