const path = require('path')
const express = require('express')
const cookieParser = require('cookie-parser')
const staticProxy = require('express-static-proxy')

const staticProxySettings = {
  target: {
    'protocol' : 'http',
    'hostname' : 'localhost',
    'pathname': '/static',
    'port': 3001
  },
  changeOrigin: true,
  prependPath: true,
  regex: 'jpeg|gif|png|jpg|js|css|ico|woff|svg|ttf|json|map'
};

const app = express()
app.disable('x-powered-by')
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '/views'))
app.use('/static', staticProxy(staticProxySettings))
app.use('/public', express.static(`${__dirname}/../public`))
app.use(cookieParser())

app.get('/catalog', require('./controllers/catalog'))
app.get('/', require('./controllers/home'))
app.get('*', require('./controllers/not-found'))

const port = process.env.SERVER_PORT || 3000
app.listen(port, () => {
  console.log(`Listening on port ${port}...`)
})
