import schema from './schema'
import Resolvers from './resolvers'
// import mockResolvers from './mock'
import express from 'express'
import bodyParser from 'body-parser'
import {graphqlExpress, graphiqlExpress} from 'apollo-server-express'
import {makeExecutableSchema} from 'graphql-tools'

// Put together a schema
const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers: Resolvers
})

// Initialize the app
const app = express()

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: executableSchema }))

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

// Start the server
app.listen(3000, () => {
  console.log('Go to http://localhost:3000/graphiql to run queries!')
})
