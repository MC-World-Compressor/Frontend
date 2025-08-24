'use client';

import { useState, useEffect } from 'react';
import detectAdBlock from 'just-detect-adblock';

const AdBlockDetector = ({ children, onAdBlockDetected }) => {
  const [adBlockDetected, setAdBlockDetected] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAdBlock = async () => {
      try {
        const isBlocked = await detectAdBlock();
        setAdBlockDetected(isBlocked);
        if (isBlocked && onAdBlockDetected) {
          onAdBlockDetected(true);
        }
      } catch (error) {
        console.log('Error detecting adblock:', error);
        setAdBlockDetected(false);
      } finally {
        setChecking(false);
      }
    };

    checkAdBlock();
  }, [onAdBlockDetected]);

  if (checking) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600 dark:text-gray-400">Verificando...</span>
      </div>
    );
  }

  if (adBlockDetected) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md mx-4">
          <div className="flex items-center mb-4">
            <svg className="w-8 h-8 text-red-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Bloqueador de anuncios detectado
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Para continuar usando este servicio gratuito, por favor desactiva tu bloqueador de anuncios. 
            Los anuncios nos ayudan a mantener el servicio funcionando.
          </p>
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Recargar página
            </button>
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              Desactiva tu bloqueador de anuncios y recarga la página
            </p>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default AdBlockDetector;
