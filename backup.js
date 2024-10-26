const { exec } = require("child_process");
const AwsCli = require("aws-cli-js");
const { Aws } = AwsCli;
const options = new Aws();

// Set up mysqldump command
const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const bucketName = process.env.S3_BUCKET_NAME;
const region = process.env.S3_REGION;
const fileName = `db_backup_${new Date()
  .toISOString()
  .replace(/[:.]/g, "-")}.sql`;

const mysqldumpCommand = `mysqldump --no-tablespaces --set-gtid-purged=OFF --single-transaction -h ${dbHost} -u ${dbUser} -p${dbPassword} ${dbName} > ${fileName}`;

// Run mysqldump
exec(mysqldumpCommand, (err) => {
  if (err) {
    console.error("mysqldump failed:", err);
    return;
  }
  console.log("Database dumped successfully.");

  // Upload to S3 using aws-cli-js
  const awsCommand = `s3 cp ${fileName} s3://${bucketName}/${fileName} --region ${region}`;
  options
    .command(awsCommand)
    .then(() => {
      console.log("Backup uploaded to S3.");
    })
    .catch((err) => {
      console.error("Failed to upload to S3:", err);
    });
});
