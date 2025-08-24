'use client';

import { useState, useEffect } from 'react';
import AdSense from './AdSense';

const AdModal = ({ isOpen, onClose, t, waitTime = 15 }) => {
  const [timeLeft, setTimeLeft] = useState(waitTime);
  const [canClose, setCanClose] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setTimeLeft(waitTime);
      setCanClose(false);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCanClose(true);
          clearInterval(timer);
          // Cerrar automáticamente después del temporizador
          setTimeout(() => {
            onClose();
          }, 500);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, waitTime, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-2xl mx-4 relative">
        <div className="text-center mb-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {t('upload.ads.supportCreator')}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            {t('upload.ads.supportMessage')}
          </p>
        </div>

        {/* Anuncio */}
        <div className="mb-6 min-h-[280px] bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
          <AdSense
            slot={process.env._SLOT_MODAL}
            style={{ 
              display: 'block',
              width: '100%',
              height: '280px'
            }}
            format="rectangle"
            className="w-full h-full"
          />
        </div>

        {/* Temporizador */}
        <div className="text-center">
          {!canClose ? (
            <div className="space-y-2">
              <p className="text-gray-600 dark:text-gray-300">
                {t('upload.ads.waitTime')}: <span className="font-bold text-blue-600">{timeLeft}s</span>
              </p>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${((waitTime - timeLeft) / waitTime) * 100}%` }}
                ></div>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center justify-center text-green-600 dark:text-green-400">
                <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="font-semibold">{t('upload.ads.continuingAuto')}</span>
              </div>
              <button
                onClick={onClose}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                {t('upload.ads.continue')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdModal;
