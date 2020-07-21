import React, {useState} from 'react'
import {useQuery} from '@apollo/client'
import {getBooksQuery} from '../queries/queries'

import BookDetails from './BookDetails'

const BookList = props => {

    const {loading, error, data} = useQuery(getBooksQuery) 

    const [clickedBookId, setClickedBookId] = useState('')

    if (loading) return <p>Loading...</p>
    if (error) {
        console.log(error)
        return <p>Error :(</p> 
        }

    let list = data.books.map(({name, id}) => (
            <div key={id}>
                <p>{id} : {name}</p>
                <button 
                    onClick={() => setClickedBookId(id)}
                >View Details</button>
            </div>
    
        ))
    
    return (
        <div>
            {list}
            <BookDetails
                book={clickedBookId}
            />
        </div>
    )
        
    
}

export default BookList