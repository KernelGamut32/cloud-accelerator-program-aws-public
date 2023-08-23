# Lab 04 - https://learn.acloud.guru/handson/2e684667-af97-4415-8cbf-51bd9eb971f2

**Follow along with the Guide tab in the lab**

* To avoid issues, the recommendation is to use NodeJS 16.x
* You may have to wait a couple of minutes before you're able to apply the `aws lambda update-function-code` command - initial setup of the function needs to be completed first

Alternative implementation using same lab environment:

* Execute the beginning steps as defined
* When creating the Lambda function, use the following instead:
    - Run `cd ~/` to navigate home in Cloud Shell and clone this repository using `git clone https://github.com/KernelGamut32/cloud-accelerator-program-aws-public.git`
    - Run `aws s3 mb s3://<bucket-name>` to create a new S3 bucket to house the source code (use lowercase letters and numbers only)
    - Run `aws s3 cp ./ctaws-plant-shop/api/lambda/lambda.zip s3://<bucket-name>` to copy the source code to the bucket
    - Use `vim` to replace "<bucket-name>" in `./cloud-accelerator-program-aws-public/week06/labs/lab04/lambda.yaml` with the name of the bucket you just created
    - Create the Lambda using the CloudFormation template in the lab repository by running `aws cloudformation create-stack --stack-name PlantAPILambda --template-body file://./cloud-accelerator-program-aws-public/week06/labs/lab04/lambda.yaml`
    - Use the function URL output to test the function
