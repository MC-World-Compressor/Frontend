export async function GET(request, { params }) {
  const unwrappedParams = await params;
  const { id } = unwrappedParams;
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  try {
    const response = await fetch(`${backendUrl}/api/estado/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return new Response(JSON.stringify({ error: 'Error al obtener el estado' }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}