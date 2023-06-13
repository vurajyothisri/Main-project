import s3 from "../config/S3.config.js"

export const s3Fileupload=async({bucketName,key,body,content})=>{
  return await s3.upload({
        Bucket:bucketName,
        key:key,
        Body:body,
        contentType:contentType
    })
    .promise()
}
export const s3deleteFile=async({bucketName,key})=>{
   return await s3.deleteObject({
        Bucket:bucketName,
        key:key,
    })
    .promise()
}