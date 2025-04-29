import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import * as fs from "fs";
import * as path from "path"

console.log("AI Inference Client Start");

const client = ModelClient(
  process.env.AI_ENDPOINT|| "",
  new AzureKeyCredential(process.env.AI_API_KEY || ""),
);

export const generateComment = async (userContent: string) => {
  const response = await client.path("/chat/completions").post({
    body: {
      messages: [
        {
          role: "system",
          content: "你是一個時事評論員，請針對推特帳號@realDonaldTrump的最新推文進行評論，分析對經濟造成的影響"
        },
        {
          role: "user",
          content: userContent
        }
      ],
      temperature: 1,
      top_p: 1,
      model: "openai/gpt-4.1"
    },
  });

  if (isUnexpected(response)) {
    throw response.body.error;
  }

  const comment = response.body.choices[0].message.content;

  // 定義檔案路徑
  const filePath = path.resolve(__dirname, "../tweets/realDonaldTrump_comment.json");

  // 將內容寫入檔案
  fs.writeFileSync(filePath, JSON.stringify({ comment }, null, 2), "utf-8");

  console.log(`Comment saved to ${filePath}`);
};
