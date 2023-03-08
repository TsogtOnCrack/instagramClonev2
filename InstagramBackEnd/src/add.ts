import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda"
import {DynamoDBClient, PutItemCommand} from "@aws-sdk/client-dynamodb"
import {marshall} from "@aws-sdk/util-dynamodb"

import { REGION } from "../utils/region"

const client = new DynamoDBClient({region: REGION})

export const add = async (event: APIGatewayProxyEvent):Promise<APIGatewayProxyResult> =>{


    const params = {
        TableName: "instaUsers",
        Item :marshall(
            {
                userId: event.pathParameters?.id,
                userName: "SHEE, THIS IS TSOGR"
            }
        )
    }

    try{
        await client.send(new PutItemCommand(params))

    }catch(err){
        const it = {error:err, check:"shee"}
        return{
            statusCode:200,
            body: JSON.stringify(
                it
            )
        }

    }


    return{
        statusCode:200,
        body: JSON.stringify("just posted a user to instaUsers")
    }

}
