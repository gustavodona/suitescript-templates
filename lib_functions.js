/**
 * @NApiVersion 2.1
 *
 * @Author Gustavo Doná
 */
define(["N/search"], function (search) {
	const getRecordFromSearch = (param) => {
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

	const setHeaderValues = (recordObject, headerValues) => {
		for (var fieldid in headerValues) {
			var value = headerValues[fieldid]
			recordObject.setValue(fieldid, value)
		}
	}

	const getRecordValues = (recordObject, fieldsToConsider) => {
		var fieldValues = {}
		for (var fieldid in fieldsToConsider) {
			fieldValues[fieldsToConsider[fieldid]] = recordObject.getValue(fieldsToConsider[fieldid])
		}
		return fieldValues
	}

	const getRecordTextValues = (recordObject, fieldsToConsider) => {
		var fieldValues = {}
		for (var fieldid in fieldsToConsider) {
			fieldValues[fieldsToConsider[fieldid]] = recordObject.getText(fieldsToConsider[fieldid])
		}
		return fieldValues
	}

	const getLineItemValues = (recordObject, fieldsToConsider) => {
		var fieldsToConsider = ["item", "quantity", "itemunitprice"]
		var itemValues = []
		var numLines = recordObject.getLineCount({
			sublistId: "item",
		})
		for (var i = 0; i < numLines; i++) {
			var lineValues = {}
			for (var fieldid in fieldsToConsider) {
				lineValues[fieldsToConsider[fieldid]] = recordObject.getSublistValue({
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

	const groupBy = (xs, key) => {
		return xs.reduce(function (rv, x) {
			;(rv[x[key]] = rv[x[key]] || []).push(x)
			return rv
		}, {})
	}

	const removeLines = (recordObject, sublist) => {
		var ativSecCount = recordObject.getLineCount({ sublistId: sublist })
		if (ativSecCount > 0) {
			for (i = ativSecCount; i > 0; i--) {
				recordObject.removeLine({
					sublistId: sublist,
					line: i - 1,
					ignoreRecalc: true,
				})
			}
		}
	}

	return {
		getRecordFromSearch,
		setHeaderValues,
		getRecordValues,
		getRecordTextValues,
		getLineItemValues,
		groupBy,
		removeLines,
	}
})
