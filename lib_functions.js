/**
 * @NApiVersion 2.x
 *
 * @Author Gustavo Doná
 */
define(["N/search"], function (search) {
	function fnGetRecordThroughSearch(param) {
		var s = search.create({
			type: "transaction",
			filters: [["mainline", "is", "T"]],
			columns: ["internalid"],
		})
		var result = s.run().getRange({ start: 0, end: 1 })[0]
		if (result) {
			var rExists = {
				internalid: result.getValue("internalid"),
			}
			return rExists.internalid
		} else {
			return false
		}
	}

	function fnSetHeaderValues(record, headerValues) {
		for (var fieldid in headerValues) {
			var value = headerValues[fieldid]
			record.setValue(fieldid, value)
		}
	}

	function fnGetRecordValues(objRecord, fieldsToConsider) {
		var fieldValues = {}
		for (var fieldid in fieldsToConsider) {
			fieldValues[fieldsToConsider[fieldid]] = objRecord.getValue(fieldsToConsider[fieldid])
		}
		return fieldValues
	}

	function fnGetRecordTextValues(objRecord, fieldsToConsider) {
		var fieldValues = {}
		for (var fieldid in fieldsToConsider) {
			fieldValues[fieldsToConsider[fieldid]] = objRecord.getText(fieldsToConsider[fieldid])
		}
		return fieldValues
	}

	function fnGetLineItemValues(objRecord, fldToConsider) {
		var fieldsToConsider = ["item", "quantity", "itemunitprice"]
		var itemValues = []
		var numLines = objRecord.getLineCount({
			sublistId: "item",
		})
		for (var i = 0; i < numLines; i++) {
			var lineValues = {}
			for (var fieldid in fieldsToConsider) {
				lineValues[fieldsToConsider[fieldid]] = objRecord.getSublistValue({
					sublistId: "item",
					fieldId: fieldsToConsider[fieldid],
					line: i,
				})
			}
			lineValues.item = search.lookupFields({
				type: search.Type.ITEM,
				id: lineValues.item,
				columns: ["itemid"],
			}).itemid
			if (lineValues.quantity > 0) itemValues.push(lineValues)
		}

		return itemValues
	}

	function fnGroupBy(xs, key) {
		return xs.reduce(function (rv, x) {
			;(rv[x[key]] = rv[x[key]] || []).push(x)
			return rv
		}, {})
	}

	function removeLines(objRecord, sublist) {
		var ativSecCount = objRecord.getLineCount({ sublistId: sublist })
		if (ativSecCount > 0) {
			for (i = ativSecCount; i > 0; i--) {
				objRecord.removeLine({
					sublistId: sublist,
					line: i - 1,
					ignoreRecalc: true,
				})
			}
		}
	}

	return {
		fnGetRecordThroughSearch: fnGetRecordThroughSearch,
		fnSetHeaderValues: fnSetHeaderValues,
		fnGetRecordValues: fnGetRecordValues,
		fnGetRecordTextValues: fnGetRecordTextValues,
		fnGetLineItemValues: fnGetLineItemValues,
		fnGroupBy: fnGroupBy,
		removeLines: removeLines,
	}
})
