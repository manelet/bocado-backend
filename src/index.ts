import { resolve } from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { graphqlUploadExpress } from 'graphql-upload'
import { ApolloServer } from 'apollo-server-express'

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: resolve(__dirname, "../.env") })
}

import { connect } from './mongo'
import schema from './schema'
import services from './rest/services'
import auth from './rest/auth'

const app = express()
const PORT = process.env.PORT || 4000
const server = new ApolloServer({
  schema,
  playground: { endpoint: '/graphql' },
  introspection: true,
  tracing: true,
  uploads: false
})   

connect()
  .then(() => {
    app.use(bodyParser.json())
    app.use(cors())    
    app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }))
    server.applyMiddleware({ app })
    app.use('/auth', auth)
    app.use('/', services)
    
    app.listen(PORT, () => console.log(`[express] Started on ${PORT}`))
    return app
  })
  .catch(e => {
    throw e
  })