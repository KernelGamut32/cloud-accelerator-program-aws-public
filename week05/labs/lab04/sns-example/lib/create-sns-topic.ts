import { Construct } from "constructs";
import * as sns from 'aws-cdk-lib/aws-sns';
import { Stack } from "aws-cdk-lib";

export class CreateSnsTopic extends Construct {
    public topic: sns.CfnTopic;

    constructor(scope: Construct, id: string, topicName: string, emailAddress: string) {
        super(scope, id);

        this.topic = new sns.CfnTopic(this, id, {
            displayName: "",
            topicName: topicName
        });

        new sns.CfnTopicPolicy(this, 'SNSTopicPolicy', {
            policyDocument:
            {
                "Version": "2008-10-17",
                "Id": "__default_policy_ID",
                "Statement": [
                    {
                        "Sid": "__default_statement_ID",
                        "Effect": "Allow",
                        "Principal": {
                            "AWS": "*"
                        },
                        "Action": [
                            "SNS:GetTopicAttributes",
                            "SNS:SetTopicAttributes",
                            "SNS:AddPermission",
                            "SNS:RemovePermission",
                            "SNS:DeleteTopic",
                            "SNS:Subscribe",
                            "SNS:ListSubscriptionsByTopic",
                            "SNS:Publish"
                        ],
                        "Resource": "arn:aws:sns:${Stack.of(this).region}:${Stack.of(this).account}:${this.topic.topicName}",
                        "Condition": {
                            "StringEquals": {
                                "AWS:SourceOwner": "${Stack.of(this).account}"
                            }
                        }
                    }
                ]
            },
            topics: [
                this.topic.ref
            ]
        });

        new sns.CfnSubscription(this, 'SNSSubscription', {
            topicArn: this.topic.ref,
            endpoint: emailAddress,
            protocol: "email",
            region: Stack.of(this).region
        });

    }
}
