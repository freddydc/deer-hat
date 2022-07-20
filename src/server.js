import express from 'express'
import { router } from './router.js'

const app = express()
const port = 8000

router(app)

app.listen(port, () => {
  console.log(`🚀 Server at http://localhost:${port}`)
})
