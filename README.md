# Mi chiqui, ¿quieres ser mi virtualita? 💗

Una pequeña historia romántica e interactiva para Pau. Está hecha con HTML, CSS y JavaScript sin dependencias, imágenes remotas, analítica ni servidor. Funciona sin conexión después de abrirla.

## Abrirla

Abre **index.html** en un navegador moderno, en celular o en computador. No requiere instalar nada.

## Qué incluye

- Seis etapas, un sobre interactivo y navegación para volver a leer.
- Una pregunta con respuestas libres: sí, pensarlo con calma o no.
- Una respuesta respetuosa para cada opción y una celebración visual al aceptar.
- Controles de teclado, foco visible, regiones accesibles y soporte para la preferencia del sistema **prefers-reduced-motion**.
- Un control opcional para escoger un archivo de música del dispositivo. No incluye una copia de “Can't Help Falling in Love”: el navegador no reproduce música hasta que se elija un archivo y se pulse Reproducir. El audio se usa en memoria durante esa visita; no se sube ni se guarda.
- Ninguna respuesta se transmite o guarda en el navegador, cookies o almacenamiento. La página no envía notificaciones; Pau puede contarte su respuesta en persona o por su conversación habitual.

## Personalizar

- **Nombres y mensajes:** edita el objeto COPY al inicio de **script.js**.
- **Respuestas finales:** edita responseCopy en **script.js**.
- **Colores, tipografía y animaciones:** modifica las variables de :root al inicio de **styles.css**; los detalles visuales también están en ese archivo.
- **Dibujos:** el corazón principal es SVG dentro de **index.html**; el sobre, la flor y los adornos están hechos con CSS.
- **Música:** quien abra la página puede seleccionar un archivo de audio local durante la visita. Usa únicamente audio que tengas derecho a compartir. No hay canción incluida.

## Publicar gratis con GitHub Pages

1. Crea un repositorio público en GitHub y sube los archivos de esta carpeta.
2. En el repositorio, abre **Settings → Pages**.
3. En **Build and deployment**, elige **Deploy from a branch**, selecciona **main** y **/ (root)**, y guarda.
4. Espera a que GitHub Pages complete la publicación; luego abre el enlace que indique la sección Pages y comprueba que la historia cargue.

Una publicación en GitHub Pages es pública para quien tenga el enlace y podría ser descubierta por otros medios. No la consideres privada. Este proyecto no tiene cuenta, repositorio ni publicación configurados automáticamente.

## Revisión realizada

- Abrí la vista previa en un navegador local y recorrí las seis etapas. Probé abrir el sobre, las respuestas «sí», «quiero pensarlo» y «no», el botón para reducir animaciones, el reinicio desde el nombre de la página y el inicio con teclado.
- Revisé el código JavaScript, las referencias locales y los identificadores del HTML. La página solo carga sus propios archivos; no tiene servicios externos, analítica ni almacenamiento de respuestas.
- No probé reproducir una canción real: no había un archivo de audio autorizado para usar en la prueba. Tampoco comprobé un teléfono físico ni una publicación en GitHub Pages.

## Archivos

- **index.html**: estructura y textos de accesibilidad.
- **styles.css**: estilos adaptables, ilustraciones CSS y movimiento reducido.
- **script.js**: contenido editable e interacciones; sin registro persistente de respuestas.
- **.nojekyll**: evita procesamiento innecesario de Jekyll en GitHub Pages.
