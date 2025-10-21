import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const CV = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="container mx-auto p-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Currículum</h1>
        <p className="mb-4">Si el PDF no se muestra, puedes descargarlo usando el botón de abajo.</p>

        <div className="w-full h-[80vh] bg-white rounded shadow overflow-hidden">
          <iframe src="/cv.pdf" title="Currículum" className="w-full h-full" />
        </div>

        <div className="mt-4">
          <a href="/cv.pdf" download className="inline-block bg-primary text-white px-4 py-2 rounded hover:opacity-90">Descargar CV</a>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CV;
