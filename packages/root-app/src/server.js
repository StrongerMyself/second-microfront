const path = require('path')
const express = require('express')
const cookieParser = require('cookie-parser')
const staticProxy = require('express-static-proxy')

const app = express()
app.disable('x-powered-by')
app.use(cookieParser())

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '/views'))
app.use('/dist', express.static(`${__dirname}/../dist`))

app.use('/static', staticProxy({
  target: {
    'protocol' : 'http',
    'hostname' : 'localhost',
    'pathname': '/static',
    'port': 3001
  },
  changeOrigin: true,
  prependPath: true,
  regex: 'jpeg|gif|png|jpg|js|css|ico|woff|svg|ttf|json|map'
}))

app.get('/catalog', require('./controllers/catalog'))
app.get('/', require('./controllers/home'))
app.get('*', require('./controllers/not-found'))

const port = process.env.SERVER_PORT || 3000
app.listen(port, () => {
  console.log(`RootApp listen on port ${port}...`)
})
