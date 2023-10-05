# Lab 08 - https://github.com/aws-samples/aws-cdk-lambda-cloudwatch-dashboard

* Run the lab in either a Cloud9 environment or a CloudShell environment in an ACG sandbox.
* Clone the repository using `git clone https://github.com/aws-samples/aws-cdk-lambda-cloudwatch-dashboard.git`
* Navigate to the lab folder using `cd aws-cdk-lambda-cloudwatch-dashboard`
* Review the source code available in the repo
* Use `npm install` to install the dependencies
* Use `npm run build` to transpile the TypeScript code to JavaScript
* Use `cdk bootstrap` to bootstrap the environment
* Use `cdk synth` to synthesize the CloudFormation template
* Use `cdk deploy` to deploy the stack
* On completion, navigate to the API Gateway, click "Actions", and click "Deploy API"; select "prod" for "Deployment stage" and click "Deploy"
* Copy the provided "Invoke URL"
* In a CloudShell window from the terminal, execute `for ((i=1;i<=2000;i++)); do curl -X POST "<invoke URL>/transactions"; curl -X GET "<invoke URL>/transactions/1234"; curl -X PUT "<invoke URL>/transactions/4567"; done`
* Navigate to the CloudWatch console and review the dashboard; after a couple of minutes, you should see the metrics populate
* Experiment with the various settings in the dashboard to see how the metrics change
