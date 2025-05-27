'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';

export default function DownloadPage({ params }) {
  const parametros = use(params);
  const { id } = parametros;
  const [linkDescarga, setLinkDescarga] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchDownloadUrl = async () => {
      try {
        const res = await fetch(`/api/proxy/estado/${id}`);
        if (!res.ok) throw new Error('No se encontró el archivo para descargar');
        const data = await res.json();
        if(data.estado !== 'listo') {
          router.push(`/status/${id}`);
        }else
        setLinkDescarga(data.download_url);
      } catch (e) {
        setError(e.message);
      }
    };
    fetchDownloadUrl();
  }, [id]);

return (
    <main className="max-w-xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Descarga tu mundo comprimido</h1>
        {error && <p className="text-red-600">{error}</p>}
        {linkDescarga ? (
            <button
                className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors cursor-pointer"
                onClick={async () => {
                    try {
                        const response = await fetch(`/api/proxy/descargar/${id}`);
                        if (!response.ok) throw new Error('Error al descargar el archivo');
                        const blob = await response.blob();
                        const url = window.URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = linkDescarga.split('/').pop() || 'mundo.zip';
                        document.body.appendChild(a);
                        a.click();
                        a.remove();
                        window.URL.revokeObjectURL(url);
                    } catch (e) {
                        setError(e.message);
                    }
                }}
            >
                Descargar Mundo
            </button>
        ) : (
            <p>Cargando enlace de descarga...</p>
        )}
    </main>
);
}
