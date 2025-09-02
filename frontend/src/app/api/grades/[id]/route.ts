const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';

function authHeaders(request: Request) {
  const auth = request.headers.get('authorization');
  return auth ? { Authorization: auth } : {};
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();
  const res = await fetch(`${baseUrl}/api/grades/${params.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', ...authHeaders(req) }, body: JSON.stringify(body) });
  const data = await res.json();
  return new Response(JSON.stringify(data), { status: res.status });
}


