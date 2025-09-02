export const revalidate = 0;

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';

function authHeaders(request: Request): Record<string, string> {
  const auth = request.headers.get('authorization');
  return auth ? { Authorization: auth } : {};
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const offeringId = searchParams.get('offeringId');
  const studentId = searchParams.get('studentId');
  const url = new URL(baseUrl + '/api/grades');
  if (offeringId) url.searchParams.set('offeringId', offeringId);
  if (studentId) url.searchParams.set('studentId', studentId);
  const res = await fetch(url.toString(), { cache: 'no-store', headers: { ...authHeaders(request) } });
  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    const data = await res.json();
    return Response.json(data, { status: res.status });
  } else {
    const text = await res.text();
    return text ? new Response(text, { status: res.status }) : new Response(null, { status: res.status });
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  const res = await fetch(`${baseUrl}/api/grades`, { method: 'POST', headers: { 'Content-Type': 'application/json', ...authHeaders(request) }, body: JSON.stringify(body) });
  const ct = res.headers.get('content-type') || '';
  try {
    if (res.status === 204) return new Response(null, { status: res.status });
    if (ct.includes('application/json')) {
      const data = await res.json();
      return new Response(JSON.stringify(data), { status: res.status });
    } else {
      const text = await res.text();
      return text ? new Response(text, { status: res.status }) : new Response(null, { status: res.status });
    }
  } catch {
    return new Response(null, { status: res.status });
  }
}


