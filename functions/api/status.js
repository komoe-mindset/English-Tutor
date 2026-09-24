// Cloudflare Pages Function: /api/status
// Reports Gemini availability and environment info

export async function onRequestGet(context) {
  const { env } = context;
  const hasKey = Boolean(
    env &&
    env.GEMINI_API_KEY &&
    env.GEMINI_API_KEY.trim() &&
    !env.GEMINI_API_KEY.startsWith('your-') &&
    env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY'
  );

  return new Response(JSON.stringify({
    aiAvailable: hasKey,
    provider: 'gemini',
    deployment: 'cloudflare-pages',
    configuredModel: (env && env.GEMINI_MODEL) || 'gemini-2.5-flash'
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-store'
    }
  });
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400'
    }
  });
}
