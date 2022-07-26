import mongoose from 'mongoose'

mongoose.Promise = global.Promise

async function connection({ url }) {
  await mongoose.connect(url)
  console.log('🍕 DB')
}

const db = {
  connection
}

export default db
