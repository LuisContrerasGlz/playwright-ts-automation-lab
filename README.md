# Guía rápida de comandos de Playwright

Esta guía reúne los comandos más útiles para correr pruebas con Playwright desde la terminal en este proyecto.

## 1) Instalar dependencias

```bash
pnpm install
```

## 2) Instalar navegadores de Playwright

```bash
pnpm exec playwright install
```

Si necesitas instalar también las dependencias del sistema:

```bash
pnpm exec playwright install --with-deps
```

## 3) Ejecutar todas las pruebas

```bash
pnpm exec playwright test
```

## 4) Ejecutar una prueba específica

```bash
pnpm exec playwright test tests/example.spec.ts
```

## 5) Ejecutar solo un navegador

```bash
pnpm exec playwright test --project=chromium
```

Otros ejemplos:

```bash
pnpm exec playwright test --project=firefox
pnpm exec playwright test --project=webkit
```

## 6) Ver las pruebas en modo visual (headed)

```bash
pnpm exec playwright test --headed
```

## 7) Ejecutar en modo depuración

```bash
pnpm exec playwright test --debug
```

## 8) Ejecutar solo pruebas que coincidan con un nombre

```bash
pnpm exec playwright test --grep "login"
```

## 9) Abrir la interfaz de Playwright

```bash
pnpm exec playwright test --ui
```

## 10) Ver el reporte HTML

```bash
pnpm exec playwright show-report
```

## 11) Usar un reporter específico en terminal

```bash
pnpm exec playwright test --reporter=list
```

## 12) Limitar la cantidad de workers

```bash
pnpm exec playwright test --workers=2
```

## 13) Limpiar resultados previos

```bash
rm -rf test-results playwright-report
```

## 14) Comando corto que suele usarse

```bash
pnpm playwright test
```

> Si prefieres, puedes usar siempre `pnpm exec playwright test`, que suele ser más explícito y consistente.
