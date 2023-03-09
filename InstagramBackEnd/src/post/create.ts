import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { REGION } from "../../utils/region";


// const client = new DynamoDBClient({region: REGION})
// export const createPost = async (event: APIGatewayProxyEvent):Promise<APIGatewayProxyResult> =>{

//     const params = {
//         TableName : "instaPosts",
//         Item: marshall({
//             postId: event.pathParameters?.id,
//             userId: event.pathParameters?.userId,
//             images: ['link', 'link2'],
//             desc: event.pathParameters?.desc,

//             likeCount: 0,
//             commentCount: 0,
//             createdAt: new Date().toISOString()

//         })
//         }

//         try{
//             await client.send(new PutItemCommand(params))

//         }catch(err){
//             return{
//                 statusCode:200,
//                 body: JSON.stringify(err)
//             }
//         }


//     return{
//         statusCode:200,
//         body: JSON.stringify("Created a Post")

//     }

// }













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



