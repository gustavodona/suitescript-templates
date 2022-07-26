/**
 * @NApiVersion 2.1
 * @NScriptType MapReduceScript
 * @NModuleScope SameAccount
 *
 * @Author Gustavo Doná
 */

 define(['N/record', 'N/search'], (record, search) => {
	const exports = {}
	const getInputData = () => {
	  const mrSearch = search.create()
	  return mrSearch
	}
  
	const map = (context) => {
	  log.debug('Map context', context.value)
	  const data = JSON.parse(context.value)
  
	  /*
			  //Pass values to Reduce stage
			  //Example:
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
	}
  
	const reduce = (context) => {
	  /*
			  //If values are being passed from Map stage
  
			  var parsedContext = []
			  for (var i in context.values) {
				  parsedContext.push(JSON.parse(context.values[i]))
			  }
			  log.debug("Reduce - Parsed Context", parsedContext)
		  */
	}
  
	const summarize = (summary) => {
	  /*
		  // Submit another MR execution
		  var mrTask = task.create({
			  taskType: task.TaskType.MAP_REDUCE,
			  scriptId: SCRIPT_ID,
			  deploymentId: DEPLOYMENT_ID,
			  params: {
				  "my_script_param": "value"
			  }
		  })
  
		  var mrTaskId = mrTask.submit()
		  var taskStatus = task.checkStatus(mrTaskId)
  
		  log.debug({
			  title: "Task Status",
			  details: JSON.stringify(mrTaskId),
		  })
  
		  if (taskStatus.status === "FAILED") {
			  log.error({
				  title: "Task Failed",
				  details: "Task Status: " + taskStatus,
			  })
		  }
		  */
  
	  // If an error was thrown during the input stage, log the error.
	  if (summary.inputSummary.error) {
		log.error({
		  title: 'Input Error',
		  details: summary.inputSummary.error
		})
	  }
  
	  // For each error thrown during the map stage, log the error, the corresponding key,
	  // and the execution number. The execution number indicates whether the error was
	  // thrown during the the first attempt to process the key, or during a
	  // subsequent attempt.
	  summary.mapSummary.errors.iterator().each(function (key, error, executionNo) {
		log.error({
		  title: 'Map error for key: ' + key + ', execution no.  ' + executionNo,
		  details: error
		})
		return true
	  })
  
	  // For each error thrown during the reduce stage, log the error, the corresponding
	  // key, and the execution number. The execution number indicates whether the error was
	  // thrown during the the first attempt to process the key, or during a
	  // subsequent attempt.
  
	  summary.reduceSummary.errors.iterator().each(function (key, error, executionNo) {
		log.error({
		  title: 'Reduce error for key: ' + key + ', execution no. ' + executionNo,
		  details: error
		})
		return true
	  })
  
	  log.audit('Summary Time - Seconds', 'Total Seconds: ' + summary.seconds)
	  log.audit('Summary Time - Minutes', 'Total Minutes: ' + parseFloat(summary.seconds / 60).toFixed(1))
	  log.audit('Summary Time - Minutes', 'Total Hours: ' + parseFloat(summary.seconds / 3600).toFixed(1))
	  log.debug('Summary Usage', 'Total Usage: ' + summary.usage)
	  log.debug('Summary Yields', 'Total Yields: ' + summary.yields)
  
	  // log.debug("Input Summary: ", JSON.stringify(summary.inputSummary))
	  // log.debug("Map Summary: ", JSON.stringify(summary.mapSummary))
	  // log.debug("Reduce Summary: ", JSON.stringify(summary.reduceSummary))
	}
  
	exports.getInputData = getInputData
	exports.map = map
	exports.reduce = reduce
	exports.summarize = summarize
	return exports
  })  