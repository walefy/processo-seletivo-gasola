import type { HttpContext } from '@adonisjs/core/http'
import { Word } from '../types/word.js'
import { loadWordListCsv } from '../helpers/wordlist_helper.js'
import { errors } from '@adonisjs/auth'
import EmptyWordException from '#exceptions/empty_word_exception'

export default class WordsController {
  private static words: Word[] = loadWordListCsv()

  async generate({ auth, response }: HttpContext) {
    const { user } = auth
    const word = this.pickRandomWord()

    if (!user) throw errors.E_INVALID_CREDENTIALS

    user.currentWord = word.name
    await user.save()

    return response.ok({ length: word.name.length })
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
    return response.ok({ includes: indexArray.length !== 0, indexArray })
  }

  private pickRandomWord() {
    const words = WordsController.words

    return words[Math.floor(Math.random() * words.length)]
  }
}
