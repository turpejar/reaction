let request = require('request');
let credentials = {
  "version": 3,
  "clientId": "e7165600-f9c0-4540-8d5b-89d344c09390",
  "secret": "YjUxOGY5YTctMWYwMy00YjA4LTllZjAtZGNiMDViODI5NzVh",
  "tenantId": "e830d176-63e6-44d5-adff-4da996df081b",
  "oauthServerUrl": "https://appid-oauth.eu-gb.bluemix.net/oauth/v3/e830d176-63e6-44d5-adff-4da996df081b",
  "profilesUrl": "https://appid-profiles.eu-gb.bluemix.net"
}
function main(params) {
    return new Promise(function (resolve, reject) {
        request({
            url: credentials.oauthServerUrl + '/token',
            method: 'POST',
            auth: {
                username: credentials.clientId,
                password: credentials.secret
            },
            form: {

                grant_type: "password",
                username: "jarkko.turpeinen@swtech.fi",
                password: "o7aBN56N"
            }
        }, function (error, response, body) {
            resolve(response);
        })
    })
}