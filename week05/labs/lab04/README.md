# Lab 04 - https://learn.acloud.guru/handson/cdfba172-1b7c-4762-a14e-e469ffbe5e54

* You'll need to execute this lab in the provided lab sandbox because you'll use the provided EC2 instance for the alarms
* Open Cloud Shell, make sure you are in the home directory by executing `cd ~/`, and clone the top-level repository using `git clone https://github.com/KernelGamut32/cloud-accelerator-program-aws-public.git`
* Use `vim cloud-accelerator-program-aws-public/week05/labs/lab04/sns-example/cdk.json` to view and modify the parameter values (near the bottom of the file) - **update the email address and the instance ID**
* Navigate to the lab directory in Cloud Shell using `cd cloud-accelerator-program-aws-public/week05/labs/lab04/sns-example`
* Run `npm install` to install the dependencies
* Run `cdk bootstrap` to bootstrap the environment
* Run `cdk synth` to synthesize the CloudFormation template and view the template
* Run `cdk deploy` to deploy the stack
* Confirm your subscription to the SNS topic by clicking the link in the email sent to the address you specified in the `cdk.json` file
* Navigate to the EC2 console and view the status of the instance - it should be "running"
* Change the status of the instance to "stopped" and note that the alarm status changes to "ALARM"
* Change the status of the instance to "running" and note that the alarm status changes to "OK"
