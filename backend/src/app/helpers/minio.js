const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')
const config = require('../../infrastructure/config/config')

const { minio_region, minio_endpoint, minio_access_key, minio_secret_key, minio_bucket } = config.development

const s3Client = new S3Client({
  forcePathStyle: true,
  region: minio_region,
  endpoint: minio_endpoint,
  credentials: {
    accessKeyId: minio_access_key,
    secretAccessKey: minio_secret_key
  }
})

const uploadFile = async (key, body, contentType = 'application/octet-stream') => {
  const command = new PutObjectCommand({
    Bucket: minio_bucket,
    Key: key,
    Body: body,
    ContentType: contentType
  })

  await s3Client.send(command)
  return `File ${key} uploaded to bucket ${minio_bucket}`
}

const getTemporaryUrl = async (key, expiresIn = 3600) => {
  const command = new GetObjectCommand({
    Bucket: minio_bucket,
    Key: key
  })

  const url = await getSignedUrl(s3Client, command, { expiresIn })
  return url
}

const getTemporaryUploadUrl = async (key, expiresIn = 3600) => {
  const command = new PutObjectCommand({
    Bucket: minio_bucket,
    Key: key
  })

  const url = await getSignedUrl(s3Client, command, { expiresIn })
  return url
}

module.exports = {
  s3Client,
  uploadFile,
  getTemporaryUrl,
  getTemporaryUploadUrl
}
