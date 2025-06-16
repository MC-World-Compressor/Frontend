'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from '@/lib/translations';

export default function DownloadPage({ params }) {
  const [parametros, setParametros] = useState(null);
  const [locale, setLocale] = useState(null);
  const { t } = useTranslations(locale || 'en');
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
    const getParamsAndLocale = async () => {
      const resolvedParams = await params;
      setLocale(resolvedParams.locale);
      setParametros(resolvedParams);
    };
    getParamsAndLocale();
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
        let nombreBase = fileName.replace(/_compressed\.(zip|tar|tar\.gz)$/i, '')
                                 .replace(/-[a-z0-9]{8,}$/i, '')
                                 .replace(/\.(zip|tar|tar\.gz)$/i, '');
        setNombreMundo(nombreBase);
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

  const formatearFecha = (fechaISO, redondear = true) => {
    if (!fechaISO) return '';
    const fecha = new Date(fechaISO);
    if (redondear) {
      let hora = fecha.getHours();
      let minutos = fecha.getMinutes();
      if (minutos > 0) {
        hora += 1;
        if (hora === 24) {
          fecha.setDate(fecha.getDate() + 1);
          hora = 0;
        }
      }
      fecha.setHours(hora, 0, 0, 0);
    }
    return fecha.toLocaleString(undefined, {
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
        <div className="space-y-4 mb-6 md:mb-0">
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
                <p className="text-gray-600 dark:text-gray-400">{formatearFecha(fechaCreacion, false)}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700 dark:text-gray-300">{t('download.expiredDate')}:</p>
                <div className="flex items-center">
                  <p className="text-amber-600 dark:text-amber-400 font-medium">{formatearFecha(fechaExpiracion, true)}</p>
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
                  <div className="ml-4 text-gray-800 dark:text-gray-200">📁 <span className="text-green-600 dark:text-green-400">{nombreMundo || 'world'}/</span></div>
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
                <span className="font-medium">{t('download.share')}</span><br/>{t('download.takeAdvantage')}
              </p>
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
