# Lab 05

* Re-execute lab04 in week06 using the "alternative" implementation outlined there
* That lab adds XRay tracing to the Lambda (which we did not review previously) - note the `TracingConfig` property in the Lambda function definition in the CFT
* Once the previous labs instructions are complete, navigate to the XRay console and review the traces using the "Traces" link in the left-hand navigation pane
* Alternatively, you can navigate to the the PlantShopAPI function in the Lambda console and click the Monitoring tab to see the XRay traces
* Test several requests to the API and review the traces - timings, errors, etc.
* Note that the XRay traces are also available in CloudWatch Logs - you can view them in the CloudWatch console
