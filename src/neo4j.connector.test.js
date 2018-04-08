import Neo4jGraphql from './neo4j.connector'
import isPromise from 'is-promise'
import _ from 'lodash'

const neo4j = new Neo4jGraphql()

test('getMedia should return a promise', () => {
  let media = neo4j.getMedia('Taya', 'all', {page: 1, limit: 5})
  expect(isPromise(media)).toBe(true)
})

test('Resolved getMedia should return array', async() => {
  let media = await neo4j.getMedia('Taya', 'all', {page: 1, limit: 5})
  expect(media).toBeInstanceOf(Array)
})

test('Resolved getMedia array items should be an object with correct attributes', async() => {
  let media = await neo4j.getMedia('Taya', 'all', {page: 1, limit: 5})

  expect(media[0]).toHaveProperty('name')
  expect(media[0]).toHaveProperty('id')
  expect(media[0]).toHaveProperty('source')
  expect(media[0]).toHaveProperty('type')
  expect(media[0]).toHaveProperty('url')
})

test('pages should not have repeat items', async() => {
  let media_page1 = await neo4j.getMedia('Taya', 'all', {page: 1, limit: 5})
  let media_page2 = await neo4j.getMedia('Taya', 'all', {page: 2, limit: 5})

  let pages1_length = media_page1.length
  let pages1_unique_length = _.uniqBy(media_page1, 'name').length

  let pages2_length = media_page2.length
  let pages2_unique_length = _.uniqBy(media_page2, 'name').length

  expect(pages1_length).toBe(pages1_unique_length)
  expect(pages2_length).toBe(pages2_unique_length)
})
