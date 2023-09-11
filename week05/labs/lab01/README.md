# Lab 01 - https://learn.acloud.guru/handson/c11ca4ba-f942-4a5b-9c75-ad3ff8134a97

* For this lab, you'll use the provided lab environment but you will deploy the resources using the CDK project provided in this directory
* After starting the lab and logging into the AWS Console, navigate to Cloud9 and create a new environment
* Clone the repo to your Cloud9 environment using `git clone https://github.com/KernelGamut32/cloud-accelerator-program-aws-public.git`
* Navigate to target folder using `cd cloud-accelerator-program-aws-public/week05/labs/lab01/queue-deploy`
* Run `npm install` to install the required dependencies
* Run `cdk bootstrap` to bootstrap the CDK environment
* Run `cdk synth` to view the template that will be generated for the CDK stack
* Run `cdk deploy` to deploy the CDK stack

**Follow along with the Guide tab in the lab**

* It may take a few minutes for the messsages to show in the received messages section of the SQS queue
* Number of messages received should match the number of items in the DynamoDB table
