# 🛒 Tienda en Línea & Mercado Pedagógico (Standalone Package)
**Editorial Lluvia de Ideas**

Este paquete contiene la **Tienda en Línea / Mercado Pedagógico** completamente desacoplada y lista para ser trasladada a cualquier otra carpeta, repositorio o proyecto web.

---

## 📦 Estructura del Paquete

```text
tienda-standalone/
├── .env                  # Variables activas con Firebase y WhatsApp configurados
├── .env.example          # Plantilla limpia de variables de entorno
├── index.html            # HTML base con fuentes Google Fonts (Outfit & Plus Jakarta Sans)
├── package.json          # Dependencias (React 19, Vite, Firebase, React Icons)
├── tsconfig.json         # Configuración TypeScript bundler
├── vite.config.ts        # Configuración de Vite (puerto 5174)
├── public/               # Favicon e iconos
└── src/
    ├── main.tsx          # Punto de entrada de la aplicación
    ├── App.tsx           # Enrutador (/ y /admin)
    ├── constants.ts      # Teléfono, WhatsApp oficial y datos editoriales
    ├── firebase.ts       # Conexión dual y resiliente con Firestore y Storage
    ├── assets/           # Logo oficial de Editorial Lluvia de Ideas
    ├── cuentos/          # Portadas HD de las 5 obras maestras del Popol Vuh
    ├── context/
    │   └── StoreConfigContext.tsx # Sincronización en vivo con Firestore + Fallback local
    ├── data/
    │   └── mercadoData.ts  # Catálogo base, colecciones, departamentos y tipos TypeScript
    ├── components/
    │   ├── StoreTopBar.tsx # Barra superior limpia con WhatsApp y acceso a Admin
    │   └── mercado/        # KindleBookCard, KindleCollectionsView, ProductShareModal, etc.
    ├── pages/
    │   ├── StorePage.tsx   # Vista e-commerce completa con carrito, filtros y checkout
    │   └── AdminStorePage.tsx # CMS completo para gestionar productos, fotos y promociones
    └── utils/
        ├── soundEffects.ts # Efectos de audio procedurales nativos (sin dependencias)
        └── imageUpload.ts  # Compresión WebP automática y subida a Storage / Base64
```

---

## 🚀 Maniobra 1: Levantar como Aplicación Independiente

### Paso 1: Copiar la carpeta
Puedes copiar esta carpeta a cualquier otra ruta en tu computadora o clonarla en otro repositorio:
```bash
# Ejemplo: copiar a tu carpeta de Proyectos
cp -r "tienda-standalone" ~/Proyectos/tienda-editorial
cd ~/Proyectos/tienda-editorial
```

### Paso 2: Instalar dependencias
```bash
npm install
```

### Paso 3: Ejecutar en desarrollo
```bash
npm run dev
```
La tienda se abrirá automáticamente en: `http://localhost:5174`

### Paso 4: Compilar para producción
```bash
npm run build
```
Generará la carpeta lista `dist/` para desplegar en Firebase Hosting, Vercel, Netlify o cualquier servidor web.

---

## 🧩 Maniobra 2: Integrar dentro de Otra Aplicación React Existente

Si ya tienes otra aplicación React o Next.js y deseas incluir la tienda como una sección:

1. Copia la carpeta `src/` dentro de tu proyecto (por ejemplo en `src/tienda/`).
2. Copia los assets de `cuentos/` y `assets/`.
3. En tu enrutador (`react-router-dom`), envuelve con el proveedor e importa la página:

```tsx
import { StoreConfigProvider } from './tienda/context/StoreConfigContext';
import StorePage from './tienda/pages/StorePage';
import AdminStorePage from './tienda/pages/AdminStorePage';

function App() {
  return (
    <StoreConfigProvider>
      <Routes>
        <Route path="/tienda" element={<StorePage />} />
        <Route path="/tienda/admin" element={<AdminStorePage />} />
      </Routes>
    </StoreConfigProvider>
  );
}
```

---

## ⚙️ Configuración y Personalización

### 1. Número de WhatsApp para Pedidos
Edita `.env` o [`src/constants.ts`](file:///home/lluviadeideas/Im%C3%A1genes/Editorial/Portal%20web/tienda-standalone/src/constants.ts):
```env
VITE_WHATSAPP_PHONE=50246741239
```
Cada pedido generado desde el carrito creará un mensaje estructurado con el desglose de productos, cantidades, subtotales, ahorro aplicado y total en Quetzales.

### 2. Modo Conectado (Firestore) vs Modo Offline
- **Conectado:** Si configuras tus claves de Firebase en `.env`, la tienda sincronizará automáticamente productos, colecciones y promociones en tiempo real.
- **Offline / Local:** Si no configuras Firebase o no hay internet, la tienda utiliza el catálogo inicial de `mercadoData.ts` y guarda el carrito y cambios en `localStorage` sin fallar.

### 3. Rutas Disponibles
- `/` : Tienda y Catálogo completo con buscador, selector de departamentos, acordeón de libros, vista previa rápida y carrito.
- `/admin` : Panel de control administrativo para agregar o editar productos, subir fotografías comprimidas automáticamente en WebP, gestionar colecciones y promociones.
