import Link from 'next/link';
import Image from 'next/image';

const Accordion = ({ title, children }) => {
  return (
    <details className="group border-b border-gray-200">
      <summary className="flex justify-between items-center font-medium cursor-pointer list-none py-4">
        <span className="text-lg font-semibold text-gray-800">{title}</span>
        <span className="transition group-open:rotate-180">
          <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
            <path d="M6 9l6 6 6-6"></path>
          </svg>
        </span>
      </summary>
      <div className="text-gray-600 pb-4">{children}</div>
    </details>
  );
};


export default function Inicio() {
  return (
    <div className="bg-white-50">
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Comprime tus mundos de Minecraft
          </h1>
          <p className="text-2xl md:text-3xl font-bold mb-2">
            Reduce el tamaño cerca de un{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              50%
            </span>
          </p>
          <p className="text-xl md:text-2xl text-gray-600 mb-6">
            Gratis y Online
          </p>
          <Link
            href="/upload"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md text-lg font-medium transition-colors"
          >
            Comprimir Mundo
          </Link>
        </div>
      </section>
      <section className="py-16 bg-gray-50 mt-30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-2">
            Antes y después
          </h2>
          <p className="text-center mb-12"><i>(Ejemplos reales)</i></p>          <div className="space-y-10 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-col md:flex-row items-center justify-center md:space-x-8">
                {/* Antes */}
                <div className="mb-6 md:mb-0 text-center">
                  <div className="relative w-40 h-40 mx-auto">
                    <Image
                      src="/assets/img/logo.webp"
                      alt="Mundo sin comprimir"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                  <p className="font-medium text-gray-700 mt-3">world_survival.zip</p>
                  <p className="font-bold text-red-600 text-lg">24MB</p>
                </div>
                
                {/* Flecha */}
                <div className="transform rotate-90 md:rotate-0 my-2 md:my-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                
                {/* Después */}
                <div className="text-center">
                  <div className="relative w-40 h-40 mx-auto">
                    <Image
                      src="/assets/img/logo.webp"
                      alt="Mundo comprimido"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                  <p className="font-medium text-gray-700 mt-3">world_survival_compressed.zip</p>
                  <p className="font-bold text-green-600 text-lg">6MB</p>
                </div>
              </div>
              <p className="text-center mt-6 text-blue-600 font-bold text-xl">75% menos de espacio</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-col md:flex-row items-center justify-center md:space-x-8">
                {/* Antes */}
                <div className="mb-6 md:mb-0 text-center">
                  <div className="relative w-40 h-40 mx-auto">
                    <Image
                      src="/assets/img/logo.webp"
                      alt="Mundo sin comprimir"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                  <p className="font-medium text-gray-700 mt-3">creative_world.zip</p>
                  <p className="font-bold text-red-600 text-lg">94MB</p>
                </div>
                
                {/* Flecha */}
                <div className="transform rotate-90 md:rotate-0 my-2 md:my-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                
                {/* Después */}
                <div className="text-center">
                  <div className="relative w-40 h-40 mx-auto">
                    <Image
                      src="/assets/img/logo.webp"
                      alt="Mundo comprimido"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                  <p className="font-medium text-gray-700 mt-3">creative_world_compressed.zip</p>
                  <p className="font-bold text-green-600 text-lg">29MB</p>
                </div>
              </div>
              <p className="text-center mt-6 text-blue-600 font-bold text-xl">69% menos de espacio</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-col md:flex-row items-center justify-center md:space-x-8">
                {/* Antes */}
                <div className="mb-6 md:mb-0 text-center">
                  <div className="relative w-40 h-40 mx-auto">
                    <Image
                      src="/assets/img/logo.webp"
                      alt="Mundo sin comprimir"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                  <p className="font-medium text-gray-700 mt-3">server_world.zip</p>
                  <p className="font-bold text-red-600 text-lg">1340MB</p>
                </div>
                
                {/* Flecha */}
                <div className="transform rotate-90 md:rotate-0 my-2 md:my-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                
                {/* Después */}
                <div className="text-center">
                  <div className="relative w-40 h-40 mx-auto">
                    <Image
                      src="/assets/img/logo.webp"
                      alt="Mundo comprimido"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                  <p className="font-medium text-gray-700 mt-3">server_world_compressed.zip</p>
                  <p className="font-bold text-green-600 text-lg">715MB</p>
                </div>
              </div>
              <p className="text-center mt-6 text-blue-600 font-bold text-xl">47% menos de espacio</p>
            </div>
          </div>

          <div className="bg-blue-600 text-white rounded-lg p-6 text-center">
            <p className="text-xl">
              ¡Ahorra hasta un 85% de espacio en tus mundos de Minecraft!
            </p>
          </div>
        </div>
      </section>

      {/* Sección de FAQs con Accordion */}
      <section className="py-16 bg-white" id="faq">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Preguntas frecuentes (FAQ)
          </h2>

          <div className="divide-y divide-gray-200">
            <Accordion title="¿Es realmente gratis?">
              <p>
                Sí, el servicio de compresión de mundos de Minecraft es
                completamente gratuito. No hay costes ocultos ni necesidad de
                registrarse para usarlo.
              </p>
            </Accordion>

            <Accordion title="¿Cuál es el límite de tamaño?">
              <p>
                Puedes subir mundos de hasta 4GB de tamaño. Esta limitación es
                para garantizar un servicio rápido y eficiente para todos los
                usuarios.
              </p>
            </Accordion>

            <Accordion title="¿Funciona con Bedrock?">
              <p>
                No, actualmente el compresor solo comprime mundos de Minecraft Java 1.2.1 en adelante.
              </p>
            </Accordion>

            <Accordion title="¿Cuánto tiempo se guardan los archivos?">
              <p>
                Los mundos comprimidos se almacenan durante 1 hora después de la
                compresión. Después de este tiempo, se eliminan automáticamente
                de nuestros servidores para optimizar el almacenamiento.
              </p>
            </Accordion>

            <Accordion title="¿Cómo puedo compartir mi mundo comprimido?">
              <p>
                Una vez completada la compresión, podras compartir un enlace único 
                con tus amigos.<br/>
                Este enlace será válido durante
                1 hora desde que termine la compresión.
              </p>
            </Accordion>

            <Accordion title="¿Es seguro para mis archivos?">
              <p>
                Absolutamente. Nuestro servicio procesa tus archivos localmente
                y luego los elimina automáticamente después de 1 hora. No
                almacenamos ninguna información personal ni mantenemos copias de
                tus mundos después de ese período.
              </p>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            ¿Listo para comprimir tu mundo de Minecraft?
          </h2>
          <p className="text-xl mb-8">Ahorra espacio sin perder calidad</p>
          <Link
            href="/upload"
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-md text-lg font-medium transition-colors"
          >
            Comprimir ahora
          </Link>
        </div>
      </section>
    </div>
  );
}
