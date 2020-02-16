const isProduction = process.env.NODE_ENV === 'production'

export const oneHourCookie = {
  maxAge: 60 * 60 * 1000,
  secure: isProduction,
  httpOnly: true,
  sameSite: true,
}
