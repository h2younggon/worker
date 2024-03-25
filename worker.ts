import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const secetKey = process.env.AWS_SECRET_ACCESS_KEY;
const accessKey = process.env.AWS_ACCESS_KEY_ID;

self.onmessage = async (event: MessageEvent) => {
  if (event.data.action === "putObject") {
    console.log(accessKey, secetKey);

    const client = new S3Client({
      region: "ap-northeast-2",
      credentials: {
        accessKeyId: accessKey ?? "",
        secretAccessKey: secetKey ?? "",
      },
    });

    const { files } = event.data;
    for (const file of files) {
      const command = new PutObjectCommand({
        Bucket: "myworkertest",
        Key: file.name,
        Body: file,
      });

      try {
        await client.send(command);
      } catch (error) {
        console.log(error);
      }
    }

    self.postMessage("done");
  }
};
