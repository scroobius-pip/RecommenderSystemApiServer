import casual from 'casual'

const types = ['music', 'video']
const sources = ['spotify', 'youtube']
const Medium = () => ({
  id: casual.uuid,
  name: casual.words(7),
  type: casual.random_element(types),
  source: casual.random_element(sources),
  url: casual.url
})

const Media = []

for (let x = 0; x < 50; ++x) {
  Media.push(Medium())
}

const mock = {
  Query: {
    media: () => Media
  }
}

export default mock
