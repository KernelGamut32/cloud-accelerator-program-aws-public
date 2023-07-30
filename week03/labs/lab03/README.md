# Lab 03 - https://learn.acloud.guru/handson/f0626640-3d35-4dd8-9a9c-2f90dfd9f1de

* Navigate to CodeStar
* Create a new project
* Create a new service role using the "Create service role" button
* Select HTML template (static website using EC2) and click "Next"
* Give the project a name (ID will set automatically)
* Leave CodeCommit selection and repository name as defined
* Configure EC2 instance
    * Use `t2.micro` instance type
    * Use default VPC
    * Select `us-east-1a` subnet
    * Naigate to EC2 (in a new tab) and create a new key pair - use reasonable name
    * Select newly created key pair from dropdown (after refresh)
* Click "Next", review, and click "Create project"
* Takes 5 - 10 minutes to complete
* Click "View Application" - static HTML web page
* Deploy a new version
    * In CodeStar, click "IDE" tab
    * Edit in AWS CodeCommit
    * Navigate to "webpage" directory and open index.html
    * Click "Edit" and make a minor change to the display text
    * Click "Commit changes" (enter author/email/comment)
* Go back to CodeStar and view deployment status (triggered automatically by the changes to index.html)
* Refresh web page to see changes
