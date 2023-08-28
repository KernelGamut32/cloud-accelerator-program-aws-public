import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { ManagedPolicy, Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import * as lambda from "aws-cdk-lib/aws-lambda";

export class RunStepFunctionsLambdaService extends Construct {
  public lambdaFunction: lambda.Function;

  constructor(scope: Construct, id: string, stepFunctionsStateMachineArn: string) {
    super(scope, id);

    const triggerStepFunctionsRole = new Role(this, 'trigger-step-functions-role', {
      assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
    });
    triggerStepFunctionsRole.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName('CloudWatchLogsFullAccess'));
    triggerStepFunctionsRole.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName('AWSStepFunctionsFullAccess'));

    this.lambdaFunction = new lambda.Function(this, id, {
      environment: {
        "STATEMACHINEARN": stepFunctionsStateMachineArn
      },
      functionName: "run-step-functions-lambda",
      runtime: lambda.Runtime.PYTHON_3_9,
      code: lambda.Code.fromAsset("resources/run-step-functions-lambda"),
      handler: "index.lambda_handler",
      timeout: cdk.Duration.seconds(10),
      role: triggerStepFunctionsRole,
    });
  }
}
