import { DeleteItemCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { REGION } from "../../utils/region";


const client = new DynamoDBClient({region:REGION})
export const deleteUser = async (event: APIGatewayProxyEvent):Promise<APIGatewayProxyResult> =>{

    const params = {
        TableName:"instaUsers",
        Key:marshall({
            userId: event.pathParameters?.id
        })
    }

    try{
        await client.send(new DeleteItemCommand(params))
    }catch(err){
        return{statusCode: 200, body:JSON.stringify(err)}
    }


    return{
        statusCode:200,
        body: JSON.stringify("deleted user.")
    }
}