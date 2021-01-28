const path = require('path')

const express = require('express')
const cookieParser = require('cookie-parser')

const registration = require('./registration')
// const site = require('./controllers/site')

const app = express()
app.disable('x-powered-by')
app.use(cookieParser())
// app.use('/static', express.static(`${__dirname}/../build`))
// app.use('/public', express.static(`${__dirname}/../public`))

// app.use('/admin', admin)
// app.use('/*', site)

registration(app)('app-filters', '../../app-filters/dist/')

const port = process.env.SERVER_PORT || 1234
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})
