import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import { router } from './router.js'
import db from './db.js'
import path from 'path'

dotenv.config()

const app = express()
const port = 8000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

db.connection({
  url: process.env.DATABASE_URL ?? 'mongodb://localhost:27017/my_app'
})

const CURRENT_DIR = path.resolve()
const STATIC_DIR = 'app/dist'

router(app)

app.use('/', express.static(path.join(CURRENT_DIR, STATIC_DIR)))

app.listen(port, () => {
  console.log(`🚀 Server at http://localhost:${port}`)
})
