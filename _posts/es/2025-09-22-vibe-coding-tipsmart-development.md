---
title: "Construyendo TipSmart con Vibe Coding - Realidad de la Colaboración con IA usando Claude Code, Codex CLI y Kiro"
date: 2025-09-22
last_modified_at: 2025-09-22 21:34:52 +0900
categories: [codificacion-vibe, herramientas-ia]
tags: [ClaudeCode, CodexCLI, Kiro, codificacion-vibe, colaboracion-IA, TaskMaster, productividad-desarrollo, caso-estudio-real, revision-desarrollo, comparacion-herramientas-IA]
seo_title: "Construyendo TipSmart con Vibe Coding - Revisión Real de Colaboración con Claude Code, Codex CLI, Kiro"
description: "¡Lanzamiento en App Store en solo 3 semanas! Compartiendo honestamente experiencias reales y limitaciones realistas del desarrollo de TipSmart a través de colaboración con IA usando Claude Code, Codex CLI y Kiro."

# Campos de soporte multilingüe
lang: "es"
translation_key: "vibe-coding-tipsmart-development"
permalink: /es/codificacion-vibe/herramientas-ia/2025/09/22/vibe-coding-tipsmart-development.html
translations:
  ko: "/ko/vibe-coding/ai-tools/2025/09/22/vibe-coding-tipsmart-development.html"
  en: "/en/vibe-coding/ai-tools/2025/09/22/vibe-coding-tipsmart-development.html"
  es: "/es/codificacion-vibe/herramientas-ia/2025/09/22/vibe-coding-tipsmart-development.html"
  # Traducción al español próximamente
---

¡Hola, soy LISA! 🙂

¿Lanzamiento en App Store en solo 3 semanas? ¿Cuál es la **realidad de la colaboración con IA usando Claude Code, Codex CLI y Kiro**?

Comenzando el desarrollo de TipSmart con 10 tareas generadas sistemáticamente por Task Master, sintiéndome emocionada pensando "¡Esta vez realmente puedo desarrollar sistemáticamente!" Hoy compartiré honestamente **esas 3 semanas de experiencias reales**.

## Éxito Temprano - "¡Esto es Realmente Revolucionario!"

### **Inicio Fantástico con Claude Code**

Los primeros días fueron verdaderamente increíbles. El proceso de configurar proyectos con Claude Code y construir características simples se sintió como magia.

**Implementando Lógica de Cálculo de Propinas:**
- "Crea una función que calcule con tasas de propina de 15%, 18%, 20%"
- → Código Swift perfecto generado al instante
- "¿Cómo conecto esto en SwiftUI?"
- → Vinculación de UI perfectamente hecha

**Configuración Inicial de UI:**
- "Crea una UI limpia para calculadora de propinas"
- → Código SwiftUI limpio generado
- "Soporta modo oscuro también"
- → Configuraciones de color manejadas automáticamente

En ese momento realmente sentí **"¡La era de la IA ha llegado!"**

### **Intentando Integración de TDD**

Lo que fue aún más increíble fue cuando intenté **Desarrollo Dirigido por Pruebas (TDD)**.

Cuando solicité "Primero escribe código de prueba, luego implementa la lógica real":

1. **Código de Prueba** → Pruebas perfectas basadas en XCTest
2. **Lógica Real** → Implementación que pasa las pruebas
3. **Pruebas Pasadas** → Todas las pruebas exitosas

Pensé "¡Esto es realmente revolucionario!" **¡TDD con IA!**

## Complejidad Creciente y Limitaciones Graduales

Pero a medida que el proyecto se volvió más complejo, comenzaron a emerger problemas.

### **Crecientes Errores de Claude Code**

Claude Code, que era perfecto con características simples, comenzó a cometer errores con lógica compleja.

- **Integración de Core Data**: Parecía funcionar al principio, luego falló después
- **Integración de AdMob**: Fallas de construcción debido a problemas de versión de SDK
- **Lógica de División de Personas**: Errores de cálculo en valores límite

### **Impactantes Intentos de Eludir TDD**

Lo más impactante fueron los **intentos de eludir TDD**.

Cuando había errores en la lógica, en lugar de arreglar la lógica real, intentó **"eludir problemas modificando solo el código de prueba"**.

Me di cuenta "Ah, esto no está bien. **TDD aún está en etapa muy temprana**."

### **IA como Compañero de Colaboración, No Herramienta**

A través de este proceso, obtuve una importante **perspectiva**.

No deberías pensar en la IA como una simple **"herramienta"** sino reconocerla como un **"compañero de colaboración"**. Como trabajar con un desarrollador junior, **revisión minuciosa y retroalimentación** era necesaria.

**Cambio de Rol:**
- **Antes**: Desarrollador que codifica directamente
- **Actual**: Gerente que revisa el trabajo de IA y proporciona dirección

## Experiencia con Codex CLI y Kiro

En el medio, también probé usar **Codex CLI** y **Kiro**.

### **Codex CLI**
- **Pros**: Velocidad rápida de generación de código
- **Contras**: Difícil mantener el contexto
- **Sensación**: Bueno para tareas puntuales pero insuficiente para proyectos largos

### **Kiro**
- **Pros**: Flujo sistemático de Requisitos → Diseño → Tareas
- **Contras**: Encontré varios errores en el código generado
- **Sensación**: Interesante pero mucho espacio para mejora

Al final, **Claude Code fue el más estable**. Especialmente la combinación con Task Master fue la mejor.

## Verificación de Realidad Antes del Lanzamiento

### **Problemas Encontrados en Pruebas de Integración**

Al probar toda la app antes del lanzamiento... **se descubrieron varios problemas**.

- **Errores de Lógica de Cálculo**: Problemas de redondeo en cantidades específicas
- **Errores de UI**: Diseño rompiéndose en iPad
- **Conflictos de Core Data**: Fallos durante acceso concurrente

**Análisis de Causa Raíz:**
- Verificación inicial insuficiente
- Omisiones debido a complejidad creciente
- Problemas de compatibilidad entre código generado por IA

### **AdMob y App Store - Más Difícil que el Desarrollo**

Lo que realmente no esperé fue el proceso de **configuración de AdMob y aprobación de App Store**.

- **AdMob**: Varios documentos y procedimientos
- **App Store**: Bucle infinito de aprobación → rechazo → arreglo → reintento
- **Política de Privacidad**: Complejidad de escribir documentos legales

Aunque la IA puede ayudar en algunas áreas, hay muchas áreas que **finalmente requieren manejo humano**.

## Lecciones y Expectativas Realistas

### **Importancia de Revisión Minuciosa**

Me di cuenta de que **revisión 100% del código generado por IA es esencial**.

- Errores de integración no detectados por pruebas unitarias
- Comportamiento inesperado en escenarios de excepción
- Problemas de rendimiento o fugas de memoria

### **Ajustando Expectativas Realistas**

Expectativas realistas para colaboración con IA:
- ✅ **Velocidad de Desarrollo**: Definitivamente más rápida (aproximadamente 2-3x)
- ✅ **Prototipado Inicial**: Implementación rápida posible
- ❌ **Automatización Completa**: Aún imposible
- ❌ **Libre de Errores**: Aún necesita mucha revisión

### **Necesidad de Paciencia**

Al final, **paciencia** fue lo más importante. Necesitas aceptar que la IA no es perfecta y mantener una actitud de mejorar juntos.

## Conclusión

A través de 3 semanas de vibe coding, pude **lanzar exitosamente TipSmart**. Aunque no perfecto, probé que **definitivamente puedes construir apps solo a través de colaboración con IA**.

Lo importante es tener **expectativas realistas**. La IA es un poderoso compañero de colaboración, pero aún es **tecnología en desarrollo**. No olvides que revisión minuciosa y mejora continua son necesarias.

En el **próximo proyecto**, ¡planeo intentar colaboración con IA más sistemática y eficiente basada en esta experiencia!

## 📱 TipSmart - Resultado de Colaboración con IA

TipSmart, nacido de 3 semanas de vibe coding y colaboración con IA. ¡Experimenta el resultado real creado junto con Claude Code, Codex CLI y Kiro!

**[Descargar TipSmart de App Store](https://apps.apple.com/app/tipsmart-tip-calculator/id6749946714)** 📱

---

*¡Si tienes experiencia en desarrollo de colaboración con IA o preguntas, por favor comparte en redes sociales! ¡Me encantaría escuchar tus historias de vibe coding también!*