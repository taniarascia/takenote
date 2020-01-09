const request = require('request')

const getToken = () => {
  let options = {
    method: 'POST',
    url: 'https://your_auth0.auth0.com/oauth/token',
    headers: { 'content-type': 'application/json' },
    body:
      '{"client_id": "ENV_CLIENT" ,"client_secret":"ENV_SECRET","audience":"https://your_auth0.auth0.com/api/v2/","grant_type":"client_credentials"}',
  }

  return new Promise(function(resolve, reject) {
    request(options, function(error, response, body) {
      if (error) throw new Error(error)
      let data = JSON.parse(body)
      resolve(data.access_token)
    })
  })
}

const getUserData = async user => {
  const token = await getToken()
  var options = {
    method: 'GET',
    url: `https://your_auth0.auth0.com/api/v2/users/${user}`,
    headers: { authorization: `Bearer ${token}` },
  }

  return new Promise(function(resolve, reject) {
    request(options, function(error, response, body) {
      if (error) throw new Error(error)
      let data = JSON.parse(body)
      resolve(data.identities[0].access_token)
    })
  })
}

module.exports.auth0 = async function(event, context, callback) {
  const bodyData = JSON.parse(event.body)

  const data = await getUserData(bodyData.user)

  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({ token: data }),
  }

  callback(null, response)
}
