import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { exec } from "child_process";
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
    hostname: dbHost,
    username: dbUser,
    password: dbPassword,
    pathname: dbName,
  } = new URL(jawsdbUrl);
  const bucketName = process.env.S3_BUCKET_NAME;
  const fileName = `db_backup_${new Date()
    .toISOString()
    .replace(/[:.]/g, "-")}.sql`;
  const filePath = path.join(__dirname, fileName);
  const mysqldumpCommand = `mysqldump --no-tablespaces --set-gtid-purged=OFF --single-transaction -h ${dbHost} -u ${dbUser} -p${dbPassword} ${dbName} > ${fileName}`;

  return new Promise((resolve, reject) => {
    exec(mysqldumpCommand, async (err) => {
      if (err) {
        console.error("mysqldump failed:", err);
        reject(err);
        return;
      }
      console.log("Database dumped successfully.");

      try {
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
        resolve(uploadResult);
      } catch (uploadError) {
        console.error("Failed to upload to S3:", uploadError);
        reject(uploadError);
      }
    });
  });
};

export default databaseBackup;
