# Lab 03 - https://learn.acloud.guru/handson/36bc58b0-342d-406d-8c96-5b9a24cdca25

**Follow along with the Guide tab in the lab**

* Troubleshoot using https://stackoverflow.com/questions/74792293/aws-lambda-cannot-find-module-aws-sdk-in-build-a-basic-web-application-tutoria
* Update Node version

```
    const lambda_backend = new NodejsFunction(this, "function", {
      runtime: lambda.Runtime.NODEJS_16_X,
      tracing: lambda.Tracing.ACTIVE,
      environment: {
        DYNAMODB: dynamodb_table.tableName,
      },
    });
```
* If you encounter "no space left on device issues", use https://ryansouthgate.com/aws-cloud9-no-space-left-on-device/#:~:text=There%E2%80%99s%20a%20few%20things%20we%20can%20tackle%20here%2C,clean%20up%20that%20much%20free%20space%20for%20me
