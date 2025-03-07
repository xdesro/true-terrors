import querystring from "node:querystring";
import slugify from "@sindresorhus/slugify";

import { Octokit } from "@octokit/rest";
import octokitCommitMultipleFiles from "octokit-commit-multiple-files";

Octokit.plugin(octokitCommitMultipleFiles);

import dotenv from "dotenv";
dotenv.config();

const octokit = new Octokit({
  auth: process.env.GITHUB_ACCESS_TOKEN,
});

const getURLDate = (str) => {
  const time = str.toLocaleString("sv-SE", {
    timeZone: "America/Denver",
    hour12: false,
  });
  return time;
};

const sendResponse = (statusCode, body) => ({
  statusCode,
  body: JSON.stringify(body),
});

const authorizeRequest = (event) =>
  event.headers["authorization"] &&
  event.headers["authorization"] === "Bearer " + process.env.QUILL_TOKEN;

const generateFilename = (date) => slugify(getURLDate(date));

const generateTemplate = (date, content) =>
  `---
date: ${date.toISOString()}
---
${decodeURIComponent(content)}`;

const createOrUpdateFiles = (filename, template) =>
  octokit.createOrUpdateFiles({
    owner: "xdesro",
    repo: "true-terrors",
    branch: "main",
    changes: [
      {
        message: `📝 - Adding note: ${filename}`,
        files: {
          "functions/micropub-latest.json": `{ "latest": "notes/${filename}.md" }`,
          [`src/content/micro/${filename}.md`]: {
            contents: Buffer.from(template).toString("base64"),
          },
        },
      },
    ],
  });

export const handler = async (event) => {
  if (event.httpMethod === "GET") {
    const syndicationTargets = {
      "syndicate-to": [
        {
          uid: "https://mastodon.social/@xdesrobots",
          name: "Xdesrobots Mastodon",
        },
      ],
    };
    return sendResponse(200, syndicationTargets);
  }

  if (!authorizeRequest(event)) {
    const message = {
      message: "Looks like you don't have the right bearer token, dorkboy.",
      env: process.env,
      headers: event.headers,
    };
    return sendResponse(401, message);
  }

  const data = querystring.parse(event.body);
  const { content } = data;
  const date = new Date();
  const filename = generateFilename(date);
  const template = generateTemplate(date, content);

  try {
    await createOrUpdateFiles(filename, template);
    return sendResponse(201, { Location: "http://henry.codes/micro" });
  } catch (error) {
    console.error("error", error);
    return sendResponse(400, error);
  }
};
