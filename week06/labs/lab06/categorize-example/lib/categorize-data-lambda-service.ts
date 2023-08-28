import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { Role } from "aws-cdk-lib/aws-iam";
import * as lambda from "aws-cdk-lib/aws-lambda";

export class CategorizeDataLambdaService extends Construct {
  public lambdaFunction: lambda.Function;

  constructor(scope: Construct, id: string, role: Role) {
    super(scope, id);

    this.lambdaFunction = new lambda.Function(this, id, {
        environment: {
          "KEYWORDS": "important,urgent,asap,important_supersecret"
        },
        functionName: "categorize-data-lambda",
        runtime: lambda.Runtime.PYTHON_3_9,
        code: lambda.Code.fromAsset("resources/categorize-data-lambda"),
        handler: "index.lambda_handler",
        timeout: cdk.Duration.seconds(10),
        role: role,
      });
  }
}
