import { Construct } from "constructs";
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3n from 'aws-cdk-lib/aws-s3-notifications';
import * as lambda from "aws-cdk-lib/aws-lambda";

export class MeetingAudioBucket extends Construct {
  public meetingAudioBucket: s3.Bucket;

  constructor(scope: Construct, id: string, lambdaFunction: lambda.Function) {
    super(scope, id);

    this.meetingAudioBucket = new s3.Bucket(this, id, {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
      enforceSSL: true
    });
    
    this.meetingAudioBucket.addEventNotification(
      s3.EventType.OBJECT_CREATED,
      new s3n.LambdaDestination(lambdaFunction),
      { prefix: 'upload/', suffix: '.mp3' },
    );
  }
}
