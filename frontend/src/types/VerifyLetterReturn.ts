export type VerifyLetterReturn = {
  success: boolean
  life: number
  includes: boolean
  indexArray: number[]
  gameOver: false
} | {
  success: boolean
  gameOver: true
  word: string
}