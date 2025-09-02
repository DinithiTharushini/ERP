export const revalidate = 0;

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';
  try {
    const res = await fetch(`${baseUrl}/api/health`, { cache: 'no-store' });
    const data = await res.json();
    return Response.json({ ok: true, backend: data });
  } catch (error: unknown) {
    return Response.json({ ok: false, error: String(error) }, { status: 500 });
  }
}


