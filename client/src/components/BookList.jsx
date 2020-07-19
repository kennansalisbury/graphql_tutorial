import React from 'react'
import {gql, useQuery} from '@apollo/client'


const getBooksQuery = gql`
{
    books {
        name
        id
    } 
}
`

const BookList = props => {

    const {loading, error, data} = useQuery(getBooksQuery) 

    if (loading) return <p>Loading...</p>
    if (error) {
        console.log(error)
        return <p>Error :(</p> 
        }

    return data.books.map(({name, id}) => (
        <div key={id}>
            <p>{id} : {name}</p>
        </div>
    ))
}

export default BookList