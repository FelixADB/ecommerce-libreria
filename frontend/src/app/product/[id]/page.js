import Link from 'next/link';
import DeleteButton from '../../../components/DeleteButton';
import CartButton from '../../../components/CartButton';

async function getProduct(id) {
  const res = await fetch(`https://backend-libreria-xug0.onrender.com/${id}`, {
    cache: 'no-store'
  });
  
  if (!res.ok) {
    throw new Error('Error al cargar los detalles del libro');
  }
  
  return res.json();
}

export default async function ProductDetail({ params }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  const { data: product } = await getProduct(id);

  return (
    <main className="min-h-screen bg-[#FDFBF7] p-8 flex items-center justify-center">
      <div className="max-w-5xl w-full mx-auto bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row border border-[#2C221E]/10">
        
        <div className="md:w-2/5 bg-[#FDFBF7]/50 flex justify-center items-center p-8 border-b md:border-b-0 md:border-r border-[#2C221E]/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={product.image_url} 
            alt={product.name} 
            className="w-full max-w-[350px] max-h-[450px] object-contain rounded drop-shadow-md mx-auto"
          />
        </div>

        <div className="md:w-3/5 p-8 flex flex-col justify-between">
          <div>
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 mb-6 border-b border-[#2C221E]/10 pb-4">
              <div>
                <h1 className="text-3xl font-bold text-[#2C221E] mb-2">{product.name}</h1>
                <span className="bg-[#FDFBF7] border border-[#2C221E]/20 text-[#2C221E] text-sm px-3 py-1 rounded-full font-semibold">
                  Stock: {product.stock}
                </span>
              </div>

              <div className="flex gap-2 shrink-0">
                <Link 
                  href={`/edit/${product.id}`}
                  className="border border-[#2C221E] text-[#2C221E] hover:bg-[#2C221E] hover:text-[#FDFBF7] px-6 py-2 rounded-lg shadow-sm transition flex items-center font-medium"
                >
                  Editar
                </Link>
                <DeleteButton id={product.id} redirectHome={true} />
              </div>
            </div>
            
            <p className="text-[#2C221E]/80 text-lg mb-6 leading-relaxed">
              {product.description || "Este libro no tiene una descripción disponible."}
            </p>
          </div>

          <div className="mt-4">
            <div className="text-4xl font-black text-[#C05A3E] mb-6">
              S/ {product.price}
            </div>
            
            <div className="flex gap-4">
              <CartButton />
              <Link 
                href="/" 
                className="px-8 py-3 border border-[#2C221E]/20 text-[#2C221E] rounded-lg font-bold hover:bg-[#2C221E]/5 transition flex items-center justify-center"
              >
                Volver
              </Link>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}