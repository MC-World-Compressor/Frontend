export async function GET(request, { params }) {
  const parametros = await params;
  const { id } = parametros;
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

    if (!data.download_url) {
      return new Response(JSON.stringify({ error: 'No se encontró download_url' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const fileResponse = await fetch(data.download_url);

    if (!fileResponse.ok) {
      return new Response(JSON.stringify({ error: 'Error al descargar el archivo' }), {
        status: fileResponse.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const headers = new Headers();
    const contentType = fileResponse.headers.get('content-type');
    const contentDisposition = fileResponse.headers.get('content-disposition');
    if (contentType) headers.set('content-type', contentType);
    if (contentDisposition) headers.set('content-disposition', contentDisposition);

    return new Response(fileResponse.body, {
      status: 200,
      headers
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}