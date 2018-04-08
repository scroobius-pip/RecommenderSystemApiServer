import config from './config'
import nodeCleanup from 'node-cleanup'

const neo4j = require('neo4j-driver').v1
const { host, port, username, password } = config.neo4j

export default class Neo4jGraphql {
  constructor () {
    try {
      this.client = neo4j.driver(host, neo4j.auth.basic(username, password))
      nodeCleanup(() => {
        console.log('Node is exiting cleaning up neo4j...')
        this.client.close()
      })
    } catch (error) {
      console.log(error)
      throw error
    }
  }
  async getMedia (user_id, type = 'all', pagination = { page: 1, limit: 5 }) {
    let { page, limit } = pagination
    page = Math.abs(page)
    limit = Math.abs(limit)

    // query for hybrid recommendation
    const hybrid_query = `
    Match(u:User{id:{user_id}})-[s:ISSIMILAR]-(o:User)
    With o,u
    Order By s.similarity Limit 5
    Match(o)-[:LIKES]-(om:Media)
    Where Not (u)-[:LIKES]-(om)
    Return Distinct om as Media
    Skip {skip} Limit {limit} 

    Union


    MATCH (u:User{id:{user_id}})-[:LIKES]-(m:Media)
    WITH collect(m) as mu
    UNWIND mu as m
    MATCH (m)-[s:ISSIMILAR]-(o:Media)
    WHERE NOT o IN mu
    WITH o ORDER BY s.similarity DESC
    RETURN DISTINCT o as Media
    Skip {skip} Limit {limit}
    `
    console.log(`skip: ${(limit * (page - 1))} limit:${limit}`)
    const session = this.client.session()
    // const result = await session.run(hybrid_query, { user_id: user_id, limit: limit, skip: (limit * (page - 1)) })
    // return result.records
    const result = await session.readTransaction((transaction) => {
      return transaction.run(hybrid_query, { user_id: user_id, limit: limit, skip: (limit * (page - 1)) })
    })
    session.close()
    return result.records.map((record) => {
      return record.get('Media')['properties']
    })
  }
}
