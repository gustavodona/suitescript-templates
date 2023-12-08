/**
 * @NApiVersion 2.1
 * @NModuleScope Public
 */
define(["N/runtime"], (runtime) => {
	/**
	 * Current NetSuite account ID.
	 * @constant {string}
	 */
	const ACCOUNT_ID = runtime.accountId

	/**
	 * Object mapping environments to their respective NetSuite account IDs.
	 * @constant {object}
	 */
	const CUSTOMER_ACCOUNT_IDS = {
		SANDBOX: "1111111",
		PRODUCTION: "1111111",
	}

	/**
	 * Retrieves default values for the current NetSuite account based on its environment.
	 * This function checks if the account is a SANDBOX or PRODUCTION environment and returns
	 * the corresponding default values for subsidiary and location.
	 *
	 * @returns {object} An object containing default subsidiary and location values.
	 */
	const getDefaultValues = () => {
		// Default value configurations for different environments
		const DEFAULT_VALUES = {}
		const SANDBOX_VALUES = {
			subsidiary: 0,
			location: 0,
		}

		const PRODUCTION_VALUES = {
			subsidiary: 0,
			location: 0,
		}

		// Mapping default values to the corresponding account IDs
		DEFAULT_VALUES[CUSTOMER_ACCOUNT_IDS["SANDBOX"]] = SANDBOX_VALUES
		DEFAULT_VALUES[CUSTOMER_ACCOUNT_IDS["PRODUCTION"]] = PRODUCTION_VALUES

		// Returns the default values for the current account ID
		return DEFAULT_VALUES[ACCOUNT_ID]
	}

	return {
		getDefaultValues: getDefaultValues,
	}
})
