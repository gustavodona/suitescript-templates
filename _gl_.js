function customizeGlImpact(transactionRecord, standardLines, customLines, book) {
	try {
		const recType = transactionRecord.getRecordType()
		const recId = transactionRecord.getId()

		const fieldsToGet = []
		var transactionValues = fnGetFieldValues(transactionRecord, fieldsToGet)
		nlapiLogExecution("DEBUG", "fieldValues", fieldsToGet)

		const lineCount = standardLines.getCount()
		nlapiLogExecution("DEBUG", "standardLines Quantity", "linecount")
		if (lineCount == 0) return

		var newLine = customLines.addNewLine()
		newLine.setAccountId(1000)
		newLine.setDebitAmount(100)
		newLine.setMemo("")
		newLine.setEntityId(standardLines.getLine(0).getEntityId())

		var newLine = customLines.addNewLine()
		newLine.setAccountId(2000)
		newLine.setCreditAmount(100)
		newLine.setMemo("Contabilização de impostos: INSS")
		newLine.setEntityId(standardLines.getLine(0).getEntityId())
	} catch (e) {
		nlapiLogExecution("ERROR", "Error Message", e)
	}
}

function fnGetFieldValues(recordObject, fields) {
	var fieldValues = {}
	for (var i = 0; i < fields.length; i++) {
		fieldValues[fields[i]] = recordObject.getFieldValue(fields[i])
	}
	return fieldValues
}
