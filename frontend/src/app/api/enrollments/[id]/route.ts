const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';

function authHeaders(request: Request) {
  const auth = request.headers.get('authorization');
  return auth ? { Authorization: auth } : {};
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const res = await fetch(`${baseUrl}/api/enrollments/${params.id}`, { method: 'DELETE', headers: { ...authHeaders(req) } });
  return new Response(null, { status: res.status });
}


