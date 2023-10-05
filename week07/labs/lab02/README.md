# Lab 02 - https://learn.acloud.guru/handson/9087f514-28eb-4ace-acd4-b6cb83f666a0

* Follow along with the Guide tab in the ACG lab
* As a follow up, attempt to parameterize a CloudFormation template generated from the resources created as part of the lab
* Re-run the template with different parameters to see how the resources are created differently
* To run the template provided as the solution, execute the following steps in a CloudShell or Cloud9 environment:
    - Clone this repository using `git clone https://github.com/KernelGamut32/cloud-accelerator-program-aws-public.git` in the root folder of the environment
    - Navigate to the lab folder using `cd cloud-accelerator-program-aws-public/week07/labs/lab02`
    - Use `vi inputs.json` to edit the parameters; use `i` to enter insert mode, and `esc` followed by `:wq!` to save and exit
    - Execute the template with parameter inputs using: `aws cloudformation create-stack --stack-name lab02 --template-body file://deployment.yaml --parameters file://inputs.json --capabilities CAPABILITY_NAMED_IAM`
    - Use `aws cloudformation describe-stacks --stack-name lab02` to check the status of the stack creation
    - Upon completion of the CloudFormation stack execution, navigate to the email address used in `inputs.json` to verify the subscription to the SNS topic
    - Pick up with the "Change the State of the EC2 Instance and Verify Receipt of the SNS Notification" section of the lab guide
    - You should receive an email notification upon changing the state of the EC2 instance
