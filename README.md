# 📚 E-Commerce: Librería ADB

Plataforma web full-stack para la gestión y visualización de un catálogo de libros. Este proyecto implementa un sistema CRUD completo, consumiendo una base de datos relacional en la nube y una API externa para la generación dinámica de imágenes.

## 🚀 Enlaces a Producción (Live Demo)

* **Frontend (Interfaz Gráfica):** (https://ecommerce-libreria.vercel.app)
* **Backend (API REST):** (https://tu-enlace-render-aqui.onrender.com)

---

## 🛠️ Tecnologías Utilizadas (Tech Stack)

### Frontend
* **Framework:** Next.js (App Router)
* **Estilos:** Tailwind CSS
* **Despliegue:** Vercel
* **Diseño:** UI/UX con paleta de colores personalizada (Terracota y Chocolate) para temática literaria.

### Backend
* **Entorno:** Node.js
* **Framework:** Express.js
* **ORM:** Sequelize
* **Despliegue:** Render
* **Integración Externa:** Lorem Picsum API (para portadas de libros dinámicas)

### Base de Datos
* **Motor:** MySQL
* **Hosting:** Aiven (Cloud Database)

---

## ✨ Características Principales

1. **Catálogo Dinámico:** Visualización en cuadrícula responsiva de todos los libros disponibles.
2. **Vista Detallada:** Páginas individuales renderizadas del lado del servidor para cada libro (SEO Friendly).
3. **Gestión de Inventario (CRUD):**
   * **Crear:** Formulario para añadir nuevas obras literarias con asignación automática de portadas válidas.
   * **Leer:** Listado general y detallado.
   * **Actualizar:** Modificación de precios, stock, sinopsis y títulos.
   * **Eliminar:** Borrado seguro con confirmación de usuario y redirecciones inteligentes.
4. **Modo Monorepo:** Estructura unificada de Backend y Frontend en un solo repositorio de control de versiones.

---

## 💻 Instalación y Ejecución Local

Si deseas correr este proyecto en tu entorno local, sigue estos pasos:

### 1. Clonar el repositorio
\`\`\`bash
git clone https://github.com/FelixADB/ecommerce-libreria.git
cd ecommerce-libreria
\`\`\`

### 2. Configurar el Backend
\`\`\`bash
cd backend
npm install
\`\`\`
* Crea un archivo `.env` en la carpeta `backend`
* Inicia el servidor:
\`\`\`bash
npm run dev
\`\`\`

### 3. Configurar el Frontend
Abre una nueva terminal en la raíz del proyecto y ejecuta:
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`
* El frontend estará disponible en `http://localhost:3001`. *(Nota: Para uso local, asegúrate de cambiar temporalmente las URLs de los fetch a `http://localhost:3000/api/products` si deseas probar sin depender de Render).*

---
*Proyecto desarrollado para evaluación del curso de Desarrollo de Aplicaciones Web Avanzado.*