//define schema of data

const graphql = require('graphql')
const _ = require('lodash')

//destructuring takes the variable from graphql
const {
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLInt
} = graphql

//dummy data
let books = [
    {name: 'Name of the Wind', genre: 'Fantasy', id: '1'},
    {name: 'The Final Empire', genre: 'Fantasy', id: '2'},
    {name: 'The Long Earth', genre: 'Sci-Fi', id: '3'}
]

let authors = [
    {name: 'Patrick Rothfuss', age: 44, id: '1'},
    {name: 'Brandon Sanderson', age: 42, id: '2'},
    {name: 'Terry Pratchett', age: 66, id: '3'}
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        //this is a function because later when we have multiple types referencing each other
            //unless fields are wrapped in a function one type might not know what another type is
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: { type: GraphQLString}
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        //this is a function because later when we have multiple types referencing each other
            //unless fields are wrapped in a function one type might not know what another type is
        id: {type: GraphQLID},
        name: { type: GraphQLString},
        age: {type: GraphQLInt}
    })
})

//root queries - where we access the data graph (ex: books, authors)
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        //name of how it will be queried from the frontend
        book: {
            type: BookType,
            //these are the arguments I expect them to pass along to identify which book is being queried
            args: { id: {type: GraphQLID}},
            resolve(parent, args) {
                //code to get data from db or other source
                //parent will come into play when we have relationships
                //args.id used to access the id into our database query code
                return _.find(books, {id: args.id})
            }
        },
        author: {
            type: AuthorType,
            args: { id: {type: GraphQLID}},
            resolve(parent, args) {
                return _.find(authors, {id: args.id})
            }
        }
    }
})

module.exports = new GraphQLSchema({
    //initial root query for this schema
    query: RootQuery
})