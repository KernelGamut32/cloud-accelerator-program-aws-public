# Lab 04 - https://learn.acloud.guru/handson/2e684667-af97-4415-8cbf-51bd9eb971f2

**Follow along with the Guide tab in the lab**

* To avoid issues, the recommendation is to use NodeJS 16.x
* You may have to wait a couple of minutes before you're able to apply the `aws lambda update-function-code` command - initial setup of the function needs to be completed first

Alternative implementation using same lab environment:

* Execute the beginning steps as defined
* When creating the Lambda function, use the following instead:
    - Run `cd ~/` to navigate home in Cloud Shell and clone this repository using `git clone https://github.com/KernelGamut32/cloud-accelerator-program-aws-public.git`
    - Run `aws s3 mb s3://<bucket-name>` to create a new S3 bucket to house the source code (use lowercase letters and numbers only)
    - Copy the bucket name to a text editor window
    - Run `aws s3 cp ./ctaws-plant-shop/api/lambda/lambda.zip s3://<bucket-name>` to copy the source code to the bucket
    - Run `aws ec2 describe-subnets --query 'Subnets[*].SubnetId'` to get the 2 subnet IDs and copy to the text document
    - Run `aws ec2 describe-security-groups --query 'SecurityGroups[*].GroupId' --filter 'Name=description,Values=Plant Shop*' --output text` to get the security group id and copy to the text document
    - Run `aws rds describe-db-cluster-endpoints --query 'DBClusterEndpoints[0].Endpoint'` to get the RDS cluster endpoint and copy to the text document
    - Use `vim` to add the values copied to the text document to `./cloud-accelerator-program-aws-public/week06/labs/lab04/inputs.json`; use `i` to enter insert mode, make the updates, hit escape, and then `:wq!` to save and exit
    - Create the Lambda using the CloudFormation template in the lab repository by running `aws cloudformation create-stack --stack-name PlantAPILambda --parameters file://./cloud-accelerator-program-aws-public/week06/labs/lab04/inputs.json  --template-body file://./cloud-accelerator-program-aws-public/week06/labs/lab04/lambda.yaml --capabilities CAPABILITY_IAM`
    - Run `aws cloudformation describe-stack-events --stack-name PlantAPILambda` to check the status of the stack creation
    - Run `aws lambda get-function-url-config --function-name PlantShopAPI --query 'FunctionUrl'` to get the URL for the function and test via `curl` or in the browser
