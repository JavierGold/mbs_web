# Diseño y assets · Sitio MBS

## Autoridad visual

Las ocho imágenes de `references/` corresponden a Inicio. Los ajustes posteriores explícitos del usuario y la implementación actual conservada prevalecen sobre detalles antiguos de esas capturas. No recuperar estilos, copy, cajas o composiciones de borradores anteriores. No copiar el morado ni otros estilos de referencias externas.

| Orden | Referencia                                | Dimensiones originales |
| ----- | ----------------------------------------- | ---------------------- |
| 01    | `references/01_hero_v2(6).png`            | 1672 × 941             |
| 02    | `references/02_intro_v01.png`             | 1672 × 640             |
| 03    | `references/03_servicios_v03(3).png`      | 1740 × 904             |
| 04    | `references/04_intro_tecnologias_v01.png` | 1672 × 641             |
| 05    | `references/05_tecnologias_v02(1).png`    | 1672 × 941             |
| 06    | `references/06_como_trabajamos_v01.png`   | 1672 × 941             |
| 07    | `references/CTA_V01(1).png`               | 1672 × 549             |
| 08    | `references/Footer_v02.png`               | 1672 × 514             |

Las capturas solo orientan: recrear texto, enlaces y retículas con React/HTML/CSS. No insertar la captura completa como sección funcional. Sus diferentes dimensiones no implican anchos distintos en el sitio: fondos full-width y **un mismo contenedor responsive** para alinear el contenido. No estirar una referencia para hacerla coincidir con otra ni fijar el viewport a 1672 px.

## Identidad y proporciones

Sans serif limpia y pesada en títulos; cuerpo regular gris azulado. Reutilizar la familia tipográfica y las variables existentes del proyecto. No sustituir fuentes al implementar Servicios.

Conservar las variables de color actuales del proyecto; no recalibrarlas al implementar Servicios. Referencias iniciales aproximadas: base clara `#F7FAFD`/blanco, títulos navy `#071C50`, azul destacado `#0877DB`, fondo Tecnologías `#081D38`, footer `#07172E`. Los azules varían en las imágenes; no añadir una nueva paleta. Texto claro sobre oscuro y líneas divisorias sutiles. Comprobar contraste real de la implementación.

Margen lateral coherente entre secciones; referencia inicial alrededor del 5% del ancho en escritorio. Tipografía, padding y separaciones fluidos con límites, no escalado de toda la página como una imagen. Conservar espacio generoso alrededor de las franjas de texto. No usar alturas fijas que recorten el contenido al cambiar viewport.

## Composición por sección de Inicio

1. **Hero:** encabezado horizontal, texto izquierda, mainframe derecha. Título navy con «pueden detenerse.» azul; dos botones diferentes. En escritorio, centrar el PNG en la columna derecha y limitar su ancho al 75% (máximo 46 rem), conservando proporción y aire alrededor; en móvil usar el ancho disponible sin aplicar esa reducción.
2. **Introducción:** 30 grande azul a la izquierda acompañado de «años de experiencia»; párrafo a la derecha. Sin iconos ni enlaces.
3. **Servicios:** cuatro grupos horizontales con sus ilustraciones, títulos y párrafos; divisores finos. Título en dos tonos. Sin párrafo introductorio extra.
4. **Introducción tecnológica:** dos columnas, título izquierda destacando «legacy» y «vanguardia»; párrafo derecha. Es una sección separada del catálogo.
5. **Tecnologías:** navy; tres grupos arriba y dos centrados abajo, líneas divisorias. Sin encabezado adicional ni cards con sombras. Ilustraciones azules y texto claro.
6. **Proceso:** base clara, título e introducción con buen espacio; números grandes azules 01–07, cuatro arriba y tres abajo. Sin ilustraciones por etapa ni párrafo PMI/Scrum añadido.
7. **CTA:** azul intenso a todo el ancho, frase blanca izquierda, botón blanco derecha. Reutilizar el mainframe del Hero como decoración ampliada, recortada y atenuada mediante CSS; no generar otra ilustración ni hornear el texto en ella.
8. **Footer:** navy profundo, tres columnas; marca, navegación con enlace al contacto debajo de University y datos de contacto. Mantener la versión actualizada descrita abajo, el divisor y la franja legal. Sin cuadrícula ni ilustraciones.

## Assets existentes del usuario

Se encuentran en `MBS_web/img/`, con estructura plana. No se duplican en este paquete. Antes de integrar, confirmar su existencia y transparencia/calidad en el proyecto; no afirmar que fueron inspeccionados aquí. Respetar exactamente nombres y mayúsculas.

| Archivo relativo a `MBS_web`       | Uso                                                    |
| ---------------------------------- | ------------------------------------------------------ |
| `img/mainframe.png`                | Hero y reutilización decorativa en CTA                 |
| `img/desarrollo_aplicaciones.png`  | Servicio Desarrollo de aplicaciones                    |
| `img/mantenimiento_evolucion.png`  | Servicio Mantenimiento y evolución                     |
| `img/bases_datos.png`              | Servicio Bases de datos y procesamiento de información |
| `img/integracion_aplicaciones.png` | Servicio Integración de aplicaciones                   |
| `img/servicios.png`                | Hero de la página Servicios                            |
| `img/unisys.png`                   | Familia Unisys                                         |
| `img/tandem.png`                   | Familia Tandem / NonStop                               |
| `img/desarrollo-integracion.png`   | Familia Desarrollo e integración                       |
| `img/procesamiento-datos.png`      | Familia Procesamiento de datos                         |
| `img/seguridad.png`                | Familia Seguridad                                      |

| `img/nosotros.png`                  | Hero de Nosotros: equipo de profesionales              |
| `img/pagos_transferencias.png`      | Experiencia: Pagos y transferencias                    |
| `img/credito.png`                  | Experiencia: Crédito                                  |
| `img/captacion_inversiones.png`     | Experiencia: Captación e inversiones                   |
| `img/obligaciones_retiro.png`       | Experiencia: Obligaciones y ahorro para el retiro      |
| `img/proyecto_exitoso.png`          | Gráfico de requerimientos y proyecto exitoso           |

El usuario confirmó que los seis assets de Nosotros están guardados en `img/` con estos nombres. No regenerarlos ni pedir que se vuelvan a preparar; comprobar las rutas al integrarlos.

No reemplazar assets por librerías de iconos. El wordmark MBS visible es la referencia actual; no incorporar un logo de otra conversación sin archivo y aprobación. Adaptar URLs/importaciones al bundler existente sin mover o renombrar originales innecesariamente.

## Adaptación móvil

Apilar columnas donde dejen de ser legibles; conservar el orden y las cinco familias. Retículas 4 columnas/3+2/4+3 son de escritorio, no una obligación para móvil. Menú móvil accesible; botones con área táctil cómoda. Mantener el copy seleccionable, foco visible, dimensiones de imagen y ausencia de scroll horizontal. Decoraciones con alt vacío; contenido informativo con alternativa pertinente.

## Comportamientos de Inicio

- Encabezado sticky con fondo opaco; al superar 80 px de scroll se compacta a 80 px en escritorio con transición de 200 ms y recupera su tamaño al volver arriba. Una banda de histéresis evita parpadeos; el espacio reservado conserva la posición del contenido. En móvil conserva su tamaño aprobado. `scroll-padding-top` contempla el alto original para los destinos con ancla.
- El enlace de la ruta actual mantiene el indicador azul; hover y foco animan el mismo indicador durante 200 ms. Contacto conserva el botón y foco visible.
- Los heroes aparecen al cargar: texto y controles con opacidad y 16 px verticales durante 900 ms, con stagger breve; el gráfico solo desvanece. Header y hero quedan excluidos del revelado por scroll.
- El resto de bloques usa aparición única con `whileInView`, `amount: 0.15`, 700–900 ms y desplazamiento vertical sutil únicamente en texto. Listas y grupos de tarjetas separan sus inicios 80 ms.
- Cómo trabajamos inicia 01–07 automáticamente al entrar el bloque, en orden, con ease-out y sin requerir más scroll; los pasos quedan visibles.
- `prefers-reduced-motion` presenta todo de inmediato, sin desplazamiento, duración ni stagger. Si no existe IntersectionObserver, el contenido también queda visible. No ocultar contenido con CSS global antes de inicializar Motion.
- Los cuatro servicios comparten las filas de ilustración, título y descripción en escritorio; en móvil recuperan alturas naturales.
- En móvil, el menú abre y cierra con el control, enlaces y Escape; devuelve el foco al control al cerrarse con Escape.

## Footer actualizado

Se conserva la estructura de tres columnas. El enlace «Hablemos de tu proyecto →» aparece debajo de University y apunta a `/contacto`. Correo y teléfono usan `mailto:` y `tel:`; perfiles sociales se muestran como texto sin enlaces. Aviso de privacidad sigue sin destino ni enlace.

## Página 2: Servicios

### 2.1. Hero

#### Estilo

- Mantener la identidad visual implementada en Inicio: colores, tipografía, márgenes, botones y estilo de gráficos.
- Reutilizar el header existente, incluyendo navegación activa, línea animada y comportamiento compacto al hacer scroll.
- La navegación muestra «Servicios» y apunta a `/servicios`.
- Fondo claro y altura menor que el hero de Inicio, con suficiente espacio alrededor del contenido.

#### Distribución en escritorio

- Texto a la izquierda y gráfico a la derecha.
- Usar dos columnas equilibradas, aproximadamente 50% / 50%, descontando la separación entre ellas.
- Evitar que el texto ocupe la mayor parte del ancho y reduzca el gráfico.
- Centrar verticalmente ambos bloques y mantener la alineación con el contenedor general del sitio.
- Permitir saltos de línea naturales en el título y descripción, sin reducir la tipografía para forzarlos a caber.

#### Título

- Usar el texto exacto de CONTENT.md.
- Mostrar «Soluciones informáticas para el» en azul marino.
- Resaltar «sector financiero» con el azul principal de MBS.

#### Descripción

- Usar el texto exacto de CONTENT.md.
- Mantener el color y estilo de los textos descriptivos de Inicio.
- Limitar su ancho a la columna izquierda y conservar separación clara respecto al título y al botón.

#### Botón

- Texto: «Hablemos de tu proyecto».
- Destino: /contacto#formulario.
- Reutilizar el estilo del botón «Hablemos de tu proyecto» del hero de Inicio, incluyendo tipografía, borde, colores y estados interactivos.
- Ancho ajustado al texto y al padding. No ocupar toda la columna ni reutilizar el tamaño del botón «Contáctanos» del CTA final.
- Colocar debajo de la descripción, alineado a la izquierda.

#### Gráfico

- En escritorio, dar más espacio a la columna derecha y mostrar img/servicios.png al 112% de esa columna: el ancho visible aumenta aproximadamente 25% frente a la distribución mitad y mitad anterior. Centrarlo verticalmente, aprovechar el espacio entre columnas y el margen derecho, sin invadir el texto ni salir del viewport.
- Mantener proporción, nitidez y transparencia; el PNG no tiene márgenes internos relevantes que requieran recorte. En móvil, devolverlo al 100% del ancho disponible.
- No estirar, recortar ni regenerar la ilustración; si la imagen incluye márgenes transparentes, conservar todo el gráfico.
- No añadir marcos, cuadrículas o decoraciones adicionales que no estén aprobados.

#### Responsive

- En pantallas pequeñas, colocar primero el texto y botón y después el gráfico.
- Ajustar tamaños y espacios progresivamente, sin desbordamiento horizontal.
- Mantener el botón adaptado al contenido y permitir que su texto se ajuste si es necesario.
- El hero debe ser visible desde la carga, sin esperar a una animación de scroll.

### 2.2–2.5. Detalle de los cuatro servicios

- Mantener el orden de CONTENT.md. Cada servicio es una sección independiente de ancho completo con el mismo contenedor interior que el hero.
- En escritorio, usar dos columnas: número del servicio e imagen correspondiente de Inicio a la izquierda; título, descripción y lista de capacidades o alcance a la derecha.
- Usar para cada servicio su asset de Inicio: `img/desarrollo_aplicaciones.png`, `img/mantenimiento_evolucion.png`, `img/bases_datos.png` e `img/integracion_aplicaciones.png`.
- Conservar la proporción y nitidez de las imágenes; no deformar, recortar, regenerar ni sustituirlas. En móvil, apilar número/imagen y contenido de forma legible, manteniendo cada imagen junto a su sección.
- Números discretos 01–04 en azul; títulos navy. Las etiquetas «Capacidades» y «Alcance» son encabezados secundarios, no nuevos servicios.
- Separar las secciones con espacio vertical generoso y divisores finos. Conservar el fondo claro y la paleta actual; no introducir degradados, sombras fuertes o estilos ajenos.
- Mantener párrafos legibles y listas completas, sin acordeones que oculten el contenido ni alturas fijas que lo recorten.
- Crear los identificadores de ancla exactos de CONTENT.md y compensar la altura del header para no tapar los títulos.
- Puede reutilizarse la aparición sutil existente una vez por bloque, sin animaciones anidadas ni aplicar la secuencia 01–07 de Inicio a estos cuatro servicios. Respetar movimiento reducido.

### 2.6. CTA y footer reutilizados

- Renderizar los mismos componentes actuales de Inicio al final de Servicios, una sola vez cada uno.
- No copiar CSS ni crear variantes. Mantener tamaños, márgenes, texto, enlaces y ajustes manuales existentes del botón del CTA.
- Conservar la altura actual del CTA y el botón al lado del título en escritorio. No restaurar la ampliación de botón rechazada por el usuario.
- Mantener el footer actualizado con correo, teléfono y redes sociales de CONTENT.md, sin inventar URL.

El CTA de cierre es el bloque azul independiente del footer. Inicio, Servicios y Nosotros reutilizan sin variantes el componente y contenido exactos de Inicio. University y Contacto no llevan CTA de cierre adicional.

### Alcance visual y revisión

- Implementar la página completa en una fase y revisarla al final en una segunda fase.
- Conservar íntegramente Inicio. Usar estilos específicos de Servicios si se requiere una diferencia de composición.
- No añadir secciones, formularios, testimonios, certificaciones, métricas o capacidades que no estén en CONTENT.md.
- La distribución de las cuatro secciones es una pauta inicial para la implementación; su aprobación visual ocurre al revisar la página completa.

## Página 3: Nosotros

### Reglas comunes

- Mantener la tipografía, paleta, contenedor, header, navegación y estilo MBS actuales. Header con Nosotros activo y subrayado ajustado al ancho del texto.
- Secciones principales amplias, con presencia de sección completa en escritorio y contenido centrado verticalmente. Usar altura mínima adaptable, no una altura fija que recorte texto; el contenido puede crecer. CTA y footer conservan las proporciones de sus componentes existentes, no se fuerzan a una pantalla completa.
- En móvil, altura automática y apilado natural; conservar todo el contenido sin scroll horizontal, superposiciones ni recortes.
- Fondos claros, títulos navy, destacados azules y cuerpo gris azulado. Divisores finos y espacio generoso; no introducir sombras, nuevas cards o gráficos no solicitados.
- Los textos se implementan como HTML seleccionable. Solo las ilustraciones y el diagrama usan PNG; no incrustar las capturas de secciones completas.

### 3.1. Hero

- Texto a la izquierda e `img/nosotros.png` a la derecha, equilibrados y centrados verticalmente dentro del contenedor común.
- Resaltar únicamente «Conocimiento» y «experiencia» del título en azul de acento. Mantener la marca completa dentro del párrafo.
- Imagen protagonista y proporcionada, sin invadir el texto. Conservar transparencia, nitidez y todas sus partes; no sustituirla por servidores ni regenerarla.
- En móvil: texto primero, imagen después. Visible desde la carga, sin esperar animación de scroll. No añadir CTA al hero.

### 3.2. Equipo

- Dos columnas: título a la izquierda y párrafo con enlace «Conoce University.» a la derecha; divisores finos según la composición existente.
- Usar el párrafo actualizado de CONTENT.md, sin recuperar «modernas» ni «necesidades de capacidad» de borradores.
- En móvil apilar título, párrafo y enlace. No añadir ilustración.

### 3.3. Experiencia bancaria

- Título superior con «operación bancaria» resaltado. Eliminar el renglón introductorio anterior indicado en CONTENT.md.
- Mantener los cuatro grupos y sus listas completas con los títulos actualizados de CONTENT.md. En escritorio: Pagos y transferencias a la izquierda y Crédito a la derecha; después Captación e inversiones a la izquierda y Obligaciones y ahorro para el retiro a la derecha.
- En cada grupo, ilustración azul a la izquierda y título/lista a la derecha, conservando el estilo técnico fino de los PNG entregados.
- Aplicar al bloque de los cuatro grupos el fondo `var(--color-deep-navy)`, títulos blancos, listas en `#d7e2f7` y separadores `rgba(63, 171, 255, .55)`, en continuidad con Tecnologías de Inicio. Mantener el título introductorio de Experiencia fuera de esa banda y sin cambios. Mostrar los PNG actuales directamente, sin filtros ni fondos opacos; sus ilustraciones cian conservan transparencia y contraste sobre navy.
- La primera parte (título, Pagos y Crédito) tiene altura de sección completa y espacio vertical generoso. La fila de Captación y Obligaciones conserva su composición aprobada sin cambios. No comprimir las dos filas y todo el texto en una única altura fija ni reducir tipografía para hacerlas caber.
- Conservar la proporción natural de cada PNG. En móvil, apilar los grupos en su orden y adaptar imagen/texto al ancho disponible.

### 3.4. Administración de proyectos · PMI

- Título y párrafo a la izquierda. Resaltar «Project Management Institute» en el título.
- Las cinco líneas de alcance se mantienen en la columna derecha, alineadas a la izquierda, con una columna angosta de puntos azules y divisores horizontales sutiles; no convertirlas en la tabla de capacidades de University.
- Alinear verticalmente ambos lados y mantener altura mínima de sección completa en escritorio. En móvil, texto seguido de lista con altura natural.
- Conservar `id="administracion-de-proyectos"` y compensación del header. No recuperar el título anterior ni añadir el párrafo previo sobre Scrum.

### 3.5. Proyecto exitoso

- Nueva sección inmediatamente después de Administración de proyectos y antes de Oficina de Proyectos.
- Dos columnas balanceadas: título y frase de CONTENT.md a la izquierda; `img/proyecto_exitoso.png` completo y suficientemente grande para leer sus rótulos a la derecha. Resaltar únicamente «exitoso» en azul de acento.
- Mostrar el gráfico completo, sin deformar, recortar, redibujar ni superponer textos nuevos. No generar otro gráfico ni añadir un párrafo debajo.
- Adaptar el ancho manteniendo proporción y márgenes; permitir que la sección crezca. Usar una alternativa textual que describa requerimientos, costo/tiempo/calidad y las tres instancias de seguimiento y control.

### 3.6. Oficina de Proyectos

- Título «Oficina de Proyectos» en azul y párrafo a la izquierda. A la derecha, tres bloques de texto: Visibilidad del portafolio, Métricas y alertas, Coordinación del trabajo.
- Sección amplia, centrada verticalmente y sin ilustración adicional. Mantener separación clara entre bloques.
- No incluir el subtítulo eliminado «Coordinación y seguimiento del conjunto de proyectos» ni recuperar el título antiguo «Visibilidad del conjunto de proyectos».
- En móvil, apilar explicación y tres bloques; altura adaptable.

### 3.7–3.8. CTA y footer

- Reutilizar el CTA de Inicio sin variantes: mismo título, botón, destino, dimensiones y estilos. Mantener el botón a la derecha en escritorio y adaptar en móvil; conservar ajustes manuales.
- Footer idéntico al existente, una sola instancia, sin enlaces sociales o legales inventados.

### Alcance de esta actualización

El diseño y contenido de Nosotros están implementados en fase 1; queda pendiente la revisión visual dirigida de fase 2. «Aprendizaje aplicado a los proyectos» y su retícula 3 + 2 pertenecen a University, cuyo alcance independiente se define más abajo. No modificar otras páginas al trabajar en Nosotros.


## Página 4 · University

### Reglas comunes y altura
- Reutilizar header, tipografía, variables y contenedor actuales. University activo por ruta.
- Las cuatro secciones de contenido tienen altura de sección completa en escritorio: usar min-height equivalente al viewport útil bajo el header existente, con contenido centrado verticalmente y padding suficiente. Permitir crecer si el contenido lo necesita; no usar height rígido, recortar ni ocultar contenido.
- En móvil, altura automática y apilado natural. El formulario puede ocupar más de una pantalla; no comprimir controles para forzarlo.
- El footer conserva exactamente sus medidas y estilo compartidos, sin forzarlo a una pantalla completa.
- Fondo claro y títulos navy con acentos azules existentes. Sin nuevas paletas ni cambios globales.
- Conservar Inicio, Servicios y Nosotros, incluidos los ajustes manuales y el bloque bancario oscuro. Esta entrega no modifica sus assets.

### Hero
Dos columnas: título, descripción y botón a la izquierda; img/university.png a la derecha. Resaltar «talento» y «sistemas de misión crítica» como indica CONTENT.md. Imagen completa, proporcionada, sin recortes ni deformaciones, con aire alrededor y alineación vertical equilibrada. No sustituir por el gráfico de personas. En móvil apilar sin desbordamiento.

### Crece trabajando en tecnología que importa
Título arriba. Eliminar el párrafo que ocupaba la derecha; no reservar una columna vacía para él.
Debajo, cinco bloques ordenados: primera fila tres columnas iguales; segunda fila dos columnas iguales a todo el ancho. Delimitar filas y celdas con líneas finas azul grisáceo para que no parezcan textos dispersos. Padding coherente, número azul sobre título navy y descripción gris azulada. Centrar contenedores de texto de igual ancho dentro de las dos celdas inferiores, conservando alineación izquierda. Conservar títulos y descripciones de CONTENT.md, sin gráficos adicionales. En móvil una columna siguiendo 01–05; adaptar tablet sin romper el orden.

### Encuentra tu lugar en la tecnología
Diseño aprobado: dos columnas centradas verticalmente. Izquierda título grande con «tu lugar» azul y párrafo debajo; derecha siete filas 01–07 con números azules, etiquetas navy y separadores horizontales finos. En escritorio amplio, etiquetas de 26–30 px y filas mínimas de 76–88 px, ajustadas al espacio; permitir que crezcan si el texto envuelve. Espaciado consistente y amplio. Sin tarjetas, sombras, botones ni ilustración adicional. En móvil título/texto arriba y lista debajo con tamaño fluido y sin desbordar.

### Formulario University
Mantener el orden y textos aprobados de CONTENT.md. En escritorio, alinear título y descripción arriba junto al borde superior del formulario. Encerrar el formulario completo, incluido el botón, en una tarjeta blanca con borde sutil, esquinas redondeadas y sombra discreta. Fila 1 dos campos y fila 2 dos campos en escritorio; las filas 3–6 ocupan el ancho de la tarjeta. En móvil título/texto arriba, tarjeta después y campos apilados en orden de lectura. Labels visibles vinculados a controles, foco visible, selección accesible por teclado y área de carga con selector además de arrastrar/soltar.
El input admite PDF y máximo 5 MB; mostrar nombre del archivo seleccionado y errores reales de formato/tamaño sin afirmar envío. No inventar campos, opciones ni requisitos de obligatoriedad no acordados. Mantener formulario legible con altura mínima flexible.
Ancla formulario-university con scroll-margin para no quedar tapada por el header. Mostrar los estados compartidos enviando, éxito, error o no disponible dentro de la tarjeta y con anuncio accesible; solo éxito tras confirmación real del backend. Si falta, comunicar la indisponibilidad y no transmitir datos.

### Footer
Mismo componente de Inicio, Servicios, Nosotros y University: `SiteFooter`, una sola instancia por ruta y sin estilos locales que alteren su presentación. No duplicar datos ni agregar CTA previo.

## Página 5 · Contacto

- Hero con título y descripción de CONTENT.md a la izquierda y el sobre `img/contactos.png` completo y proporcionado a la derecha.
- Usar `min-height: calc(100svh - alto del header)` en escritorio y permitir que el contenido crezca. En móvil, altura natural y orden texto/gráfico.
- Después del hero, sección `#formulario` en escritorio con columnas aproximadas 40/60 y separación amplia. A la izquierda, únicamente el H2 «Formulario de Contacto», grande, navy y alineado arriba con la tarjeta; a la derecha, todo el formulario dentro de la tarjeta blanca con borde sutil, radio, sombra y padding amplio. Sin descripción ni subtítulos.
- En la tarjeta: filas Nombre/Empresa y Correo/Teléfono; luego el select opcional «Servicio o necesidad» a todo lo ancho con las cuatro opciones aprobadas de Servicios; luego Mensaje multilínea a todo lo ancho y botón alineado a la izquierda. El formulario no solicita casilla de consentimiento. En móvil, título arriba, card debajo y una columna.
- Etiquetas visibles, controles asociados, foco visible, requeridos de nombre/correo/mensaje y validación nativa. Empresa y teléfono opcionales. El Aviso de privacidad del footer sigue como texto sin enlace mientras no exista una página legal real.
- Reutilizar el componente de estado de envío de University: mensajes persistentes y accesibles; botón bloqueado mientras se envía. Solo mostrar éxito tras confirmación real. Mientras falte backend, no hacer una petición y mostrar indisponibilidad.
- Sección del formulario con altura mínima completa en escritorio y crecimiento natural; móvil con altura automática. Compensar ancla por el header.
- Header y `SiteFooter` compartidos; footer una vez y con altura natural. No sumar CTA de cierre ni diseñar otras secciones pendientes.
