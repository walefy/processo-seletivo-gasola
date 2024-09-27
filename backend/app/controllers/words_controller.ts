import type { HttpContext } from '@adonisjs/core/http'
import { Word } from '../types/word.js'
import { loadWordListCsv } from '../helpers/wordlist_helper.js'
import { errors } from '@adonisjs/auth'

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

  private pickRandomWord() {
    const words = WordsController.words

    return words[Math.floor(Math.random() * words.length)]
  }
}
