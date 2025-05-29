
export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-200 py-8 mt-auto">
      <div className="w-full max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-bold text-gray-800">MC World Compressor</h2>
            <p className="text-sm text-gray-600 mt-1">
              <u><a href="mailto:contacto@mcworldcompressor.com" className="hover:text-blue-600 transition-colors">
                srkktua@protonmail.com
              </a></u>
            </p>
          </div>
          
          <div className="text-center md:text-right text-sm text-gray-600">
            <p>Desarrollado por <u><a href="https://github.com/Papela" target="_blank">Papela</a></u></p>
            <p className="mt-1">&copy; {currentYear} MC World Compressor. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
