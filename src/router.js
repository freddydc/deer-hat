import { user } from './components/user/route.js'

export function router(serve) {
  serve.use('/api/v1/users', user)
}
