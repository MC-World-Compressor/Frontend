'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [fichero, setFichero] = useState(null);
  const [subiendo, setSubiendo] = useState(false);
  const [progresoSubida, setProgresoSubida] = useState(0);
  const [serverId, setServerId] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (serverId) {
      const timer = setTimeout(() => {
        router.push(`/status/${serverId}`);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [serverId, router]);

  const handleFileChange = (e) => {
    setFichero(e.target.files[0]);
    setError(null);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fichero) {
      setError('Por favor selecciona un archivo.');
      return;
    }
    setSubiendo(true);
    setProgresoSubida(0);
    setError(null);

    const formData = new FormData();
    formData.append('mundo_comprimido', fichero);

    try {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/api/proxy/subidas', true);
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 80);
          setProgresoSubida(progress);
        }
      };
      
      xhr.onload = () => {
        if (xhr.status === 200) {
          try {
            const data = JSON.parse(xhr.responseText);
            console.log("Respuesta del servidor:", data);
            
            setProgresoSubida(100);
            
            if (data.servidor_id) {
              setServerId(data.servidor_id);
            } else if (data.jobId) {
              setServerId(data.jobId);
            } else {
              throw new Error('Error al subir el mundo: ID del servidor no encontrado');
            }
          } catch (parseError) {
            console.error("Error al procesar la respuesta:", parseError);
            throw new Error('Error al procesar la respuesta del servidor');
          }
        } else {
          throw new Error('Error al subir el mundo');
        }
      };
      
      xhr.onerror = () => {
        throw new Error('Error de conexión');
      };
      
      xhr.send(formData);
    } catch (e) {
      console.error("Error completo:", e);
      setError(e.message);
      setSubiendo(false);
    }
  };

  return (
    <main className="max-w-xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Comprime tu mundo de Minecraft</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div 
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-colors"
          onClick={() => document.getElementById('mundo_comprimido').click()}
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
            e.currentTarget.classList.add('border-blue-500');
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            e.stopPropagation();
            e.currentTarget.classList.remove('border-blue-500');
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            e.currentTarget.classList.remove('border-blue-500');
            if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
              setFichero(e.dataTransfer.files[0]);
              setError(null);
            }
          }}
        >
          <p className="mb-2">Arrastra aquí un archivo ZIP o haz clic para seleccionar</p>
          {fichero && <p className="text-sm text-green-600">Archivo seleccionado: {fichero.name}</p>}
          <input 
            type="file" 
            accept=".zip,.tar,.tar.gz,.rar" 
            name="mundo_comprimido" 
            id="mundo_comprimido" 
            onChange={handleFileChange} 
            className="hidden"
          />
        </div>
        
        {subiendo && !serverId && (
          <div className="w-full mt-2">
            <div className="bg-gray-200 rounded-full h-4 mb-2">
              <div 
                className="bg-blue-600 h-4 rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${progresoSubida}%` }}
              ></div>
            </div>
            <p className="text-sm text-center text-gray-600">
              Subiendo... {progresoSubida}%
            </p>
          </div>
        )}
        
        {error && <p className="text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={subiendo}
          className="bg-blue-600 text-white py-2 rounded disabled:opacity-50"
        >
          {subiendo ? 'Subiendo...' : 'Comprimir Mundo'}
        </button>
      </form>

      {serverId && (
        <p className="mt-4">
          Mundo subido con éxito. Redirigiendo a la página de estado...
        </p>
      )}
    </main>
  );
}
