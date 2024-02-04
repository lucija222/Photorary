const apiKey = process.env.REACT_APP_API_KEY;

export const authHeader = {
    headers: {
        Authorization: `Client-ID ${apiKey}`,
    },
};
