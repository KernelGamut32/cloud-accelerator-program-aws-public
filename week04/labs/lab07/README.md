# Lab 07 - https://learn.acloud.guru/handson/3f2be21a-91fd-4872-aa33-58a1ee38e832

Follow along with the "Guide" tab in the ACG lab definition.

* In preparation for the DMS migration, you'll need to add a VPC-based endpoint for DynamoDB (use https://docs.aws.amazon.com/dms/latest/userguide/CHAP_VPC_Endpoints.html to guide you)

## Notes

* DMS takes care of converting types between source and target databases
* Multiple rows for the same person (to reflect that person's move through the company); the `9999-01-01` sentinel value for "to dates" is used to reflect most recent
* See https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-indexes-general.html for additional information on the different types of indexes (global vs local)
