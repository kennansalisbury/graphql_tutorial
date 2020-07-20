import {gql} from '@apollo/client'


const getBooksQuery = gql`
    {
        books {
            name
            id
        } 
    }
`

const getAuthorsQuery = gql`
    {
        authors {
            name
            id
        }
    }
`

//mutations
const addBookMutation = gql`
    mutation {
        addBook(name: $name, genre: $genre, authorId: $authorId) {
            name
            id
        }
    }
`

export {getBooksQuery, getAuthorsQuery, addBookMutation}