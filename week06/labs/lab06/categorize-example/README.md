# Instructions

* Run in a Cloud9 environment
* Clone the top-level repository in Cloud9 in the terminal using `git clone https://github.com/KernelGamut32/cloud-accelerator-program-aws-public.git`
* Navigate to the lab directory in the terminal using `cd cloud-accelerator-program-aws-public/week06/labs/lab06/categorize-example`
* Run `npm install` to install the dependencies
* Run `cdk bootstrap` to bootstrap the environment
* Run `cdk synth` to synthesize the CloudFormation template and view the template
* Run `cdk deploy` to deploy the stack
* In the console, navigate to the S3 bucket created by the stack, create an `upload` folder, and upload an .mp3 to the folder to kick off the process - there is an example of an "important" meeting recording at https://github.com/linuxacademy/content-aws-mls-c01/blob/master/CategorizeDataUploadsUsingStepFunctions/ImportantBusiness.mp3
* Clone locally for upload to the bucket (using the console or `aws s3 cp ImportantBusiness.mp3 s3://<bucket-name>/upload/`)
* Navigate to the Step Functions console and view the state machine progress, status, inputs, outputs, and any errors/logs
* View the folders in the bucket to see the final results - the .mp3 will be moved to the appropriate folder based on the results of the transcription (e.g., the sample file will be moved to the `important` folder)
