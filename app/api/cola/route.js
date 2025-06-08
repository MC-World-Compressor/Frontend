export async function GET() {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  try {
    const response = await fetch(`${backendUrl}/api/cola`);
    if (!response.ok) {
      return new Response(JSON.stringify({ cola: 1 }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    const data = await response.json();
    return new Response(JSON.stringify({ cola: data.cola }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ cola: 1 }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
