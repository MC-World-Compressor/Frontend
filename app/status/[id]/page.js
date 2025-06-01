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
  const { id } = parametros;  const [estado, setEstado] = useState('Cargando...');
  const [cola, setCola] = useState(null);
  const [error, setError] = useState(null);
  const [tipoError, setTipoError] = useState(null);
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

        } else if (data.estado && data.estado.startsWith('error')) {
          setTipoError(data.estado);

          switch (data.estado) {
            case 'error_procesamiento':
              setError('Error durante el procesamiento del mundo. Es posible que el archivo esté corrupto o no sea un mundo válido de Minecraft.');
              break;
            case 'error_procesamiento_no_encontrado':
              setError('No se pudo encontrar el archivo del mundo para procesar. Es posible que haya expirado o no exista. Prueba a volver a intentarlo');
              break;
            case 'error_conexion':
              setError('Error de conexion. Prueba a volver a intentarlo');
              break;
            default:
              setError('Ha ocurrido un error inesperado durante el procesamiento. Por favor, intenta de nuevo o contacta con soporte.');
              break;
          }

          setCola(0);
          parado = true;
          clearInterval(interval);

        }if (data.estado === 'pendiente') {
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
        setTipoError('error_conexion');
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
  
  const renderContactoInfo = () => (
    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-md p-4 mt-3 border border-blue-200 dark:border-blue-800">
      <div className="flex items-start">
        <svg className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-3">¿Necesitas ayuda? Contáctanos:</h4>
          <div className="space-y-3">
            <div className="flex items-center">
              <svg className="h-4 w-4 mr-3 text-blue-600 dark:text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
              </svg>
              <a href="mailto:srkktua@protonmail.com?subject=MCCompressor%20Error" className="text-sm text-blue-700 dark:text-blue-300 hover:text-blue-900 dark:hover:text-blue-100 hover:underline transition-colors">
                srkktua@protonmail.com
              </a>
            </div>
            <div className="flex items-center">
              <svg className="h-4 w-4 mr-3 text-indigo-600 dark:text-indigo-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0189 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
              </svg>
              <a href="https://discord.com/users/529736520048050189" target="_blank" className="text-sm text-indigo-700 dark:text-indigo-300 hover:text-indigo-900 dark:hover:text-indigo-100 hover:underline transition-colors">
                Discord: @papela
              </a>
            </div>
            <div className="flex items-center">
              <svg className="h-4 w-4 mr-3 text-gray-600 dark:text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd"/>
              </svg>
              <a href="https://github.com/Papela" target="_blank" className="text-sm text-indigo-800 dark:text-indigo-300 hover:text-indigo-900 dark:hover:text-indigo-100 hover:underline transition-colors">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

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
      case 'listo':        return (
          <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-400 p-4 mb-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3 flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-green-700 dark:text-green-300 font-semibold">
                    ¡Tu mundo está listo para descargar!
                  </p>
                  {redireccionando && (
                    <div className="flex items-center text-xs text-green-600 dark:text-green-400">
                      <svg className="animate-spin h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Redirigiendo...
                    </div>
                  )}
                </div>
                <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                  {redireccionando ? "Te llevaremos a la página de descarga automáticamente." : "Haz clic en el botón para acceder a la descarga."}
                </p>
                <Link href={`/download/${id}`} className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors">
                  <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
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
                <div className="bg-white dark:bg-gray-700 rounded-lg p-4 mb-4 border border-gray-200 dark:border-gray-600 shadow-sm">
                  <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                    <svg className="h-4 w-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    Información del mundo expirado
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-3">
                      <div className="flex items-center mb-2">
                        <svg className="h-4 w-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Fecha de creación</p>
                      </div>
                      <p className="text-sm text-gray-900 dark:text-gray-100">{new Date(infoMundo.fechaCreacion).toLocaleString()}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-3">
                      <div className="flex items-center mb-2">
                        <svg className="h-4 w-4 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Fecha de expiración</p>
                      </div>
                      <p className="text-sm text-gray-900 dark:text-gray-100">{new Date(infoMundo.fechaExpiracion).toLocaleString()}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-3">
                      <div className="flex items-center mb-2">
                        <svg className="h-4 w-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Tamaño original</p>
                      </div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{infoMundo.tamanoInicial?.toFixed(2)} MB</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-3">
                      <div className="flex items-center mb-2">
                        <svg className="h-4 w-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 11-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Tamaño comprimido</p>
                      </div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{infoMundo.tamanoFinal?.toFixed(2)} MB</p>
                    </div>
                    {infoMundo.tamanoInicial && infoMundo.tamanoFinal && (
                      <div className="col-span-1 md:col-span-2 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-md p-3 border border-green-200 dark:border-green-800">
                        <div className="flex items-center mb-2">
                          <svg className="h-4 w-4 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <p className="text-xs font-medium text-green-800 dark:text-green-200">Reducción conseguida</p>
                        </div>
                        <p className="text-lg font-bold text-green-900 dark:text-green-100">
                          {((1 - (infoMundo.tamanoFinal / infoMundo.tamanoInicial)) * 100).toFixed(1)}% 
                          <span className="text-sm font-normal ml-1">de reducción</span>
                        </p>
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
              <div>
                <div className="flex items-center mb-3">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium text-red-800 dark:text-red-200">
                      Error en el procesamiento
                    </h3>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-red-700 dark:text-red-300 mb-2">
                    {tipoError === 'error_procesamiento' 
                      ? 'Error durante el procesamiento del mundo. Es posible que el archivo esté corrupto o no sea un mundo válido de Minecraft.'
                      : tipoError === 'error_procesamiento_no_encontrado'
                      ? 'No se pudo encontrar el archivo del mundo para procesar. Es posible que haya expirado o no exista.'
                      : tipoError === 'error_conexion'
                      ? 'Error de conexion. Prueba a volver a intentarlo' : 'Ha ocurrido un error inesperado durante el procesamiento. Por favor, intenta de nuevo o contacta con soporte.'
                    }
                  </p>
                  
                  {tipoError && (
                    <p className="text-xs text-red-600 dark:text-red-400 font-mono bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded">
                      Código de error: {tipoError}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  <Link href="/upload" className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                    <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    Subir otro mundo
                  </Link>
                  <Link href="/" className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                    Volver al inicio
                  </Link>
                </div>

                {renderContactoInfo()}
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
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Estado del mundo</h1>      {error ? (
        <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 p-4 mb-4">
          <div>
            <div className="flex items-center mb-3">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="font-medium text-red-800 dark:text-red-200">
                  {tipoError?.startsWith('error_') ? 'Error en el procesamiento' : 'Error de conexión'}
                </h3>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-red-700 dark:text-red-300 mb-2">{error}</p>
              {tipoError && (
                <p className="text-xs text-red-600 dark:text-red-400 font-mono bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded">
                  Código de error: {tipoError}
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              <Link href="/upload" className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Subir otro mundo
              </Link>
              <Link href="/" className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                Volver al inicio
              </Link>
            </div>

            {tipoError?.startsWith('error') && renderContactoInfo()}
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
