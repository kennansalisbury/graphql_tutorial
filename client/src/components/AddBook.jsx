import React, {useState} from 'react'
import {useQuery, useMutation} from '@apollo/client'

//queries & mutations
import {
    getAuthorsQuery, getBooksQuery, 
    addBookMutation
} from '../queries/queries'

const AddBook = props => {

    //useQuery hooks
    const {loading, error, data} = useQuery(getAuthorsQuery) 
    
    const [addBook, { mutationData }] = useMutation(addBookMutation)

    //component state
    const [bookName, setBookName] = useState('')
    const [genre, setGenre] = useState('')
    const [authorId, setAuthorId] = useState('')

    // const handleSubmit

    if (loading) return <p>Loading...</p>

    if (error) {
        console.log(error)
        return <p>Error :(</p> 
        }
    
    // console.log(data)
    let authorOptions = data.authors.map(author => {
        return <option key={author.id} value={author.id}>{author.name}</option>
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        
        addBook({ 
            variables: {
                name: bookName,
                genre: genre,
                authorId: authorId
            },
            refetchQueries: [{query: getBooksQuery}]
        })
    }
    
 

    return (
        <div>
            <form id="add-book" onSubmit={(e) => handleSubmit(e)}>
                <div className="field">
                    <label>Book name:</label>
                    <input type="text" value={bookName} onChange={(e) => setBookName(e.target.value)}/>
                </div>

                <div className="field">
                    <label>Genre:</label>
                    <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)}/>
                </div>

                <div className="field">
                    <label>Author:</label>
                    <select onChange={(e) => setAuthorId(e.target.value)}>
                        <option>Select author</option>
                        {authorOptions}
                    </select>
                </div>

                <button>+</button>

            </form>
        </div>
    )
}

export default AddBook