import schema from './schema'
import Resolvers from './resolvers'
// import mockResolvers from './mock'
import express from 'express'
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'
import { ApolloEngine } from 'apollo-engine'
import cors from 'cors'
import config from './config'

// Put together a schema
const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers: Resolvers
})

// Initialize the app
const app = express()
app.use(cors())
// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({
  schema: executableSchema,
  tracing: true,
  cacheControl: true

}))

const engine = new ApolloEngine({
  apiKey: 'service:scroobius-pip-440:G8Hw9uiX4-X0OXUPFZzkZA'
})

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

// Start the server
// engine.listen(3000, () => {
//   console.log('Go to http://localhost:3000/graphiql to run queries!')
// })
engine.listen({
  port: config.server.port,
  expressApp: app
}, () => {
  console.log('Go to http://localhost:3000/graphiql to run queries!')
})
