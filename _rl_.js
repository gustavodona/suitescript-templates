define([], () => {
	/**
	 * @NApiVersion 2.1
	 * @NScriptType Restlet
	 * @NModuleScope SameAccount
	 *
	 * @author Gustavo Doná
	 */
	var exports = {}

	/**
	 * Function called upon sending a GET request to the RESTlet.
	 *
	 * @governance XXX
	 *
	 * @param requestParams
	 *        {Object} Parameters from HTTP request URL; parameters will be
	 *        passed into function as an Object (for all supported content
	 *        types)
	 *
	 * @return {String|Object} HTTP response body; return string when request
	 *         Content-Type is 'text/plain'; return Object when request
	 *         Content-Type is 'application/json'
	 *
	 * @since 2015.1
	 *
	 * @static
	 * @function doGet
	 */
	const doGet = (requestParams) => {}

	/**
	 * Function called upon sending a PUT request to the RESTlet.
	 *
	 * @governance XXX
	 *
	 * @param requestBody
	 *        {String|Object} The HTTP request body; request body will be
	 *        passed into function as a string when request Content-Type is
	 *        'text/plain' or parsed into an Object when request Content-Type is
	 *        'application/json' (in which case the body must be a valid JSON)
	 *
	 * @return {String|Object} HTTP response body; return string when request
	 *         Content-Type is 'text/plain'; return Object when request
	 *         Content-Type is 'application/json'
	 *
	 * @since 2015.2
	 *
	 * @static
	 * @function doPut
	 */
	const doPut = (requestBody) => {}

	/**
	 * Function called upon sending a POST request to the RESTlet.
	 *
	 * @governance XXX
	 *
	 * @param requestBody
	 *        {String|Object} The HTTP request body; request body will be
	 *        passed into function as a string when request Content-Type is
	 *        'text/plain' or parsed into an Object when request Content-Type is
	 *        'application/json' (in which case the body must be a valid JSON)
	 *
	 * @return {String|Object} HTTP response body; return string when request
	 *         Content-Type is 'text/plain'; return Object when request
	 *         Content-Type is 'application/json'
	 *
	 * @since 2015.2
	 *
	 * @static
	 * @function doPost
	 */
	const doPost = (requestBody) => {}

	/**
	 * Function called upon sending a DELETE request to the RESTlet.
	 *
	 * @governance XXX
	 *
	 * @param requestParams
	 *        {Object} Parameters from HTTP request URL; parameters will be
	 *        passed into function as an Object (for all supported content
	 *        types)
	 *
	 * @return {String|Object} HTTP response body; return string when request
	 *         Content-Type is 'text/plain'; return Object when request
	 *         Content-Type is 'application/json'
	 *
	 * @since 2015.2
	 *
	 * @static
	 * @function doDelete
	 */
	const doDelete = (requestParams) => {}

	exports["get"] = doGet
	exports.put = doPut
	exports.post = doPost
	exports["delete"] = doDelete
	return exports
})
