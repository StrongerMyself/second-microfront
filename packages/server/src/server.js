const path = require('path')

const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()
app.disable('x-powered-by')
app.use(cookieParser())

const useApp = require('./registration')(app)

useApp('app-filters', '../../app-filters/dist/')

const port = process.env.SERVER_PORT || 1234
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})
