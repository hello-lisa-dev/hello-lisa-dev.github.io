---
title: "Construyendo la Base de la App con Un PRD - Guía Práctica de Uso de Task Master"
date: 2025-09-15
last_modified_at: 2025-09-15 16:00:00 +0900
categories: [codificacion-vibe, herramientas-ia]
tags: [TaskMaster, escritura-PRD, generacion-automatica-tareas, Claude, desarrollo-IA, planificacion-proyectos, codificacion-vibe, colaboracion-IA, descomposicion-tareas, analisis-complejidad, gestion-dependencias]
seo_title: "De la Escritura de PRD a la Generación de Tareas de Task Master - Guía Práctica"
description: "Revelando el proceso completo de escribir PRDs con Claude y generar automáticamente 10 tareas con Task Master usando el caso real de desarrollo de TipSmart."

# Campos de soporte multilingüe
lang: "es"
translation_key: "task-master-prd-to-tasks"
permalink: /es/codificacion-vibe/herramientas-ia/2025/09/15/task-master-prd-to-tasks.html
translations:
  ko: "/ko/vibe-coding/ai-tools/2025/09/15/task-master-prd-to-tasks.html"
  en: "/en/vibe-coding/ai-tools/2025/09/15/task-master-prd-to-tasks.html"
  es: "/es/codificacion-vibe/herramientas-ia/2025/09/15/task-master-prd-to-tasks.html"
---

¡Hola, soy LISA! 🙂

En [mi último post](/es/codificacion-vibe/herramientas-ia/2025/09/15/task-master-discovery.html), hablé sobre cómo descubrí Task Master. ¡Hoy compartiré **cómo usarlo realmente** en detalle!

El **proceso de escritura de PRD** resultó ser más importante de lo que pensé. Si haces esta parte descuidadamente, la calidad de las tareas generadas sufre después.

## Paso 1: Comenzando la Escritura Sistemática de PRD

Al desarrollar TipSmart, tomé un **enfoque sistemático**.

**Le pedí a Claude así:**
> "Quiero crear un PRD para el desarrollo de servicios. Por favor hazme las preguntas necesarias basándote en el PRD de muestra y escribe un PRD basado en eso."

Y **adjunté el archivo example_prd.txt**.

¡De esta manera, en lugar de que Claude hiciera preguntas aleatorias, preguntó **sistemáticamente basándose en el formato de muestra**!

## Paso 2: Tormenta de Preguntas de Claude - ¡Esto es Clave!

Entonces Claude comenzó a lanzarme **preguntas realmente sistemáticas**.

### **6 Categorías de Preguntas que Recibí:**

#### **1. Preguntas de Visión General:**
- "¿Cuál es el nombre y la descripción breve del servicio que quieres desarrollar?"
- "¿Cuál es el problema principal que este servicio busca resolver?"
- "¿Quiénes son los usuarios objetivo principales?"
- "¿Cuál es la propuesta de valor que lo diferencia de los servicios competidores?"

#### **2. Preguntas de Características Principales:**
- "¿Cuáles son las 3-5 características principales de este servicio?"
- "¿Cómo priorizarías cada característica? (alta/media/baja)"
- "¿Cuál es el valor principal que estas características proporcionan a los usuarios?"

#### **3. Preguntas de Experiencia de Usuario:**
- "¿Cómo definirías las principales personas usuarias (2-3)?"
- "¿Cuál es el flujo de usuario más importante dentro del servicio?"
- "¿Hay alguna consideración especial para el diseño UI/UX?"

#### **4. Preguntas de Arquitectura Técnica:**
- "¿Qué stack tecnológico se necesita para implementar el servicio?"
- "¿Hay alguna API externa o servicios que necesiten integración?"
- "¿Cuáles son los componentes principales del modelo de datos?"

#### **5. Preguntas de Hoja de Ruta de Desarrollo:**
- "¿Qué características deben incluirse en el MVP?"
- "¿Cuáles son algunas características futuras expandibles?"
- "¿Cómo planeas dividir las fases de desarrollo?"

#### **6. Preguntas de Factores de Riesgo y Respuesta:**
- "¿Cuáles son los principales desafíos técnicos esperados durante el desarrollo del servicio?"
- "¿Qué problemas potenciales crees que podrían surgir después del lanzamiento del servicio?"
- "¿Cuáles son tus estrategias de respuesta para estos factores de riesgo?"

### **Las Respuestas Determinan la Calidad del PRD**

¡**Qué tan minuciosamente respondas** fue realmente importante aquí!

Al principio respondí casualmente como "Oh, lo que sea..." pero el PRD resultante era demasiado vago.

**Ejemplos de Respuestas Reales del Desarrollo de TipSmart:**

#### **1. Respuestas de Visión General:**
> **Nombre del Servicio**: "TipSmart - Calculadora de Propinas Inteligente"  
> **Problema Resuelto**: "Cálculo de propinas complejo y que consume tiempo y división por personas en restaurantes"  
> **Usuarios Objetivo**: "Trabajadores de oficina de 20-40 años que necesitan cálculos rápidos después de cenar con colegas"  
> **Diferenciación**: "Cálculo completado en 3 segundos, UI intuitiva, consideración por la cultura de propinas coreana"

#### **2. Prioridades de Características Principales:**
> **Alta**: Cálculo básico de propinas, división por personas  
> **Media**: Historial de cálculos, características de configuración  
> **Baja**: Widgets, integración con Apple Watch  

#### **3. Stack Tecnológico:**
> **Plataforma**: iOS 15+, SwiftUI  
> **Arquitectura**: patrón MVVM  
> **Datos**: Core Data (almacenamiento local)  
> **Monetización**: AdMob + Compra In-App

Mientras más **específico y detallado** respondía, mejor se volvía la calidad del PRD y las tareas resultantes.

## Paso 3: Múltiples Rondas de Revisión

Cuando salió el primer PRD... **no estaba satisfecha**.

- Contenido demasiado genérico y obvio
- Sin dirección específica de implementación
- Faltaban restricciones técnicas

Así que **seguí pidiendo revisiones**:

> "Escribe escenarios de usuario más específicamente"
> "Especifica stack tecnológico y arquitectura"  
> "Establece prioridades para cada característica también"

Lo revisé **aproximadamente 3-4 veces**. Durante este proceso, descubrí muchas partes en las que no había pensado.

## Paso 4: Aplicando el Formato example_prd.txt

Cuando surgió contenido satisfactorio, pedí reescribir para que coincidiera con **el formato example_prd.txt que adjunté inicialmente**.

```
Ahora reescribe esto para que coincida con el formato example_prd.txt que adjunté inicialmente. 
Y mantén la longitud total bajo 150 líneas.
```

### **Por Qué Establecí la Restricción de 150 Líneas**

Esta parte es importante:

✅ **Rendimiento de Procesamiento de Task Master**: PRDs demasiado largos podrían no analizarse apropiadamente  
✅ **Ahorro de Costos de API**: Aumenta el uso de tokens de la API de Claude  
✅ **Enfoque**: Contener solo lo esencial crea generación de tareas más clara  

Realmente probé con un PRD de más de 200 líneas inicialmente y obtuve tareas extrañas generadas.

### **PRD de TipSmart Completado Real (Divulgación Parcial)**

Aquí está parte del PRD real que salió en formato example_prd.txt:

```markdown
TipSmart - Documento de Requisitos del Producto

Visión General
TipSmart es una calculadora de propinas inteligente para viajeros internacionales que visitan EE.UU. 
Ayuda a usuarios no familiarizados con la cultura local de propinas a calcular propinas apropiadas 
y aprender etiqueta regional. Objetivo de ingresos mensuales: $500+ para app iOS.

Características Principales
1. Calculadora de Propinas Inteligente
   Función: Entrada de cantidad → Selección de % de propina → Visualización de total/propina
   Valor: Cálculo rápido y preciso previene errores sociales
   Implementación: Alternar pre/post-impuesto, botones 15/18/20/25%, redondeo

2. Guía Regional de Propinas
   Función: 5 ciudades principales × 4 categorías de servicio guía
   Valor: Aprender costumbres locales construye confianza
   Implementación: NYC/LA/Chicago/SF/Miami, restaurante/taxi/hotel/bar

3. División Simple de Cuenta
   Función: Auto-calcular cantidad por persona con entrada de número de personas
   Valor: Liquidación rápida para cenas grupales
   Implementación: 2-10 personas, división igual solamente
```

Como puedes ver, cada característica está claramente definida con estructura **Función → Valor → Implementación**. Así es como fue **organizado concisamente con solo lo esencial**.

## Ejecución de Task Master - ¡Finalmente!

Con el PRD listo, ahora es tiempo para **ejecución de Task Master**.

### **Configuración MCP**

Inicialmente me quedé atascada solo encontrando el archivo de configuración, pero era sorprendentemente simple:

1. **Configuración de Cursor** → Agregar servidor MCP
2. **Clave de API de Claude** establecida en variables de entorno
3. **Reiniciar** luego activar Task Master

### **Tensión de Primera Ejecución**

¡El momento en que ingresé el PRD de 150 líneas y **presioné el botón "Generar tareas"**!

"¿Realmente saldrán tareas apropiadas?"

El tiempo de espera se sintió realmente largo. 😅

## Resultados - ¡10 Tareas Generadas!

Y el resultado... ¡**realmente me asombré**!

![10 Tareas Generadas](/assets/images/20250916_02/generated-tasks.png)

### **Tareas Generadas (TipSmart)**

1. **Configuración del Proyecto con Arquitectura MVVM** (prioridad alta)
2. **Implementación del Modelo Core Data** (prioridad alta)  
3. **UI y Lógica de Calculadora de Propinas** (prioridad alta)
4. **Funcionalidad de División de Cuenta** (prioridad media)
5. **Implementación de Seguimiento de Historial** (prioridad media)
6. **Contenido y UI de Guía Regional de Propinas** (prioridad media)
7. **Implementación de Accesibilidad** (prioridad alta)
8. **Pulido de UI y Cumplimiento de HIG de iOS** (prioridad alta)
9. **Integración de AdMob** (prioridad baja)
10. **Preparación y Envío a App Store** (prioridad media)
11. **Mejoras de UX/UI para Características de Calculadora e Historial** (generado adicionalmente)

### **Partes Asombrosas**

#### **1. Asignación Automática de Prioridades**
**prioridad alta**: Características principales (configuración MVVM, lógica de cálculo, accesibilidad)  
**prioridad media**: Características adicionales (Historial, Guía Regional, app store)  
**prioridad baja**: Características de monetización (AdMob)

¡**Era exactamente el mismo orden que el desarrollo real!**

#### **2. Consideración de Dependencias**
Mirando la tabla de tareas, incluso mostraba de qué tareas depende cada tarea. Por ejemplo, "Implementación de Accesibilidad" estaba configurada para proceder después de completar las tareas 3, 4, 5, 6.

#### **3. Cosas que Casi Perdí**
"Implementación de Accesibilidad", "Cumplimiento de HIG de iOS" - no especifiqué estos en el PRD pero automáticamente los creó como tareas.

#### **4. Tareas Agregadas Durante el Desarrollo**
La 11ª tarea fue generada adicionalmente durante el progreso del desarrollo. Task Master puede expandir tareas según las situaciones.

## Inicio del Desarrollo - Subdivisión de Tareas

Al proceder realmente con cada tarea, las dividí en **4-5 subtareas** nuevamente.

Por ejemplo, la tarea "Integración de AdMob":
- Instalar y configurar SDK de AdMob
- Registrar App ID, Ad Unit ID  
- Componer UI de anuncio banner
- Lógica de carga y visualización de anuncios
- Manejo de errores y fallback

Subdividí así y las solicité una por una a Claude Code.

![Creación de Subtareas](/assets/images/20250916_02/subtask-creation.png)

## La Calidad del PRD es Realmente Importante

Por experiencia, **cuánto piensas durante la etapa de escritura del PRD** determina todo el proyecto.

### **Efectos de un PRD Bien Escrito:**
✅ Secuencia lógica de tareas  
✅ Incluye características que podrían perderse  
✅ Distribución apropiada de dificultad  
✅ Criterios claros de finalización  

### **Problemas con un PRD Escrito Descuidadamente:**
❌ Tareas vagas  
❌ Faltan características importantes  
❌ Secuencia aleatoria  
❌ Criterios ambiguos de finalización  

¡**Responder las preguntas de Claude minuciosamente es realmente importante!**

## Vista Previa del Próximo Artículo

En el próximo artículo, ¡hablaré honestamente sobre **qué cambios sentí durante el desarrollo real**!

- **De Programador a Gerente**: Sentimiento real del cambio de rol
- **Velocidad de Desarrollo vs Calidad del Código**: Análisis de trade-off
- **Pros y Contras de Task Master**: Revisión de uso de 4 meses
- **Objetivos de Recomendación**: Quién lo encontraría útil

¡Realmente fue una experiencia que cambió el patrón de desarrollo mismo!

## 📱 TipSmart - Resultado de Planificación Sistemática

¿No tienes curiosidad sobre TipSmart, hecho con escritura tan meticulosa de PRD y gestión de tareas de Task Master?

Es una app completada con aproximadamente 50 tareas detalladas comenzando desde un PRD de 150 líneas. ¡**Experimenta el poder de la planificación sistemática** de primera mano!

**[Descargar TipSmart de App Store](https://apps.apple.com/app/tipsmart-tip-calculator/id6749946714)** 📱

---

*¡Si te atascas durante la escritura del PRD, por favor pregunta en los comentarios! ¡También compartiré consejos sobre cómo responder las preguntas de Claude!*