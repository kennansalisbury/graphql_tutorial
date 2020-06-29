const graphql = require('graphql')
const _ = require('lodash')
const Book = require('../models/book')
const Author = require('../models/author')

//destructuring takes the variable from graphql
const {
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        //this is a function because when we have types referencing each other
            //if not in a function, will throw an error reading top to bottom because the referenced type (ex: author type) has not been defined yet
            //wrapping in a function allows the code to be read from top to bottom, and then the fields/references are only read once a query is executed
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: { type: GraphQLString},
        //author relationship
        author: {
            type: AuthorType,
            resolve(parent, args){
                //parent object includes data on parent (book)
                // return _.find(authors, {id: parent.authorId})
                return Author.findById(parent.authorId)
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        //this is a function because later when we have multiple types referencing each other
            //unless fields are wrapped in a function one type might not know what another type is
        id: {type: GraphQLID},
        name: { type: GraphQLString},
        age: {type: GraphQLInt},
        //book relationship
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                // return _.filter(books, {authorId: parent.id})
                return Book.find({authorId: parent.id})
            }
        }
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
                // return _.find(books, {id: args.id})
                return Book.findById(args.id)
            }
        },
        author: {
            type: AuthorType,
            args: { id: {type: GraphQLID}},
            resolve(parent, args) {
                // return _.find(authors, {id: args.id})
                return Author.findById(args.id)
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                // return books
                return Book.find({})
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                // return authors
                return Author.find({})
            }
        }
    }
})


//mutation explicitly defines what data can be mutated (modified, added, deleted, etc.)
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {type: GraphQLString},
                age: {type: GraphQLInt}
            },
            resolve(parent, args) {
                let author = new Author({
                    name: args.name,
                    age: args.age
                })
                //have to return so that in our mutation query we can identify the data we want back
                return author.save()
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: {type: GraphQLString},
                genre: {type: GraphQLString},
                authorId: {type: GraphQLID}
            },
            resolve(parent, args) {
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                })
                //have to return so that in our mutation query we can identify the data we want back
                return book.save()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})