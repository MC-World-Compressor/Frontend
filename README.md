# Minecraft World Compressor

A web application to compress Minecraft worlds using the [thanos](https://github.com/aternosorg/thanos) library. Save space and optimize your worlds for easier sharing and storage.

## Features

- Compress Minecraft Java worlds (.zip, .tar, .tar.gz)
- Smart chunk removal and optimization
- Free and open source
- Multi-language support (EN/ES)
- Modern UI with Next.js and React

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/tuusuario/mc-world-compressor.git
cd mc-world-compressor
```

### 2. Configure environment variables

Copy `.env.example` to `.env` and fill in the required values:

```bash
cp .env.example .env
```

- `NEXT_PUBLIC_BACKEND_URL` should point to your backend URL (e.g. `https://your-backend.com`).

> **Important:**  
> If your frontend is served over HTTPS (for example, on Vercel), your backend **must also use HTTPS**. Browsers block HTTP requests from HTTPS sites (mixed content error).

### 3. Install dependencies

```bash
npm install
# or
yarn install
```

### 4. Run the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for production

```bash
npm run build
npm start
```
## Notes

- Maximum upload size: 4GB.
- If you deploy the frontend on Vercel or any HTTPS environment, your backend **must** also be accessible via HTTPS.

## License
[![Static Badssge](https://img.shields.io/badge/CC_BY--NC--SA_4.0-blue?style=for-the-badge&color=gray)](/LICENSE)

`Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International`

### What does that mean?

- This project is open source, you can use, mix or reuse any of the code or assets.
- You cannot use any of the source code or assets material for commercial purposes.
- You cannot monetize any of the work done on this repository, or all the derivative work.
- You must link any of the used, mixed or reused material to this repo.
- You must preserve the `CC BY-NC-SA 4.0` license to all the derivative work.


### Exceptions:

You can add donations to maintain your own server, but it can't unlock anything or differentiate the user in any way. Just that, no gray areas!

---