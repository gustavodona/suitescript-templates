/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 *
 * @Author Gustavo Doná
 */

define([], () => {
    var exports = {}

    /**
     * Function definition to be triggered before record is loaded.
     *
     * @governance XXX
     *
     * @param scriptContext
     *        {Object}
     * @param scriptContext.newRecord
     *        {Record} New record
     * @param scriptContext.type
     *        {UserEventType} Trigger type
     * @param scriptContext.form
     *        {Form} Current form
     *
     * @return {void}
     *
     * @since 2015.2
     *
     * @static
     * @function beforeLoad
     */
    const beforeLoad = (context) => {}

    const beforeSubmit = (context) => {}

    const afterSubmit = (context) => {}

    exports.beforeLoad = beforeLoad
    exports.beforeSubmit = beforeSubmit
    exports.afterSubmit = afterSubmit
    return exports
})
