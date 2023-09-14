import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as create_sns_topic from './create-sns-topic';
import * as create_ec2_cloudwatch_alarm from './create-ec2-cloudwatch-alarm';

export class SnsExampleStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    const alarmName = this.node.tryGetContext('alarmName');
    const emailAddress = this.node.tryGetContext('emailAddress');
    const instanceId = this.node.tryGetContext('instanceId');

    const topic = new create_sns_topic.CreateSnsTopic(this, 'SNSTopic', alarmName,
      emailAddress);

    const topicArn = "arn:aws:sns:us-east-1:${Stack.of(this).account}:${topic.topic.topicName}"

    const alarm = 
      new create_ec2_cloudwatch_alarm.CreateEC2CloudWatchAlarm(this, 'EC2CloudWatchAlarm', 
        alarmName, topic.topic.attrTopicArn, topic.topic.attrTopicArn, topic.topic.attrTopicArn, instanceId);

  }
}
