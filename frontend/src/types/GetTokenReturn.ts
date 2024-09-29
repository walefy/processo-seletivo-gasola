export type GetTokenReturn = {
  success: true
  token: string
} | {
  success: false
  message: string
}
