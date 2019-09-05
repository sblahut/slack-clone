const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Chatkit = require('pusher-chatkit-server')
const app = express()

const chatkit = new Chatkit.default({
  instanceLocator: 'v1:us1:d6681f66-159e-4d8f-9db9-903594a57488',
  key: '9f37ba30-d6f4-4ab4-ae25-01a2f651ece9:1WHOGA8FtwFbbO66AGINC0wv4BJKDMmf6VuGyc2b7GA='
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.post('/users', (req, res) => {
  const { username } = req.body

  chatkit
    .createuser({
      name: username,
      id: username
    })
    .then(() => res.sendStatus(201))
    .catch(error => {
      if (error.error_type === 'services/chatkit/user_already_exists') {
        res.sendStatus(200)
      } else {
        res.status(error.statusCode).json(error)
      }
    })
})
const PORT = 3001
app.listen(PORT, err => {
  if (err) {
    console.error(err)
  } else {
    console.log(`Running on port ${PORT}`)
  }
})
