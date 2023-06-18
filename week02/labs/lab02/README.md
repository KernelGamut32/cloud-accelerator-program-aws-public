# Lab 02 - https://learn.acloud.guru/handson/e4e6a251-06af-4046-992b-84f0ece1d3fb

**Review/highlight https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingEncryption.html

* Locate S3 service and create a new bucket
    - Use `mytestbucket-<random characters>` for bucket name
    - Leave region as is
    - Note that server-side encryption is now enabled by default
    - Use `AWS Key Management Service (KMS)` for encryption key type
    - For "Choose from your AWS KMS keys", choose`aws/s3`
    - Leave all other defaults
    - Master key stored in KMS - used to encrypt data key (which gets stored in S3 with data)
    - Navigate to KMS and explore (in a new tab)
        * Look for `aws/s3` in `AWS managed keys`
        * Add file to S3 bucket using bucket policy and refresh KMS (using default encryption for bucket under "server-side encryption settings") * Navigate to object and review "server-side" settings (review KMS master key ARN)
    - Create our own master key
        * In KMS, navigate to "customer managed keys" and create new symmetric key
        * Use "KMS" for key material origin
        * Add alias - "my_s3_key"; use other defaults
        * Review key policy
    - Add new file to S3 bucket
        * Upload different file
        * Addl upload options - server-side encryption - use defaults
        * After upload, review uploaded document and show that still using "aws/s3"
        * Edit "server-side encryption settings" for bucket and select "my_s3_key" for "choose from your KMS master keys"
        * Review new KMS master key ARN under server-side encryption settings for uploaded document
        * Addl upload options - server-side encryption - use "KMS" and select "my_s3_key"
