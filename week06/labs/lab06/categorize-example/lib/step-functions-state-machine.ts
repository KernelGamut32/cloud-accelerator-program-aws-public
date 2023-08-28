import { Construct } from "constructs";
import * as stepfunctions from 'aws-cdk-lib/aws-stepfunctions';

export class StepFunctionsStateMachine extends Construct {
    public stepFunctionsStateMachine: stepfunctions.CfnStateMachine;

    constructor(scope: Construct, id: string, transcribeAudioLambdaArn: string,
        transcribeStatusLambdaArn: string, categorizeDataLambdaArn: string,
        delegatedRoleArn: string) {
        super(scope, id);

        this.stepFunctionsStateMachine = new stepfunctions.CfnStateMachine(this, id, {
            stateMachineName: "Categorize-Audio-Data-Pipeline",
            definitionString: `
{
"Comment": "Categorize audio clips by the content of their transcripts",
"StartAt": "Transcribe Audio",
"States": {
"Transcribe Audio": {
  "Type": "Task",
  "Resource": "arn:aws:states:::lambda:invoke",
  "Parameters": {
    "FunctionName": "${transcribeAudioLambdaArn}:$LATEST",
    "Payload": {
      "Input.$": "$"
    }
  },
  "Next": "Wait for Transcribe"
},
"Wait for Transcribe": {
  "Type": "Wait",
  "Seconds": 60,
  "Next": "Check Transcribe Status"
},
"Check Transcribe Status": {
  "Type": "Task",
  "Resource": "arn:aws:states:::lambda:invoke",
  "Parameters": {
    "FunctionName": "${transcribeStatusLambdaArn}:$LATEST",
    "Payload": {
      "Input.$": "$"
    }
  },
  "Next": "Is Transcribe Finished"
},
"Is Transcribe Finished": {
  "Type": "Choice",
  "Choices": [
    {
      "Variable": "$.Payload.TranscriptionJobStatus",
      "StringEquals": "COMPLETED",
      "Next": "Categorize Data"
    },
    {
      "Variable": "$.Payload.TranscriptionJobStatus",
      "StringEquals": "FAILED",
      "Next": "Transcribe Failed"
    }
  ],
  "Default": "Wait for Transcribe"
},
"Categorize Data": {
  "Type": "Task",
  "Resource": "arn:aws:states:::lambda:invoke",
  "Parameters": {
    "FunctionName": "${categorizeDataLambdaArn}:$LATEST",
    "Payload": {
      "Input.$": "$"
    }
  },
  "End": true
},
"Transcribe Failed": {
  "Type": "Fail"
}
}
}
`,
            roleArn: `${delegatedRoleArn}`,
            stateMachineType: "STANDARD",
            loggingConfiguration: {
                includeExecutionData: false,
                level: "OFF"
            },
        });
    }
}
