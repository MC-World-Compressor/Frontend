'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from '@/lib/translations';

export default function HomePage({ params }) {
  const [fichero, setFichero] = useState(null);
  const [subiendo, setSubiendo] = useState(false);
  const [progresoSubida, setProgresoSubida] = useState(0);
  const [serverId, setServerId] = useState(null);
  const [error, setError] = useState(null);
  const [locale, setLocale] = useState(null);
  const router = useRouter();
  const { t } = useTranslations(locale || 'en');

  // Obtener el locale de forma asíncrona
  useEffect(() => {
    const getLocale = async () => {
      const resolvedParams = await params;
      setLocale(resolvedParams.locale);
    };
    getLocale();
  }, [params]);

  useEffect(() => {
    if (serverId && locale) {
      const timer = setTimeout(() => {
        router.push(`/${locale}/status/${serverId}`);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [serverId, router, locale]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      // Comprobar si el archivo es .zip
      if (!file.name.toLowerCase().endsWith('.zip')) {
        setError(t('upload.errors.zipOnly'));
        setFichero(null);
        return;
      }
      
      // Comprobar si el archivo pesa más de 4GB (4 * 1024 * 1024 * 1024 bytes)
      const MAX_SIZE = 4 * 1024 * 1024 * 1024; // 4GB en bytes
      if (file.size > MAX_SIZE) {
        setError(t('upload.errors.sizeLimit'));
        setFichero(null);
        return;
      }
      
      setFichero(file);
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fichero) {
      setError(t('upload.errors.selectFile'));
      return;
    }
    setSubiendo(true);
    setProgresoSubida(0);
    setError(null);
    
    let intervaloProceso;
    const ficheroEnGB = fichero.size / (1024 * 1024 * 1024);
    
    let tiempoTotalEnSegundos = Math.max(5, ficheroEnGB * 90); // 90 segundos por cada GB, mínimo 5 segundos
    
    const intervaloActualizacion = 500;
    const actualizacionesTotales = (tiempoTotalEnSegundos * 1000) / intervaloActualizacion;
    const incrementPerUpdate = 80 / actualizacionesTotales;
    
    const formData = new FormData();
    formData.append('mundo_comprimido', fichero);

    try {
      intervaloProceso = setInterval(() => {
        setProgresoSubida(prevProgress => {
          if (prevProgress < 80) {
            return Math.min(79, prevProgress + incrementPerUpdate);
          }
          return prevProgress;
        });
      }, intervaloActualizacion);
      
      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/api/proxy/subidas', true);
      xhr.upload.onprogress = (event) => {
        //console.log("Upload progress: ", Math.round((event.loaded / event.total) * 100) + "%");
      };
        xhr.onload = () => {
        clearInterval(intervaloProceso);
          if (xhr.status === 200) {
          try {
            const data = JSON.parse(xhr.responseText);
            //console.log("Respuesta del servidor:", data);
            
            setProgresoSubida(100);
            
            if (data.servidor_id) {
              setServerId(data.servidor_id);
            } else if (data.jobId) {
              setServerId(data.jobId);
            } else {
              throw new Error('Error al subir el mundo: ID del servidor no encontrado');
            }
          } catch (parseError) {
            console.error(t('upload.errors.processResponse') + ": ", parseError);
            setSubiendo(false);
            setFichero(null);
            setError(t('upload.errors.processResponse'));
          }}else {
          setSubiendo(false);
          setFichero(null);
          setError(t('upload.errors.uploadFailed'));
        }
      };      xhr.onerror = () => {
        clearInterval(intervaloProceso);
        setSubiendo(false);
        setFichero(null);
        setError(t('upload.errors.connectionError'));
      };
      
      xhr.send(formData);    } catch (e) {
      if (intervaloProceso) {
        clearInterval(intervaloProceso);
      }
      console.error("Error:", e);
      setError(e.message);
      setFichero(null);
      setSubiendo(false);
    }
  };

  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 dark:text-white">{t('upload.title')}</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-2xl mx-auto">
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 h-52 flex flex-col items-center justify-center text-center cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 transition-colors dark:bg-gray-800"
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
          }}          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            e.currentTarget.classList.remove('border-blue-500');
            
            if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
              const file = e.dataTransfer.files[0];
              
              // Comprobar si el archivo es un .zip
              if (!file.name.toLowerCase().endsWith('.zip')) {
                setError('Solo se permiten archivos .zip');
                setFichero(null);
                return;
              }
              
              const MAX_SIZE = 4 * 1024 * 1024 * 1024; // 4GB
              if (file.size > MAX_SIZE) {
                setError('El archivo no puede superar los 4GB');
                setFichero(null);
                return;
              }
              
              setFichero(file);
              setError(null);
            }
          }}>
          <p className="mb-3 text-lg dark:text-gray-200 cursor-pointer">
            <b>{t('upload.dragDrop')}</b>
          </p>

          <p className="mb-3 font-medium dark:text-gray-300">
            {t('upload.orCondition')}
          </p>

          <button 
            type="button" 
            onClick={() => document.getElementById('mundo_comprimido').click()}
            className="cursor-pointer bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 py-2 px-6 rounded transition-colors w-48"
          >
            {t('upload.selectFile')}
          </button>

          {fichero && <p className="mt-3 text-sm text-green-600 dark:text-green-400">{t('upload.fileSelected')}: {fichero.name}</p>}
          <input 
            type="file" 
            accept=".zip" //,.tar,.tar.gz,.rar
            name="mundo_comprimido" 
            id="mundo_comprimido" 
            onChange={handleFileChange} 
            className="hidden"
          />
        </div>
        {error && <p className="text-red-600 dark:text-red-400"><b>{error}</b></p>}
        <button
          type="submit"
          disabled={subiendo || error !== null}
          className="bg-blue-600 dark:bg-blue-700 text-white py-2 rounded disabled:opacity-50 w-full hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
        >
          {subiendo ? t('upload.uploading') + " " + Math.floor(progresoSubida) + "%" : t('upload.upload')}
        </button>
        
        {subiendo && !serverId && !error && (
          <div className="w-full mt-2">
            <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
              <div 
                className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${progresoSubida}%` }}
              ></div>
            </div>
          </div>
        )}
        </form>
        {serverId && (
        <div className="mt-6 bg-green-100 dark:bg-green-900/20 border border-green-400 dark:border-green-600 text-green-700 dark:text-green-300 px-4 py-3 rounded relative">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="font-bold">{t('upload.uploaded')}</p>
              <p>{t('upload.redirecting')}</p>
              <p className="mt-2">
                <a 
                  href={`/status/${serverId}`} 
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline"
                >
                  {t('upload.clickToRedirect')}
                </a>
              </p>
            </div>
          </div>
        </div>
      )}

        <div className="mt-8 w-full">
        <h2 className="text-xl font-bold mb-3 dark:text-white">{t('upload.howToCompress')}</h2>
        <p className="mb-4 dark:text-gray-200">{t('upload.compressMethods.title')}:</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col">
            <h3 className="font-medium mb-2 h-14 font-semibold dark:text-gray-200">{t('upload.compressMethods.method1')}</h3>
            <div className="font-mono text-sm p-3 rounded border border-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 flex-grow h-64 overflow-auto">
              <div>📁 world.zip</div>
              <div className="ml-4">📁 world/</div>
              <div className="ml-8">📄 level.dat</div>
              <div className="ml-8">📄 level.dat_old</div>
              <div className="ml-8">📁 data/</div>
              <div className="ml-8">📁 region/</div>
              <div className="ml-12">📄 r.0.0.mca</div>
              <div className="ml-12">📄 r.0.1.mca</div>
              <div className="ml-8">📁 DIM1/</div>
              <div className="ml-8">📁 DIM-1/</div>
              <div className="ml-8">📁 <i>{t('common.otherFiles')}</i></div>
            </div>
          </div>

          <div className="flex flex-col">
            <h3 className="font-medium mb-2 h-14 font-semibold dark:text-gray-200">{t('upload.compressMethods.method2')}</h3>
            <div className="font-mono text-sm p-3 rounded border border-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 flex-grow h-64 overflow-auto">
              <div>📁 world.zip</div>
              <div className="ml-4">📄 level.dat</div>
              <div className="ml-4">📄 level.dat_old</div>
              <div className="ml-4">📁 data/</div>
              <div className="ml-4">📁 region/</div>
              <div className="ml-8">📄 r.0.0.mca</div>
              <div className="ml-8">📄 r.0.1.mca</div>
              <div className="ml-4">📁 DIM1/</div>
              <div className="ml-4">📁 DIM-1/</div>
              <div className="ml-4">📁 <i>{t('common.otherFiles')}</i></div>
            </div>
          </div>

          <div className="flex flex-col">
            <h3 className="font-medium mb-2 h-14 font-semibold dark:text-gray-200">{t('upload.compressMethods.method3')}
              <br/><span className="text-xs text-gray-500 dark:text-gray-400">({t('upload.compressMethods.method3Subtitle')})</span></h3>
            <div className="font-mono text-sm p-3 rounded border border-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 flex-grow h-64 overflow-auto">
              <div>📁 server.zip</div>
              <div className="ml-4">📁 config/</div>
              <div className="ml-4">📁 plugins/</div>
              <div className="ml-4">📁 world/</div>
              <div className="ml-8">📄 level.dat</div>
              <div className="ml-4">📁 world_nether/</div>
              <div className="ml-4">📄 paper.yml</div>
              <div className="ml-4">📄 server.properties</div>
              <div className="ml-4">📁 <i>{t('common.otherFiles')}</i></div>
            </div>
          </div>
        </div>
          <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm text-center">{t('upload.subtitle1')}</p>
        <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm text-center">{t('upload.subtitle2')}</p>
      </div>
      
    </main>
  );
}
