# Lab 01 - https://quarkus.io/guides/amazon-lambda

** NOTE: If you encounter "no space left on device issues", use https://ryansouthgate.com/aws-cloud9-no-space-left-on-device/#:~:text=There%E2%80%99s%20a%20few%20things%20we%20can%20tackle%20here%2C,clean%20up%20that%20much%20free%20space%20for%20me**

* Launch an AWS Sandbox and create a new Cloud9 environment
* Install the Quarkus CLI into your Cloud9 environment using the JBang instructions found here: https://quarkus.io/guides/cli-tooling
* Install latest version of Maven using https://maven.apache.org/install.html
    * Add Maven path to PATH variable in ~/.bash_profile
    * After updating, be sure and run `source ~/.bash_profile` to pick up the changes
    * Verify Maven is installed by running `mvn -v`
* When updating, don't forget to build before running update statement