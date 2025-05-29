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
          <p className="text-center mb-12"><i>(Ejemplos reales)</i></p>

          {/* //TODO Remplazarlo por una foto + texto del antes y despues*/}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="relative h-64 md:h-96 bg-white rounded-lg shadow-md overflow-hidden">
              <Image
                src="/assets/img/before-compression.webp"
                alt="Antes de la compresión"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4">
                <p className="font-bold">Antes: 2.4 GB</p>
              </div>
            </div>
            <div className="relative h-64 md:h-96 bg-white rounded-lg shadow-md overflow-hidden">
              <Image
                src="/assets/img/after-compression.webp"
                alt="Después de la compresión"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4">
                <p className="font-bold">Después: 350 MB</p>
              </div>
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
