import { DynamoDBClient, GetItemCommand, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { REGION } from "../../utils/region";

const client = new DynamoDBClient({region:REGION})
export const like = async (event: APIGatewayProxyEvent):Promise <APIGatewayProxyResult> =>{

    const params = {
        TableName : "instaLikes",
        Item: marshall({
            postId: event.pathParameters?.id,
            likerUserId: event.pathParameters?.likerId,

        })
    }
    const params1 = {
        TableName : "instaPosts",
        Key: marshall({
            postId : event.pathParameters?.id
        })
    }

    try{
        const Post = await client.send(new GetItemCommand(params1))
    }catch(err){
        console.log(err, "getting the user")
    }
    
    const params2 = {
        TableName : "instaPosts",
        Key: marshall ({
            postId: event.pathParameters?.id,
        }),
        "UpdateExpression": `set likeCount = :val1`,
        "ExpressionAttributeValues":marshall( {
            ":val1": event.pathParameters?.changevalue
        }),
        
    }

    try{
        await client.send( new PutItemCommand(params))

    }catch(err){
        return{
            statusCode:200,
            body: JSON.stringify(err)
        
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify(`liked post, postId: ${event.pathParameters?.id}`)
    }

}