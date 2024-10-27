import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import mysqldump from "mysqldump";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const s3Client = new S3Client({
  region: process.env.S3_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const databaseBackup = async () => {
  const jawsdbUrl = process.env.JAWSDB_URL;
  if (!jawsdbUrl) return;

  const {
    hostname: host,
    username: user,
    password: password,
    pathname,
  } = new URL(jawsdbUrl);
  const database = pathname.slice(1);

  const bucketName = process.env.S3_BUCKET_NAME;
  const fileName = `db_backup_${new Date()
    .toISOString()
    .replace(/[:.]/g, "-")}.sql`;
  const filePath = path.join(__dirname, fileName);

  try {
    await mysqldump({
      connection: { host, user, password, database },
      dumpToFile: filePath,
    });
    console.log("Database dumped successfully.");

    const fileData = fs.readFileSync(filePath);
    const uploadParams = {
      Bucket: bucketName,
      Key: fileName,
      Body: fileData,
    };
    const uploadCommand = new PutObjectCommand(uploadParams);
    const uploadResult = await s3Client.send(uploadCommand);

    console.log(
      "Backup successfully uploaded to S3:",
      `https://${bucketName}.s3.amazonaws.com/${fileName}`
    );

    fs.unlink(filePath, (unlinkErr) => {
      if (unlinkErr) {
        console.error("Failed to delete local backup file:", unlinkErr);
      } else {
        console.log("Local backup file deleted.");
      }
    });

    return uploadResult;
  } catch (error) {
    console.error("Error during database backup process:", error);
    throw error;
  }
};

export default databaseBackup;
