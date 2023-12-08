/**
 * @NApiVersion 2.1
 * @NModuleScope SameAccount
 */
define(["N/runtime", "./lib/crypto-js.js"], (runtime, crypto) => {
	/**
	 * Retrieves the secret key from script parameters.
	 * @returns {string} The secret key used for encryption and decryption.
	 */
	const getSecretKey = () => {
		const scriptObj = runtime.getCurrentScript()
		return scriptObj.getParameter({ name: "parameterId" })
	}

	/**
	 * Encrypts the provided text using AES encryption.
	 * @param {string} text - The text to be encrypted.
	 * @returns {string} The encrypted text.
	 */
	const encrypt = (text) => {
		const SECRET_KEY = getSecretKey()
		return crypto.AES.encrypt(text, SECRET_KEY).toString()
	}

	/**
	 * Decrypts the provided encrypted text using AES.
	 * @param {string} encryptedText - The text to be decrypted.
	 * @returns {string} The decrypted text.
	 */
	const decrypt = (encryptedText) => {
		var bytes = crypto.AES.decrypt(encryptedText, SECRET_KEY)
		return bytes.toString(crypto.enc.Utf8)
	}

	/**
	 * Example function demonstrating how to use the encrypt function.
	 * It creates an authentication object and encrypts it.
	 * @returns {string} The encrypted authentication object.
	 */
	const encryptExample = () => {
		const SECRET_KEY = getSecretKey()

		const userId = runtime.getCurrentUser().id
		const currentDate = new Date().toISOString().split("T")[0] // YYYY-MM-DD

		const authenticationObject = {
			userId: userId,
			date: currentDate,
		}

		return encrypt(JSON.stringify(authenticationObject), SECRET_KEY)
	}

	return { encrypt, decrypt }
})
