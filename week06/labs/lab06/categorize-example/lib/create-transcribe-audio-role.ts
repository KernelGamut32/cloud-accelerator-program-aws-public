import { Construct } from "constructs";
import { ManagedPolicy, Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';

export class CreateTranscribeAudioRole extends Construct {
    public role: Role;

    constructor(scope: Construct, id: string) {
        super(scope, id);

        this.role = new Role(this, id, {
            assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
        });
        this.role.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName('CloudWatchLogsFullAccess'));
        this.role.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName('AmazonS3FullAccess'));
        this.role.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName('AmazonTranscribeFullAccess'));
    }
}
