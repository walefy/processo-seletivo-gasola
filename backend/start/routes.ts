/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const UsersController = () => import('#controllers/users_controller')
import router from '@adonisjs/core/services/router'

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
