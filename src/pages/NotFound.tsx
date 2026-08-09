import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex-1 flex flex-col items-center justify-center bg-gray-50">
                <h1 className="text-6xl font-bold gradient-text mb-4">404</h1>
                <p className="text-xl text-gray-600 mb-8">Page Not Found</p>
                <a href="/" className="px-6-py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition">
                    Return Home
                </a>
            </div>
            <Footer />
        </div>
    );
}
