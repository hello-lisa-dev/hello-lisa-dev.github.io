---
title: "Mi Primera Experiencia con Kiro Editor - ¡Finalmente Salí de la Lista de Espera!"
date: 2025-09-09
last_modified_at: 2025-09-09 17:40:00 +0900
categories: [codificacion-vibe, herramientas-ia]
tags: [Kiro, EditorKiro, AWS, DesarrolloIA, DesarrolloWeb, CodificacionVibe, ModoSpec, Cursor, Claude, Codex, Gemini, ColaboracionIA, EntornoDesarrollo]
seo_title: "Mi Primera Experiencia con Kiro Editor - Reseña de la Nueva Herramienta de Desarrollo IA de AWS"
description: "¡Finalmente pude probar Kiro Editor después de estar en lista de espera desde julio! Comparto mi experiencia detallada con los modos de desarrollo Vibe y Spec y su proceso sistemático."

# 다국어 지원 필드
lang: "es"
translation_key: "kiro-editor-first-experience"
permalink: /es/codificacion-vibe/herramientas-ia/2025/09/09/kiro-editor-first-experience.html
translations:
  ko: "/ko/vibe-coding/ai-tools/2025/09/09/kiro-editor-first-experience.html"
  en: "/en/vibe-coding/ai-tools/2025/09/09/kiro-editor-first-experience.html"
  es: "/es/codificacion-vibe/herramientas-ia/2025/09/09/kiro-editor-first-experience.html"
---

¡Hola, soy LISA! 🙂

Hoy, en lugar de la experiencia con Task Master que planeaba compartir originalmente, ¡les traigo **una historia emocionante sobre una nueva herramienta de desarrollo IA que acabo de probar**!

## ¡Finalmente Salí de la Lista de Espera de Kiro! 🎉

¡Recibí mi código de activación para **Kiro Editor** que solicité en julio! Estaba tan emocionada que me lancé directamente y... **¡wow, esto es absolutamente increíble!**

### ¿Qué es Kiro?

Kiro es **una herramienta de desarrollo IA hecha por AWS**. A diferencia de otras herramientas IA, ofrece dos enfoques de desarrollo diferentes:

1. **Modo Vibe**: Desarrollo fluido e improvisacional (¡la codificación vibe que conocemos y amamos!)
2. **Modo Spec**: Desarrollo sistemático y paso a paso (¡el modo que probé hoy!)

Usé el **Modo Spec** esta vez para construir soporte multilingüe para mi blog.

## Primera Experiencia: Ingresando el Prompt

![Primer Prompt de Kiro](/assets/images/kido/01_fire_prompt.png)

Inicialmente, lo mantuve simple. Escribí algo como "Agregar soporte multilingüe al blog Jekyll."

Pero entonces Kiro me dijo **"Espera, primero aclaremos exactamente qué quieres, ¿te parece?"** ¡e inmediatamente pasó a la fase de recopilación de requisitos!

## Organizando Requisitos Sistemáticamente

![Documento de Requisitos](/assets/images/kido/02_requirements.png)

Esto fue genuinamente sorprendente. Kiro tomó mi solicitud vaga y la convirtió en:

### **Requisito 1: Visualización de Posts por Idioma**
- Los usuarios pueden ver posts del blog en su idioma preferido
- El idioma predeterminado es coreano, recurrir a la versión coreana si no existe traducción
- Mantener el mismo contexto de post/página

### **Requisito 2: Funcionalidad de Cambio de Idioma**  
- Mostrar selector de idioma en la navegación
- Al hacer clic en un idioma, cambiar toda la interfaz del sitio
- Navegar a la versión traducida manteniendo el contexto de la página actual

### **Requisito 3: Soporte para Traducción IA**
- Agregar traducciones IA a posts existentes en coreano
- Gestionar como archivos de traducción separados
- Edición independiente para cada idioma

¡Bastante sistemático, ¿verdad? ¡Dije "agregar soporte multilingüe" en una oración, y lo desglosó de manera tan integral!

## ¡El Feedback en Tiempo Real También es Perfecto!

![Feedback de Requisitos](/assets/images/kido/03_requirements_feedback.png)

Cuando miré los requisitos y pensé "hmm, me gustaría hacer esto diferente," di feedback y **actualizó todo inmediatamente**.

Cuando usaba Task Master, este tipo de feedback en tiempo real era algo limitado, pero con Kiro, puedes refinar naturalmente los requisitos a través de la conversación, lo cual fue genial.

## ¡La Fase de Diseño es Súper Detallada!

![Documento de Diseño 1](/assets/images/kido/04_design_part1.png)

Una vez que los requisitos se finalizan, inmediatamente pasa a la fase de diseño, ¡y esto es **tan detallado como si un desarrollador real lo hubiera diseñado**!

### **Estrategia de Soporte de Idiomas**
- Enfoque basado en archivos con parámetros URL
- Original en coreano: `_posts/2025-09-06-what-is-vibe-coding.md`
- Traducción al inglés: `_posts/en/2025-09-06-what-is-vibe-coding.md`  
- Traducción al español: `_posts/es/2025-09-06-what-is-vibe-coding.md`

### **Estructura URL**
- Predeterminado (Coreano): `/바이브코딩/2025/09/06/what-is-vibe-coding/`
- Inglés: `/바이브코딩/2025/09/06/what-is-vibe-coding/?lang=en`
- Español: `/바이브코딩/2025/09/06/what-is-vibe-coding/?lang=es`

¡Presenta **métodos de implementación concretos** así!

## Muestra Código y Modelado por Adelantado

![Código del Documento de Diseño](/assets/images/kido/04_design_part2_code.png)

El documento de diseño incluso muestra **el código real que será implementado**:

```html
<div class="language-switcher">
  <div class="language-dropdown">
    <button class="language-current" id="languageToggle">
      <span class="flag" id="currentFlag">🇰🇷</span>
      <span class="name" id="currentLang">한국어</span>
      <span class="arrow">▼</span>
    </button>
    <div class="language-options" id="languageOptions">
      <!-- Generado dinámicamente con JavaScript -->
    </div>
  </div>
</div>
```

![Modelo del Documento de Diseño](/assets/images/kido/04_design_part3_model.png)

También diseña precisamente la estructura del Front Matter:

```yaml
---
title: "¿Qué es la Codificación Vibe? - Un Nuevo Enfoque de Desarrollo en la Era IA"
date: 2025-09-06
# Campos de soporte multilingüe
lang: "ko"
translation_key: "what-is-vibe-coding"
translations:
  en: "/posts/en/2025-09-06-what-is-vibe-coding/"
  es: "/posts/es/2025-09-06-what-is-vibe-coding/"
---
```

## ¡Mucho Más Sistemático que Task Master!

Honestamente, me sentí **mucho más confiada que cuando usaba Task Master**.

### **Aspecto Más Impresionante: Integración Orgánica**

Task Master:
- Toma PRD y crea un montón de tareas
- Lanza cada tarea a Claude Code  
- Cuando surgen problemas, es como "hmm... déjame intentar de nuevo"

Modo Spec de Kiro:
- **Requirements → Design → Tasks están completamente conectados**
- **Cuando los requisitos cambian, el diseño se actualiza automáticamente**
- **El contenido del diseño se convierte directamente en tareas**
- **Todas las fases se gestionan consistentemente**

¡Esta es **realmente una diferencia enorme**! Task Master se sentía como si cada herramienta trabajara por separado, pero Kiro se siente como si todo estuviera conectado y funcionando dentro de un sistema.

Antes de comenzar el trabajo, puedes ver claramente **"ah, así es como se va a hacer"** lo cual es tranquilizador.

## Vista Previa del Próximo Post

En el próximo post, compartiré:
- **Proceso real de ejecución de Tasks** (cómo procede el desarrollo)
- **Resultados completados y pruebas**
- **Comparación con Cursor, Claude Code**
- **Resumen completo de pros y contras**

La parte de ejecución de Tasks aún está por venir, ¡y ahí es donde **la conectividad de Requirements-Design-Tasks** realmente brilla! ¡Además de **pruebas automáticas**!

## 📱 ¡También Sigan Amando TipSmart!

¡No olviden mi primera app hecha con herramientas IA existentes! Mientras exploro nuevas herramientas, el feedback sobre el trabajo existente siempre es precioso 😊

**[Descargar TipSmart de App Store](https://apps.apple.com/app/tipsmart-tip-calculator/id6749946714)** 📱

---

*¡Si este post fue útil, por favor compártelo en redes sociales! ¡Ayudará a otros que tienen curiosidad sobre Kiro Editor!*