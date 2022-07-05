/**
 * @NApiVersion 2.x
 * @NModuleScope SameAccount
 *
 * @author Gustavo Doná
 */

define(["N/url", "N/currentRecord"], function (url, currentRecord) {
	var exports = {}

	function redirectToSuitelet() {
		var objRecord = currentRecord.get()

		//
		var output = url.resolveScript({
			scriptId: "customscript_cus_btn_sl_",
			deploymentId: "customdeploy_cus_btn_sl_",
		})
		output += "&custpage_recordObjId=" + objRecord.id
		output += "&custpage_recordObjType=" + objRecord.type

		//console.log("objRecord: " + objRecord.id)
		setWindowChanged(window, false)
		//var win = window.open(output, "_blank")
		var win = window.open(output, "_self")
		win.focus()
	}

	exports.redirectToSuitelet = redirectToSuitelet
	return exports
})
