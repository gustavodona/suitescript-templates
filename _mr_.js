/**
 * @NApiVersion 2.1
 * @NScriptType MapReduceScript
 * @NModuleScope SameAccount
 *
 * @Author Gustavo Doná
 */

define(["N/search"], (search) => {
    var exports = {}
    const getInputData = () => {
        try {
            var mrSearch = search.create()
            return mrSearch
        } catch (e) {
            log.error("Error getInputData", JSON.stringify(e))
        }
    }

    const map = (context) => {
        try {
            log.debug("Map context", context.value)
            const data = JSON.parse(context.value)

            /* 
        // Pass values to Reduce stage
            context.write({
                key: itemInternalId,
                value: {
                type:itemType,
                internalid:itemInternalId,
                location: location,
                date: date
                }
            })
         */
        } catch (e) {
            log.error("Error Map", JSON.stringify(e))
        }
    }

    const reduce = (context) => {
        try {
            /*
                //If values are being passed from Map stage

                var parsedContext = []
                for (var i in context.values) {
                    parsedContext.push(JSON.parse(context.values[i]))
                }
                log.debug("Reduce - Parsed Context", parsedContext)
            */
        } catch (e) {
            log.error("Error Reduce", JSON.stringify(e))
        }
    }

    const summarize = (summary) => {
        /*
         Submit another MR execution
        
        var mrTask = task.create({
            taskType: task.TaskType.MAP_REDUCE,
            scriptId: integrationSwitch[endpoint].SCRIPT_ID,
            deploymentId: integrationSwitch[endpoint].DEPLOYMENT_ID,
        })

        var mrTaskId = mrTask.submit()
        var taskStatus = task.checkStatus(mrTaskId)

        log.debug({
            title: "Task Status",
            details: JSON.stringify(mrTaskId),
        })

        if (taskStatus.status === "FAILED") {
            //Send Email or Do as required
            log.debug({
                title: "Task Failed",
                details: "Task Status: " + taskStatus,
            })
        }
        */

        log.audit("Summary Time - Seconds", "Total Seconds: " + summary.seconds)
        log.audit("Summary Time - Minutes", "Total Minutes: " + parseFloat(summary.seconds / 60).toFixed(1))
        log.debug("Summary Usage", "Total Usage: " + summary.usage)
        log.debug("Summary Yields", "Total Yields: " + summary.yields)

        log.debug("Input Summary: ", JSON.stringify(summary.inputSummary))
        log.debug("Map Summary: ", JSON.stringify(summary.mapSummary))
        log.debug("Reduce Summary: ", JSON.stringify(summary.reduceSummary))
    }

    exports.getInputData = getInputData
    exports.map = map
    exports.reduce = reduce
    exports.summarize = summarize
    return exports
})
