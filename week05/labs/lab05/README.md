# Lab 05 - https://docs.aws.amazon.com/iot/latest/developerguide/iot-sns-rule.html

* Instead of creating the resources manually, we'll use CloudFormation to create the resources:
    - In a playground environment, open Cloud Shell, run `cd ~/` to navigate home, and clone this repository using `git clone https://github.com/KernelGamut32/cloud-accelerator-program-aws-public.git`
    - Use `vim` to view the parameter values in `./cloud-accelerator-program-aws-public/week05/labs/lab05/inputs.json`; use `i` to enter insert mode if you want to make any updates - when done, hit escape, and then `:wq!` to save and exit
    - Create the AWS resources using the CloudFormation template in the lab repository by running `aws cloudformation create-stack --stack-name IOT_SNS --parameters file://./cloud-accelerator-program-aws-public/week05/labs/lab05/inputs.json  --template-body file://./cloud-accelerator-program-aws-public/week05/labs/lab05/notification.yaml --capabilities CAPABILITY_IAM`
    - Run `aws cloudformation describe-stack-events --stack-name IOT_SNS` to check the status of the stack creation
* Once the CloudFormation deployment completes, use the AWS Console and follow along with `Step 3: Test the AWS IoT rule and Amazon SNS notification` to test the rule and notification