import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { REGION } from "../../utils/region";


const client = new DynamoDBClient({region:REGION})
export const createUser = async(event:APIGatewayProxyEvent):Promise<APIGatewayProxyResult> =>{

    const params ={
        TableName :"instaUsers",
        Item: marshall({
            userId: event.pathParameters?.id,
            useName: event.pathParameters?.userName,
            password: event.pathParameters?.password,
            bio: event.pathParameters?.bio,
            // profilePicture: event.pathParameters?.profilePicture,

            followerCount: 0,
            followingCount: 0,
            postsCount:0,
            

        })
    }

    try{
        await client.send(new PutItemCommand(params))
    }catch(err){
        return{
            statusCode: 200,
            body:JSON.stringify(err)
        }
        // console.log(err)
    }



    return{
        statusCode: 200,
        body: JSON.stringify(`succesfully created a user: ${{
            userId: event.pathParameters?.id,
            useName: event.pathParameters?.userName,
            password: event.pathParameters?.password,
            bio: event.pathParameters?.bio,
            // profilePicture: event.pathParameters?.profilePicture,

            followerCount: 0,
            followingCount: 0,
            postsCount:0,
        }}`)
    }
}
