'use client';

import { useEffect, useState } from 'react';
import { use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const procesarCola = (colaData) => {
  if (!colaData) return null;
  
  if (typeof colaData === 'string' && colaData.includes('/')) {
    return colaData;
  }
  
  const colaNum = Number(colaData);
  if (!isNaN(colaNum)) {
    return colaNum;
  }
  
  return null;
};

export default function StatusPage({ params }) {
  const parametros = use(params);
  const { id } = parametros;
  const [estado, setEstado] = useState('Cargando...');
  const [cola, setCola] = useState(null);
  const [error, setError] = useState(null);
  const [redireccionando, setRedireccionando] = useState(false);
  const [infoMundo, setInfoMundo] = useState(null);
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
          setRedireccionando(true);
          setTimeout(() => {
            router.push(`/download/${id}`);
          }, 3000); // Redireccionar después de 3 segundos
        } else if (data.estado.startsWith('error')) {
          setError('Hubo un error procesando tu mundo.');
          setCola(0);
          parado = true;
          clearInterval(interval);        } else if (data.estado === 'pendiente') {
          const colaFormateada = procesarCola(data.cola);
          console.log("Cola recibida:", data.cola, "Cola formateada:", colaFormateada);
          setCola(colaFormateada);
        } else if (data.estado === 'procesando') {
          setCola(0);
          setError(null);        } else if (data.estado === 'expirado') {
          setInfoMundo({
            fechaCreacion: data.fecha_creacion,
            fechaExpiracion: data.fecha_expiracion,
            tamanoInicial: data.tamano_inicio,
            tamanoFinal: data.tamano_final
          });
          setCola(0);
          parado = true;
          clearInterval(interval);
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
  }, [id, router]);

  // Función para renderizar un mensaje según el estado
  const renderEstadoMensaje = () => {
    switch (estado) {
      case 'pendiente':
        return (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 mb-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <div className="text-sm text-yellow-700 dark:text-yellow-300">
                  <p className="font-semibold">Tu mundo está en la cola de procesamiento.</p>
                  <p className="mt-1">
                    {cola ? 
                      typeof cola === 'string' && cola.includes('/') ? 
                        (() => {
                          const [posicion, total] = cola.split('/');
                          return `Posición ${posicion} de ${total} en la cola`;
                        })() : 
                        cola > 0 ? `Posición en cola: ${cola}` : "Calculando posición en cola..." 
                      : "Calculando posición en cola..."}
                  </p>
                  <div className="mt-2 w-full bg-yellow-200 dark:bg-yellow-800 rounded-full h-2">
                    {typeof cola === 'string' && cola.includes('/') ? 
                      (() => {
                        const [posicion, total] = cola.split('/').map(Number);
                        const porcentaje = total > 0 ? (1 - ((posicion - 1) / total)) * 100 : 0;
                        return <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${porcentaje}%` }}></div>
                      })() : null
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'procesando':
        return (
          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-4 mb-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Tu mundo se está procesando en este momento. Esto puede tomar unos minutos.
                </p>
              </div>
            </div>
          </div>
        );
      case 'listo':
        return (
          <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-400 p-4 mb-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-700 dark:text-green-300">
                  ¡Tu mundo está listo! {redireccionando ? "Redirigiendo a la página de descarga..." : ""}
                </p>
                <Link href={`/download/${id}`} className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                  Ir a la descarga
                </Link>
              </div>
            </div>
          </div>
        );
      case 'expirado':
        return (
          <div className="bg-gray-50 dark:bg-gray-800 border-l-4 border-gray-400 p-4 mb-4">
            <div>
              <div className="flex items-center mb-3">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="font-medium text-gray-800 dark:text-gray-200">
                    El enlace de descarga ha expirado
                  </h3>
                </div>
              </div>
              
              {infoMundo && (
                <div className="bg-white dark:bg-gray-700 rounded-md p-3 mb-4 border border-gray-200 dark:border-gray-600">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Información del mundo expirado:</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400">
                    <div>
                      <p className="font-medium">Fecha de creación:</p>
                      <p>{new Date(infoMundo.fechaCreacion).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="font-medium">Fecha de expiración:</p>
                      <p>{new Date(infoMundo.fechaExpiracion).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="font-medium">Tamaño original:</p>
                      <p>{infoMundo.tamanoInicial?.toFixed(2)} MB</p>
                    </div>
                    <div>
                      <p className="font-medium">Tamaño comprimido:</p>
                      <p>{infoMundo.tamanoFinal?.toFixed(2)} MB</p>
                    </div>
                    {infoMundo.tamanoInicial && infoMundo.tamanoFinal && (
                      <div className="col-span-2">
                        <p className="font-medium">Reducción:</p>
                        <p>{((1 - (infoMundo.tamanoFinal / infoMundo.tamanoInicial)) * 100).toFixed(2)}% de reducción</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                El enlace de descarga ha expirado. Puedes comprimir un nuevo mundo para obtener un enlace de descarga válido.
              </p>
              
              <div className="flex space-x-3">
                <Link href="/upload" className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                  <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  Comprimir nuevo mundo
                </Link>
                <Link href="/" className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                  Volver al inicio
                </Link>
              </div>
            </div>
          </div>
        );
      default:
        if (estado.startsWith('error')) {
          return (
            <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 p-4 mb-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700 dark:text-red-300">
                    Hubo un error al procesar tu mundo. Por favor, intenta de nuevo.
                  </p>
                  <Link href="/" className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                    Volver al inicio
                  </Link>
                </div>
              </div>
            </div>
          );
        }
        return (
          <div className="bg-gray-50 dark:bg-gray-800 border-l-4 border-gray-400 p-4 mb-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="animate-spin h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Cargando información del estado...
                </p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <main className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Estado del mundo</h1>
      {error ? (
        <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 p-4 mb-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
              <Link href="/" className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                Volver al inicio
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-4 p-4 bg-white dark:bg-gray-800 shadow-sm rounded-lg border dark:border-gray-700">
            <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Estado actual</h2>
            <div className="flex items-center space-x-2">
              <div className={`h-3 w-3 rounded-full ${
                estado === 'listo' ? 'bg-green-500' : 
                estado === 'procesando' ? 'bg-blue-500' :
                estado === 'pendiente' ? 'bg-yellow-500' :
                estado.startsWith('error') ? 'bg-red-500' :
                estado === 'expirado' ? 'bg-gray-500' :
                'bg-gray-300'
              }`}></div>
              <span className="font-medium text-gray-700 dark:text-gray-300">{
                estado === 'listo' ? 'Completado' : 
                estado === 'procesando' ? 'Procesando' :
                estado === 'pendiente' ? 'En espera' :
                estado.startsWith('error') ? 'Error' :
                estado === 'expirado' ? 'Expirado' :
                estado
              }</span>
            </div>
          </div>

          {renderEstadoMensaje()}
        </>
      )}
    </main>
  );
}
