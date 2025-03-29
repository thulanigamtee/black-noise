const fs = require("fs");
const path = require("path");
const successColor = "\x1b[32m%s\x1b[0m";
const checkSign = "\u{2705}";
const dotenv = require("dotenv").config({ path: "src/.env" });

const envFile = `export const environment = {
  production: true,
  appwrite: {
    endpoint: '${process.env.endpoint}',
    projectId:'${process.env.projectId}',
    databaseId: '${process.env.databaseId}',
    usersCollectionId: '${process.env.usersCollectionId}',
    songsCollectionId: '${process.env.songsCollectionId}',
    audioBucketId: '${process.env.audioBucketId}',
    thumbnailBuckedId: '${process.env.thumbnailBucketId}',
  },
  clerk: {
    publishableKey: '${process.env.publishableKey}'
  },
};
`;
const targetPath = path.join(__dirname, "./src/environments/environment.ts");
fs.writeFile(targetPath, envFile, (err) => {
  if (err) {
    console.error(err);
    throw err;
  } else {
    console.log(
      successColor,
      `${checkSign} Successfully generated environment.ts`
    );
  }
});
