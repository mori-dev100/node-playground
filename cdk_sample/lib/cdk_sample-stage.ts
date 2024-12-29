import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { CdkSampleStack } from "./cdk_sample-stack";

export class CdkSampleStage extends cdk.Stage {
  constructor(scope: Construct, id: string, props?: cdk.StageProps) {
    super(scope, id, props);

    new CdkSampleStack(this, "CdkSampleStack");
  }
}
