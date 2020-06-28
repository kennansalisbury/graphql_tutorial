//define schema of data

const graphql = require('graphql')

//destructuring takes the variable from graphql
const {GraphQLObjectType} = graphql

const BookType = new GraphQLObjectType