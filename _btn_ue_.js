/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 *
 */

define([], () => {
	var exports = {}

	const beforeLoad = (context) => {
		const recordObj = context.newRecord

		context.form.addButton({
			id: "custpage_btn_",
			label: "ButtonLabel",
			functionName: "fnName",
		})
		context.form.clientScriptModulePath = "./_btn_cs_.js"
	}

	exports.beforeLoad = beforeLoad

	return exports
})
