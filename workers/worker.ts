import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const secetKey = process.env.AWS_SECRET_ACCESS_KEY;
const accessKey = process.env.AWS_ACCESS_KEY_ID;

const client = new S3Client({
  region: "ap-northeast-2",
  credentials: {
    accessKeyId: accessKey ?? "",
    secretAccessKey: secetKey ?? "",
  },
});

self.onmessage = async (event: MessageEvent) => {
  const { files } = event.data;

  const fileSize = files.length;
  console.log(fileSize);

  let uploadedBytes = 0;

  const updateProgress = () => {
    const progress = (uploadedBytes / fileSize) * 100;
    postMessage({ totalSize: fileSize, progress });
  };

  for (const file of files) {
    const command = new PutObjectCommand({
      Bucket: "myworkertest",
      Key: file.name,
      Body: file,
    });

    try {
      await client.send(command);
      updateProgress();
    } catch (error) {
      console.log(error);
    }
  }
};
