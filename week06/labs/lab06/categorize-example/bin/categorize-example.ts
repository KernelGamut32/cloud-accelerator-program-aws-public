import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CategorizeExampleStack } from '../lib/categorize-example-stack';

const app = new cdk.App();

new CategorizeExampleStack(app, 'CategorizeExampleStack', {
});