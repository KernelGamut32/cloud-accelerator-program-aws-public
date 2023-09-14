import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { SnsExampleStack } from '../lib/sns-example-stack';

const app = new cdk.App();
new SnsExampleStack(app, 'SnsExampleStack', {
});