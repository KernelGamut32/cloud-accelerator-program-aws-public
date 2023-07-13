# Lab 02 - https://learn.acloud.guru/handson/6b13d4a5-f418-4a29-a0a9-0adff3170ec7

**NOTE: Use the same AWS sandbox used with Lab 01**

Follow along with the "Guide" tab in the ACG lab definition.

* Use the provided `first-cdk-app-stack.ts` file contents for the corresponding step
* Use the provided `first-cdk-app-stack.add-items.ts` file contents for the corresponding step

Setting Up and Tearing Down Environments with the AWS CDK
Introduction
In this lab, we'll use the Cloud9 service in AWS to work on our CDK project using a "blue/green" deployment. Our CDK project already consists of an API Gateway, backed by a Lambda function that can scan items on a DynamoDB table. We want to update our application and add a second Lambda function that can add items to our DynamoDB table. To do this, we'll need to create a second "green" stack with an entirely separate API Gateway, Lambda function, and DynamoDB table. Once the "green" stack has been provisioned and tested, we can promote it to the "blue" stack and then destroy our unneeded infrastructure.

Solution
Log in to the AWS Management Console using the credentials provided on the lab instructions page. Make sure you're in the N. Virginia (us-east-1) Region throughout the lab.

Create A Cloud9 Development Environment
In the AWS Management Console, enter cloud9 in the search bar on top.
From the results, select Cloud9.
Click Create environment.
Under Name, enter any name you like, such as my-first-cdk-app.
Click Next step.
Under Instance type, select t3.small.
Under Subnet, select one of the two public subnets.
Click Next step.
Review your information and click Create environment.
From the Cloud9 Terminal, Pull the Code from the Provided GitHub Link and Deploy the "Blue" Stack
Clone the GitHub repo that is supplied in the description of this hands-on lab:

git clone https://github.com/ACloudGuru-Resources/cdk-lab-1.git
This repo includes an environment containing an API Gateway, a Lambda function, and a DynamoDB table.

Change the directory into the cdk-lab-1 directory:

cd cdk-lab-1
Install all node packages:

npm install
Bootstrap our CDK project:

cdk bootstrap
In the left-hand navigation menu, expand the my-first-cdk-app folder.

Expand the lib folder.

Click the stack file, first-cdk-app-stack.ts, and review the file.

In the left-hand navigation menu, expand the bin folder.

Click the first-cdk-app.ts file.

Delete all the comments and other contents of the file starting at line 7.

On line 7, create a new FirstCdkAppStack app with a stack name and a deployment environment:

new FirstCdkAppStack(app, 'blue', {
  stackName: 'blue',
  deploymentEnvironment: 'blue',
});
Create a green stack with the same parameters:

new FirstCdkAppStack(app, 'green', {
  stackName: 'green',
  deploymentEnvironment: 'green',
});
Above the blue stack, add the comment // instantiate blue stack for clarity.

Above the green stack, add the comment // instantiate green stack for clarity.

Save the file by pressing Ctrl + S or (Cmd + S on a Mac).

In the left-hand navigation menu, click on the first-cdk-app_stack.ts file under the lib folder.

After the dependencies listed on top, add a block defining MyDskStacProps:

interface MyCdkStackProps extends StackProps {
  stackName: 'blue' | 'green'
  deploymentEnvironment: 'blue' | 'green';
}
In the constructor line, change the scope so that the line reads:

constructor(scope: App, id: string, props: MyCdkStackProps) {
Save the file by pressing Ctrl + S or (Cmd + S on a Mac).

In the terminal, deploy the blue environment:

cdk deploy blue
When prompted, enter y.

Under Ouputs:, copy the link for the blue.RestAPIEndpoint.

Check that the blue stack was successfully deployed:

curl <INSERT-COPIED-LINK-HERE>/scan
Create a New “Green” Stack and Copy the Constructs from Your "Blue" Stack
Return to your first-cdk-app-stack.ts file.

Create a new Lambda function to add items to the table:

//define lambda function to add items to table
const add_item_lambda_backend = new NodejsFunction(this, "add-item", {
  tracing: lambda.Tracing.ACTIVE,
  environment: {
    DYNAMODB: dynamodb_table.tableName
  },
})
Give the Lambda function write access to the DynamoDB table:

//grant lambda function write access to dynamodb table
dynamodb_table.grantWriteData(add_item_lambda_backend.role!)
In Your “Green” Stack, Create a New API Gateway Endpoint That Calls a New Lambda Function to Add Items to Your DynamoDB Table
Add a second endpoint after the existing endpoint in the file:

//define endpoint and associate it with lambda backend
const addItemEndpoint = api.root.addResource("add")
const addItemEndpointMethod = addItemEndpoint.addMethod("PUT", new apigateway.LambdaIntegration(add_item_lambda_backend))
Save the file by pressing Ctrl + S or (Cmd + S on a Mac).

In the left-hand navigation menu, right-click on the lib folder.

Select New File.

Name the file first-cdk-app-stack.add-item.ts.

Open the new file.

Insert the following into the file:

import * as AWSXRay from 'aws-xray-sdk';
import * as AWSSDK from 'aws-sdk';
import { APIGatewayProxyEvent } from "aws-lambda";

//define DocumentClient
const AWS = AWSXRay.captureAWS(AWSSDK);
const docClient = new AWS.DynamoDB.DocumentClient();

//define table by variable passed from stack
const table = process.env.DYNAMODB || "undefined"

console.log(event)
console.log(event.body)
const obj = JSON.parse(event.body)

const ID = obj.id;
const NAME = obj.name

//define table and item in params
const params = {
      TableName: table,
      Item: {
           id: {S: ID},
           name: {S: NAME}
      }
  };

//scanItems function uses params to scan a dynamodb table
async function putItem(){
  try {
    const data = await docClient.put(params).promise()
    return data
  } catch (err) {
    return err
  }
}


//actual handler logs events and calls scanItems
//logs error on catch
exports.handler = async (event:APIGatewayProxyEvent) => {
  try {
    const data = await putItem(params)
    return { body: JSON.stringify(data) }
  } catch (err) {
    return { error: err }
  }
}
Save the file by pressing Ctrl + S or (Cmd + S on a Mac).

Deploy Your "Green" Stack and Verify Deployment
In the terminal, deploy the green stack:

cdk deploy green
When prompted, enter y.

In the upper right corner, click on the cloud-shaped icon with the number 9.

Select Go to Dashboard to return to the AWS Management Console.

In the search bar on top, enter cloudformation*.

From the search results, select CloudFormation.

Under Stack name, click on green. You should see the create is complete.

Click on Resources to see the list of resources created, such as a DynamoDB table, a Lambda function for adding items, and an API Gateway with multiple paths.

Once Your "Green" Stack Is Deployed, Tear Down Your “Blue” Stack
Navigate back to the Cloud9 terminal.

Destroy the "blue" stack:

cdk destroy blue
Conclusion
Congratulations — you've completed this hands-on lab!
