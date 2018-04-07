import schema from './schema'
import resolvers from './resolvers'
import mock_resolvers from './mock'

const express = require('express')
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const { makeExecutableSchema } = require('graphql-tools')

// Some fake data

// Put together a schema
const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  mock_resolvers
})

// Initialize the app
const app = express()

// The GraphQL endpoint
app.use('/media', bodyParser.json(), graphqlExpress({ executableSchema }))

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

// Start the server
app.listen(3000, () => {
  console.log('Go to http://localhost:3000/graphiql to run queries!')
})
