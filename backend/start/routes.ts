/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const UsersController = () => import('#controllers/users_controller')
const WordsController = () => import('#controllers/words_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.get('/', async () => {
  return {
    healthy: true,
  }
})

router
  .group(() => {
    router.post('/', [UsersController, 'create'])
    router.post('/login', [UsersController, 'login'])
  })
  .prefix('user')

router
  .group(() => {
    router.post('/', [WordsController, 'generate'])
    router.get('/', [WordsController, 'verifyLetter'])
  })
  .prefix('word')
  .middleware(middleware.auth())
