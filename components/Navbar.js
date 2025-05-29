import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
return (
    <nav className="bg-white border-b border-gray-200 py-3 px-4 md:px-6">
        <div className="w-full flex items-center justify-between">
            <Link href="/" className="flex items-center">
                <Image
                    src="/assets/img/logo.webp"
                    alt="Logo"
                    width={40}
                    height={40}
                    className="rounded-full"/>
                <span className="ml-2 text-xl font-bold">MC World Compressor</span>
            </Link>

            <div className="flex items-center gap-2">
                <Link
                    href="/#faq"
                    className="px-4 py-2"
                >
                    FAQ
                </Link>
                <Link
                    href="/upload"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
                >
                    Comprimir
                </Link>
            </div>
        </div>
    </nav>
);
}
