"use strict";
const AWS = require("aws-sdk");

let dynamoDb;
if (process.env.IS_OFFLINE) {
  dynamoDb = new AWS.DynamoDB.DocumentClient({
    region: "localhost",
    endpoint: "http://localhost:8000",
  });
} else {
  dynamoDb = new AWS.DynamoDB.DocumentClient();
}

module.exports.helloWorld = async (event) => {
  return {
    event,
  };
};

module.exports.createCustomer = async (event) => {
  const body = JSON.parse(Buffer.from(event.body, "base64").toString());
  const putParams = {
    TableName: process.env.DYNAMODB_CUSTOMER_TABLE,
    Item: {
      primary_key: body.name,
      email: body.email,
    },
  };
  await dynamoDb.put(putParams).promise();

  return {
    statusCode: 201,
  };
};

module.exports.getCustomers = async (event) => {
  const scanParams = {
    TableName: process.env.DYNAMODB_CUSTOMER_TABLE,
  };

  const result = await dynamoDb.scan(scanParams).promise();

  if (result.Count === 0) {
    return {
      statusCode: 404,
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      total: result.Count,
      items: await result.Items.map((customer) => {
        return {
          name: customer.primary_key,
          email: customer.email,
        };
      }),
    }),
  };
};
