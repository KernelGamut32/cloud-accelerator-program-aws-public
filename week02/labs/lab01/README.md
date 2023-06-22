# Lab 01 - https://learn.acloud.guru/handson/6fc1cc38-73cd-4abf-bdc4-2d718b1f1cd1

* Create a new Security Group
    - Use `SG1` for name
    - Add access to SSH (port 22) for "My IP"
* Create a new EC2 instance using the default VPC with name "My Instance"
    - Add a `Name` tag with value of "My Instance"
    - Use "Amazon Linux" (default)
    - Use `t3:micro` for instance type
    - Create a key pair with name `keypair1` - download to local machine
    - Enable public IP
    - Attach the `SG1` security group to the EC2 instance
    - Defaults for all others
* Once created, test access to the EC2 instance using SSH
    - While the instance is being created, from terminal, execute `chmod 400 keypair1.pem`
    - Copy private IP and public IP to a text document
    - Connect to the pre-existing EC2 instance called `PublicInstance` using "Connect" in MC and "EC2 Instance Connect"; use "cloud_user" for username
    - Try `ssh ec2-user@<private IP>`; this will fail due to security group restrictions
    - Run `ssh -i <key path> ec2-user@<public IP>`; this will succeed
    - Add private IP for `PublicInstance` to SG1 and test connecivity again

**NOTE: Be sure to complete the current lab**