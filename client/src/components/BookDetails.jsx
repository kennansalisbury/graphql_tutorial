import React from 'react'
import {useQuery} from '@apollo/client'
import {getBookQuery} from '../queries/queries'


const BookDetails = props => {

    const {loading, error, data} = useQuery(getBookQuery, {
        variables: {id: props.book}
    })

    if(!props.book) {
        return <p>Book Details Here</p> 
    }

    if (loading) return <p>Loading...</p>
    if (error) {
        console.log(error.networkError.result.errors.map(error => error.message))
        return <p>Error :(</p> 
        }

    return (
        <div id="book-details">
            <p>Book Details Here</p> 
            <p>{data.book.name}</p>
        </div>
    )
}

export default BookDetails