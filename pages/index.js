import React from 'react'
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

const Index = () => {
    const {data, error } = useSWR('/api/get-message', fetcher)
    return (
        <div>
            <h1>Início</h1>
            {!data && <p>Carregando...</p>}
            {!error && data && data.showMessage &&
                <p>{ data.message }</p>
            }
        </div>
    )
}

export default Index