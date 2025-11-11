---
title: "Guía Práctica de CLAUDE.md - Antes de Que Se Convierta en un Monstruo de Cientos de Líneas"
date: 2025-11-11
last_modified_at: 2025-11-11 19:22:14 +0900
categories: [CodificaciónVibe, HerramientasIA]
tags: [CLAUDE.md, ClaudeCode, GestiónContexto, GestiónProyectos, ColaboraciónIA, EstructuraciónDocumentos, ProductividadDesarrollo, Plantillas, MejoresPrácticas, DocumentosDiseño]
seo_title: "Estrategia de Gestión de CLAUDE.md - Estructuración Eficiente y Plantillas Prácticas"
description: "¡Antes de que CLAUDE.md se convierta en un monstruo de cientos de líneas! Divulgando know-how práctico desde estructuración eficiente, gestión específica de proyectos, hasta creación de entregables de análisis/diseño."

# Campos de soporte multilingüe
lang: "es"
translation_key: "claude-md-best-practices"
permalink: /es/vibe-coding/ai-tools/2025/11/11/claude-md-best-practices.html
translations:
  ko: "/ko/vibe-coding/ai-tools/2025/11/11/claude-md-best-practices.html"
  en: "/en/vibe-coding/ai-tools/2025/11/11/claude-md-best-practices.html"
  es: "/es/vibe-coding/ai-tools/2025/11/11/claude-md-best-practices.html"
---

¡Hola, soy LISA! 🙂

En [la publicación anterior]({{ site.baseurl }}{% post_url es/2025-11-11-claude-code-context-management %}), dije que resolví la contaminación del contexto con "Clear + CLAUDE.md".

Pero... **CLAUDE.md en sí mismo puede convertirse en otro problema**.

"¡Si es bueno, pongamos todo!"
→ De repente 300 líneas
→ La IA también se confunde
→ Eventualmente se convierte en archivo inutilizable

Esta vez compartiré know-how práctico sobre **cómo gestionar CLAUDE.md**!

## Cómo CLAUDE.md Se Convierte en un Monstruo

### Semana 1: Los Días Inocentes

```markdown
# CLAUDE.md

Este es mi proyecto.
Usar TypeScript.
Seguir reglas ESLint.
```

**20 líneas, ¡perfecto!**

### Semana 2: Agregando Gradualmente

```markdown
# CLAUDE.md

## Descripción del Proyecto
...

## Estilo de Codificación
...

## Directrices de API
...

## Reglas de Pruebas
...
```

**50 líneas, todavía bien.**

### Semana 4: Crecimiento a Gran Escala

- Agregar reglas al agregar nuevas funciones
- "Debería especificar esto también", "Escribamos eso también"
- Agregar reglas de excepción debido a errores específicos
- Agregar notas "No hagas esto la próxima vez"

**150 líneas, ¿un poco largo?**

### Mes 2: Monstruo Completo

- El desplazamiento nunca termina
- No sé dónde está qué
- La IA no puede captar adecuadamente todo
- Eventualmente revertir a conversaciones cortas

**300 líneas, está arruinado...** 😅

## ¿Por Qué un CLAUDE.md Largo Es un Problema?

### 1. La IA Tampoco Puede Leerlo Todo

- Límites de tokens
- No puede distinguir partes importantes de partes menos importantes
- Eventualmente se enfoca solo en el principio

### 2. Infierno de Mantenimiento

- No sé dónde está qué
- Mismo contenido duplicado en múltiples lugares
- Perder partes al actualizar

### 3. Prioridades Poco Claras

- Todo parece del mismo nivel
- Las cosas realmente importantes se entierran

### 4. Sin Diferencias Específicas del Proyecto

- Reglas del Proyecto A
- Reglas del Proyecto B
- Todo mezclado

## Mi Solución

### Principio 1: Mantener Solo lo Esencial

**Elementos Esenciales (siempre incluir):**
- Descripción del Proyecto (3-5 líneas)
- Stack Tecnológico Principal (1 línea)
- Reglas Críticas (3-5 elementos)

**Elementos Opcionales (solo cuando sea necesario):**
- Detalles de Estilo de Codificación
- Directrices de API
- Patrones Específicos

**Objetivo: Menos de 100 líneas**

### Principio 2: Estructura Jerárquica

```markdown
# CLAUDE.md

## 🎯 Crítico (debe seguirse)
- Nunca hagas X
- Siempre usa el método Y

## ⚡ Importante (importante pero excepciones posibles)
- Usa el patrón Z cuando sea posible
- Prefiere la biblioteca A

## 💡 Nice to Have (información de referencia)
- Guía de estilo de código
- Convenciones de nomenclatura
```

**¡Las prioridades se vuelven claras!**

### Principio 3: Separar

**Estructura de Archivo Único (X):**
```
CLAUDE.md (300 líneas)
```

**Estructura Separada (O):**
```
CLAUDE.md (núcleo 50 líneas)
.claude/
  ├── coding-style.md
  ├── api-guidelines.md
  ├── testing-rules.md
  └── architecture-decisions.md
```

**¡Solo cargar adicionalmente cuando sea necesario!**

### Principio 4: Usar Plantillas

**Plantillas por Tipo de Proyecto:**
- Plantilla de Servidor API Web
- Plantilla de Aplicación Móvil
- Plantilla de Biblioteca
- Plantilla de Microservicio

**Comenzar desde plantilla base → Agregar solo lo necesario**

## Plantillas Prácticas de CLAUDE.md

### Plantilla Básica (versión de 50 líneas)

```markdown
# NOMBRE_PROYECTO

**Última Actualización**: AAAA-MM-DD

## 🎯 Reglas Críticas

1. [Regla más importante]
2. [Qué nunca hacer]
3. [Qué siempre hacer]

## 📋 Info del Proyecto

- **Tipo**: [Web/Móvil/Biblioteca/API]
- **Stack**: [Stack tecnológico principal]
- **Arquitectura**: [Patrón]

## ⚡ Directrices Importantes

### Estilo de Codificación
- [Estilo núcleo 2-3 elementos]

### Manejo de Errores
- [Método de manejo de errores]

### Pruebas
- [Estrategia de prueba brevemente]

## 💡 Referencia

- Más detalles: carpeta `.claude/`
- Arquitectura: `.claude/architecture.md`
- Docs API: `.claude/api-spec.md`
```

### Plantilla de Fase de Análisis (Análisis de Requisitos)

```markdown
# Proyecto de Análisis de Requisitos

## 🎯 Reglas Críticas

1. **Análisis Basado en Casos de Uso** - Siempre escribir centrado en el actor
2. **Diagramas Mermaid Requeridos** - Todos los resultados de análisis deben visualizarse
3. **Especificar Requisitos No Funcionales** - Debe incluir rendimiento, seguridad, disponibilidad

## 📋 Info del Proyecto

- **Tipo**: Análisis de Requisitos
- **Salida**: Especificación de requisitos, diagrama de casos de uso
- **Formato**: Markdown + Mermaid

## ⚡ Directrices Importantes

### Estructura del Documento
1. Descripción general del proyecto
2. Análisis de partes interesadas
3. Requisitos funcionales (por caso de uso)
4. Requisitos no funcionales
5. Restricciones
6. Diagramas

### Reglas de Escritura de Casos de Uso
- **Actor**: Sujeto externo al sistema (usuario, sistema externo)
- **Caso de Uso**: Forma verbo + objeto
- **Descripción**: Precondiciones, flujo principal, flujo alternativo, poscondiciones

### Formato de Diagrama de Casos de Uso Mermaid
    ```mermaid
    graph LR
        User[Usuario]
        Admin[Administrador]

        User --> UC1[Ver Productos]
        User --> UC2[Agregar al Carrito]
        Admin --> UC3[Gestionar Productos]
    ```

## 💡 Referencia
- Plantilla detallada: `.claude/requirements-template.md`
- Guía Mermaid: `.claude/mermaid-usecases.md`
```

Con el CLAUDE.md de la fase de análisis configurado así, cuando le dices a Claude Code "Escribe documento de requisitos," sale **en un formato consistente de inmediato.**

### Plantilla de Fase de Diseño (Diseño de Sistema)

```markdown
# Proyecto de Diseño de Sistema

## 🎯 Reglas Críticas

1. **Seguir Modelo C4** - Orden Context → Container → Component
2. **Diagramas de Secuencia Requeridos** - Especificar interacción para cada función principal
3. **Diagramas de Estado** - Los cambios de estado complejos deben visualizarse

## 📋 Info del Proyecto

- **Tipo**: Diseño de Sistema
- **Salida**: Documento de arquitectura, diagramas de secuencia/estado
- **Formato**: Markdown + Mermaid

## ⚡ Directrices Importantes

### Orden de Diseño de Arquitectura

1. **Context del Sistema** (sistema general y relaciones externas)
2. **Diagrama de Contenedor** (composición interna del sistema)
3. **Diagrama de Componentes** (estructura detallada del contenedor)

### Reglas de Escritura de Diagramas de Secuencia

**Escribir para cada función principal:**
- Happy Path (flujo normal)
- Error Path (manejo de errores)
- Alternative Path (flujo alternativo)

**Formato Mermaid:**
    ```mermaid
    sequenceDiagram
        participant User
        participant API
        participant DB

        User->>API: Solicitud
        API->>DB: Consulta
        DB-->>API: Resultado
        API-->>User: Respuesta
    ```

### Reglas de Escritura de Diagramas de Estado

**Visualizar cambios de estado complejos:**
    ```mermaid
    stateDiagram-v2
        [*] --> Esperando
        Esperando --> Procesando: Iniciar
        Procesando --> Completo: Éxito
        Procesando --> Fallido: Error
        Completo --> [*]
    ```

**Especificar condiciones para cada estado:**
- Condiciones de transición de estado
- Acciones permitidas por estado
- Reglas de tiempo de espera

## 💡 Referencia
- Guía Modelo C4: `.claude/c4-model-guide.md`
- Patrones de secuencia: `.claude/sequence-patterns.md`
- Máquina de estados: `.claude/state-machine-guide.md`
```

Ahora en la fase de diseño, cuando dices "Haz diagrama de secuencia del proceso de inicio de sesión," sale **consistentemente en el formato definido**.

### Plantilla de Desarrollo de Aplicación iOS

Similar a lo que realmente usé al desarrollar TipSmart.

```markdown
# Aplicación iOS TipSmart

## 🎯 Reglas Críticas

1. **Patrón MVVM Estricto** - La Vista absolutamente no debe contener lógica de negocio
2. **Solo SwiftUI** - Sin uso de UIKit
3. **Sincronización Core Data** - Todos los cambios en MainContext

## 📋 Info del Proyecto

- **Tipo**: Aplicación Móvil iOS
- **Stack**: SwiftUI + Core Data + AdMob
- **iOS Mín**: 15.0
- **Arquitectura**: MVVM

## ⚡ Directrices Importantes

### Estructura del Proyecto
    ```
    TipSmart/
    ├── Views/          # Vistas SwiftUI
    ├── ViewModels/     # Lógica de Negocio
    ├── Models/         # Modelos de Datos
    ├── Services/       # Servicios Externos
    └── Utilities/      # Funciones de Ayuda
    ```

### Convención de Nomenclatura
- ViewModel: `*ViewModel.swift`
- View: `*View.swift`
- Model: `*Model.swift`
- Service: `*Service.swift`

### Reglas de Core Data
- **Main Context**: Actualizaciones de UI
- **Background Context**: Procesamiento de datos masivos
- **Nunca**: Usar Background Context en Main Thread

### Creación de Documento de Diseño
- Diagrama de secuencia requerido al agregar nuevas funciones
- Escribir diagrama de estado para gestión de estado compleja
- Guardar en carpeta `.claude/design/`

## 💡 Referencia
- Arquitectura: `.claude/mvvm-architecture.md`
- Core Data: `.claude/coredata-patterns.md`
- Configuración AdMob: `.claude/admob-setup.md`
```

¡Con esta configuración, no necesitas decir "No uses Background Context en Core Data" cada vez. ¡Está integrado en CLAUDE.md!

### Plantilla de Desarrollo de Servidor API

```markdown
# Servidor API de E-Commerce

## 🎯 Reglas Críticas

1. **Principios API RESTful** - Diseño centrado en recursos, respetar semántica de métodos HTTP
2. **Respuesta de Error Unificada** - Formato RFC 7807 Problem Details
3. **Auto-generar Documentación API** - Mantener especificación OpenAPI 3.0

## 📋 Info del Proyecto

- **Tipo**: Servidor API REST
- **Stack**: Node.js + Express + PostgreSQL
- **Arquitectura**: Por Capas (Controller → Service → Repository)

## ⚡ Directrices Importantes

### Principios de Diseño de API

**Nomenclatura de Recursos:**
    ```
    GET    /api/v1/products          # Lista
    GET    /api/v1/products/:id      # Elemento único
    POST   /api/v1/products          # Crear
    PUT    /api/v1/products/:id      # Actualización completa
    PATCH  /api/v1/products/:id      # Actualización parcial
    DELETE /api/v1/products/:id      # Eliminar
    ```

**Formato de Respuesta de Error:**
    ```json
    {
      "type": "https://api.example.com/errors/not-found",
      "title": "Recurso No Encontrado",
      "status": 404,
      "detail": "Producto con id '123' no encontrado"
    }
    ```

### Entregables de Diseño

**Diagrama de Secuencia (Proceso de Pedido):**
    ```mermaid
    sequenceDiagram
        participant Client
        participant API
        participant DB

        Client->>API: POST /orders
        API->>DB: Verificar inventario
        DB-->>API: Inventario OK
        API->>DB: Guardar pedido
        DB-->>API: Guardado
        API-->>Client: 201 Created
    ```

### Gestión de Documentos
- Diseño de API: `.claude/api-design/`
- Diagramas de secuencia: `.claude/sequences/`
- Máquinas de estado: `.claude/state-machines/`

## 💡 Referencia
- Guía de diseño de API: `.claude/api-design-guide.md`
- Manejo de errores: `.claude/error-handling.md`
- Especificación OpenAPI: `.claude/openapi-template.yaml`
```

## Gestión de Múltiples Proyectos

### Método 1: CLAUDE.md Específico del Proyecto

```
proyecto-a/
  └── CLAUDE.md
proyecto-b/
  └── CLAUDE.md
proyecto-c/
  └── CLAUDE.md
```

**Pros**: Separación completa
**Contras**: Reglas comunes duplicadas

### Método 2: Común + Individual

```
~/claude-templates/
  ├── common.md
  ├── web-api.md
  ├── mobile-app.md
  ├── analysis-phase.md
  └── design-phase.md

proyecto-a/
  └── CLAUDE.md (común + contenido especializado)
```

**Pros**: Reutilización + personalización
**Contras**: Más puntos de gestión

### Método 3: Enlaces Simbólicos (¡Recomendado!)

```
~/claude-templates/
  ├── common-rules.md
  ├── analysis-templates.md
  ├── design-templates.md
  ├── ios-patterns.md
  └── api-patterns.md

proyecto-a/
  ├── CLAUDE.md (solo esenciales)
  └── .claude/ (enlace simbólico a ~/claude-templates)
```

**Pros**: Gestión central + actualizaciones fáciles
**Contras**: Configuración inicial necesaria

¡Yo uso el método 3. Gestiono plantillas comunes en un lugar, solo creo enlaces simbólicos para cada proyecto, y todos los proyectos se actualizan automáticamente!

### Uso Práctico: Proyectos de Análisis/Diseño

```
requirements-analysis/
  ├── CLAUDE.md (plantilla de fase de análisis)
  └── .claude/
      ├── requirements-template.md
      └── mermaid-usecases.md

system-design/
  ├── CLAUDE.md (plantilla de fase de diseño)
  └── .claude/
      ├── c4-model-guide.md
      ├── sequence-patterns.md
      └── state-machine-guide.md
```

**¡Progresar mientras se cambian plantillas por fase!**

Usar CLAUDE.md enfocado en requisitos en fase de análisis, cambiar a CLAUDE.md enfocado en diseño al pasar a fase de diseño. El contexto es claro y bueno.

## Usando CLAUDE.md en Equipos

### Gestionar con Git

```bash
# Siempre controlar versión de CLAUDE.md
git add CLAUDE.md .claude/
git commit -m "docs: actualizar directrices de diseño"

# Los miembros del equipo hacen pull y se aplica inmediatamente
git pull
```

### Incluir Cambios de CLAUDE.md en PRs

```markdown
## Cambios
- Agregado nuevo patrón de API
- Actualizado CLAUDE.md (reglas de manejo de errores)
- Agregada plantilla de diagrama de secuencia

## Lista de Revisión
- [ ] Cambios de código verificados
- [ ] Cambios de CLAUDE.md verificados
- [ ] Actualizaciones de diagramas verificadas
```

### Compartir Entregables de Análisis/Diseño

**Proceso de Revisión de Diseño:**

1. **Escribir Documentos de Diseño** (Claude Code + CLAUDE.md)
   - Diagramas de secuencia
   - Diagramas de estado
   - Especificaciones de API

2. **Crear PR**
   - Agregar documentos a carpeta `.claude/design/`
   - Incluir diagramas Mermaid

3. **Revisión del Equipo**
   - Revisar diagramas
   - Verificar patrones de diseño
   - Verificar cumplimiento de reglas de CLAUDE.md

4. **Después de Merge**
   - Miembros del equipo comparten reglas actualizadas de CLAUDE.md
   - Aprender nuevos patrones

### Revisiones Regulares

- Revisión mensual de CLAUDE.md
- Eliminar contenido innecesario
- Agregar nuevos patrones
- Mantener bajo 100 líneas

## Cosas Aprendidas en la Práctica

### ✅ Haz Esto

**1. Dieta Regularmente**
- Mensualmente: Eliminar reglas no usadas
- Consolidar contenido duplicado
- Mantener objetivo de 100 líneas

**2. Mostrar Versión**
```markdown
**Última Actualización**: 2025-11-11
**Versión**: 2.1
```

**3. Registrar Historial de Cambios**
```markdown
## Changelog
- 2025-11-11: Agregadas plantillas de diagramas de secuencia
- 2025-10-15: Actualizadas directrices de máquinas de estado
```

**4. Incluir Ejemplos**

Mostrar ejemplos malos y buenos juntos ayuda a la IA a entender mucho mejor.

```markdown
❌ Malo:
sequenceDiagram
    A->>B: solicitud

✅ Bueno:
sequenceDiagram
    participant Client
    participant API

    Client->>API: POST /users
    API-->>Client: 201 Created
```

**5. Preparar Plantillas Específicas de Fase**
- Fase de análisis: requirements-template.md
- Fase de diseño: design-template.md
- Fase de implementación: development-template.md

### ❌ No Hagas Esto

**1. Explicar Cada Tipo de Diagrama**
- Plantillar solo los usados frecuentemente
- Aplicar regla 80/20

**2. Intentar Hacerlo Perfecto de Una Vez**
- Gradualmente mientras se progresa en el proyecto
- Agregar cuando realmente se necesite

**3. Llenar Contenido con Copiar-Pegar**
- Teorías generales tomadas de internet
- Solo lo que se ajusta a mi proyecto

**4. No Actualizar**
- Las reglas antiguas son en realidad veneno
- Debe reflejar el estado actual

## Resumen

**CLAUDE.md también necesita estrategia:**

1. **Mantener Solo lo Esencial** (objetivo de 100 líneas)
2. **Prioridades Claras** (Crítico > Importante > Nice to Have)
3. **Gestionar Por Separado** (utilizar carpeta .claude/)
4. **Comenzar con Plantillas** (plantillas específicas de fase)
5. **Dieta Regular** (revisión mensual)

**Condiciones de un Buen CLAUDE.md:**
- ✅ Captable de un vistazo
- ✅ Prioridades claras
- ✅ Solo contenido realmente usado
- ✅ Mantener actualizado

**Especialmente en Fases de Análisis/Diseño:**
- Especificar reglas de creación de diagramas
- Mantener consistencia con uso de plantillas
- Mejorar calidad de entregables

## Vista Previa de la Próxima Publicación

**"Revolución de Comunicación con Mermaid - Creando Diagramas con IA"**

- IA auto-genera diagramas
- Visualización instantánea durante reuniones
- Optimizar comunicación del equipo
- 15x más rápida productividad
- Rompiendo la idea fija de que "necesito hacer imágenes"

Si has preparado plantillas con CLAUDE.md,
¡ahora te mostraré en detalle **cómo hacer diagramas reales** con Mermaid + IA!

## 📱 CLAUDE.md de TipSmart

También usé CLAUDE.md al desarrollar TipSmart.
¡Creé todos los diagramas de secuencia y diagramas de estado con Mermaid en la fase de diseño!

**[Descargar TipSmart de App Store](https://apps.apple.com/app/tipsmart-tip-calculator/id6749946714)** 📱

---

*¿Fueron útiles los consejos de gestión de CLAUDE.md?*
*¿Cómo gestionas los entregables de análisis/diseño? ¡Por favor comparte en los comentarios!*
