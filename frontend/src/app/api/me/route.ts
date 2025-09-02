const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';

export async function GET(request: Request) {
  const auth = request.headers.get('authorization');
  const res = await fetch(`${baseUrl}/api/me`, { headers: { ...(auth ? { Authorization: auth } : {}) } });
  const data = await res.json();
  return new Response(JSON.stringify(data), { status: res.status });
}


