# Compresor de Mundos de Minecraft

Aplicación web para comprimir mundos de Minecraft usando la librería [thanos](https://github.com/aternosorg/thanos). Ahorra espacio y optimiza tus mundos para compartirlos y almacenarlos fácilmente.

## Características

- Comprime mundos de Minecraft Java (.zip, .tar, .tar.gz)
- Eliminación inteligente de chunks y optimización
- Gratis y de código abierto
- Soporte multi-idioma (EN/ES)
- Interfaz moderna con Next.js y React

## Primeros pasos

### 1. Clona el repositorio

```bash
git clone https://github.com/tuusuario/mc-world-compressor.git
cd mc-world-compressor
```

### 2. Configura las variables de entorno

Copia `.env.example` a `.env` y completa los valores necesarios:

```bash
cp .env.example .env
```

- `NEXT_PUBLIC_BACKEND_URL` debe apuntar a la URL de tu backend (por ejemplo, `https://tu-backend.com`).

> **Importante:**  
> Si tu frontend se sirve por HTTPS (por ejemplo, en Vercel), tu backend **también debe usar HTTPS**. Los navegadores bloquean peticiones HTTP desde sitios HTTPS (error de contenido mixto).

### 3. Instala las dependencias

```bash
npm install
# o
yarn install
```

### 4. Ejecuta el servidor de desarrollo

```bash
npm run dev
# o
yarn dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### 5. Compila para producción

```bash
npm run build
npm start
```
## Notas

- El Tamaño máximo de subida es 4GB actualmente.
- Si despliegas el frontend en Vercel o cualquier entorno HTTPS, tu backend **debe** ser accesible también por HTTPS.

## Licencia

[![Static Badssge](https://img.shields.io/badge/CC_BY--NC--SA_4.0-blue?style=for-the-badge&color=gray)](/LICENSE)

`Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International`

### ¿Que significa?

- Este proyecto es de código abierto, puedes usar, mezclar o reutilizar cualquiera de los códigos o recursos.
- No puedes usar ninguno del código fuente ni material de recursos para fines comerciales.
- No puedes monetizar ninguno del trabajo realizado en este repositorio, ni ningún trabajo derivado.
- Debes enlazar cualquier material usado, mezclado o reutilizado a este repositorio.
- Debes preservar la licencia `CC BY-NC-SA 4.0` en todo trabajo derivado.


### Exceptiones:

Puedes añadir donaciones para mantener tu propio servidor pero no puede desbloquear nada o diferenciar al usuario bajo ningún concepto o de ninguna manera. ¡Solo eso, sin zonas grises!

---