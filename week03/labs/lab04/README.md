# Lab 04 - https://aws.amazon.com/blogs/devops/new-fine-grained-continuous-delivery-with-codepipeline-and-aws-stepfunctions/#:~:text=Complete%20the%20following%20steps%3A%201%20On%20the%20CodePipeline,Action%20to%20the%20action%20group.%20...%20More%20items

## Create CodePipeline with CodeCommit and CodeBuild Components

* Execute the include `codepipeline.yaml` CloudFormation template to create a CodePipeline with CodeCommit and CodeBuild components using `aws cloudformation create-stack --stack-name code-pipeline-lab --template-body file://./codepipeline.yaml --capabilities CAPABILITY_IAM`
* Use `aws cloudformation describe-stack-events --stack-name code-pipeline-lab` to monitor the progress of the stack creation
* Use `aws cloudformation describe-stacks --stack-name code-pipeline-lab` to monitor overall stack status
* Run `aws s3 mb s3://<YOUR_BUCKET_NAME>` to create an S3 bucket to store the packaged step function
* Package the approval step function using `aws cloudformation package --template-file approval.yaml --s3-bucket <YOUR_BUCKET_NAME> --output-template-file workflow-template.yaml`
* Deploy the approval step function using `aws cloudformation deploy --template-file workflow-template.yaml --stack-name approval-step-function --capabilities CAPABILITY_IAM`
* Pick up from the remaining instructions outlined in the provided lab URL to inject the approval step function into the CodePipeline
