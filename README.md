# x-kit

一個用於抓取和分析 X (Twitter) 用戶數據和推文的工具，評論用戶推文

* This is a modified version of [xiaoxiunique/x-kit](https://github.com/xiaoxiunique/x-kit).  
* Forked and updated by [x-kit-ai-comment](https://github.com/dks50217/x-kit-ai-comment).  
* Licensed under the original MIT License. See [LICENSE](./LICENSE) for details.

![x-kit](./images/action-stats.png)

## 功能特點

- 自動抓取指定用戶的基本資訊和推文
- 定時更新用戶時間線數據
- 支援數據本地化存儲
- GitHub Actions 自動化部署

## 更新日誌

- 2024-12-24 添加每日發布推文功能 `post-twitter-daily.yml` `post-tweet.ts`
- 2025-01-02 添加獲取用戶推文功能 `fetch-user-tweets.ts`
- 2025-04-29 新增評論用戶推文功能 `tweets-comment.ts`

## 安裝

```bash
bun install
```

## 使用方法

### 1. 配置環境變數

在專案根目錄建立 `.env` 文件，添加以下配置：

```bash
AUTH_TOKEN=你的X認證Token
GET_ID_X_TOKEN=用於獲取用戶ID的Token
AI_API_KEY=GitHub Models的API Key
AI_MODEL=模型，如:openai/gpt-4.1
AI_ENDPOINT=https://models.github.ai/inference
```

### 2. 添加需要追蹤的用戶

在 `dev-accounts.json` 中添加用戶資訊：

```json
{
  "username": "用戶名",
  "twitter_url": "用戶主頁鏈接", 
  "description": "用戶描述",
  "tags": ["標籤1", "標籤2"]
}
```

### 3. 運行腳本

```bash
# 獲取用戶資訊
bun run scripts/index.ts

# 獲取最新推文
bun run scripts/fetch-tweets.ts

# 批量關注用戶
bun run scripts/batch-follow.ts
```

## 自動化部署

專案使用 GitHub Actions 實現自動化：

- `get-home-latest-timeline.yml`: 每30分鐘獲取一次最新推文
- `daily-get-tweet-id.yml`: 每天獲取一次用戶資訊

## 數據存儲

- 用戶資訊保存在 `accounts/` 目錄
- 推文數據保存在 `tweets/` 目錄，按日期命名

## 技術棧

- Bun
- TypeScript 
- Twitter API
- GitHub Actions

## 授權

MIT