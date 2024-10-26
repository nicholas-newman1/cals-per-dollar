const { exec } = require("child_process");
const AWS = require("aws-sdk");
const fs = require("fs");
const path = require("path");

// Configure AWS SDK with S3 credentials
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.S3_REGION,
});

const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const bucketName = process.env.S3_BUCKET_NAME;
const fileName = `db_backup_${new Date()
  .toISOString()
  .replace(/[:.]/g, "-")}.sql`;
const filePath = path.join(__dirname, fileName);

// Run mysqldump to create backup file
const mysqldumpCommand = `mysqldump --no-tablespaces --set-gtid-purged=OFF --single-transaction -h ${dbHost} -u ${dbUser} -p${dbPassword} ${dbName} > ${fileName}`;
exec(mysqldumpCommand, (err) => {
  if (err) {
    console.error("mysqldump failed:", err);
    return;
  }
  console.log("Database dumped successfully.");

  // Read file and upload to S3
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error("Failed to read backup file:", err);
      return;
    }

    const params = {
      Bucket: bucketName,
      Key: fileName,
      Body: data,
    };

    s3.upload(params, (s3Err, data) => {
      if (s3Err) {
        console.error("Failed to upload to S3:", s3Err);
      } else {
        console.log("Backup successfully uploaded to S3:", data.Location);
      }

      // Optionally, delete the local file after upload
      fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr)
          console.error("Failed to delete local backup file:", unlinkErr);
        else console.log("Local backup file deleted.");
      });
    });
  });
});
