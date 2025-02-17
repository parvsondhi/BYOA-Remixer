import axios from 'axios';

const CLAUDE_API_ENDPOINT = 'https://api.anthropic.com/v1/messages';

export const remixContent = async (content: string) => {
  try {
    const response = await axios.post(
      CLAUDE_API_ENDPOINT,
      {
        model: 'claude-3-sonnet-20240229',
        messages: [
          {
            role: 'user',
            content: `Please remix the following content to make it more engaging and creative: ${content}`
          }
        ],
        max_tokens: 1024
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.REACT_APP_CLAUDE_API_KEY,
          'anthropic-version': '2023-06-01'
        }
      }
    );

    return response.data.content[0].text;
  } catch (error) {
    console.error('Error calling Claude API:', error);
    throw error;
  }
}; 