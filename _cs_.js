define(["N/search"], (search) => {
	/**
	 *
	 * @exports _moduleId
	 *
	 * @NApiVersion 2.1
	 * @NScriptType ClientScript
	 * @NModuleScope SameAccount
	 *
	 * @author Gustavo Doná
	 */
	var exports = {}

	/**
	 * Function to be executed after page is initialized.
	 *
	 * @governance XXX
	 *
	 * @param scriptContext
	 *        {Object}
	 * @param scriptContext.currentRecord
	 *        {Record} Current form record
	 * @param scriptContext.mode
	 *        {String} The mode in which the record is being accessed (create,
	 *        copy, or edit)
	 *
	 * @return {void}
	 *
	 * @since 2015.2
	 *
	 * @static
	 * @function pageInit
	 */
	const pageInit = (scriptContext) => {}

	/**
	 * Function to be executed when field is changed.
	 *
	 * @governance XXX
	 *
	 * @param scriptContext
	 *        {Object}
	 * @param scriptContext.currentRecord
	 *        {Record} Current form record
	 * @param scriptContext.sublistId
	 *        {String} Sublist name
	 * @param scriptContext.fieldId
	 *        {String} Field name
	 * @param [scriptContext.lineNum]
	 *        {Number} Line number. Will be undefined if not a sublist or matrix
	 *        field
	 * @param [scriptContext.columnNum]
	 *        {Number} Matrix column number. Will be undefined if not a matrix
	 *        field
	 *
	 * @return {void}
	 *
	 * @since 2015.2
	 *
	 * @static
	 * @function fieldChanged
	 */
	const fieldChanged = (scriptContext) => {}

	/**
	 * Function to be executed when field is slaved.
	 *
	 * @governance XXX
	 *
	 * @param scriptContext
	 *        {Object}
	 * @param scriptContext.currentRecord
	 *        {Record} Current form record
	 * @param scriptContext.sublistId
	 *        {String} Sublist name
	 * @param scriptContext.fieldId
	 *        {String} Field name
	 *
	 * @return {void}
	 *
	 * @since 2015.2
	 *
	 * @static
	 * @function postSourcing
	 */
	const postSourcing = (scriptContext) => {}

	/**
	 * Function to be executed after sublist is inserted, removed, or edited.
	 *
	 * @governance XXX
	 *
	 * @param scriptContext
	 *        {Object}
	 * @param scriptContext.currentRecord
	 *        {Record} Current form record
	 * @param scriptContext.sublistId
	 *        {String} Sublist name
	 *
	 * @return {void}
	 *
	 * @since 2015.2
	 *
	 * @static
	 * @function sublistChanged
	 */
	const sublistChanged = (scriptContext) => {}

	/**
	 * Function to be executed after line is selected.
	 *
	 * @governance XXX
	 *
	 * @param scriptContext
	 *        {Object}
	 * @param scriptContext.currentRecord
	 *        {Record} Current form record
	 * @param scriptContext.sublistId
	 *        {String} Sublist name
	 *
	 * @return {void}
	 *
	 * @since 2015.2
	 *
	 * @static
	 * @function lineInit
	 */
	const lineInit = (scriptContext) => {}

	/**
	 * Validation function to be executed when field is changed.
	 *
	 * @governance XXX
	 *
	 * @param scriptContext
	 *        {Object}
	 * @param scriptContext.currentRecord
	 *        {Record} Current form record
	 * @param scriptContext.sublistId
	 *        {String} Sublist name
	 * @param scriptContext.fieldId
	 *        {String} Field name
	 * @param [scriptContext.lineNum]
	 *        {Number} Line number. Will be undefined if not a sublist or matrix
	 *        field
	 * @param [scriptContext.columnNum]
	 *        {Number} Matrix column number. Will be undefined if not a matrix
	 *        field
	 *
	 * @return {Boolean} <code>true</code> if field value is valid;
	 *         <code>false</code> otherwise
	 *
	 * @since 2015.2
	 *
	 * @static
	 * @function validateField
	 */
	const validateField = (scriptContext) => {}

	/**
	 * Validation function to be executed when sublist line is committed.
	 *
	 * @governance XXX
	 *
	 * @param scriptContext
	 *        {Object}
	 * @param scriptContext.currentRecord
	 *        {Record} Current form record
	 * @param scriptContext.sublistId
	 *        {String} Sublist name
	 *
	 * @return {Boolean} <code>true</code> if sublist line is valid;
	 *         <code>false</code> otherwise
	 *
	 * @since 2015.2
	 *
	 * @static
	 * @function validateLine
	 */
	const validateLine = (scriptContext) => {}

	/**
	 * Validation function to be executed when sublist line is inserted.
	 *
	 * @governance XXX
	 *
	 * @param scriptContext
	 *        {Object}
	 * @param scriptContext.currentRecord
	 *        {Record} Current form record
	 * @param scriptContext.sublistId
	 *        {String} Sublist name
	 *
	 * @return {Boolean} <code>true</code> to allow line insertion;
	 *         <code>false</code> to prevent it
	 *
	 * @since 2015.2
	 *
	 * @static
	 * @function validateInsert
	 */
	const validateInsert = (scriptContext) => {}

	/**
	 * Validation function to be executed when record is deleted.
	 *
	 * @governance XXX
	 *
	 * @param scriptContext
	 *        {Object}
	 * @param scriptContext.currentRecord
	 *        {Record} Current form record
	 * @param scriptContext.sublistId
	 *        {String} Sublist name
	 *
	 * @return {Boolean} <code>true</code> to allow line deletion;
	 *         <code>false</code> to prevent it
	 *
	 * @since 2015.2
	 *
	 * @static
	 * @function validateDelete
	 */
	const validateDelete = (scriptContext) => {}

	/**
	 * Validation function to be executed when record is saved.
	 *
	 * @governance XXX
	 *
	 * @param scriptContext
	 *        {Object}
	 * @param scriptContext.currentRecord
	 *        {Record} Current form record
	 *
	 * @return {Boolean} <code>true</code> to allow record to be saved;
	 *         <code>false</code> to prevent it
	 *
	 * @since 2015.2
	 *
	 * @static
	 * @function saveRecord
	 */
	const saveRecord = (scriptContext) => {}

	exports.pageInit = pageInit
	exports.fieldChanged = fieldChanged
	exports.postSourcing = postSourcing
	exports.sublistChanged = sublistChanged
	exports.lineInit = lineInit
	exports.validateField = validateField
	exports.validateLine = validateLine
	exports.validateInsert = validateInsert
	exports.validateDelete = validateDelete
	exports.saveRecord = saveRecord
	return exports
})
