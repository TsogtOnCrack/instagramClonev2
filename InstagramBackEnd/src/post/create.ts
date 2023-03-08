import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { REGION } from "../../utils/region";


const client = new DynamoDBClient({region: REGION})
export const createPost = async (event: APIGatewayProxyEvent):Promise<APIGatewayProxyResult> =>{

    const params = {
        TableName : "instaPosts",
        Item: marshall({
            postId: event.pathParameters?.id,
            userId: event.pathParameters?.userId,
            images: ['link', 'link2'],
            desc: event.pathParameters?.desc,

            likeCount: 0,
            commentCount: 0,
            createdAt: new Date().toISOString()

        })
        }

        try{
            await client.send(new PutItemCommand(params))

        }catch(err){
            return{
                statusCode:200,
                body: JSON.stringify(err)
            }
        }


    return{
        statusCode:200,
        body: JSON.stringify("Created a Post")

    }

}












// import AWS from "aws-sdk"


// const s3 = new AWS.S3()

// export const createPost = async (event: APIGatewayProxyEvent):Promise<APIGatewayProxyResult> =>{

//     const paramsS3 ={
//         ACL: "public-read",
//         Body: "SHEEE",
//         ContentType: "text/html",
//         Bucket: "cloneinstagramposts",
//         Key: "dicks.txt"
//     }

//     try{
//         await s3.putObject(paramsS3)
//     }catch(err){
//         console.log(err)
//         return{
//             statusCode:200,
//             body: JSON.stringify(err)
//         }

//     }
    
//     return{
//         statusCode:200,
//         body: JSON.stringify("created a post")
//     }
//     }


