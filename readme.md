# Visor de Markdown

Aplicación pequeña en React + Vite para navegar y leer una colección local de
archivos Markdown organizada en carpetas, sin recargar la página.

## Cómo está organizada

- `content/<seccion>/*.md` — tus documentos reales, organizados por carpeta.
  El nombre de carpeta es la categoría que aparece en el menú superior.
- `src/App.jsx` — único componente. Usa `import.meta.glob` para leer todos
  los `.md` de `content/` en build time, los agrupa por carpeta y los
  renderiza con `react-markdown`. Todo el estado (sección y documento
  seleccionados) vive en dos `useState`.
- `src/main.jsx` — punto de entrada estándar de React.
- `src/index.css` — estilos, sin librerías de UI.

No hay backend, API, base de datos ni router: todo el contenido se resuelve
en tiempo de build/dev directamente del filesystem.

## Cómo agregar un nuevo Markdown

Copiá el archivo dentro de la carpeta de la categoría correspondiente, por
ejemplo: