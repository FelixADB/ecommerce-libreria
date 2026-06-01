"use client";

export default function CartButton() {
  return (
    <button 
      onClick={() => alert('¡Libro añadido al carrito exitosamente!')}
      className="flex-1 bg-[#C05A3E] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#a34d34] transition shadow-sm whitespace-nowrap"
    >
      Añadir al Carrito
    </button>
  );
}