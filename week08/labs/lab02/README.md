# Lab 02 - https://dzone.com/articles/dynamic-data-processing-using-serverless-java-with and https://dzone.com/articles/dynamic-data-processing-using-serverless-java-with-1 

** NOTE: If you encounter "no space left on device issues", use https://ryansouthgate.com/aws-cloud9-no-space-left-on-device/#:~:text=There%E2%80%99s%20a%20few%20things%20we%20can%20tackle%20here%2C,clean%20up%20that%20much%20free%20space%20for%20me**

* Launch an AWS Sandbox and create a new Cloud9 environment (or reuse from previous lab)
* Follow along with the initial instructions in the first tutorial link
* The tutorial recommends using Java 17 - however, Cloud9 does not currently support 17 OOTB (you can use 11 instead)
* For the docker compose steps, use the following to help you get docker-compose setup in Cloud9:
    * Run `sudo curl -SL https://github.com/docker/compose/releases/download/v2.20.2/docker-compose-linux-x86_64 -o /usr/local/bin/docker-compose` to install docker-compose in Cloud9
    * Add execution permissions (using `+x`) to the docker-compose binary: `sudo chmod +x /usr/local/bin/docker-compose`
    * Use the following for your docker-compose in Cloud9:
```
version: '3.8'

services:
  dynamodb-local:
    image: amazon/dynamodb-local:latest
    container_name: dynamodb-local
    restart: unless-stopped
    ports:
      - "8000:8000"
    user: root
    volumes:
      - ../tmp/dynamodb:/home/dynamodblocal/data
    working_dir: /home/dynamodblocal
    command: "-jar DynamoDBLocal.jar -sharedDb -dbPath ./data"
```
* In a new terminal, use the following for the "Creating an Entry Table Locally" step
```
/usr/local/bin/aws dynamodb create-table --endpoint-url http://localhost:8000 --table-name finance \
--attribute-definitions AttributeName=accountID,AttributeType=S AttributeName=timestamp,AttributeType=N \
--key-schema AttributeName=timestamp,KeyType=HASH AttributeName=accountID,KeyType=RANGE \
--provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 --table-class STANDARD
```
* Use the following for adding test records to the "local" table
```
curl -X POST http://localhost:8080/entryResource -H 'Content-Type: application/json' -d '{"accountID": "Food", "description": "Shrimp", "category": "Seafood", "amount": "-20", "balance": "0", "date": "2023-02-01+12:00"}'
curl -X POST http://localhost:8080/entryResource -H 'Content-Type: application/json' -d '{"accountID": "Car", "description": "Flat tires", "category": "Automotive", "amount": "-200", "balance": "0", "date": "2023-03-01+12:00"}'
curl -X POST http://localhost:8080/entryResource -H 'Content-Type: application/json' -d '{"accountID": "Payslip", "description": "Income", "category": "Get Paide", "amount": "2000", "balance": "0", "date": "2023-04-01+12:00"}'
curl -X POST http://localhost:8080/entryResource -H 'Content-Type: application/json' -d '{"accountID": "Utilities", "description": "Gas", "category": "Necessary Evils", "amount": "-400", "balance": "0", "date": "2023-05-01+12:00"}'
```
* Use the following to retrieve all records from the "local" table:
```
curl -X GET http://localhost:8080/entryResource/findAll 
```
* Use the following to find a record by account in the "local" table:
```
curl -X GET http://localhost:8080/entryResource/findByAccount/Food
```
* When adding the new extension for Lambda, make sure that you are in the project root
* Use this for the SAM template:
```
AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31
Description: PiggyBank AWS SAM application

Resources:
    Piggybank:
        Type: AWS::Serverless::Function
        Properties:
            Handler: io.quarkus.amazon.lambda.runtime.QuarkusStreamHandler::handleRequest
            Runtime: java17
            CodeUri: target/function.zip
            MemorySize: 1024
            SnapStart:
                ApplyOn: PublishedVersions
            AutoPublishAlias: snap
            Policies:
                - DynamoDBCrudPolicy:
                        TableName: entry
            Timeout: 15
            Environment:
                Variables:
                    JAVA_TOOL_OPTIONS: "-XX:+TieredCompilation -XX:TieredStopAtLevel=1"
            Events:
                HttpApiEvent:
                    Type: HttpApi
Outputs:
    PiggybankApi:
        Description: URL for application
        Value: !Sub 'https://${ServerlessHttpApi}.execute-api.${AWS::Region}.amazonaws.com/'
        Export:
            Name: PiggybankApi
```
* Before running `quarkus build --no-tests` and `sam deploy -g`, make sure you change the table name value in the lambda code (from "finance" to "entry") - HINT: It's in the `AbstractService.java` file
* Use the following to test the deployed API:
```
export API_URL=$(aws cloudformation describe-stacks --query 'Stacks[0].Outputs[?OutputKey==`PiggybankApi`].OutputValue' --output text)
echo $API_URL
```
```
curl -X POST ${API_URL}/entryResource -H 'Content-Type: application/json' -d '{"accountID": "Food", "description": "Shrimp", "category": "Seafood", "amount": "-20", "balance": "0", "date": "2023-02-01+12:00"}'
curl -X POST ${API_URL}/entryResource -H 'Content-Type: application/json' -d '{"accountID": "Car", "description": "Flat tires", "category": "Automotive", "amount": "-200", "balance": "0", "date": "2023-03-01+12:00"}'
curl -X POST ${API_URL}/entryResource -H 'Content-Type: application/json' -d '{"accountID": "Payslip", "description": "Income", "category": "Get Paide", "amount": "2000", "balance": "0", "date": "2023-04-01+12:00"}'
curl -X POST ${API_URL}/entryResource -H 'Content-Type: application/json' -d '{"accountID": "Utilities", "description": "Gas", "category": "Necessary Evils", "amount": "-400", "balance": "0", "date": "2023-05-01+12:00"}'
curl -X GET ${API_URL}/entryResource/findAll
curl -X GET ${API_URL}/entryResource/findByAccount/Food
```
