/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 *
 */

define(["N/https"], (https) => {
	const onRequest = (context) => {
		try {
			if (context.request.method == "GET") {
				const objRecordId = context.request.parameters.custpage_recordObjId
				const objRecordType = context.request.parameters.custpage_recordObjType

				log.debug("objRecordId", objRecordId)
				log.debug("objRecordType", objRecordType)

				//

				context.response.sendRedirect({
					type: https.RedirectType.RECORD,
					identifier: objRecordType,
					id: objRecordId,
				})
			}
		} catch (e) {
			log.error("Error in Suitelet", JSON.stringify(e))
		}
	}

	return {
		onRequest: onRequest,
	}
})
