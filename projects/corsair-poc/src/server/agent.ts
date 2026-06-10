import {
  query,
  tool,
  createSdkMcpServer,
} from '@anthropic-ai/claude-agent-sdk';
import { ClaudeProvider } from '@corsair-dev/mcp';
import { corsair } from './corsair.ts';

// const getAllGithubRepos = tool(
//   'get_github_repos',
//   'Fetches all github repos',
//   {},
//   async () => {
//     // Call the github API's
//     // const response = { repo: 'chaicode-repo' };
//     const response = await corsair.github.api.repositories.list({
//       owner: 'owner_name',
//     });
//     return {
//       content: [{ type: 'text', text: JSON.stringify(response) }],
//     };
//   }
// );

// const wrapper = createSdkMcpServer({
//   name: 'github tools',
//   tools: [getAllGithubRepos],
// });

// async function main() {
//   for await (const response of query({
//     prompt: 'Hey agent, can you list all of my repos',
//     options: {
//       mcpServers: { wrapper },
//       allowedTools: ['mcp__wrapper__get_github_repos'],
//     },
//   })) {
//     if (response.type === 'result' && response.subtype === 'success') {
//       console.log(`Response: `, response.result);
//     }
//   }
// }

async function main() {
  const provider = new ClaudeProvider();
  const tools = await provider.build({ corsair });
  const server = createSdkMcpServer({ name: 'corsair', tools });

  for await (const response of query({
    prompt: 'Hey agent, can you list all of my repos from github using MCP',
    options: {
      mcpServers: { corsair: server },
      allowedTools: [
        'mcp__corsair__corsair_setup',
        'mcp__corsair__list_operations',
        'mcp__corsair__get_schema',
        'mcp__corsair__run_script',
      ],
    },
  })) {
    if (response.type === 'result' && response.subtype === 'success') {
      console.log(`Response: `, response.result);
    }
  }
}

main();
