import type { TweetApiUtilsData } from "twitter-openapi-typescript";
import * as i from "twitter-openapi-typescript-generated";
import * as fs from "fs";
import * as path from "path";
import { XAuthClient } from "./utils";
import { generateComment } from "./tweets-comment";

const client = await XAuthClient();

export const printTweet = (tweet: TweetApiUtilsData) => {
  console.log(
    `${tweet.user.legacy.screenName}: ${tweet.tweet.legacy?.fullText}`.replace(
      /\n/g,
      " "
    )
  );
  tweet.replies.forEach((reply) => {
    reply.tweet.legacy &&
      printLegacyTweet(reply.user.legacy, reply.tweet.legacy);
  });
};

export const saveTweets = (tweets: TweetApiUtilsData[]) => {
  const tweetData = tweets.map((tweet) => {
    const createdAt = new Date(tweet.tweet.legacy?.createdAt || "");
    const formattedTime = `${createdAt.getFullYear()}/${(createdAt.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${createdAt
      .getDate()
      .toString()
      .padStart(2, "0")} ${createdAt
      .getHours()
      .toString()
      .padStart(2, "0")}:${createdAt
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${createdAt
      .getSeconds()
      .toString()
      .padStart(2, "0")}`;

    return {
      user: tweet.user.legacy.screenName,
      fullText: tweet.tweet.legacy?.fullText,
      time: formattedTime,
    };
  });

  const date = new Date();
  //const formattedDate = date.toISOString().split("T")[0]; // yyyy-MM-dd

  const dirPath = path.resolve(__dirname, "../tweets");
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  //const filePath = path.join(dirPath, `${formattedDate}.json`);
  const filePath = path.join(dirPath, `realDonaldTrump.json`);

  fs.writeFileSync(filePath, JSON.stringify(tweetData, null, 2), "utf-8");

  console.log(`All tweets saved to ${filePath}`);
};

export const printLegacyTweet = (user: i.UserLegacy, tweet: i.TweetLegacy) => {
  const text = `${user.screenName.padStart(20)}: ${tweet.fullText}`.replace(
    /\n/g,
    " "
  );
  console.log(text);
};

const resp = await client.getTweetApi().getUserTweets({
  userId: "25073877"
});

const filteredTweets = resp.data.data.filter((e) => !e.promotedMetadata);

saveTweets(filteredTweets);

// 呼叫 generateComment，傳入第一條推文的內容
if (filteredTweets.length > 0) {
  const firstTweetContent = filteredTweets[0].tweet.legacy?.fullText || "";
  await generateComment(firstTweetContent);
}



