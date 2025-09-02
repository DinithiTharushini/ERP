export const revalidate = 0;

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';

function authHeaders(request: Request) {
  const auth = request.headers.get('authorization');
  return auth ? { Authorization: auth } : {};
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');
  const url = new URL(baseUrl + '/api/instructors');
  if (q) url.searchParams.set('q', q);
  const res = await fetch(url.toString(), { cache: 'no-store', headers: { ...authHeaders(request) } });
  const data = await res.json();
  return Response.json(data, { status: res.status });
}

export async function POST(request: Request) {
  const body = await request.json();
  const res = await fetch(`${baseUrl}/api/instructors`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders(request) },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return new Response(JSON.stringify(data), { status: res.status });
}


