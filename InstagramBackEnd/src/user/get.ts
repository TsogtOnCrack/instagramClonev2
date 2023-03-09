import { DynamoDBClient, GetItemCommand, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { REGION } from "../../utils/region";


const client = new DynamoDBClient({region: REGION})
export const getUser = async (event: APIGatewayProxyEvent):Promise <APIGatewayProxyResult>=>{

    const params = {
        TableName : "instaUsers",
        Key: marshall({
            userId: event.pathParameters?.id
        })
    }

    try{
        const Item = await client.send( new GetItemCommand(params))

        return{
            statusCode: 200,
            body: JSON.stringify(Item?.Item?.followingCount)
        }
    }catch(err){
        return {
            statusCode:200,
            body: JSON.stringify(err)
        }
    }

}