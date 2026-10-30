# MBS · Instrucciones de trabajo para Codex

## Prioridad y contexto
Desarrollar solo lo solicitado para Inicio. Estas instrucciones y las ocho imágenes aprobadas el 29 de octubre de 2026 sustituyen los borradores anteriores. La instrucción más reciente del usuario prevalece. No rediseñar ni reescribir por iniciativa propia.

Mantener una única fuente por tema:
- `SPEC.md`: alcance y decisiones técnicas estables.
- `CONTENT.md`: texto exacto visible y orden.
- `DESIGN.md`: referencias, assets y presentación.
- `PROGRESS.md`: estado actual, decisiones pendientes y siguiente paso.

## Eficiencia obligatoria
Priorizar el ahorro de tokens sin perder contexto ni calidad. Leer este archivo una vez; después consultar solo el tema, sección, imagen y archivos afectados. No cargar todas las skills ni releer el repositorio completo en cada turno. No repetir investigaciones, planes o validaciones ya resueltos sobre contenido intacto.

Cambios pequeños y localizados. Usar búsquedas dirigidas y rangos relevantes; no imprimir archivos extensos ni salidas masivas. Reutilizar componentes y dependencias existentes. No crear documentación duplicada, abstracciones innecesarias ni pruebas de texto estático.

Ejecutar una vez las verificaciones útiles sobre el cambio estable. Repetir únicamente lo afectado por un fallo o modificación posterior. No hacer auditorías generales ni pruebas repetitivas por un ajuste visual. Conservar build, revisión responsive, accesibilidad y verificaciones de seguridad que realmente correspondan.

## Fidelidad y seguridad
Inspeccionar la imagen aprobada de la sección antes de implementarla. Usar texto HTML y componentes React reales, no capturas enteras como página. Mantener las ilustraciones existentes en `img/`; no regenerarlas ni sustituirlas por iconos arbitrarios. No deformar imágenes.

No inventar correo, teléfono, dirección, certificaciones, clientes, antigüedad de la marca ni funcionalidades. Los 30 años son experiencia del equipo. No añadir formularios, API, analítica o publicaciones sin autorización. No mostrar mensajes de éxito falsos ni ocultar destinos pendientes con enlaces `#`.

## Flujo
Trabajar sección por sección y esperar revisión antes de continuar cuando así lo indique el usuario. Se permite preparar el cascarón vacío de las otras cuatro páginas según SPEC.md; no inventar su contenido o diseño para completar enlaces. Al terminar un avance, actualizar brevemente `PROGRESS.md` con hechos, comprobaciones y siguiente paso; comunicar solo resultado y bloqueos. Si falta una decisión real, preguntar una sola vez y continuar únicamente el trabajo independiente.

Las skills se usan según el trabajo concreto; su existencia o instalación no se presupone. No descargar, reinstalar ni cambiar configuración global sin petición.
