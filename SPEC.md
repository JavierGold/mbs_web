# Especificación · Sitio MBS

## Objetivo y público

Desarrollar el sitio de **MBS — Mainframe & Beyond Solutions**, consultoría de desarrollo, mantenimiento, procesamiento de información e integración de sistemas para bancos e instituciones financieras.

El sitio presenta las capacidades de MBS a responsables de tecnología, aplicaciones y proyectos, y facilita el contacto para iniciativas completas o necesidades específicas de sistemas existentes.

## Documentación del proyecto

- `AGENTS.md`: reglas de trabajo, lectura selectiva, ahorro de tokens y validaciones necesarias.
- `CONTENT.md`: textos, botones y destinos definidos por página y sección.
- `DESIGN.md`: referencias visuales, estilos, distribución y comportamientos responsive e interactivos.
- `PROGRESS.md`: estado del desarrollo, pendientes, bloqueos y siguiente paso.
- `SPEC.md`: contexto, alcance y requisitos técnicos y funcionales.

Consultar solo lo necesario para la tarea. No recuperar borradores antiguos para completar contenido pendiente. Si existe una contradicción que afecte la implementación, señalarla antes de inventar una solución.

## Estructura y alcance actual

El sitio contempla cinco páginas:

1. **Inicio (`/`)**: implementado y sujeto a los ajustes y revisión visual del usuario. Conservar su contenido, diseño y ajustes manuales actuales.
2. **Servicios (`/servicios`)**: fase 1 implementada; conservar hero, cuatro servicios y componentes compartidos. Revisión final pendiente según PROGRESS.md.
3. **Nosotros (`/nosotros`)**: fase 1 implementada conforme a CONTENT.md y DESIGN.md; textos de Experiencia, presentación PMI y bloque Proyecto exitoso actualizados en el lote vigente; revisión visual dirigida pendiente.
4. **University (`/university`)**: fases 1 y 2 implementadas conforme a CONTENT.md y DESIGN.md; backend de reclutamiento pendiente.
5. **Contacto (`/contacto`)**: hero y formulario de clientes implementados; backend y demás secciones pendientes. El formulario no incluye casilla de consentimiento y el Aviso de privacidad del footer sigue sin destino real. Reutilizar header/footer y no inventar contenido.

Una ruta vacía no equivale a una página terminada. No rellenar páginas pendientes, redirigirlas a Inicio ni simular formularios o funcionalidades.

## Tecnología y estructura

- El proyecto utiliza **React, TypeScript, Vite y CSS**. Conservar el gestor de paquetes, versiones, arquitectura y dependencias existentes.
- Reutilizar componentes semánticos para encabezado, secciones, botones y footer cuando corresponda. No duplicar el header para Servicios ni Nosotros.
- Mantener los textos separados de la presentación y las variables CSS compartidas para colores, tipografía y espaciado.
- La dependencia `motion` ya está instalada; reutilizarla con un único componente compartido de revelado y respetar las variantes aprobadas en DESIGN.md, sin añadir dependencias ni duplicar el sistema anterior.
- Usar un contenedor responsive coherente y los assets existentes. Las capturas son referencias visuales, no secciones funcionales para insertar como imágenes completas.
- No incorporar librerías de UI, estado global o animaciones si la implementación existente cubre la necesidad.
- University incluye la interfaz de su formulario. Esta etapa no autoriza API, autenticación, base de datos ni configuración de servicios externos; el backend de reclutamiento queda pendiente.
- No modificar la configuración de Vite, ngrok o del entorno de ejecución como parte del desarrollo visual, salvo petición explícita.

## Página Servicios · Alcance completo

### Estructura

1. Header compartido existente, con Servicios activo.
2. Hero 2.1: texto y botón de CONTENT.md, «sector financiero» destacado en azul y gráfico de integración existente.
3. Desarrollo de aplicaciones: `id="desarrollo-de-aplicaciones"`.
4. Mantenimiento y evolución: `id="mantenimiento-y-evolucion"`.
5. Bases de datos y procesamiento de información: `id="bases-de-datos"`.
6. Integración de aplicaciones: `id="integracion"`.
7. CTA de Inicio reutilizado sin cambios.
8. Footer de Inicio reutilizado sin cambios.

### Dos fases de desarrollo

**Fase 1 · Implementación completa**

- Construir toda la estructura anterior en `/servicios` usando CONTENT.md y DESIGN.md.
- Reutilizar header, CTA, footer, botones, variables y assets existentes. No duplicar contenido común ni rediseñar Inicio.
- Implementar responsive como parte del trabajo, no dejarlo para reconstruirlo después.
- Hacer solo verificaciones básicas necesarias para que la página funcione. Registrar el resultado y detenerse al terminar esta fase, sin iniciar automáticamente la fase 2.

**Fase 2 · Revisión final**

- Revisar la página completa en escritorio y móvil y un tamaño intermedio si la composición lo requiere.
- Comprobar alineaciones, legibilidad, proporciones, anclas, navegación, movimiento reducido y ausencia de desbordamientos.
- Corregir únicamente diferencias observadas. No repetir pruebas generales de Inicio ni reconstruir componentes ya validados.
- Compilar al cerrar el cambio estable y entregar para aprobación visual del usuario. No publicar.

No dividir nuevamente el trabajo en fases por cada sección. Los cambios menores se solicitan directamente a Codex, que actualiza solo la documentación afectada; no pedir al usuario que rehaga los cuatro MD en cada ajuste.

### Acción principal

El botón del hero **«Hablemos de tu proyecto»** dirige a **`/contacto`**. El CTA compartido mantiene **`/contacto`**.

La página Contacto deberá incluir en una etapa posterior un formulario con `id="formulario"`. No construirlo ahora ni considerar funcional el desplazamiento al ancla mientras ese elemento no exista.

### Fuera de alcance

- En la fase de Servicios, no intervenir otras páginas. Nosotros cuenta con un alcance independiente definido más abajo; University tiene alcance independiente en esta actualización; Contacto permanece pendiente.
- Formularios, backend, nuevas integraciones o servicios comerciales no incluidos en el contenido suministrado.
- Rediseño de Inicio, generación de nuevos gráficos, cambios de configuración o dependencias innecesarias.
- Publicación del sitio.

## Página Nosotros · Alcance documentado

### Estructura y assets

1. Header compartido con Nosotros activo; Hero «Conocimiento del negocio y experiencia tecnológica.» e `img/nosotros.png`.
2. Equipo: título, párrafo actualizado y enlace a `/university`.
3. Experiencia bancaria: cuatro grupos con los títulos y textos de CONTENT.md. Assets `img/pagos_transferencias.png`, `img/credito.png`, `img/captacion_inversiones.png`, `img/obligaciones_retiro.png`.
4. Administración de proyectos: `id="administracion-de-proyectos"`, texto PMI y cinco líneas de alcance a la derecha, con puntos azules, texto alineado a la izquierda y divisores sutiles.
5. Proyecto exitoso: título con «exitoso» resaltado, frase e `img/proyecto_exitoso.png` en composición de dos columnas balanceadas.
6. Oficina de Proyectos: título, párrafo y tres bloques; sin subtítulo.
7. CTA: componente compartido de Inicio, con el mismo texto, botón, destino `/contacto` y presentación.
8. Footer compartido existente.

### Requisitos y límites

- CONTENT.md contiene el copy completo y DESIGN.md la composición vigente. No completar Nosotros desde borradores antiguos ni inventar beneficios, certificaciones, capacidades, clientes o métricas.
- Conservar Inicio y Servicios sin cambios, incluidos los ajustes manuales del usuario. Reutilizar componentes y variables; los textos específicos de Nosotros no alteran las otras páginas.
- Respetar alturas mínimas amplias en escritorio y naturales en móvil. La fila de Captación/Obligaciones conserva su composición aprobada; no forzar todas las listas dentro de una altura fija.
- Los PNG ya están en img según el usuario. Integrarlos con sus nombres existentes, sin regenerar, sustituir ni duplicar. Verificar su carga al implementar.
- La sección de aprendizaje de cinco capacidades en 3 + 2 pertenece a University y está excluida. Al trabajar en Nosotros, no desarrollar University ni Contacto. University tiene su alcance independiente más abajo.
- El CTA compartido enlaza a `/contacto`; no fingir que existe el formulario. No publicar ni cambiar configuración de Vite/ngrok, dependencias o seguridad.

### Ejecución posterior

Nosotros se trabaja en dos fases: (1) implementación completa responsive y comprobaciones básicas; (2) revisión visual dirigida y corrección de diferencias observadas. La fase 1 está implementada y se detiene para revisión; no subdividir por sección ni repetir auditorías generales de Inicio/Servicios.

### Criterios de aceptación de Nosotros

- Ruta `/nosotros`, estado activo del header y ocho bloques en el orden documentado.
- Copy exacto, destacados solicitados y renglones eliminados ausentes.
- Seis PNG correctos, proporcionados, completos y cargados; texto legible en los tamaños revisados.
- Header, CTA y footer reutilizados sin duplicaciones ni alteración de las otras páginas.
- Sin desbordamientos, recortes, contenido oculto o anclas tapadas por el header; accesibilidad y movimiento reducido conservados.
- Registrar únicamente verificaciones reales. Una actualización de MD no equivale a implementación ni aprobación visual final.

## Navegación e interacción

Conservar el enrutamiento existente. El texto visible de los controles se define en `CONTENT.md`.

- Inicio: `/`.
- Servicios y tecnologías / Servicios / Conoce nuestros servicios / Ver servicios: `/servicios`.
- Nosotros: `/nosotros`.
- University: `/university`.
- Contacto y los CTA de Inicio: `/contacto`.
- Botón principal del hero de Servicios: `/contacto`.
- Enlace «Conoce University.» de Nosotros: `/university`.
- Administración de proyectos: `/nosotros#administracion-de-proyectos`.
- Aviso de privacidad: mantener como texto sin enlace hasta que exista contenido y destino aprobados. No crear una sexta página legal en esta etapa.

La página activa se determina por la ruta y conserva su indicador al recargar o navegar con atrás/adelante. Mantener el header visible y su comportamiento compacto, el menú móvil y las animaciones acordadas en `DESIGN.md`.

Los datos de contacto definidos están en `CONTENT.md`. El correo utiliza `mailto:` y el teléfono `tel:`. LinkedIn, Instagram y Facebook permanecen como texto hasta recibir las URL reales. No inventar enlaces ni usar `#` como destino ficticio.

## Calidad mínima y validación

- HTML semántico, un H1 por página con contenido, nombres accesibles de controles, foco visible y navegación por teclado.
- Conservar el comportamiento accesible del menú móvil y evitar que el header tape destinos con ancla.
- Responsive sin scroll horizontal, superposiciones ni texto recortado. Imágenes proporcionadas, con espacio reservado y alternativas de texto adecuadas.
- Contraste legible y carga razonable de assets. No ampliar imágenes hasta perder nitidez innecesariamente.
- Mantener únicamente las animaciones acordadas en `DESIGN.md`. Respetar `prefers-reduced-motion` y garantizar contenido visible si no se inicializan los efectos.
- Revisar visualmente solo la sección modificada en escritorio y móvil. Comprobar un tamaño intermedio cuando el cambio de distribución lo requiera.
- Ejecutar una compilación al cerrar un cambio estable. Evitar repetir verificaciones equivalentes si la compilación ya incluye tipos u otras comprobaciones. Repetir solo lo necesario tras corregir fallos.
- No instalar frameworks de pruebas para texto estático ni repetir auditorías completas de partes intactas.
- Registrar en `PROGRESS.md` cambios, comprobaciones realmente realizadas y pendientes. No afirmar pruebas o aprobación que no hayan ocurrido.

## Criterios de aceptación de Servicios · Etapa previa

- Página Servicios completa y fiel a `CONTENT.md` y `DESIGN.md`, con los cuatro servicios en su orden y sus anclas correctas.
- Título, descripción, botón y gráfico legibles y equilibrados en los tamaños revisados.
- Ruta de Servicios accesible y navegación activa correcta.
- Botón configurado con `/contacto`; el formulario de clientes ya está disponible como interfaz, con backend y Aviso de privacidad pendientes.
- Inicio y los ajustes manuales existentes conservados.
- Header, CTA y footer compartidos sin duplicación ni cambios de diseño.
- Dos fases registradas y resultado final sujeto a aprobación visual del usuario. No tratar una propuesta de distribución como una imagen aprobada.

## Preparación antes de publicar · Otra etapa

Confirmar contenido de las páginas interiores, formularios y destinos reales, aviso de privacidad, datos de contacto y enlaces sociales definitivos. Verificar el respaldo de las capacidades comerciales comunicadas.

No ampliar la categoría Seguridad más allá del contenido aprobado. No extrapolar el texto suministrado sobre SOA a requisitos técnicos de todas las integraciones; no reescribir el contenido comercial sin aprobación. La experiencia del equipo no debe presentarse como antigüedad de la empresa sin confirmación.

No iniciar despliegues, contratar servicios, configurar dominio ni publicar cambios sin autorización. Una vista local o un enlace temporal de revisión no equivale a una publicación de producción ni a aprobación visual.


## Página University · Alcance aprobado

1. Header compartido con University activo.
2. Hero con texto exacto, destacados «talento» y «sistemas de misión crítica», img/university.png y botón a /university#formulario-university.
3. Crece trabajando en tecnología que importa: cinco bloques en 3 + 2, sin párrafo introductorio derecho.
4. Encuentra tu lugar en la tecnología: siete áreas en filas.
5. Formulario con id="formulario-university", seis filas y opciones exactas de CONTENT.md.
6. Footer idéntico al de Inicio y Servicios. No añadir CTA.

### Dos fases
- Fase 1: implementar toda /university responsive según CONTENT.md y DESIGN.md, sin dividir por sección. Reutilizar componentes y assets; comprobar compilación, carga, ancla y ausencia de desbordamientos evidentes. Registrar y detenerse para revisión.
- Fase 2: revisión final dirigida en escritorio y móvil; corregir diferencias observadas, accesibilidad, foco, campos, selección de archivo PDF y límite de 5 MB. No repetir auditorías generales de páginas intactas. No publicar.

### Formulario y límites funcionales
Implementar campos, desplegables y selección/arrastre de PDF. Los placeholders no son opciones seleccionables válidas. No añadir obligatoriedad no acordada sin confirmarla. Validar formato y límite de archivo en cliente; el futuro backend deberá volver a validarlos.
Backend de reclutamiento sin configurar. No transmitir datos personales/CV a destinos inventados, no conectar terceros ni reutilizar un backend de otro proyecto. No almacenar CV o datos personales en localStorage ni logs. No simular confirmación de recepción: mientras falte backend, impedir la petición de envío y comunicar claramente la indisponibilidad cuando se intente enviar, conservando «Enviar mi CV» como texto del botón. No inventar aviso de privacidad o consentimiento aprobado.
La disponibilidad del formulario University usa únicamente «Medio tiempo.» y «Tiempo completo.». La configuración real de recepción, almacenamiento, privacidad y envío queda para una tarea posterior autorizada.

### Criterios de aceptación
Cinco secciones de contenido/footer en orden, textos y resaltados exactos, hero correcto, alturas flexibles, retícula 3 + 2, siete filas, formulario accesible con opciones exactas, footer reutilizado y sin desbordamientos. No alterar páginas 1–3, Contacto, dependencias ni Vite/ngrok. Documentación lista no equivale a página implementada.

### Página 5 · Contacto

El formulario aprobado usa el ancla `#formulario`, distribución 40/60 en escritorio y una columna en móvil; el H2 de la izquierda es el único contenido en esa columna. La tarjeta derecha contiene nombre, empresa, correo, teléfono, el select opcional de los cuatro servicios aprobados y mensaje multilínea. Empresa y teléfono son opcionales. No incluye casilla de consentimiento. No crear backend, endpoint ni confirmación ficticia. El Aviso de privacidad del footer no tiene página ni destino aprobado y se conserva como texto sin enlace. No almacenar datos ni mostrarlos en logs.

Contacto conserva el hero aprobado y el footer compartido. La sección del formulario usa altura mínima completa en escritorio, crece si hace falta y fluye automáticamente en móvil. Footer con altura natural. No agregar CTA de cierre.

## Estados compartidos de envío

Contacto y University muestran Enviando, éxito, error o indisponibilidad dentro de su tarjeta, con anuncio accesible y botón deshabilitado durante el envío. Solo mostrar éxito tras confirmación real del backend. En ausencia de integración, no transmitir la información y mostrar «El envío aún no está disponible. Inténtalo más tarde.» Los errores conservan los datos para reintentar. No usar temporizadores, `alert`, localStorage ni logs con datos personales/CV.
