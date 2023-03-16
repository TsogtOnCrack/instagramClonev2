import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { REGION } from "../../utils/region";
import { PutObjectCommand, S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

const client = new S3Client({region: REGION});

export const createPost = async (event: any):Promise<APIGatewayProxyResult> =>{
  const command = new PutObjectCommand({
    Bucket: "cloneinstagramposts",
    Key: event.pathParameters?.id,
    Body: event.body,
  });

  try { 
    const response = await client.send(command);
    return{
        statusCode:200,
        body: JSON.stringify({response, event})
    }

  
  } catch (err) {
    return{
        statusCode: 200,
        body: JSON.stringify(err)
    }
  }

}



