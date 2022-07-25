import express from 'express'
import bodyParser from 'body-parser'
import { router } from './router.js'
import path from 'path'

const app = express()
const port = 8000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const CURRENT_DIR = path.resolve()
const STATIC_DIR = 'app/dist'

router(app)

app.use('/', express.static(path.join(CURRENT_DIR, STATIC_DIR)))

app.listen(port, () => {
  console.log(`🚀 Server at http://localhost:${port}`)
})
