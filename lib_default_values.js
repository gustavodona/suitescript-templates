/**
 * @NApiVersion 2.x
 * @NModuleScope Public
 *
 * @Author Gustavo Doná
 */
define(["N/runtime"], function (runtime) {
	const accountId = runtime.accountId
	const customerAccounts = {
		sandbox: "1111111",
		production: "1111111",
	}

	function fnDefaultValues() {
		const valuesSandbox = {
			subsidiary: 0,
			location: 0,
		}

		const valuesProduction = {
			subsidiary: 0,
			location: 0,
		}

		const defaultValues = {}
		defaultValues[customerAccounts["sandbox"]] = valuesSandbox
		defaultValues[customerAccounts["production"]] = valuesProduction

		return defaultValues[accountId]
	}

	return {
		fnDefaultValues: fnDefaultValues,
	}
})
