# Add Expert MCP

FastMCP 기반 덧셈 전문가 MCP 서버입니다.

## Features

- `fastmcp@4.0.2` 기반 TypeScript MCP 서버
- HTTP Stream 기본 엔드포인트: `POST /mcp`
- 컨테이너 환경을 위한 `0.0.0.0:8080` 바인딩
- `stdio` 전송도 `MCP_TRANSPORT=stdio`로 지원
- `add` 도구로 유한한 두 숫자의 합 계산

## Requirements

- Node.js 22+
- npm 10+

## Local Development

```bash
npm install
npm run dev
```

기본 설정으로 서버는 `http://localhost:8080/mcp`에서 HTTP Stream MCP 요청을 받습니다.

## Scripts

```bash
npm run build
npm run start
npm run test
npm run typecheck
```

## Tool

### `add`

두 유한 숫자를 더합니다.

Input:

```json
{
  "a": 2,
  "b": 3
}
```

Output:

```json
{
  "a": 2,
  "b": 3,
  "sum": 5
}
```

## Docker

```bash
docker build -t add-expert-mcp .
docker run --rm -p 8080:8080 add-expert-mcp
```

환경 변수:

| Name | Default | Description |
| --- | --- | --- |
| `HOST` | `0.0.0.0` | HTTP Stream bind host |
| `PORT` | `8080` | HTTP Stream port |
| `MCP_ENDPOINT` | `/mcp` | MCP endpoint path |
| `MCP_TRANSPORT` | `httpStream` | `httpStream` or `stdio` |
