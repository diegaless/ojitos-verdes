# Ojitos Verdes

Página web interactiva hecha con HTML, CSS y JavaScript para preguntar:

> ¿Quedamos el viernes si ya estás mejor? 💕

La página empieza con una pregunta, botones de `Si` y `No`, GIFs, corazones animados y música de fondo. Si se pulsa `No`, el botón va cambiando de texto y el botón `Si` crece. Si se pulsa `Si`, se abre una página final con confeti, música y una foto personalizada.

## Demo

Cuando esté publicada con GitHub Pages:

[diegaless.github.io/ojitos-verdes](https://diegaless.github.io/ojitos-verdes/)

## Archivos principales

```text
ojitos-verdes/
├── index.html        # Página principal con la pregunta
├── yes.html          # Página final después de pulsar "Si"
├── script.js         # Lógica de la página principal
├── yes-script.js     # Confeti y música de la página final
├── style.css         # Estilos, corazones, botones y foto
├── favicon.png       # Icono de la pestaña
├── assets/
│   └── ojitos.jpg    # Foto personalizada de la página final
└── music/
    └── ...mp3        # Música de fondo
```

## Qué se puede personalizar

- La pregunta principal está en `index.html`.
- Los mensajes que aparecen al pulsar `No` están en `script.js`, en el array `noMessages`.
- Los mensajes que aparecen al pulsar `Si` antes de jugar con el `No` están en `script.js`, en el array `yesTeasePokes`.
- El texto de la página final está en `yes.html`.
- La foto final está en `assets/ojitos.jpg`.
- El favicon está en `favicon.png`.
- Los colores, bordes, tamaños, corazones y estilo de la foto están en `style.css`.

## Desarrollo local

No hace falta instalar nada. Puedes abrir directamente:

```text
index.html
```

También puedes abrir `yes.html` directamente para probar la página final.

## Publicación

El repo está pensado para publicarse con GitHub Pages desde la rama `main`.

Para publicar cambios:

```bash
git add .
git commit -m "Personaliza ojitos verdes"
git push origin main
```

GitHub Pages actualizará la web automáticamente después de unos segundos o minutos.
