import Neo4jGraphql from './neo4j.connector'
const neo4j = new Neo4jGraphql()

const resolvers = {
  Query: {
    async media (root, { user_id, type, pagination }, context, info) {
      try {
        return neo4j.getMedia(user_id, type, pagination)
      } catch (error) {
        throw error
      }
    }
  }
}

export default resolvers
