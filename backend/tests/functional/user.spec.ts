import { userCreationPayload } from '#tests/mocks/user'
import hash from '@adonisjs/core/services/hash'
import testUtils from '@adonisjs/core/services/test_utils'
import db from '@adonisjs/lucid/services/db'
import { test } from '@japa/runner'
import { DEFAULT_USER_LIFE } from '../../app/constants.js'

test.group('User', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('Test if user returns token correctly', async ({ assert, client }) => {
    const response = await client.post('/user').json(userCreationPayload)

    response.assertStatus(201)
    assert.typeOf(response.body().token, 'string')
  })

  test('Test if user store password correctly', async ({ assert, client }) => {
    const response = await client.post('/user').json(userCreationPayload)

    response.assertStatus(201)

    const user = await db.from('users').where('email', userCreationPayload.email).first()
    assert.assert(hash.verify(user.password, userCreationPayload.password))
  })

  test('Test if user are created with correct life', async ({ assert, client }) => {
    const response = await client.post('/user').json(userCreationPayload)

    response.assertStatus(201)

    const user = await db.from('users').where('email', userCreationPayload.email).first()
    assert.equal(user['current_life'], DEFAULT_USER_LIFE)
  })

  test('Test if user login work correctly', async ({ assert, client }) => {
    await client.post('/user').json(userCreationPayload)

    const loginResponse = await client.post('/user/login').json({
      email: userCreationPayload.email,
      password: userCreationPayload.password,
    })

    loginResponse.assertStatus(200)
    assert.typeOf(loginResponse.body().token, 'string')
  })

  test('Test if user login return 400 when password is wrong', async ({ client }) => {
    await client.post('/user').json(userCreationPayload)

    const loginResponse = await client.post('/user/login').json({
      email: userCreationPayload.email,
      password: 'wrong_password',
    })

    loginResponse.assertStatus(400)
    loginResponse.assertBody({
      errors: [
        {
          message: 'Invalid user credentials',
        },
      ],
    })
  })

  test('Test if user login return 400 when email is wrong', async ({ client }) => {
    await client.post('/user').json(userCreationPayload)

    const loginResponse = await client.post('/user/login').json({
      email: 'not_found@notfound.com',
      password: userCreationPayload.password,
    })

    loginResponse.assertStatus(400)
    loginResponse.assertBody({
      errors: [
        {
          message: 'Invalid user credentials',
        },
      ],
    })
  })

  test('Test if user create return 422 when email is invalid', async ({ client }) => {
    const response = await client.post('/user').json({
      ...userCreationPayload,
      email: 'invalid_email',
    })

    response.assertStatus(422)
    response.assertBody({
      errors: [
        {
          field: 'email',
          message: 'The email field must be a valid email address',
          rule: 'email',
        },
      ],
    })
  })

  test('Test if user create return 422 when password is invalid', async ({ client }) => {
    const response = await client.post('/user').json({
      ...userCreationPayload,
      password: 'short',
    })

    response.assertStatus(422)
    response.assertBody({
      errors: [
        {
          field: 'password',
          message: 'The password field must have at least 6 characters',
          rule: 'minLength',
          meta: { min: 6 },
        },
      ],
    })
  })

  test('Test if user create return 422 when name is invalid', async ({ client }) => {
    const response = await client.post('/user').json({
      ...userCreationPayload,
      name: '',
    })

    response.assertStatus(422)
    response.assertBody({
      errors: [
        {
          field: 'name',
          message: 'The name field must be defined',
          rule: 'required',
        },
      ],
    })
  })

  test('Test if user login return 422 when email is invalid', async ({ client }) => {
    const response = await client.post('/user/login').json({
      email: 'invalid_email',
      password: 'short',
    })

    response.assertStatus(422)
    response.assertBody({
      errors: [
        {
          field: 'email',
          message: 'The email field must be a valid email address',
          rule: 'email',
        },
      ],
    })
  })
})
