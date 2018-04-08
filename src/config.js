const config = {}

config.server = {
  port: process.env.SERVER_PORT || 3000

}

config.neo4j = {
  host: process.env.NEO4J_HOST || 'bolt://localhost',
  port: process.env.NEO4J_PORT || 7687,
  username: process.env.NEO4J_USERNAME || 'neo4j',
  password: process.env.NEO4J_PASSWORD || 'miriamisnice'
}

export default config
