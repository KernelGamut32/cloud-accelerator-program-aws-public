# Lab 05 - https://aws.amazon.com/blogs/apn/using-gitlab-ci-cd-pipeline-to-deploy-aws-sam-applications/

* Updated approach does not require creation of an S3 bucket
* Create a GitLab project to house a new SAM application
    * Create a new project in GitLab (I used public) but **do not initialize with a README**
* Integrate the project with GitLab
    * Execute the following: `sam init -r python3.8 -n <repository name> --app-template "hello-world"`
    * You do not need to enable XRay and you do not want to enable app insights (if you're running in an ACG sandbox)
    * Navigate to the newly-created folder in a terminal
    * Execute `git init --initial-branch=main`
    * Execute `git remote add origin <remote repository URL>`
    * Execute `git add .`
    * Execute `git commit -m "Initial commit"`
    * Execute `git push -u origin main`
* Add the build pipeline
    * Open the project in VS Code (or the editor of your choice) to review the contents
    * Test SAM locally
        * Run `sam local invoke HelloWorldFunction -e events/event.json` to test the function locally
        * Test the API gateway using `sam local start-api` and then `curl http://localhost:3000/hello`
    * In the project root, create a new `.gitlab-ci.yml` file and copy/paste the following (**you'll need to adjust from what's in the article**)
    
```
image: python:3.8

stages:
  - deploy

production:
  stage: deploy
  before_script:
    - pip3 install awscli --upgrade
    - pip3 install aws-sam-cli --upgrade
  script:
    - sam build
    - sam deploy --no-confirm-changeset --no-fail-on-empty-changeset --capabilities CAPABILITY_IAM --region us-east-1
  environment: production
```

* Integrate and verify the build
    * Under "Settings" | "CI/CD" | "Variables", set the "AWS_ACCESS_KEY_ID" and "AWS_SECRET_ACCESS_KEY" variables to the values for the `cloud_user` account (or whatever AWS account you are using)
    * Push the updated `.gitlab-ci.yml` file to the repository and observe build progress
    * Confirm successful build and test the deployed application through the API gateway URL
    * Make a small change, check in, and confirm automatic deployment
    