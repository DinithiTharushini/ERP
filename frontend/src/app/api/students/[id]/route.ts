const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';

function authHeaders(request: Request) {
  const auth = request.headers.get('authorization');
  return auth ? { Authorization: auth } : {};
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const res = await fetch(`${baseUrl}/api/students/${params.id}`, { cache: 'no-store', headers: { ...authHeaders(req) } });
  const data = await res.json();
  return new Response(JSON.stringify(data), { status: res.status });
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();
  const res = await fetch(`${baseUrl}/api/students/${params.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', ...authHeaders(req) }, body: JSON.stringify(body) });
  const data = await res.json();
  return new Response(JSON.stringify(data), { status: res.status });
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const res = await fetch(`${baseUrl}/api/students/${params.id}`, { method: 'DELETE', headers: { ...authHeaders(req) } });
  return new Response(null, { status: res.status });
}

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const res = await fetch(`${baseUrl}/api/students/${params.id}`, { cache: 'no-store' });
  const data = await res.json();
  return new Response(JSON.stringify(data), { status: res.status });
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();
  const res = await fetch(`${baseUrl}/api/students/${params.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return new Response(JSON.stringify(data), { status: res.status });
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const res = await fetch(`${baseUrl}/api/students/${params.id}`, { method: 'DELETE' });
  return new Response(null, { status: res.status });
}


