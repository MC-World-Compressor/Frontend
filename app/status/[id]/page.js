'use client';

import { useEffect, useState } from 'react';
import { use } from 'react';
import { useRouter } from 'next/navigation';

export default function StatusPage({ params }) {
  const parametros = use(params);
  const { id } = parametros;
  const [estado, setEstado] = useState('Cargando...');
  const [cola, setCola] = useState(0);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    let interval;
    let estaFecheando = false;
    let parado = false;

    const fetchEstado = async () => {
      if (estaFecheando || parado) return;
      estaFecheando = true;
      try {
        console.info("Actualizando datos...");
        const res = await fetch(`/api/proxy/estado/${id}`);
        const data = await res.json();
        if (!res.ok && !data.estado.startsWith('error')) throw new Error('Error al obtener el estado');
        setEstado(data.estado);
        if (data.estado === 'listo') {
          parado = true;
          clearInterval(interval);
          router.push(`/download/${id}`);
        } else if (data.estado.startsWith('error')) {
          setError('Hubo un error procesando tu mundo.');
          setCola(0);
          parado = true;
          clearInterval(interval);
        } else if (data.estado === 'pendiente') {
          setCola(data.cola || 0);
        } else if (data.estado === 'procesando') {
          setCola(0);
          setError(null);
        }
      } catch (e) {
        setError(e.message);
        setCola(0);
        parado = true;
        clearInterval(interval);
      } finally {
        estaFecheando = false;
      }
    };

    fetchEstado();
    interval = setInterval(fetchEstado, 5000);

    return () => {
      parado = true;
      clearInterval(interval);
    };
  }, [id]);

  return (
    <main className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Estado del mundo</h1>
      {error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <>
          <p>Estado actual: <strong>{estado}</strong></p>
          <p>{estado == 'pendiente' ? cola == 0 && cola == 0/0 ? "Cargando..." : "Cola: " + cola : ''}</p>
        </>
      )}
    </main>
  );
}
