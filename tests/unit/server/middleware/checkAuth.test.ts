import checkAuth from '../../../../src/server/middleware/checkAuth'

describe(`checkAuth middleware`, () => {
  let requestMock: any
  let responseMock: any
  const nextMock = jest.fn()
  const statusSend = jest.fn()

  beforeEach(() => {
    responseMock = {
      locals: {},
      status: jest.fn(() => {
        return { send: statusSend }
      }),
      clearCookie: jest.fn(),
    }
  })

  afterEach(() => jest.resetAllMocks())

  test(`should pass saved cookies to locals`, async () => {
    requestMock = {
      cookies: {
        githubAccessToken: 'test access token',
      },
    }

    await checkAuth(requestMock, responseMock, nextMock)

    expect(responseMock.locals.accessToken).toEqual('test access token')
  })

  test(`should exit with an error if no access token cookie`, async () => {
    requestMock = {
      cookies: {},
    }

    await checkAuth(requestMock, responseMock, nextMock)

    expect(statusSend).toBeCalledWith({ message: 'Forbidden Resource', status: 403 })
  })
})
