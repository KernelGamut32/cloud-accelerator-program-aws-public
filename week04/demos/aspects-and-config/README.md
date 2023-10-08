# DEMO - Aspects and Config

**If you encounter "no space left on device issues", use https://ryansouthgate.com/aws-cloud9-no-space-left-on-device/#:~:text=There%E2%80%99s%20a%20few%20things%20we%20can%20tackle%20here%2C,clean%20up%20that%20much%20free%20space%20for%20me**

See https://blog.jannikwempe.com/mastering-aws-cdk-aspects and https://www.rehanvdm.com/blog/4-methods-to-configure-multiple-environments-in-the-aws-cdk for additional information.

* Run in a Cloud9 environment in an ACG sandbox
* Clone the following repo to your Cloud9 environment in `~/environment` using `git clone https://github.com/KernelGamut32/cdk-aspects-examples.git`
* Navigate to target folder using `cd cdk-aspects-examples`
* Run `npm install` to install the required dependencies
* Run `cdk bootstrap` to bootstrap the CDK environment
* Navigate to `/cdk-aspects-examples/src/aspects/enforce-minimum-lambda-node-runtime-version.ts` to review the aspect code
* Navigate to `/cdk-aspects-examples/bin/cdk-aspects-examples.ts` and uncomment line 34
* Run `cdk synth` to view the template that will be generated for the CDK stack
* Navigate to `/cdk-aspects-examples/lib/my-stack.ts` change line 28 to `runtime: Runtime.NODEJS_12_X,`
* Run `cdk synth` again and observe the error; change line 28 back to `runtime: Runtime.NODEJS_16_X,`
* Navigate to `/cdk-aspects-examples/cdk.json` and add the following to the end of the `context` section: `"timeout": 15`
* Navigate to `/cdk-aspects-examples/bin/cdk-aspects-examples.ts` and change line 15 to `new MyStack(app, 'MyStack', app.node.tryGetContext('timeout'));`
* Navigate to `/cdk-aspects-examples/lib/my-stack.ts` and change line 14 to `constructor(scope: Construct, id: string, timeout: number, props?: cdk.StackProps) {`
* Add the following after line 28: `timeout: Duration.seconds(timeout),`
* Rerun `cdk synth` and observe the change in the template at `/cdk-aspects-examples/cdk.out/MyStack.template.json` (search for `Timeout` and observe the timeout value under the `MyLambda1` resource definition)
* Modify the `timeout` entry in `cdk.json` and rerun `cdk synth` to see the impact
