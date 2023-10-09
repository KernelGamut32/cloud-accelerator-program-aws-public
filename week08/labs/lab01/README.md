# Lab 01 - https://quarkus.io/guides/aws-lambda

** NOTE: If you encounter "no space left on device issues", use https://ryansouthgate.com/aws-cloud9-no-space-left-on-device/#:~:text=There%E2%80%99s%20a%20few%20things%20we%20can%20tackle%20here%2C,clean%20up%20that%20much%20free%20space%20for%20me**

* Launch an AWS Sandbox and create a new Cloud9 environment
* Install the Quarkus CLI into your Cloud9 environment using the JBang instructions found here: https://quarkus.io/guides/cli-tooling (**Note the requirement to open a new terminal window after installing**)
* Install latest version of Maven using https://maven.apache.org/install.html; previously we've used `sudo yum install -y maven` but this installs an older version that is invalid for this lab
    * Use `wget` to pull target zip version of maven file at https://maven.apache.org/download.cgi (opened in a new tab); use `wget <url>`
    * Run `unzip` command to unzip the file; use `unzip <filename>.zip` (from previous download)
    * Add Maven path to PATH variable in `~/.bash_profile` using `PATH=<path to maven bin folder>:$PATH`
    * After updating, be sure and run `source ~/.bash_profile` to pick up the changes
    * Verify Maven is installed by running `mvn -v`
* Before executing Maven Archetype, execute `cd ~/environment`
* Use something like `quarkus_lab1` for `groupId` when prompted
* Use same for `artifactId` when prompted
* Hit enter when prompted for `version`
* Hit enter when prompted for `package`
* After project is created, navigate to the project folder using `cd quarkus_lab1`
* Review the generated code
* Build the project using `quarkus build`
* Create an execution role as described in the lab instructions - no permissions are required as these Lambdas are simple
* Use `LAMBDA_ROLE_ARN="<role ARN>" sh target/manage.sh create` to create the Lambda function
* Use `sh target/manage.sh invoke` to test the Lambda function
* Make an update to the code (e.g., in `ProcessingService.java` or `payload.json`), re-run `mvn clean package`, and then re-run `sh target/manage.sh update` to push the updates
* Use `sh target/manage.sh invoke` to test the Lambda function updates
* Use `quarkus dev` to run the Lambda function locally
* Test in a separate terminal using something like `curl -X POST -H "Content-Type: application/json" -d '{"greeting": "Howdy", "name": "Joe Schmoe"}' http://localhost:8080` 
* Run `sh target/manage.sh delete` to delete the Lambda function
* Change `resources/application.properties` to reference `stream` instead of `test`
* Re-run `quarkus build` to pull in the changes
* Update `target/manage.sh` to enable tracing by adding the `--tracing-config` line in the proper spot in the `create` statement
* Re-run `LAMBDA_ROLE_ARN="<role ARN>" sh target/manage.sh create` to recreate the Lambda with the changes
* Use `sh target/manage.sh invoke` to test the Lambda function updates
* Review the XRay tracing for the Lambda in the AWS console - it will not be recording traces
* Add the `AWSXRayDaemonWriteAccess` and `AWSLambdaBasicExecutionRole` permissions to the previously created role
* Use `for i in $(seq 1 50); do sh target/manage.sh invoke; done;` to run a small amount of test traffic through the Lambda
* Review the XRay tracing for the Lambda again
* **NOTE: When updating, don't forget to build before running update statement**
