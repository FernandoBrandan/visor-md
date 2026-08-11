y agregá `.md` adentro. La categoría `NOTAS` aparece automáticamente en la
y agregá `.md` adentro. La categoría `NOTAS` aparece automáticamente en la
navegación superior (las categorías se listan en orden alfabético).

## Cómo ejecutar el proyecto

```bash
npm install
npm run dev
```

## Cómo hacer el build

```bash
npm run build
npm run preview   # para previsualizar el build de producción
```

## Dependencias

- `react`, `react-dom` — UI.
- `react-markdown` — renderiza el contenido `.md` como JSX.
- `vite`, `@vitejs/plugin-react` — dev server y build.

Ninguna otra dependencia (sin router, sin CMS, sin gestor de estado).

## Por qué esta arquitectura

El objetivo es únicamente leer archivos Markdown locales de forma cómoda.
No hay datos dinámicos ni necesidad de compartir URLs, así que un router,
un backend o un índice JSON manual agregarían complejidad sin resolver
ningún problema real. `import.meta.glob` de Vite ya resuelve el
descubrimiento automático de archivos, y dos variables de estado alcanzan
para la navegación.