/**
 * @NApiVersion 2.x
 *
 * @Author Gustavo Doná
 */
define(["N/https"], function (https) {
	const URL_TOKEN = "https://abc.com/api/token/"
	const URL_ENDPOINT = "https://abc.com/api/token/"

	function getToken() {
		const getTokenAuth = JSON.stringify({
			username: "abc",
			password: "123",
		})
		var header = []
		header["Content-Type"] = "application/json"
		this.response = https.request({
			method: https.Method.POST,
			url: URL_TOKEN,
			body: getTokenAuth,
			headers: header,
		})

		log.debug("Response", this.response)
		log.debug("Token", JSON.parse(this.response.body).token)
		log.debug("Expiration", JSON.parse(this.response.body).expiration)

		this.expiration = JSON.parse(this.response.body).expiration

		return JSON.parse(this.response.body).token
	}

	function getFunction(urlToken, urlEndpoint) {
		var header = []
		header["Authorization"] = "Bearer " + urlToken

		this.response = https.request({
			method: https.Method.GET,
			url: urlEndpoint,
			headers: header,
		})
		log.debug("Response " + urlEndpoint, JSON.parse(this.response.body))
		return JSON.parse(this.response.body)
	}

	return {
		getToken: getToken,
		getFunction: getFunction,
	}
})
