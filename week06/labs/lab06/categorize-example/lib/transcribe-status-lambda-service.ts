import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { Role } from "aws-cdk-lib/aws-iam";
import * as lambda from "aws-cdk-lib/aws-lambda";

export class TranscribeStatusLambdaService extends Construct {
  public lambdaFunction: lambda.Function;

  constructor(scope: Construct, id: string, role: Role) {
    super(scope, id);

    this.lambdaFunction = new lambda.Function(this, id, {
        functionName: "transcribe-status-lambda",
        runtime: lambda.Runtime.PYTHON_3_9,
        code: lambda.Code.fromAsset("resources/transcribe-status-lambda"),
        handler: "index.lambda_handler",
        timeout: cdk.Duration.seconds(10),
        role: role,
      });
  }
}
