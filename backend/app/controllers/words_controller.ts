import type { HttpContext } from '@adonisjs/core/http'
import { Word } from '../types/word.js'
import { loadWordListCsv } from '../helpers/wordlist_helper.js'
import { errors } from '@adonisjs/auth'
import EmptyWordException from '#exceptions/empty_word_exception'
import { DEFAULT_USER_LIFE } from '../constants.js'

export default class WordsController {
  private static words: Word[] = loadWordListCsv()

  async generate({ auth, response }: HttpContext) {
    const { user } = auth
    const word = this.pickRandomWord()

    if (!user) throw errors.E_INVALID_CREDENTIALS

    user.currentWord = word.name
    user.currentLife = DEFAULT_USER_LIFE
    await user.save()

    return response.ok({ length: word.name.length, tip: word.tip })
  }

  async verifyLetter({ auth, request, response }: HttpContext) {
    const { user } = auth
    const { letter } = request.qs()

    if (!user) throw errors.E_INVALID_CREDENTIALS
    if (!user.currentWord) throw new EmptyWordException()

    const indexArray = user.currentWord.split('').reduce((acc, curr, index) => {
      if (curr === letter) return [...acc, index]
      return acc
    }, [] as number[])

    const includes = indexArray.length !== 0

    if (!includes) {
      user.currentLife = user.currentLife - 1
      user.save()
    }

    if (user.currentLife <= 0) {
      return response.ok({ gameOver: true, word: user.currentWord })
    }

    return response.ok({ gameOver: false, includes, indexArray, life: user.currentLife })
  }

  private pickRandomWord() {
    const words = WordsController.words

    return words[Math.floor(Math.random() * words.length)]
  }
}
