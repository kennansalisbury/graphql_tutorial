import React from 'react'
import {useQuery} from '@apollo/client'
import {getAuthorsQuery} from '../queries/queries'

const AddBook = props => {

    const {loading, error, data} = useQuery(getAuthorsQuery) 

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

    return (
        <div>
            <form id="add-book">
                <div className="field">
                    <label>Book name:</label>
                    <input type="text"/>
                </div>

                <div className="field">
                    <label>Genre:</label>
                    <input type="text"/>
                </div>

                <div className="field">
                    <label>Author:</label>
                    <select>
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