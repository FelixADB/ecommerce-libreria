import Link from 'next/link';
import DeleteButton from '../components/DeleteButton';

async function getProducts() {
  const res = await fetch('https://backend-libreria-xug0.onrender.com/api/products', {
    cache: 'no-store'
  });
  if (!res.ok) throw new Error('Error al cargar los productos');
  return res.json();
}

export default async function Home() {
  const { data: products } = await getProducts();

  return (
    <main className="min-h-screen bg-[#FDFBF7] p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-[#2C221E] uppercase tracking-wide">Librería ADB</h1>
          <Link 
            href="/create" 
            className="bg-[#C05A3E] text-white px-6 py-2 rounded-lg hover:bg-[#a34d34] transition shadow-md font-medium"
          >
            + Añadir Libro
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.length === 0 ? (
            <p className="text-[#2C221E]/60 italic">No hay libros en el inventario aún.</p>
          ) : (
            products.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition relative flex flex-col border border-[#2C221E]/10">
                
                <div className="absolute top-2 right-2 flex gap-2 z-10">
                  <Link 
                    href={`/edit/${product.id}`}
                    className="bg-white border border-[#2C221E] text-[#2C221E] hover:bg-[#2C221E] hover:text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md transition"
                    title="Editar libro"
                  >
                    ✎
                  </Link>
                  <DeleteButton id={product.id} />
                </div>
                
                <Link href={`/product/${product.id}`} className="flex-1 flex flex-col group">
                  <div className="overflow-hidden bg-[#FDFBF7]/50 border-b border-[#2C221E]/10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={product.image_url} 
                      alt={product.name} 
                      className="w-full h-64 object-contain p-4 group-hover:scale-105 transition duration-300"
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h2 className="text-xl font-bold text-[#2C221E] mb-2 truncate group-hover:text-[#C05A3E] transition">{product.name}</h2>
                    <p className="text-[#2C221E]/70 text-sm mb-4 line-clamp-2 flex-1">{product.description}</p>
                    <div className="flex justify-between items-center mt-auto">
                      <span className="text-2xl font-black text-[#C05A3E]">S/ {product.price}</span>
                      <span className="text-xs text-[#2C221E] border border-[#2C221E]/20 px-2 py-1 rounded-full uppercase tracking-wider">Stock: {product.stock}</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}