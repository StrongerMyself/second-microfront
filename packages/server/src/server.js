const path = require('path')

const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()
app.disable('x-powered-by')
app.use(cookieParser())

const useApp = require('./registration')(app)

useApp('catalog-filters', '../../catalog-filters/dist/')

const port = process.env.SERVER_PORT || 3001
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})
