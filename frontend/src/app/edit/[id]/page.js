"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function EditBook() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: ''
  });

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`https://backend-libreria-xug0.onrender.com/api/products/${id}`);
        const result = await res.json();
        if (!res.ok) throw new Error(result.message || 'Error al cargar el libro');

        setFormData({
          name: result.data.name,
          description: result.data.description,
          price: result.data.price,
          stock: result.data.stock
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setFetching(false);
      }
    };
    if (id) fetchBook();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`https://backend-libreria-xug0.onrender.com/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock, 10)
        }),
      });

      if (!res.ok) throw new Error('Error al actualizar el libro');

      router.push('/');
      router.refresh();
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return (
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
      <div className="text-xl font-bold text-[#2C221E] animate-pulse">Consultando archivo literario...</div>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#FDFBF7] p-8 flex items-center justify-center">
      <div className="max-w-2xl w-full mx-auto bg-white p-8 sm:p-10 rounded-xl shadow-lg border border-[#2C221E]/10">
        <div className="flex justify-between items-center mb-8 border-b border-[#2C221E]/10 pb-4">
          <h1 className="text-3xl font-bold text-[#2C221E] uppercase tracking-wide">Actualizar Obra</h1>
          <Link href="/" className="text-[#2C221E]/60 hover:text-[#C05A3E] transition font-medium">
            ← Volver
          </Link>
        </div>

        {error && (
          <div className="bg-red-50 text-red-800 border border-red-200 p-4 rounded-lg mb-6 text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[#2C221E] font-semibold mb-2">Título de la Obra *</label>
            <input 
              type="text" 
              name="name" 
              required 
              value={formData.name} 
              onChange={handleChange} 
              className="w-full border border-[#2C221E]/20 rounded-lg p-3 focus:ring-2 focus:ring-[#C05A3E]/50 focus:border-[#C05A3E] outline-none text-[#2C221E] bg-[#FDFBF7]/30 transition" 
            />
          </div>
          <div>
            <label className="block text-[#2C221E] font-semibold mb-2">Sinopsis</label>
            <textarea 
              name="description" 
              rows="4" 
              value={formData.description} 
              onChange={handleChange} 
              className="w-full border border-[#2C221E]/20 rounded-lg p-3 focus:ring-2 focus:ring-[#C05A3E]/50 focus:border-[#C05A3E] outline-none text-[#2C221E] bg-[#FDFBF7]/30 transition"
            ></textarea>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-[#2C221E] font-semibold mb-2">Precio (S/) *</label>
              <input 
                type="number" 
                name="price" 
                step="0.01" 
                min="0.1" 
                required 
                value={formData.price} 
                onChange={handleChange} 
                className="w-full border border-[#2C221E]/20 rounded-lg p-3 focus:ring-2 focus:ring-[#C05A3E]/50 focus:border-[#C05A3E] outline-none text-[#2C221E] bg-[#FDFBF7]/30 transition" 
              />
            </div>
            <div>
              <label className="block text-[#2C221E] font-semibold mb-2">Inventario *</label>
              <input 
                type="number" 
                name="stock" 
                min="0" 
                required 
                value={formData.stock} 
                onChange={handleChange} 
                className="w-full border border-[#2C221E]/20 rounded-lg p-3 focus:ring-2 focus:ring-[#C05A3E]/50 focus:border-[#C05A3E] outline-none text-[#2C221E] bg-[#FDFBF7]/30 transition" 
              />
            </div>
          </div>
          <button 
            type="submit" 
            disabled={loading} 
            className={`w-full text-white font-bold py-4 rounded-lg mt-8 transition uppercase tracking-widest shadow-md ${
              loading ? 'bg-[#C05A3E]/60 cursor-not-allowed' : 'bg-[#C05A3E] hover:bg-[#a34d34]'
            }`}
          >
            {loading ? 'Actualizando...' : 'Guardar Cambios'}
          </button>
        </form>
      </div>
    </main>
  );
}