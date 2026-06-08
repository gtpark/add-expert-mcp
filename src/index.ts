import { FastMCP } from "fastmcp";
import { z } from "zod";

import { add } from "./math.js";

const DEFAULT_PORT = 8080;
const DEFAULT_ENDPOINT = "/mcp";

type McpEndpoint = `/${string}`;

const server = new FastMCP({
  name: "Add Expert",
  version: "0.1.0",
  instructions: [
    "당신은 덧셈 전문가입니다.",
    "사용자가 두 숫자의 합을 요청하면 add 도구를 사용하세요.",
    "응답에는 계산된 합계와 사용한 피연산자만 간결하게 포함하세요.",
  ].join(" "),
});

server.addTool({
  name: "add",
  description: "두 유한한 숫자를 더하고 JavaScript number 기준의 계산 결과를 반환합니다.",
  parameters: z.object({
    a: z.number().finite().describe("첫 번째 피연산자입니다."),
    b: z.number().finite().describe("두 번째 피연산자입니다."),
  }),
  execute: async ({ a, b }) => {
    const sum = add(a, b);

    return JSON.stringify({
      a,
      b,
      sum,
    });
  },
});

const transport = process.env.MCP_TRANSPORT ?? "httpStream";

if (transport === "stdio") {
  await server.start({
    transportType: "stdio",
  });
} else if (transport === "httpStream") {
  await server.start({
    transportType: "httpStream",
    httpStream: {
      host: process.env.HOST ?? "0.0.0.0",
      port: readPort(process.env.PORT),
      endpoint: readEndpoint(process.env.MCP_ENDPOINT),
      stateless: true,
    },
  });
} else {
  throw new Error(`Unsupported MCP_TRANSPORT: ${transport}`);
}

function readPort(rawPort: string | undefined): number {
  if (!rawPort) {
    return DEFAULT_PORT;
  }

  const port = Number(rawPort);
  if (!Number.isInteger(port) || port < 1 || port > 65_535) {
    throw new Error(`PORT must be an integer between 1 and 65535. Received: ${rawPort}`);
  }

  return port;
}

function readEndpoint(rawEndpoint: string | undefined): McpEndpoint {
  if (!rawEndpoint) {
    return DEFAULT_ENDPOINT;
  }

  if (!rawEndpoint.startsWith("/")) {
    throw new Error(`MCP_ENDPOINT must start with "/". Received: ${rawEndpoint}`);
  }

  return rawEndpoint as McpEndpoint;
}
