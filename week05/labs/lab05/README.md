# Lab 05 - https://learn.acloud.guru/handson/fd65ed62-a3c3-4d6f-8aa0-9051aa038d61

**Follow along with the Guide tab in the lab**

* Instead of using the Lambda (to send the email) and SES to manage the mail delivery, use a subscription on the SNS topic instead (to avoid SES limits in the ACG lab environment)
* While waiting for the emails to arrive, review https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html for information on the CloudTrail service
* Review properties of the S3 bucket - you can see the event added to the bucket's properties
