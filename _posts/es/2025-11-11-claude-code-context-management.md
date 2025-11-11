---
title: "De Vuelta Después de un Mes y Medio - Claude Code, La Batalla Contra la Contaminación del Contexto"
date: 2025-11-11
last_modified_at: 2025-11-11 19:00:36 +0900
categories: [CodificaciónVibe, HerramientasIA]
tags: [ClaudeCode, GestiónContexto, CLAUDE.md, ColaboraciónIA, ProductividadDesarrollo, ContaminaciónContexto, CompactConversation, Subagents, Skills, DesarrolloIA2025]
seo_title: "Resolviendo la Contaminación de Contexto en Claude Code - Gestión de Colaboración con IA usando CLAUDE.md"
description: "¡De vuelta después de un mes y medio! Lo que importa más que Subagents y Skills es la gestión del contexto. Compartiendo insights sobre problemas de contaminación del contexto y la solución CLAUDE.md."

# Campos de soporte multilingüe
lang: "es"
translation_key: "claude-code-context-management"
permalink: /es/vibe-coding/ai-tools/2025/11/11/claude-code-context-management.html
translations:
  ko: "/ko/vibe-coding/ai-tools/2025/11/11/claude-code-context-management.html"
  en: "/en/vibe-coding/ai-tools/2025/11/11/claude-code-context-management.html"
  es: "/es/vibe-coding/ai-tools/2025/11/11/claude-code-context-management.html"
---

¡Hola, soy LISA! 🙂

Estoy de vuelta después de un mes y medio. Mi horario de trabajo estaba realmente apretado, y escribir consistentemente resultó ser más difícil de lo que pensaba. 😅

Pero durante ese tiempo, seguí usando Claude Code. De hecho, lo usé **aún más**. No solo para desarrollo, sino en todos los aspectos de mi trabajo.

Y me di cuenta de algo importante. **Lo que importa más que las últimas funciones era otra cosa...**

## Estos Días Solo Uso Claude Code

Solía usar múltiples herramientas juntas - Cursor, Codex CLI, Task Master, etc.

Estos días estoy usando **casi solo Claude Code**.

### ¿Por Qué?

- **Cursor**: Sigue siendo bueno, pero la gestión del contexto del proyecto es incómoda
- **Codex CLI**: Solo útil en situaciones específicas
- **Task Master**: Excesivo a menos que sea un proyecto grande

Al final, **Claude Code es lo más conveniente para el desarrollo diario.**

Especialmente mientras intentaba usar mejor las herramientas de IA en el trabajo, sentí las diversas actualizaciones de Claude Code. Naturalmente probé las nuevas funciones en ese proceso.

## Probé las Últimas Funciones

Se agregaron muchas funciones nuevas a Claude Code, ¿verdad? Yo también las probé con expectativas.

### Subagents - El Consumo de Tokens es Demasiado...

**El concepto en sí era bueno:**
- Separación de roles: gerente, arquitecto, desarrollador, revisor
- Cada agente se enfoca en áreas especializadas
- El contexto está separado, así que es limpio

En teoría, era perfecto. "¡Oh, ahora realmente puedo usar las IAs como colaboración en equipo!"

**Pero la realidad:**
- 👎 **El consumo de tokens es enorme**
- Recarga de contexto para cada agente
- Relación costo-efectividad es baja
- Conclusión: **Dejé de usar**

Era excesivo para tareas simples, y demasiado costoso para tareas complejas. Pensé, "Con este costo, es mejor simplemente tener múltiples conversaciones con Claude Code básico."

### Skills - Se Siente Como un Retroceso

Esto fue realmente decepcionante.

**Método antiguo (era perfecto):**
1. Trabajar en Claude
2. Generar documento como artefacto
3. Hacer clic en el botón de descarga de PDF
4. PDF perfecto completado ✅

Era realmente simple y perfecto. Tan conveniente al hacer notas de lanzamiento o documentos técnicos.

**Después de la introducción de Skills (roto):**
1. Trabajar en Claude Code
2. Intentar generar PDF con Skills
3. Falla o la salida se rompe 😤
4. Todavía inestable al reintentar

"¿Por qué cambiaron lo que estaba funcionando bien y lo rompieron?"

Esto sucedió no solo una o dos veces, así que al final, **dejé de usar Skills**. Era más rápido simplemente hacerlo como un artefacto en Claude web y copiarlo.

**Conclusión: Terminé sin usar ni Subagents ni Skills en la práctica**

## El Problema Real Era Otra Cosa

Descubrí un problema mucho más serio que Subagents o Skills.

### Contaminación del Contexto

**Esto sucede cuando las conversaciones se alargan:**

Yo: "Nunca implementes esta función con el método X. Debes usar el método Y."

Claude: "¡Sí, entiendo! Lo haré con el método Y."

*10 minutos después...*

Claude: *(Envía código implementado con el método X)*

Yo: "...???"

**Aunque claramente instruí Qué Hacer y Qué No Hacer**, cuando las conversaciones se alargan, **maneja las cosas como quiere** muy a menudo.

Al principio pensé, "¿No expliqué correctamente?" pero cosas similares seguían sucediendo.

**Caso real que experimenté:**

```
Yo: "Las actualizaciones de Core Data solo deben hacerse en MainContext.
     Hacerlo en Background causará fallos."

Claude: "¡Sí, usaré MainContext!"

[30 minutos después]

Claude: "¡Código completado que actualiza Core Data en Background!"

Yo: "...Dije MainContext antes 😤"
```

Era realmente frustrante.

### Compact Conversation Tampoco Es Perfecto

Podrías pensar, "¿Entonces no puedes simplemente usar Compact Conversation?"

Las primeras dos veces estuvieron bien. Definitivamente sentí que la conversación estaba siendo organizada.

**Pero mientras seguía usándola, aparecieron problemas:**

- Primer Compact: "¿Oh, esto está bien organizado?"
- Segundo Compact: "Hmm... ¿parece que algo se redujo?"
- Tercer Compact: "¿Eh? ¿A dónde fue lo que enfaticé?"
- Cuarto Compact: "...¿Qué dije de nuevo?"

**La caja negra es el problema:**
- No puedo ver directamente qué conservó la IA y qué eliminó
- Las instrucciones importantes **se diluyen gradualmente** a través de múltiples compresiones
- Resulta en un comportamiento diferente de la intención

Por ejemplo:
- Inicialmente incluye "Nunca hagas X"
- Después de 2-3 Compacts: Esta instrucción se desprioriza
- Después de 4-5 Compacts: Desaparece completamente
- Solo quedan conversaciones de ejemplo menos importantes

Es como pedirle a múltiples personas que resuman notas de reuniones importantes una tras otra, y al final, los puntos clave se han ido y solo queda contenido secundario.

Compact Conversation en sí no es malo. **Pero cuando se usa repetidamente en sesiones de trabajo largas, el contexto se distorsiona gradualmente**.

### ¿Por Qué Estaba Tan Frustrado?

Después de pensarlo, me di cuenta.

"Oh, **el contexto se estaba contaminando**"

A medida que las conversaciones se alargan:
- ✅ Las instrucciones iniciales se diluyen
- ✅ Las conversaciones intermedias actúan como ruido
- ✅ Se enfoca solo en conversaciones recientes
- ✅ Resultado: Comportamiento inconsistente

Este fue el mayor problema que sentí durante el mes y medio.

Ya sea usar o no las últimas funciones (Subagents, Skills), **la gestión del contexto** era mucho más importante.

## Mi Solución

Esto es lo que encontré después de mucho ensayo y error.

### Flujo de Trabajo Clear + CLAUDE.md

**Así es como trabajo:**

1. **Antes de empezar el trabajo**: comando `/clear` (empezar con estado limpio)
2. **Cargar CLAUDE.md**: Cargar solo el contexto que definí
3. **Proceder con el trabajo**: Bajo instrucciones claras
4. **Después de completar el trabajo**: `/clear` de nuevo
5. **Siguiente tarea**: Empezar de nuevo con CLAUDE.md

En lugar de dejarlo a Compact Conversation, **yo mismo reinicio el contexto directamente**.

### ¿Por Qué CLAUDE.md?

Claude también tiene una función de proyecto, ¿verdad? Puedes definir pre-contexto.

Pero **CLAUDE.md es mucho más conveniente:**

| | Proyectos Claude | CLAUDE.md |
|---|---|---|
| Gestión | Solo en UI web | En editor de código |
| Control de versiones | Difícil | Posible con Git |
| Compartir en equipo | Engorroso | Hecho con compartir archivo |
| Actualizaciones | Entrada manual cada vez | Solo editar archivo |
| Persistencia | Una vez | A lo largo del proyecto |

Lo más importante, **poder estructurar y actualizar fácilmente lo que pienso o quiero hacer** es la mayor ventaja.

"Oh, debería agregar esta parte" → Abrir archivo, editar → Guardar → ¡Listo!

### Definir Patrones de Trabajo Repetitivos

Defino cosas como esta en CLAUDE.md:
- Reglas de creación de diagramas (formato Mermaid)
- Plantillas de notas de lanzamiento
- Estructura de documento de diseño
- Guía de estilo de codificación
- Reglas de comunicación

**¡Define una vez y sigue reutilizando!**

Por ejemplo, cada vez que haces un diagrama de secuencia con Mermaid, sale consistentemente en el mismo formato. No necesitas explicar "dibújalo así, dibújalo asá" cada vez.

### ¿El Efecto?

- ✅ Cero contaminación del contexto
- ✅ Salida consistente
- ✅ Inicio rápido del trabajo
- ✅ Comportamiento predecible

Si dije "Nunca hagas X," realmente no lo hace. Porque no hay posibilidad de olvidar a medida que las conversaciones se alargan. Empezamos con un estado limpio basado en CLAUDE.md cada vez.

**Por supuesto, gestionar CLAUDE.md también es importante.**

Si excede cientos de líneas, surge otro problema. Si vas "¡Escribamos todo!" y llegas a 300 líneas... La IA también se confunde.

Cubriré esto en detalle **en la próxima publicación**! Cómo gestionar eficientemente CLAUDE.md, estrategias para mantenerlo bajo 100 líneas, etc.

## Más Allá del Desarrollo

Y hubo otro descubrimiento importante.

### Anteriormente Solo Pensaba en "Codificación"

"Claude Code = Herramienta de escritura de código"

Solo pensaba así.

### Ahora Lo Uso Así

- ✅ Escribir documentos de diseño
- ✅ Generar notas de lanzamiento
- ✅ Diagramas de estado (Mermaid)
- ✅ Diagramas de secuencia (Mermaid)
- ✅ Materiales de comunicación de equipo

Especialmente en el trabajo, creo muchos **diagramas para comunicación**.

### Descubrimiento de Mermaid

Solía tener esta idea fija:

"Para hacer diagramas, necesito abrir PowerPoint o draw.io"

Pero después de hacer diagramas Mermaid con Claude Code... **¡la calidad está más allá de las expectativas!**

**Por ejemplo, diagramas de secuencia:**

"Haz un diagrama de secuencia del proceso de inicio de sesión"

→ Completado en segundos
→ Si se necesitan modificaciones, solo corrige el texto
→ Control de versiones con Git
→ Fácil de compartir con miembros del equipo

Habría tomado 30 minutos con PowerPoint. Dibujando cada flecha, alineando, eligiendo colores...

**Ahora no hay necesidad de eso.**

También cubriré esto en detalle en la próxima serie. ¡Qué diagramas hacer con Mermaid y cómo, incluyendo consejos prácticos!

## Lo Que Aprendí en un Mes y Medio

Las últimas funciones no siempre son la respuesta.

- **Subagents**: Bueno pero problemas de costo
- **Skills**: Todavía inestable
- **Compact Conversation**: Caja negra

**La gestión del contexto era realmente importante.**

Simplemente usando adecuadamente Clear + CLAUDE.md, la calidad de la colaboración con IA cambia dramáticamente.

Y ahora estoy usando Claude Code como **un socio para todos los aspectos del trabajo**, no solo una "herramienta de codificación". Desde diseño hasta documentación y comunicación.

## Vista Previa de la Próxima Publicación

**"Guía Práctica de CLAUDE.md - Antes de Que Se Convierta en un Monstruo de Cientos de Líneas"**

- Estructuración eficiente de CLAUDE.md
- Estrategia para mantener el objetivo de 100 líneas
- Plantillas específicas para fases de análisis/diseño
- Métodos de gestión específicos del proyecto
- Divulgación de plantillas del mundo real

CLAUDE.md también puede convertirse en un monstruo de cientos de líneas si se usa incorrectamente. ¡Compartiré los resultados de pensar en cómo gestionarlo!

**"Revolución de Comunicación con Mermaid - Aplicación Práctica de Diagramas"**

- Casos de uso, secuencia, diagramas de estado
- Visualización de arquitectura (Modelo C4)
- Rompiendo la idea fija de que "necesito hacer imágenes"
- 30 minutos → 1 minuto con Claude Code

¡He preparado una serie de 3 partes así!

## 📱 Por Favor Sigue Amando TipSmart

Tomé un descanso del blog por un mes y medio, ¡pero seguí operando TipSmart!

La primera aplicación hecha con Claude Code, todavía funcionando bien. 😊

También trabajé mucho más eficientemente usando este flujo de trabajo CLAUDE.md + Clear al desarrollar.

**[Descargar TipSmart de App Store](https://apps.apple.com/app/tipsmart-tip-calculator/id6749946714)** 📱

---

*¡Gracias por darle la bienvenida a LISA después de un mes y medio!*
*¿También estás experimentando problemas de contaminación del contexto? ¡Por favor comparte tus experiencias en los comentarios!*
