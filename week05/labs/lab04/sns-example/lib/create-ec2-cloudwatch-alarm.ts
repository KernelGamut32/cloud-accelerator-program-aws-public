import { Construct } from "constructs";
import * as cloudwatch from 'aws-cdk-lib/aws-cloudwatch';

export class CreateEC2CloudWatchAlarm extends Construct {
    public alarm: cloudwatch.CfnAlarm;

    constructor(scope: Construct, id: string, alarmName: string, okActionArn: string,
        alarmActionArn: string, insufficientDataActionArn: string, ec2InstanceId: string) {
        super(scope, id);

        this.alarm = new cloudwatch.CfnAlarm(this, id, {
            alarmName: alarmName,
            actionsEnabled: true,
            okActions: [
                okActionArn
            ],
            alarmActions: [
                alarmActionArn
            ],
            insufficientDataActions: [
                insufficientDataActionArn
            ],
            metricName: "StatusCheckFailed_Instance",
            namespace: "AWS/EC2",
            statistic: "Average",
            dimensions: [
                {
                    name: "InstanceId",
                    value: ec2InstanceId
                }
            ],
            period: 60,
            evaluationPeriods: 1,
            datapointsToAlarm: 1,
            threshold: 1,
            comparisonOperator: "GreaterThanThreshold",
            treatMissingData: "breaching"
        });

    }
}
