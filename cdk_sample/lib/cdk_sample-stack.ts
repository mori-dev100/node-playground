import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";

export class CdkSampleStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const myFunction = new lambda.Function(this, "MyFunction", {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: "index.handler",
      code: lambda.Code.fromInline(`
        exports.handler = async function(event) {
          return {
            statusCode: 200,
            body: JSON.stringify({
              message: 'Hello, World!',
            }),
          };
        }
      `),
    });

    const functionUrl = myFunction.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
    });

    new cdk.CfnOutput(this, "FunctionUrl", {
      value: functionUrl.url,
    });

    const httpGateway = new cdk.aws_apigatewayv2.HttpApi(
      this,
      "http-test",
      {}
    );

    httpGateway.addRoutes({
      path: "/test",
      integration: new cdk.aws_apigatewayv2_integrations.HttpUrlIntegration(
        "integration",
        "https://lppenqqpec.execute-api.ap-northeast-1.amazonaws.com/opendata/t/kure/v1/foreign-population-2"
      ),
    });

    // API Gatewayの作成
    // const api = new cdk.aws_apigateway.RestApi(this, "MyApi", {
    //   restApiName: "My API Gateway",
    //   deployOptions: {
    //     stageName: "prod",
    //   },
    // });

    // const proxyUrl = api.root.addResource("proxy");
    // const gatewayProxy = new cdk.aws_apigateway.HttpIntegration(
    //   "https://yinn19vv6a.execute-api.ap-northeast-1.amazonaws.com/opendata/t/kure/v1/livecamera",
    //   {
    //     proxy: true,
    //   }
    // );
    // proxyUrl.addMethod("ANY", gatewayProxy);

    // // API GatewayのURLを出力
    // new cdk.CfnOutput(this, "ApiUrl", {
    //   value: api.url,
    // });
  }
}
