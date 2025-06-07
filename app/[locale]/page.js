import Link from 'next/link';
import Image from 'next/image';
import { getPageTranslations } from '@/lib/translations';

const Accordion = ({ title, children }) => {
  return (
    <details className="group border-b border-gray-200 dark:border-gray-700">
      <summary className="flex justify-between items-center font-medium cursor-pointer list-none py-4 text-gray-800 dark:text-gray-200">
        <span className="text-lg font-semibold">{title}</span>
        <span className="transition group-open:rotate-180">
          <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24" className="text-gray-800 dark:text-gray-200">
            <path d="M6 9l6 6 6-6" stroke="currentColor" />
          </svg>
        </span>
      </summary>
      <div className="text-gray-600 dark:text-gray-400 pb-4">{children}</div>
    </details>
  );
};


export default async function Inicio({ params }) {
  const { locale } = await params;
  const t = getPageTranslations(locale, 'home');

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="min-h-screen flex flex-col justify-center">
        <section className="py-20 text-center flex-shrink-0">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              {t.title}
            </h1>
            <p className="text-2xl md:text-3xl font-bold mb-2 text-gray-900 dark:text-white">
              {t.subtitle}{" "}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                50%
              </span>
            </p>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-6">
              {t.description}
            </p>
            <Link
              href={`/${locale}/upload`}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md text-lg font-medium transition-colors"
            >
              {t.cta}
            </Link>
          </div>
        </section>
        {/* Explicación de cómo funciona la compresión */}
        <section className="py-16 bg-white dark:bg-gray-900 flex-shrink-0">
          <div className="container mx-auto px-4 max-w-4xl"> 
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
              {t.howItWorks}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                  {t.compression.moreThanZip}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {t.compression.intelligentAnalysis}
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  <span className="font-semibold dark:text-green-500">{t.compression.removeChunks}</span> {t.compression.removeChunksDesc}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  {t.compression.result}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
                  {t.compression.howWeOptimize}
                </h4>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-10 h-10 min-w-[2.5rem] min-h-[2.5rem] bg-blue-500 rounded-full flex items-center justify-center mr-4 mt-1 aspect-square">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <div>
                      <span className="text-gray-800 dark:text-gray-200 font-medium">{t.compression.steps.analyze}</span>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{t.compression.steps.analyzeDesc}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center mr-4 mt-1">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <div>
                      <span className="text-gray-800 dark:text-gray-200 font-medium">{t.compression.steps.optimize}</span>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{t.compression.steps.optimizeDesc}</p>
                    </div>
                  </div>
                  <div className="flex items-start pt-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <div>
                      <span className="text-gray-800 dark:text-gray-200 font-medium">{t.compression.steps.ready}</span>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{t.compression.steps.readyDesc}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-2 text-gray-900 dark:text-white">
            {t.beforeAfter.title}
          </h2>
          <p className="text-center mb-12 text-gray-600 dark:text-gray-400"><i>{t.beforeAfter.subtitle}</i></p><div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-4">
              <div className="flex flex-col items-center">
                {/* Antes */}
                <div className="text-center mb-2">
                  <div className="relative w-32 h-32 mx-auto">
                    <Image
                      src="/assets/img/WinÑAR.webp"
                      alt="Mundo sin comprimir"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                  <p className="font-medium text-gray-700 dark:text-gray-300 mt-2">small_world.zip</p>
                  <p className="font-bold text-orange-500 text-lg">24MB</p>
                </div>
                
                {/* Flecha */}
                <div className="my-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                
                {/* Después */}
                <div className="text-center">
                  <div className="relative w-32 h-32 mx-auto">
                    <Image
                      src="/assets/img/logo.webp"
                      alt="Mundo comprimido"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                  <p className="font-medium text-gray-700 dark:text-gray-300 mt-2">small_world_compressed.zip</p>
                  <p className="font-bold text-green-800 dark:text-green-500 text-lg">6MB</p>
                </div>
                <p className="text-center mt-3 text-blue-600 font-bold">75% {t.beforeAfter.reduction}</p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-4">
              <div className="flex flex-col items-center">
                {/* Antes */}
                <div className="text-center mb-2">
                  <div className="relative w-32 h-32 mx-auto">
                    <Image
                      src="/assets/img/WinÑAR.webp"
                      alt="Mundo sin comprimir"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                  <p className="font-medium text-gray-700 dark:text-gray-300 mt-2">medium_world.zip</p>
                  <p className="font-bold text-orange-500 text-lg">94MB</p>
                </div>
                
                {/* Flecha */}
                <div className="my-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                
                {/* Después */}
                <div className="text-center">
                  <div className="relative w-32 h-32 mx-auto">
                    <Image
                      src="/assets/img/logo.webp"
                      alt="Mundo comprimido"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                  <p className="font-medium text-gray-700 dark:text-gray-300 mt-2">medium_world_compressed.zip</p>
                  <p className="font-bold text-green-800 dark:text-green-500 text-lg">29MB</p>
                </div>
                <p className="text-center mt-3 text-blue-600 font-bold">69% {t.beforeAfter.reduction}</p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-4">
              <div className="flex flex-col items-center">
                {/* Antes */}
                <div className="text-center mb-2">
                  <div className="relative w-32 h-32 mx-auto">
                    <Image
                      src="/assets/img/WinÑAR.webp"
                      alt="Mundo sin comprimir"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                  <p className="font-medium text-gray-700 dark:text-gray-300 mt-2">big_world.zip</p>
                  <p className="font-bold text-orange-500 text-lg">1340MB</p>
                </div>
                
                {/* Flecha */}
                <div className="my-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                
                {/* Después */}
                <div className="text-center">
                  <div className="relative w-32 h-32 mx-auto">
                    <Image
                      src="/assets/img/logo.webp"
                      alt="Mundo comprimido"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                  <p className="font-medium text-gray-700 dark:text-gray-300 mt-2">big_world_compressed.zip</p>
                  <p className="font-bold text-green-800 dark:text-green-500 text-lg">715MB</p>
                </div>
                <p className="text-center mt-3 text-blue-600 font-bold">47% {t.beforeAfter.reduction}</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-600 text-white rounded-lg p-6 text-center">
            <p className="text-xl">
              {t.beforeAfter.summary}
            </p>
          </div>
        </div>
      </section>
        {/* Sección de FAQs con Accordion */}
      <section className="py-16 bg-white dark:bg-gray-900" id="faq">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            {t.faq.title}
          </h2>

          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            <Accordion title={t.faq.free.question}>
              <p>
                {t.faq.free.answer}
              </p>
            </Accordion>

            <Accordion title={t.faq.sizeLimit.question}>
              <p>
                {t.faq.sizeLimit.answer}
              </p>
            </Accordion>

            <Accordion title={t.faq.bedrock.question}>
              <p>
                {t.faq.bedrock.answer}
              </p>
            </Accordion>

            <Accordion title={t.faq.time.question}>
              <p>
                {t.faq.time.answer}
              </p>
            </Accordion>

            <Accordion title={t.faq.share.question}>
              <p>
               {t.faq.share.answer}
              </p>
            </Accordion>
            <Accordion title={t.faq.security.question}>
              <p>
                {t.faq.security.answer}
              </p>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            {t.ctaSection.title}
          </h2>
          <p className="text-xl mb-8">{t.ctaSection.subtitle}</p>
          <Link
            href={`/${locale}/upload`}
            className="bg-white text-blue-600 hover:bg-gray-100 dark:bg-gray-200 dark:hover:bg-gray-300 px-8 py-3 rounded-md text-lg font-medium transition-colors"
          >
            {t.ctaSection.button}
          </Link>
        </div>
      </section>
    </div>
  );
}
