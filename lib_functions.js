/**
 * @NApiVersion 2.1
 * @NModuleScope Public
 */

define(["N/search"], (search) => {
	/**
	 * Retrieves the internal ID of the first record from a specific NetSuite search.
	 *
	 * This function creates a search with given parameters, executes it, and attempts to
	 * retrieve the internal ID of the first record in the search results. If a record is found,
	 * its internal ID is returned; otherwise, the function returns false.
	 *
	 * @param {object} param - Configuration object for the search, including type, filters, and columns.
	 * @returns {(string|boolean)} The internal ID of the first record if found, otherwise false.
	 */
	const getRecordFromSearch = (param) => {
		const s = search.create({
			type: "searchType",
			filters: [["mainline", "is", "T"]],
			columns: ["internalid"],
		})
		const result = s.run().getRange({ start: 0, end: 1 })[0]
		if (result) {
			const objectRecord = {
				internalid: result.getValue("internalid"),
			}
			return objectRecord.internalid
		} else {
			return false
		}
	}

	/**
	 * Sets multiple field values on a NetSuite record object.
	 *
	 * This function iterates over each field in the `headerValues` object and uses the `setValue`
	 * method to update the corresponding field on the provided `recordObject`. Each key in the
	 * `headerValues` object represents a field ID, and its associated value is the value to be
	 * set for that field on the record.
	 *
	 * @param {Record} recordObject - The NetSuite record object to be updated.
	 * @param {object} headerValues - An object mapping field IDs to their respective values to be set.
	 */
	const setHeaderValues = (recordObject, headerValues) => {
		for (var fieldid in headerValues) {
			var value = headerValues[fieldid]
			recordObject.setValue(fieldid, value)
		}
	}

	/**
	 * Retrieves values for specified fields from a NetSuite record object.
	 *
	 * This function iterates over each field ID provided in the `fieldsToConsider` array and
	 * retrieves the corresponding value from the `recordObject`. It constructs an object where
	 * each key is a field ID from `fieldsToConsider` and its value is the retrieved value from
	 * the record.
	 *
	 * @param {Record} recordObject - The NetSuite record object from which values are to be retrieved.
	 * @param {string[]} fieldsToConsider - An array of field IDs for which values are to be retrieved.
	 * @returns {object} An object mapping each field ID to its corresponding value in the record.
	 */
	const getRecordValues = (recordObject, fieldsToConsider) => {
		var fieldValues = {}
		for (var fieldid in fieldsToConsider) {
			fieldValues[fieldsToConsider[fieldid]] = recordObject.getValue(fieldsToConsider[fieldid])
		}
		return fieldValues
	}

	/**
	 * Retrieves the text representation of values for specified fields from a NetSuite record object.
	 *
	 * This function iterates over each field ID provided in the `fieldsToConsider` array and
	 * retrieves the text representation of the corresponding value from the `recordObject`. It
	 * constructs an object where each key is a field ID from `fieldsToConsider` and its value is
	 * the text representation of the value from the record.
	 *
	 * The function is useful for fields where the display text is more meaningful or required
	 * instead of the actual value stored in the record, such as list/record fields.
	 *
	 * @param {Record} recordObject - The NetSuite record object from which text values are to be retrieved.
	 * @param {string[]} fieldsToConsider - An array of field IDs for which text values are to be retrieved.
	 * @returns {object} An object mapping each field ID to its corresponding text representation in the record.
	 */
	const getRecordTextValues = (recordObject, fieldsToConsider) => {
		var fieldValues = {}
		for (var fieldid in fieldsToConsider) {
			fieldValues[fieldsToConsider[fieldid]] = recordObject.getText(fieldsToConsider[fieldid])
		}
		return fieldValues
	}

	/**
	 * Extracts values from specified fields in each line of a given sublist in a NetSuite record object.
	 *
	 * This function iterates through each line of a specified sublist in the provided `recordObject`.
	 * For each line, it collects values from the fields listed in `fieldsToConsider`. It then accumulates
	 * these values into an array, where each element of the array is an object representing one line of
	 * the sublist, keyed by the field IDs.
	 *
	 * Note: The 'replaceBySublistId' is a placeholder and should be replaced with the actual ID of the
	 * sublist from which values are to be extracted.
	 *
	 * @param {Record} recordObject - The NetSuite record object containing the sublist.
	 * @param {string[]} fieldsToConsider - An array of field IDs representing the fields to be extracted from each line of the sublist.
	 * @returns {object[]} An array of objects, each representing one line of the sublist with key-value pairs corresponding to the specified fields and their extracted values.
	 */
	const getLineItemValues = (recordObject, fieldsToConsider) => {
		const itemValues = []
		const numLines = recordObject.getLineCount({
			sublistId: "replaceBySublistId",
		})

		for (var i = 0; i < numLines; i++) {
			const lineValues = {}
			for (var fieldid in fieldsToConsider) {
				lineValues[fieldsToConsider[fieldid]] = recordObject.getSublistValue({
					sublistId: "replaceBySublistId",
					fieldId: fieldsToConsider[fieldid],
					line: i,
				})
			}
			// Consider adding the values to the itemValues array here if needed
		}

		return itemValues
	}

	/**
	 * Groups elements of an array into an object based on a specified key.
	 *
	 * This function takes an array `xs` and groups its elements into an object. The object's keys
	 * are determined by the value of the `key` property in each element of the array. If multiple
	 * elements have the same value for the specified `key`, they are grouped together in an array
	 * under that key.
	 *
	 * @param {Array} xs - An array of objects to be grouped.
	 * @param {string} key - The key in the objects to group by.
	 * @returns {object} An object where each key corresponds to a value of the specified key in the
	 *                    elements, and its value is an array of elements that have that key value.
	 */
	const groupBy = (xs, key) => {
		return xs.reduce(function (rv, x) {
			;(rv[x[key]] = rv[x[key]] || []).push(x)
			return rv
		}, {})
	}

	/**
	 * Removes all lines from a specified sublist in a NetSuite record object.
	 *
	 * This function first determines the count of lines in the specified sublist of the
	 * `recordObject` using `getLineCount`. If there are lines present, it iterates through each
	 * line in reverse order and removes it using `removeLine`. This is necessary as removing
	 * lines affects the indexing of subsequent lines. The `ignoreRecalc` parameter in `removeLine`
	 * is set to `true` to optimize performance by preventing immediate recalculation of the record
	 * after each line removal.
	 *
	 * @param {Record} recordObject - The NetSuite record object from which lines will be removed.
	 * @param {string} sublist - The ID of the sublist from which lines will be removed.
	 */
	const removeLines = (recordObject, sublist) => {
		var ativSecCount = recordObject.getLineCount({ sublistId: sublist })
		if (ativSecCount > 0) {
			for (var i = ativSecCount; i > 0; i--) {
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
