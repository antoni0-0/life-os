# Decisiones técnicas

Registro de las decisiones principales del frontend web (Life OS) y la bandeja de hábitos.

---

## 1. Arquitectura general del frontend (web)

### Problema identificado

El producto tiene muchas pantallas (landing, auth, ecosistemas, habits) y lógica distinta en cada una. Sin una estructura clara, el código mezcla rutas, UI, fetch y tipos en los mismos archivos y se vuelve difícil de mantener.

### Alternativas consideradas

- **Todo en `app/`** — páginas con JSX, fetch y estado juntos (rápido al inicio, caótico al crecer).
- **Feature folders completos** — cada módulo con pages, components, hooks y api propios (más aislamiento, más carpetas).
- **Capas por responsabilidad** — rutas delgadas, `components/` por feature, `lib/` para infra, `hooks/` para lógica, `types/` para contratos.

### Opción elegida

**Capas por responsabilidad** sobre Next.js App Router: rutas públicas fuera de `(app)`; pantallas del producto dentro de `(app)` con layout compartido; UI en `components/`, API en `lib/api/`, tipos en `types/`, lógica compleja en `hooks/`.

### Justificación

Cada capa tiene un rol claro. Las páginas solo enrutan; los componentes pintan; el hook orquesta; la lib habla con el servidor. Escala bien en un monorepo y encaja con cómo crece Life OS (más ecosistemas sin duplicar patrones).

---

## 2. App shell compartido

### Problema identificado

Todas las pantallas autenticadas necesitan la misma navegación (sidebar desktop, barra inferior mobile) y fondo visual. Si cada página monta su propio navbar, al navegar el menú se desmonta, pierde estado (sidebar abierto/cerrado) y la UX se siente rota.

### Alternativas consideradas

- **Navbar en cada página** — repetir markup y lógica en habits, dashboard, goals, etc.
- **`AppShell` en el layout de `(app)`** — componente que envuelve navbar + área de contenido persistente.

### Opción elegida

Un **`AppShell`** fijo en `app/(app)/layout.tsx` → `app-shell.tsx`: navbar desktop/mobile, header mobile, `children` para el contenido que cambia por ruta. Menú activo con `usePathname()`; padding del main según sidebar abierto/cerrado.

### Justificación

El layout de Next no se desmonta entre rutas del mismo grupo. La navegación persiste, el estado del sidebar se conserva y solo cambia el contenido central. Patrón estándar de apps con sidebar.

---

## 3. Custom hook `useHabits`

### Problema identificado

La bandeja concentra mucho en un solo lugar: filtros, paginación, loading, errores, selección, modal de creación, persistencia en `localStorage`, fetch con debounce y dos llamadas al API. Meter todo en `HabitsPage` mezclaría orquestación con JSX.

### Alternativas consideradas

- **Estado local en `HabitsPage`** — todo con `useState`/`useEffect` en el componente (simple, archivo enorme).
- **Store global (Context)** — estado compartido entre páginas (útil si habits se usa en muchos sitios; aquí no).
- **Custom hook `useHabits`** — lógica del feature encapsulada, página solo conecta UI.

### Opción elegida

Extraer la lógica a **`useHabits`**: estado, efectos, acciones y `selectedTask` derivado. `HabitsPage` reparte props a tabla, toolbar, detalle y modal.

### Justificación

Componentes presentacionales (tabla, toolbar) sin conocer el API. Un solo “cerebro” del feature. Más fácil extender (editar, completar) y probar la lógica sin montar toda la página.

---

## 4. Capa API del cliente desacoplada

### Problema identificado

Varios puntos del frontend llaman al backend (habits, auth). Si cada uno usa `fetch` suelto, se duplica base URL, manejo de errores, headers de auth y tipos de respuesta.

### Alternativas consideradas

- **`fetch` directo en hooks/componentes** — cambios repetidos en muchos archivos.
- **Capa fina `lib/api/`** — `client.ts` genérico + módulos por dominio (`tasks.ts`, `auth.ts`).

### Opción elegida

**`lib/api/client.ts`** (URL base, `ApiError`, parseo de respuesta) y **`lib/api/tasks.ts`** (endpoints tipados). El hook importa funciones, no construye URLs a mano.

### Justificación

Cambios de infra (URL, auth, errores) en un solo sitio. Contratos tipados alineados con `types/`. Suficiente para la prueba sin añadir librerías.