import { DeleteItemCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { REGION } from "../../utils/region";


const client = new DynamoDBClient({region: REGION})
export const deletePost = async (event:APIGatewayProxyEvent):Promise<APIGatewayProxyResult> =>{
    
    const params={
        TableName : "instaPosts",
        Key : marshall({
            postId: event.pathParameters?.id
        })
    }

    try{
        await client.send( new DeleteItemCommand(params))
    }catch(err){
        return{
            statusCode: 200,
            body:JSON.stringify(err)
        }
    }

    return{
        statusCode:200,
        body: JSON.stringify(`post deleted. postId: ${event.pathParameters?.id}`)
    }

}