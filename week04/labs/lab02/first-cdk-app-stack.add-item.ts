import * as AWSXRay from "aws-xray-sdk";
import * as AWSSDK from "aws-sdk";
import { APIGatewayProxyEvent } from "aws-lambda";

//define DocumentClient
const AWS = AWSXRay.captureAWS(AWSSDK);
const docClient = new AWS.DynamoDB.DocumentClient();

//define table by variable passed from stack
const table = process.env.DYNAMODB || "undefined";

//scanItems function uses params to scan a dynamodb table
async function putItem(params) {
  try {
    const data = await docClient.put(params).promise();
    return data;
  } catch (err) {
    return err;
  }
}

//actual handler logs events and calls scanItems
//logs error on catch
exports.handler = async (event: APIGatewayProxyEvent) => {
  try {
    const ID = event.id;
    const NAME = event.name;

    //define table and item in params
    const params = {
      TableName: table,
      Item: {
        id: ID,
        name: NAME,
      },
    };
    const data = await putItem(params);
    return { body: JSON.stringify(data) };
  } catch (err) {
    return { error: err };
  }
};
