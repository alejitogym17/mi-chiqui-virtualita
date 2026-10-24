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

## Publicación en GitHub Pages

- **Sitio:** <https://alejitogym17.github.io/mi-chiqui-virtualita/>
- **Repositorio público:** <https://github.com/alejitogym17/mi-chiqui-virtualita>
- Pages publica la rama **main**, carpeta **/ (root)**.

El sitio y su repositorio son públicos. Cualquiera con el enlace puede verlos y también podrían descubrirse por otros medios; no los consideres privados.

## Revisión realizada

- Abrí la vista previa en un navegador local y recorrí las seis etapas. Probé abrir el sobre, las respuestas «sí», «quiero pensarlo» y «no», el botón para reducir animaciones, el reinicio desde el nombre de la página y el inicio con teclado.
- Revisé el código JavaScript, las referencias locales y los identificadores del HTML. La página solo carga sus propios archivos; no tiene servicios externos, analítica ni almacenamiento de respuestas.
- Publiqué el sitio en GitHub Pages y verifiqué que la compilación terminara correctamente, que la página cargara y que el botón inicial avanzara al sobre. La consola del navegador no mostró errores ni advertencias.
- No probé reproducir una canción real: no había un archivo de audio autorizado para usar en la prueba. Tampoco comprobé un teléfono físico.

## Archivos

- **index.html**: estructura y textos de accesibilidad.
- **styles.css**: estilos adaptables, ilustraciones CSS y movimiento reducido.
- **script.js**: contenido editable e interacciones; sin registro persistente de respuestas.
- **.nojekyll**: evita procesamiento innecesario de Jekyll en GitHub Pages.
