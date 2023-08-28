import { Construct } from "constructs";
import { ManagedPolicy, Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';

export class CreateLambdaRole extends Construct {
    public role: Role;

    constructor(scope: Construct, id: string) {
        super(scope, id);

        this.role = new Role(this, id, {
            assumedBy: new ServicePrincipal('states.amazonaws.com'),
        });
        this.role.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaRole'));
    }
}
