import { userCreationPayload } from '#tests/mocks/user'
import testUtils from '@adonisjs/core/services/test_utils'
import db from '@adonisjs/lucid/services/db'
import { ApiClient } from '@japa/api-client'
import { test } from '@japa/runner'

test.group('Word', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  const generateToken = async (client: ApiClient) => {
    const response = await client.post('/user').json(userCreationPayload)

    response.assertStatus(201)
    return response.body().token
  }

  test('Test if word is generated correctly', async ({ assert, client }) => {
    const token = await generateToken(client)

    const response = await client.post('/word').header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)
    assert.typeOf(response.body().length, 'number')
    assert.typeOf(response.body().tip, 'string')
  })

  test('Test if verify letter returns 200', async ({ client }) => {
    const token = await generateToken(client)
    await client.post('/word').header('Authorization', `Bearer ${token}`)

    const user = await db.from('users').where('email', userCreationPayload.email).first()
    const word = user['current_word']

    const response = await client
      .get(`/word?letter=${word[0]}`)
      .header('Authorization', `Bearer ${token}`)

    const indexArray = word.split('').reduce((acc: number[], curr: string, index: number) => {
      if (curr === word[0]) {
        acc.push(index)
      }
      return acc
    }, [] as number[])

    response.assertStatus(200)
    response.assertBody({ gameOver: false, includes: true, indexArray, life: 6 })
  })

  test('Test if verify letter returns 200 and game over', async ({ client }) => {
    const token = await generateToken(client)
    await client.post('/word').header('Authorization', `Bearer ${token}`)

    const user = await db.from('users').where('email', userCreationPayload.email).first()
    const word = user['current_word']

    for (let index = 0; index < 6; index++) {
      await client.get(`/word?letter=wrong`).header('Authorization', `Bearer ${token}`)
    }

    const response = await client
      .get(`/word?letter=wrong`)
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)
    response.assertBody({ gameOver: true, word })
  })
})
