const Schema = `

schema {
    query: Query
}

type Media {
id: String!
name: String!
type: String!
source: String!
url: String!
tags: [String]
}

input page_limit {
    page: Int!
    limit: Int!
}

enum type {
    all
    music
    video
}


`
const Query = `
type Query {
    media(user_id:String!,type:type,pagination:page_limit!):[Media]
}

`
export default [Schema, Query]
