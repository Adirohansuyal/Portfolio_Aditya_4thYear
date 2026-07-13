// netlify/functions/groq-proxy.js
// Serverless proxy — keeps the Groq API key server-side only.
// The browser POSTs { model, messages, max_tokens, temperature } here,
// this function injects the key from the Netlify environment and forwards
// the request to Groq, returning the response to the client.

exports.handler = async function (event) {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "GROQ_API_KEY environment variable is not set." }),
    };
  }

  let payload;
  try {
    payload = JSON.parse(event.body);
  } catch {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid JSON body" }),
    };
  }

  // Forward to Groq
  const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await groqRes.json();

  return {
    statusCode: groqRes.status,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
};
