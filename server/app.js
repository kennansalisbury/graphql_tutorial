const express = require('express')


//express-graphql allows express server to communicate with and undesrtand graphql
    //use this as a middleware on our query, this acts a single endpoint for querying the data
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')

//connect to mlab database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/gql_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
mongoose.connection.once('open', () => {
    console.log('connected to database')
})

const app = express();

//graphql middleware
app.use('./graphql', graphqlHTTP({
    //pass schema that tells express graphql about our data and how our graph will look
    //same as schema: schema
    schema,
    graphiql: true
}))


app.listen(3000, () => {
    console.log('now listening on port 3000')
})