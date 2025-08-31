# Splitwise Frontend

Este es el **Frontend** de mi proyecto final del bootcamp:
Frontend en **React (Vite)** que consume el backend anterior para gestionar **gastos compartidos**.
He intentado mantenerlo muy claro: Router para las páginas, `fetch` para llamar al backend y CSS sencillo.

---

## 🚀 Tecnologías
- **React + Vite**
- **React Router**
- **Fetch API**
- **CSS** 

---

## 🧭 Estructura rápida
```
splitwise-front/
├─ node _modules
├─ public/
│  ├─imagenes_necesarias.png
├─ src/
│  ├─ assets/..
│  ├─ components/..
│  ├─ pages/
│  │      ├─ Home.jsx
│  │      ├─ ExpenseDetails.jsx
│  │      ├─ ExpenseForm.jsx
│  │      ├─ ExpensesList.jsx    
│  │      ├─ Home.jsx
│  │      ├─ Readme.jsx
│  │      └─ Users.jsx
│  ├─ utils/..
│  ├─ api.js
│  ├─ App.css
│  ├─ App.jsx
│  ├─ index.css
│  └─ main.jsx
│     
├─ index.html
├─ package.json
└─ .env (no se sube)
```

- **Home.jsx**: pequeño resumen de deudas (quién debe a quién).
- **Expenses.jsx**: listado de gastos.
- **ExpenseForm.jsx**: formulario de creación (campos del enunciado).
- **Users.jsx**: listado y alta de usuarios.
- **App.css**: estilos sencillos, con un **logo de The Bridge** arriba a la derecha que gira 360º al pasar el ratón y un pie con `by: lpz8⚽️` abajo a la derecha.



---

## 🙋🏽‍♂️ Cómo levantar **localmente**
1) Instala dependencias:
```bash
cd splitwise-front
npm i
```

2) Crea un archivo **.env** así:
```bash
VITE_BACKEND_URL=http://localhost:3000
```
> Cuando despliegue el backend en Render, aquí pondré la URL pública de Render.

3) Arranca en desarrollo:
```bash
npm run dev
```
Abre el puerto que te diga Vite (Normalmente `http://localhost:5173`).

4) Compilar para producción (si lo necesito):
```bash
npm run build
npm run preview
```

---

## 🔗 Conexión con el backend (ejemplo de fetch)
```js
const API = import.meta.env.VITE_BACKEND_URL;

export async function getUsers() {
  const res = await fetch(`${API}/users`);
  if (!res.ok) throw new Error("Error cargando usuarios");
  return res.json();
}
```

---

## 🌐 Despliegue en **Netlify** (paso a paso)
1. Subí este front a un repo llamado **`splitwise-front`** (GitHub).
2. Entré en **Netlify** → *Add new site* → *Import from Git* → elegí `splitwise-front`.
3. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. En **Site configuration → Environment variables** añadí:
   - `VITE_BACKEND_URL` = `https://mi-api-splitwise.onrender.com`
5. Deploy. Cuando termine, la web queda en algo así:
   - `https://mi-front-splitwise.netlify.app`

 >Revisar siempre que `VITE_BACKEND_URL` apunta a **HTTPS** (Render).

---

## 🧷 Variables de entorno (ejemplos)
**.env (local)**
```bash
VITE_BACKEND_URL=http://localhost:3000
```

**Netlify → Environment variables**
- `VITE_BACKEND_URL=https://mi-api-splitwise.onrender.com`

---

## 🛠️ Problemas reales y soluciones rápidas
- **No salía nada en /expenses** → me faltaba llenar usuarios y luego crear un gasto con esos IDs.
- **CORS** → lo solucioné en el backend con `app.use(cors())`.
- **`npm run dev` no existía** → añadí los scripts de Vite en el `package.json`:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

---

## 🎨 Detalles de UI que añadí
- Logo de **The Bridge** arriba a la derecha, pequeño y con **rotación 360º al hover**.
- Pie de página con `by: lpz8⚽️` en la esquina inferior derecha (en blanco).
- Sombras suaves en cajas y botones, siguiendo el estilo oscuro que venía en la práctica.

---

## ✅ Conclusiones y agradecimientos
- Aprendí a **conectar React con un backend real** usando `.env` y a desplegarlo en Netlify.
- Me quedo con la importancia de **no hardcodear** URLs (meter todo al bulto 😅) y usar **variables de entorno**.
- Gracias al equipo por los tips de despliegue y por insistir en los README claros. He intentado hacer todos los tips y consejos aprendidos como hacer las cosas ordenadamente escribir las cosas en papel antes de hacer el codigo y pelearme con el hasta que me ha salido humo del cerebro... aun asi lo consegui o eso creo..
gracias por las opiortunidades y el tiempo empleado fuera de Bootcamp siempre para ayudar a aprender lo maximo.
Ojala esto sirva para certificar.
GRACIAS!
