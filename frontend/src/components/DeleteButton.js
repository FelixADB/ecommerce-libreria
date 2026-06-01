"use client";

import { useRouter } from 'next/navigation';

export default function DeleteButton({ id, redirectHome = false }) {
  const router = useRouter();

  const handleDelete = async (e) => {
    e.preventDefault();
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este libro?');
    if (!confirmDelete) return;

    try {
      const res = await fetch(`https://backend-libreria-xug0.onrender.com/api/products/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        if (redirectHome) router.push('/');
        else router.refresh();
      } else {
        alert('Error al eliminar el libro');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <button 
      onClick={handleDelete}
      className={
        redirectHome
          ? "border border-red-800 text-red-800 hover:bg-red-800 hover:text-white px-6 py-2 rounded-lg flex items-center justify-center shadow-sm transition font-medium whitespace-nowrap"
          : "bg-red-800 hover:bg-red-900 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md transition"
      }
      title="Eliminar libro"
    >
      {redirectHome ? "Eliminar" : "✕"}
    </button>
  );
}