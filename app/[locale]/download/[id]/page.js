'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from '@/lib/translations';

export default function DownloadPage({ params }) {
  const [parametros, setParametros] = useState(null);
  const [locale, setLocale] = useState(null);
  const { t } = useTranslations(locale || 'es');
  const [linkDescarga, setLinkDescarga] = useState(null);
  const [fechaExpiracion, setFechaExpiracion] = useState(null);
  const [fechaCreacion, setFechaCreacion] = useState(null);
  const [tamanoInicio, setTamanoInicio] = useState(null);
  const [tamanoFinal, setTamanoFinal] = useState(null);
  const [nombreMundo, setNombreMundo] = useState(null);
  const [nombreMundoOriginal, setNombreMundoOriginal] = useState(null);
  const [error, setError] = useState(null);  const [mostrarTooltip, setMostrarTooltip] = useState(false);
  const router = useRouter();

  // Obtener los parámetros de forma asíncrona
  useEffect(() => {
    const getLocale = async () => {
      const resolvedParams = await params;
      setLocale(resolvedParams.locale);
    };
    getLocale();

    const getParams = async () => {
      const resolvedParams = await params;
      setParametros(resolvedParams);
    };
    getParams();
  }, [params]);

  useEffect(() => {
    if (!parametros) return;
    
    const { id } = parametros;
    const fetchDownloadUrl = async () => {
      try {
        const res = await fetch(`/api/proxy/estado/${parametros.id}`);
        
        if (!res.ok) {
          router.push(`/${parametros.locale}/status/${parametros.id}`);
          throw new Error(`Error al obtener el estado del mundo: ${res.statusText}`);
        }
        
        const data = await res.json();
          if (data.estado !== 'listo') {
          router.push(`/${parametros.locale}/status/${parametros.id}`);
          return;
        }
        
        setLinkDescarga(data.download_url);
        setFechaExpiracion(data.fecha_expiracion);
        setFechaCreacion(data.fecha_creacion);
        setTamanoInicio(data.tamano_inicio);
        setTamanoFinal(data.tamano_final);
        
        const urlParts = data.download_url.split('/');
        const fileName = urlParts[urlParts.length - 1];
        setNombreMundoOriginal(fileName);
        const match = fileName.match(/^(world-[^-_]+(?:-[^-_]+)*?)(?:-[a-z0-9]+)?(_compressed)\.zip$/i);
        const worldName = match ? match[1] + match[2] : fileName.replace('.zip', '');
        setNombreMundo(worldName);
      } catch (e) {
        setError(e.message);
        setTimeout(() => {
          router.push(`/${parametros.locale}/status/${parametros.id}`);
        }, 2000);
      }
    };
    fetchDownloadUrl();
  }, [parametros, router]);

  const formatearTamano = (tamanoMB) => {
    if (tamanoMB >= 1024) {
      return `${(tamanoMB / 1024).toFixed(2)} GB`;
    } else {
      return `${tamanoMB.toFixed(2)} MB`;
    }
  };

  const formatearFecha = (fechaISO) => {
    if (!fechaISO) return '';
    return new Date(fechaISO).toLocaleString(undefined, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const porcentajeCompresion = tamanoInicio && tamanoFinal
    ? Math.round(100 - ((tamanoFinal / tamanoInicio) * 100))
    : 0;

  return (
    <main className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{t('download.title')}</h1>
      {error && <p className="text-red-600 dark:text-red-400">{error}</p>}
      {linkDescarga ? (
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              {nombreMundo ? t('download.yourWorld') + " " + nombreMundo : t('download.yourWorld') + " "} {t('download.itsReady')}
            </h2>
            
            <div className="grid grid-cols-2 gap-2 text-sm mb-3">
              <div>
                <p className="font-medium text-gray-700 dark:text-gray-300">{t('download.originalSize')}:</p>
                <p className="text-gray-600 dark:text-gray-400">{tamanoInicio ? formatearTamano(tamanoInicio) : 'Desconocido'}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700 dark:text-gray-300">{t('download.compressedSize')}:</p>
                <p className="text-gray-600 dark:text-gray-400">{tamanoFinal ? formatearTamano(tamanoFinal) : 'Desconocido'}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700 dark:text-gray-300">{t('download.createdDate')}:</p>
                <p className="text-gray-600 dark:text-gray-400">{formatearFecha(fechaCreacion)}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700 dark:text-gray-300">{t('download.expiredDate')}:</p>
                <div className="flex items-center">
                  <p className="text-amber-600 dark:text-amber-400 font-medium">{formatearFecha(fechaExpiracion)}</p>
                  <div className="relative ml-1">
                    <span 
                      className="cursor-help text-gray-500 dark:text-gray-400 inline-block"
                      onMouseEnter={() => setMostrarTooltip(true)}
                      onMouseLeave={() => setMostrarTooltip(false)}
                      onClick={() => setMostrarTooltip(!mostrarTooltip)}
                      onTouchStart={() => setMostrarTooltip(true)}
                      onTouchEnd={(e) => {
                        e.preventDefault();
                        setTimeout(() => setMostrarTooltip(false), 3000);
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="16" x2="12" y2="12"></line>
                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                      </svg>
                      {mostrarTooltip && (
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 md:bottom-full bg-gray-800 dark:bg-gray-700 text-white text-xs rounded py-1 px-2 w-56 z-20">
                          {t('download.tooltip')}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800 dark:border-t-gray-700"></div>
                        </div>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded p-2 mb-4">
              <p
                className="text-blue-800 dark:text-blue-300 text-sm"
                dangerouslySetInnerHTML={{
                  __html: t('download.compressionRatio', { porcentaje: porcentajeCompresion })
                }}
              />
            </div>

            <button
              className="w-full bg-green-600 text-white py-3 px-4 rounded hover:bg-green-700 transition-colors cursor-pointer mb-3"
              onClick={() => {
                try {
                  window.open(linkDescarga, '_blank', 'noopener');
                } catch (e) {
                  setError(e.message);
                }
              }}
            >
              {t('download.downloadButton')}
            </button>
            
            <div className="text-sm bg-gray-50 dark:bg-gray-700 p-3 rounded-lg border border-gray-200 dark:border-gray-600 mb-3">
              <p className="mb-1 font-medium text-gray-700 dark:text-gray-300">{t('download.fileStructure')}</p>
              <div className="flex items-start">
                <div className="font-mono text-xs p-2 rounded bg-gray-100 dark:bg-gray-600 flex-grow overflow-auto">
                  <div className="text-gray-800 dark:text-gray-200">📁 <span className="text-blue-600 dark:text-blue-400">{nombreMundoOriginal || 'world.zip'}</span></div>
                  <div className="ml-4 text-gray-800 dark:text-gray-200">📁 <span className="text-green-600 dark:text-green-400">{nombreMundo.replace("_compressed", "") || 'world'}/</span></div>
                  <div className="ml-8 text-gray-700 dark:text-gray-300">📄 level.dat</div>
                  <div className="ml-8 text-gray-700 dark:text-gray-300">📄 level.dat_old</div>
                  <div className="ml-8 text-gray-700 dark:text-gray-300">📁 region/</div>
                  <div className="ml-12 text-gray-700 dark:text-gray-300">📄 r.0.0.mca ...</div>
                  <div className="ml-8 text-gray-700 dark:text-gray-300">📁 <i>{t('common.otherFiles')}</i></div>
                </div>
              </div>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{t('download.downloadInfo')}</p>
            </div>
            
            <div className="text-sm text-gray-600 dark:text-gray-400 bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg border border-yellow-200 dark:border-yellow-700">
              <p className="mb-1">
                <span className="font-medium">{t('download.share')}</span> {t('download.takeAdvantage')}
              </p>
              <div>
                <p className="flex flex-wrap items-center">
                  <span>{t('download.linkAvailableUntil')}: </span>
                  <span className="ml-1">{formatearFecha(fechaExpiracion)}</span>
                  <span className="text-xs text-amber-600 dark:text-amber-400 ml-1 block sm:inline">({t('download.approximately')})</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center p-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-500"></div>
          <p className="ml-3 text-gray-700 dark:text-gray-300">{t('download.loadinDownloadLink')}</p>
        </div>
      )}
    </main>
  );
}
