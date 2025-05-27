export async function POST(request) {
  const formData = await request.formData();
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  //console.log("Contenido de formData:", [...formData.entries()]);
  
  try {
    const response = await fetch(`${backendUrl}/api/subir`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      return new Response(JSON.stringify({ error: 'Error en el servidor.' }), { 
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
