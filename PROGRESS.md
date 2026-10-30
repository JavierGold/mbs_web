# Estado del proyecto · MBS

Actualizado: 29 de octubre de 2026.

## Estado actual

- **Ajuste de botones:** los CTA de Servicios y University usan los mismos colores de Contacto del header (`--color-blue`, `--color-white`) en estado normal, hover, active y focus; conservan el contorno de foco global. Build correcto. La revisión visual de escritorio/móvil no pudo completarse: el navegador automatizado no está disponible y Edge headless terminó con error antes de generar capturas.

- **Lote actual (2026-10-29):** Experiencia bancaria y PMI de Nosotros actualizados; sección de proyecto exitoso ahora es de dos columnas con «exitoso» resaltado; University limita disponibilidad a «Medio tiempo.» y «Tiempo completo.»; Contacto ya no solicita la casilla de privacidad. Motion reemplaza el observador global con un componente compartido, entradas de hero, revelados por scroll, stagger automático 01–07 y movimiento reducido. El Aviso del footer sigue como texto sin destino; Contacto y University continúan sin backend real.
- **Verificado:** `npm.cmd run build` correcto. HTTP 200 en las cinco rutas y en los cinco PNG implicados. No se pudo hacer revisión visual/interactiva: Playwright CLI no pudo iniciarse porque Bash/WSL devolvió `E_ACCESSDENIED`; el navegador automatizado también se detuvo por no poder determinar la URL activa. Pendiente revisión visual responsive, interacción del menú y comportamiento de animaciones en navegador.
- **Archivos del lote:** `src/components/Reveal.tsx` (nuevo), componentes Inicio y páginas Servicios/Nosotros/University/Contacto, estilos de Nosotros/Contacto/Inicio, contenido de Nosotros/University/Contacto, `App.tsx`, `index.html`, y `CONTENT.md`, `DESIGN.md`, `SPEC.md`.

- Inicio implementado. Su aprobación visual final sigue pendiente; conservar los ajustes actuales y los cambios manuales del usuario.
- Servicios fase 1 implementada en `/servicios`: hero, cuatro servicios y reutilización de header, CTA y footer. Las cuatro secciones ahora usan su imagen de Inicio en la columna izquierda y el contenido a la derecha. Pendiente fase 2: revisión final dirigida.
- Nosotros fase 1 implementada en `/nosotros`; revisión visual dirigida de fase 2 pendiente. University fase 2 revisada y corregida en `/university`, lista para revisión del usuario. Contacto tiene el hero aprobado, formulario de clientes y footer compartido; quedan backend, aviso legal y demás secciones.
- Sin publicación de producción registrada. Existe una prueba mediante ngrok; no modificar su configuración como parte del desarrollo visual.

## Implementado en Inicio

- Base React + TypeScript + Vite, variables CSS, componentes y rutas para las cinco páginas.
- Ocho secciones: header/hero, introducción de 30 años, cuatro servicios, introducción tecnológica, catálogo tecnológico, Cómo trabajamos, CTA y footer.
- Tecnologías: tres categorías arriba y dos abajo, contenedor ampliado y gráfico de Procesamiento de datos equilibrado.
- Servicios: filas compartidas de ilustración, título y descripción en escritorio; alturas naturales en móvil.
- Header sticky opaco; compactación reversible al superar 80 px de scroll, con altura compacta de 80 px en escritorio. Móvil conserva su altura aprobada.
- Navegación activa por ruta, indicador animado en hover/foco, menú móvil con Escape y retorno de foco.
- Aparición general: 500 ms. Secuencia de Cómo trabajamos: 650 ms por etapa, ease-out, 350 ms entre inicios, orden automático 01–07 y ejecución única. Respetar movimiento reducido y contenido visible ante fallo de inicialización.
- Footer con enlace «Hablemos de tu proyecto →» debajo de University, correo y teléfono enlazados; LinkedIn, Instagram y Facebook como texto sin URL. Aviso de privacidad sin enlace.
- Ajuste puntual del hero de Inicio: `mainframe.png` usa 75% de la columna derecha (máximo 46 rem), centrado vertical y horizontalmente; móvil conserva el ancho anterior. Revisión visual dirigida: escritorio 1672×941, imagen 643×538 px y hero 768 px de alto; móvil 390×844, imagen 390×326 px. Proporciones conservadas y sin desbordamiento.

## Ajustes que deben preservarse

- CTA: conservar la altura actual. El usuario rechazó la ampliación del botón y pidió recuperar su ancho anterior; no volver a ampliarlo ni sustituir sus ajustes manuales. El botón debe permanecer a la derecha del título en escritorio, no debajo.
- Los valores finales del botón tras los cambios manuales no están verificados en este registro. No asumir que una propuesta enviada equivale a un cambio aplicado.
- No modificar Inicio para implementar Servicios, salvo autorización expresa.

## Comprobaciones registradas

El historial del proyecto reporta las siguientes comprobaciones. Esta actualización documental no vuelve a ejecutarlas ni constituye aprobación visual del usuario.

- Compilaciones correctas en las fases 1–4 y ajustes posteriores.
- Revisión de Inicio en escritorio (1672×941), tablet (768×1024) y móvil (390×844), sin desbordamiento; navegación, foco y consola revisados.
- Revisiones posteriores dirigidas de header, servicios, footer, movimiento reducido y secuencia de etapas; última validación registrada de animaciones: 500 ms general, 650 ms por etapa y 350 ms entre inicios.
- Capturas registradas en `output/playwright/`: `fase4-desktop.png`, `fase4-tablet.png`, `fase4-mobile.png`, `ajustes-servicios-desktop.png`, `ajustes-footer-desktop.png`, `ajustes-menu-movil.png`, `ajustes-footer-movil.png`, `header-compact-desktop.png` y `header-compact-mobile.png`.
- URL local usada: `http://127.0.0.1:5173/`. No implica que el servidor esté activo en este momento.

No repetir las comprobaciones de Inicio salvo que un cambio afecte directamente esas partes.

## Servicios · Fase 1 implementada

- CONTENT.md conserva Inicio e incorpora el hero, las cuatro secciones, anclas y referencias al CTA y footer compartidos.
- Se conserva «Hablemos de tu proyecto», botón corto solicitado previamente. Los cuatro servicios mantienen el último texto suministrado; no se aplicaron sin confirmación las sugerencias de añadir Teradata o reescribir la descripción de SOA.
- DESIGN.md conserva los ajustes actuales y define el hero equilibrado, el resaltado azul y una pauta de implementación para los cuatro servicios. Esa pauta no es un mockup aprobado: la revisión visual será sobre la página completa.
- SPEC.md habilita toda Servicios en dos fases: implementación completa y revisión final. Ya no limita esta etapa al hero.
- AGENTS.md se conserva sin cambios. Estos cuatro archivos reemplazan sus versiones anteriores; no deben concatenarse al final.
- Implementado `ServicesPage` con contenido separado, hero y cuatro secciones con anclas exactas. El header marca Servicios como ruta activa; CTA y footer compartidos se renderizan una vez. No se agregó el formulario pendiente.
- Responsive específico de Servicios: hero apilado en móvil y secciones de detalle en una columna; no se cambiaron estilos de Inicio.
- Comprobaciones reales: `npm run build` correcto; ruta `/servicios`, estado activo, gráfico cargado, href `/contacto#formulario`, una instancia de CTA/footer y ausencia de scroll horizontal en 1280 px y 390 px.
- Ajuste posterior: imágenes propias en cada servicio con proporciones naturales; descripción de Integración actualizada en código y CONTENT.md. DESIGN.md ahora especifica la distribución en dos columnas y apilado móvil, sin instrucciones de servicios sin imagen.
- Revisión dirigida de las cuatro secciones en escritorio (1440×1000) y móvil (390×844): cada imagen conserva su proporción nativa y número/imagen quedan asociados a su contenido sin quedar bajo el header. Build correcto.
- Ajustes posteriores: hero de Servicios usa `img/servicios.png` (1774×887, proporción y canal alfa conservados); navegación renombrada a «Servicios»; subrayado ahora mide el texto y conserva transición/estilo de Contacto.
- Verificación dirigida: línea completa en ruta activa, hover y foco de teclado; menú móvil abre y cierra; imagen renderiza a proporción 2:1. Build correcto. Sin publicación.
- Ajuste más reciente del hero Servicios: columna derecha ampliada y PNG al 112% para aumentar el gráfico ~25%, sin recortar ni cambiar la altura del hero. No se encontraron márgenes transparentes internos que requieran encuadre.
- Revisión visual dirigida: escritorio 1672×941, imagen 897×448 px, margen al texto y viewport conservados; móvil 390×844, imagen 350×175 px. Sin desbordamiento. No se modificaron otras secciones.

## Nosotros · Fase 1 implementada

- Actualizados CONTENT.md, DESIGN.md, SPEC.md y PROGRESS.md usando las versiones actuales suministradas por el usuario, conservando Inicio y Servicios. AGENTS.md no cambia.
- Orden: Hero, Equipo, Experiencia bancaria (cuatro grupos), Administración de proyectos/PMI, Proyecto exitoso, Oficina de Proyectos, CTA y footer.
- Hero con nosotros.png y destacados «Conocimiento»/«experiencia»; Equipo con frase revisada; Experiencia sin renglón introductorio y con «operación bancaria» destacado.
- Se inspeccionaron los seis PNG existentes en `img/`; se conservaron sus nombres, proporciones y transparencia.
- PMI con título, párrafo y lista exactos; proyecto_exitoso.png precedido de título y frase; Oficina de Proyectos sin el subtítulo eliminado y con los tres bloques conservados.
- «Aprendizaje aplicado a los proyectos» corresponde a página 4; no se incorpora a Nosotros.
- Implementados el hero, equipo, cuatro grupos bancarios, PMI, proyecto exitoso, Oficina de Proyectos y CTA; header, CTA y footer compartidos reutilizados. No se añadió el contenido reservado a University.
- Ajuste de color de los cuatro grupos de Experiencia bancaria: fondo navy existente, títulos blancos, listas en blanco suave y divisores azules; se reutilizan los cuatro PNG transparentes sin filtros. El título introductorio queda intacto. Revisión dirigida de contraste, imágenes y distribución en escritorio/móvil realizada; sin cambios de medidas ni responsive.
- CTA de Nosotros ahora reutiliza el CTA aprobado de Inicio, con destino `/contacto`; conserva el mismo componente y estilos que Inicio y Servicios.
- Comprobaciones reales: `npm.cmd run build` correcto; `/nosotros` respondió 200 en 1440×900 y 390×844, con Nosotros activo; las seis imágenes de contenido y el gráfico del CTA cargaron, sin errores de página ni scroll horizontal.
- No se hizo revisión visual detallada ni publicación. Archivos de código: `src/App.tsx`, `src/main.tsx`, `src/components/CallToAction.tsx`, `src/content/aboutPage.ts`, `src/pages/AboutPage.tsx`, `src/styles/about-page.css`. Documentación sincronizada: `SPEC.md`, `CONTENT.md`, `DESIGN.md` y este archivo.

## Pendientes y bloqueos

- Fase 2 de Servicios: revisión visual final dirigida y correcciones necesarias, sin repetir auditorías de Inicio.
- Aprobación visual final del usuario; no confundir implementación con aprobación.
- Revisión visual dirigida de Nosotros (fase 2) pendiente. Contacto tiene hero y formulario de clientes; backend, Aviso de privacidad y demás secciones siguen pendientes.
- Formulario de Contacto con `id="formulario"` ya está en la ruta. El envío real sigue bloqueado por falta de Aviso de privacidad aprobado y backend.
- URL de LinkedIn, Instagram y Facebook y aviso de privacidad pendientes; mantenerlos sin enlaces inventados.
- Si faltan archivos o assets reales en el proyecto, informar el bloqueo concreto, sin regenerarlos ni sustituirlos automáticamente.

## University · Fases 1 y 2 implementadas

- Implementadas las cuatro secciones, el formulario y footer compartido; texto y estructura separados en `src/content/universityPage.ts` y `src/pages/UniversityPage.tsx`, con estilos responsive encapsulados en `src/styles/university-page.css`.
- Hero usa `img/university.png` (1536 × 1024), título y destacados exactos, CTA anclado a `#formulario-university`; Crecimiento conserva el orden 3 + 2 y Áreas las siete filas.
- Formulario accesible con campos/opciones aprobados, selección y arrastre de PDF, validación por firma/extensión y límite de 5 MB. Los estados de envío reutilizan ahora la interfaz compartida; sin backend, el submit no transmite datos y anuncia la indisponibilidad.
- Fase 2: crecimiento conserva la cuadrícula 3 + 2; los textos de 04 y 05 están centrados en contenedores de igual ancho dentro de sus celdas. Áreas usa filas y tipografía más legibles en escritorio. Formulario alinea el texto superior con la tarjeta, que ahora contiene todos los campos y el botón. Reglas documentadas en DESIGN.md.
- El footer de University y Nosotros reutiliza exactamente una instancia del componente `SiteFooter` compartido con Inicio; no fue necesario alterar su código ni sus estilos.
- Comprobaciones reales de esta fase: visual dirigida de Crecimiento, Áreas y formulario en 1440×1000 y 390×844; sin desbordamiento horizontal (scrollWidth 1440/390). Enlace al formulario actualiza `#formulario-university` y deja su inicio bajo el header. Selector de área/disponibilidad presente; PDF válido aceptado, formato incorrecto y archivo mayor de 5 MB rechazados. No se envió información real.
- Footers comparados visualmente en Inicio, University y Nosotros en escritorio y móvil: textos, fondo y distribución iguales (1440×466/467 y 390×830/831 por el encuadre de captura); una instancia en cada ruta. Se ven iguales; no se cambió el footer de Inicio.
- Compilación final de fase 2: `npm.cmd run build` correcta.
- Capturas para revisión: `output/playwright/university-phase2/` (Áreas, Crecimiento y formulario en escritorio y móvil).
- Archivos de fase 2: `src/pages/UniversityPage.tsx`, `src/styles/university-page.css`, `DESIGN.md` y `PROGRESS.md`. Pendientes: aprobación visual del usuario y backend de reclutamiento. Contacto ya tiene interfaz del formulario; backend y Aviso de privacidad pendientes. Sin publicación.

## Siguiente paso

Esperar revisión del formulario de Contacto; implementar las demás secciones solo con contenido y diseño aprobados. Conectar los backends de Contacto/University y activar el consentimiento únicamente después de resolver sus pendientes. Mantener pendientes de Servicios/Nosotros como tareas separadas sin reabrirlas automáticamente. No publicar.

## Contacto · hero y formulario implementados parcialmente

- Último ajuste del formulario: escritorio en dos columnas 40/60, solo «Formulario / de Contacto» a la izquierda y toda la tarjeta a la derecha; título alineado arriba con el card. En móvil, título sobre el card y formulario a una columna. Min-height flexible en escritorio; altura natural en móvil.
- Dentro del card: nombre/empresa, correo/teléfono, selector opcional con las cuatro categorías actuales de Servicios, Mensaje multilínea, consentimiento desmarcado y botón existente «Enviar mensaje». Se conserva la validación y los estados de envío ya implementados. No hay página de Aviso de privacidad, por lo que sigue sin enlace real; el envío está bloqueado.
- Contacto y University comparten el componente de estado inicial/enviando/éxito/error/no disponible. El éxito solo se mostraría si un submitter real resuelve tras confirmación del backend; ningún backend está configurado. Los botones se bloquean durante envío y los datos permanecen si hay error.
- En el workspace el sobre aprobado estaba como `img/contactanos.png`; se conservó ese original y se creó `img/contactos.png` como copia byte a byte para atender el nombre de archivo solicitado. Ambos miden 1408×1117 RGBA y tienen el mismo SHA-256.
- Comprobaciones reales de este ajuste: visual dirigida en 1440×1000 y 390×844; columnas 40/60 (487/727 px) y encabezado/card alineados arriba en escritorio; card de una columna en móvil; sin desbordamiento horizontal. El selector muestra las cuatro opciones aprobadas y es opcional. El botón conserva el estilo existente (158×57 px escritorio; 131×51 px móvil). Hero, footer y University intactos.
- Pruebas controladas del helper simularon estados enviando→éxito y enviando→error, más la ruta sin backend; la UI SSR confirmó anuncio accesible, botón deshabilitado durante envío y reactivado en error. Son simulaciones, no integración backend.
- `npm.cmd run build` correcto después del ajuste. Capturas de la nueva distribución en `output/playwright/contact-form/layout-{desktop,mobile}.png` y `card-layout-{desktop,mobile}.png`. No se encontraron archivos 01/02 del formulario dentro de `references/`; la implementación sigue la descripción escrita.
- Archivos de este ajuste: `src/content/contactPage.ts`, `src/pages/ContactPage.tsx`, `src/styles/contact-page.css`, `CONTENT.md`, `DESIGN.md`, `SPEC.md` y este archivo. No se tocaron hero, botón CSS, footer, University ni otras secciones. No se publicó.
- Pendientes: conectar backend real de Contacto y reclutamiento, crear/aprobar el Aviso de privacidad y desarrollar/revisar las demás secciones de Contacto.

## Cómo mantener este archivo

Después de cada avance, actualizar el estado correspondiente con lo implementado, las comprobaciones realmente ejecutadas, los bloqueos y el siguiente paso. Reemplazar información superada en lugar de acumular instrucciones contradictorias. Mantener este archivo breve; el contenido y diseño completos pertenecen a CONTENT.md y DESIGN.md.


## Infraestructura CloudFront preparada — 30 de octubre de 2026

- Añadida carpeta `infra/terraform` con S3 privado, CloudFront OAC/HTTPS, rutas SPA y script PowerShell de publicación de `dist` incluyendo `img`.
- Publicación de estos archivos en `main` autorizada por el usuario; no se ha ejecutado infraestructura ni despliegue en AWS.
- Validación: revisión estática y 12 pruebas Node de rutas aprobadas. Terraform fmt/validate/plan, PowerShell y build completo pendientes de ejecución en un entorno equipado; no afirmar despliegue validado.
- Siguiente paso: seleccionar perfil/cuenta AWS, ejecutar validaciones y revisar el plan antes de autorizar/applicar recursos; seguir `infra/terraform/README.md`. Los backends de formularios siguen fuera de este alcance.

## 2026-10-30 · Carga de heroes y destinos de botones
- Autorizado por el usuario: optimizar heroes sin modificar diseño, en main. Se conservan todos los PNG originales.
- HeroImage compartido: WebP con fallback al PNG, carga eager/prioridad alta, dimensiones intrínsecas y entrada de opacidad tras load/decode. Reduced motion y fallos mantienen visible la imagen. Se elimina la animación duplicada del contenedor.
- Preload exclusivo del hero de la ruta actual; gráficos inferiores de Servicios/Nosotros y CTA compartido con carga diferida.
- Cuatro WebP lossless locales comprobados píxel RGBA a píxel: Inicio 908633→626174 bytes; Nosotros 1550853→1119922; University 2053823→1379742; Contacto 1021272→657088.
- `scripts/optimize-hero-images.py` regenera los cinco desde sus PNG con Python 3.12/Pillow 12.0.0 antes del build automatizado. Servicios se generará en CI: el conector no permitió transferir su PNG >1 MB al entorno local. En un despliegue manual sin WebP, se usa el PNG original; para regenerarlos localmente, instalar Pillow 12.0.0 y ejecutar `python scripts/optimize-hero-images.py .` antes del despliegue. Regenerar también al cambiar cualquier PNG.
- Solo botón hero de Servicios: destino `/contacto`, sin ancla, para ver el hero de Contacto.
- University: ancla del formulario sin margen duplicado; un único offset coincide con header compacto (5rem; 5.65rem hasta 680px). Entrada directa por hash reubica al montar.
- Validado: npm ci y npm run build (TypeScript + Vite) correctos; cuatro conversiones pixel-exact y prueba del script con cinco fixtures RGBA. No hay scripts de lint/tests en package.json.
- Pendiente: validación visual en navegador real y sitio publicado. Chromium local no inició por restricción de sockets del sandbox; no se ejecutó despliegue AWS en esta tarea. El workflow automático se integra por separado.

### 2026-10-30 · Corrección de entrada en la primera carga
- El usuario reportó aparición brusca del hero recién publicado. La implementación anterior permitía pintar la imagen opaca antes de `load/decode` y luego intentaba ocultarla/iniciar el fade en la misma tarea.
- HeroImage ahora inicia transparente, espera carga/decodificación y dos frames antes del fade declarativo de 0.9 s, como los textos. No usa temporizadores que fuercen una imagen lenta a aparecer de golpe. El PNG de respaldo conserva esa secuencia; reduced motion es inmediato y error de ambos formatos deja visible el texto alternativo.
- Validado: build TypeScript/Vite; pruebas de estado simuladas para caché fría/caliente, decode rechazado, fallback/error, reduced motion y cancelación al desmontar. La prueba visual real sigue pendiente por la restricción de Chromium del entorno; no se afirma medida de rendimiento ni QA visual completa.

### 2026-10-30 · Hero de Inicio más limpio en móvil
- Cambio autorizado solo hasta 680 px: CTA principal conservado; «Hablemos de tu proyecto» pasa a enlace sin recuadro con flecha y área táctil mínima de 44 px.
- Separación de 40 px antes del gráfico; imagen centrada al 80% del ancho disponible, sin márgenes negativos ni recortes. El hero conserva altura natural y permite desplazamiento.
- Escritorio y las otras páginas permanecen sin cambios; se conservan destinos, textos, colores y animación de HeroImage.
- Validado: build TypeScript/Vite correcto y revisión dirigida de reglas responsive. No hay scripts de lint o tests en package.json. La validación visual en navegador real sigue pendiente porque Chromium no inicia en este entorno.

### 2026-10-30 · CTA del hero de Servicios en móvil
- Cambio autorizado solo hasta 680 px: «Hablemos de tu proyecto» pasa a enlace azul con flecha, sin fondo ni recuadro, alineado con el texto y área táctil mínima de 44 px.
- Separación de 40 px antes del gráfico; tamaño y proporción de la ilustración intactos. Se conserva el destino `/contacto` sin ancla.
- Escritorio, Inicio y otras páginas sin cambios. Build TypeScript/Vite correcto; revisión visual real pendiente por la limitación ya constatada de Chromium (sockets no permitidos).

### 2026-10-30 · University y Contacto del menú móvil
- Autorizado ampliar el mismo estilo de enlace azul con flecha, sin recuadro/fondo, al CTA del hero University y a Contacto del menú hasta 680 px.
- University mantiene gráfico, enlace al formulario y offset; conserva 40 px antes de la ilustración. Contacto queda alineado con los demás enlaces, con la misma tipografía y foco/indicador de ruta activa. No se cambia la lógica de navegación, cierre o hamburguesa.
- Escritorio intacto. Build TypeScript/Vite correcto; validación visual/interactiva en navegador pendiente por la restricción de Chromium ya indicada.

### 2026-10-30 · Botón principal de Inicio rosa
- Autorizado cambiar y desplegar únicamente «Conoce nuestros servicios» del hero de Inicio, en escritorio y móvil: rosa #BE185D y hover/active #9D174D, texto blanco y foco global conservados.
- Sin cambios de texto, dimensiones, ubicación, destino `/servicios` ni otros botones/páginas.
- Validado: build TypeScript/Vite correcto y contraste blanco/fondo 6.04:1 normal y 7.88:1 hover/active. QA visual real no ejecutada por la restricción de Chromium ya registrada.
