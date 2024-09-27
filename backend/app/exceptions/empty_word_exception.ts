import { Exception } from '@adonisjs/core/exceptions'

export default class EmptyWordException extends Exception {
  static status = 400
  static message = 'Nenhuma palavra foi gerada, gere uma palavra antes de verificar uma letra!'
}
