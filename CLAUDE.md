# Magnetic Frontend (web/)

React + TypeScript app para Login Magnetic SSO. Ver [../CLAUDE.md](../CLAUDE.md) para contexto global.

## Commands
```bash
npm run dev              # Desarrollo (http://localhost:5173)
npm run build            # Build produccion
npm run preview          # Preview del build
npm run test:e2e         # Tests E2E Playwright
npm run test:e2e:headed  # E2E con navegador visible
npm run test:e2e:ui      # UI interactiva Playwright
```

## Environment Variables
```env
VITE_API_URL=http://localhost:3000/api
```

## Project Structure
```
src/
├── assets/images/           # Logos, backgrounds, isotipos, imagotipos
├── components/
│   ├── ai/                  # AIButton, ChatDrawer
│   ├── auth/                # ProtectedRoute, AdminRoute
│   ├── dashboard/           # ConnectProductModal
│   ├── help/                # FAQDrawer
│   ├── landing/             # Navbar, Hero, ProductsShowcase, Features, Stats, CTA, Footer
│   ├── layout/              # TopBanner, AdminLayout
│   └── ui/                  # LanguageSelector, Skeleton
├── i18n/
│   ├── translations.ts      # Traducciones principales (ES/EN/PT)
│   ├── landingTranslations.ts
│   └── LanguageContext.tsx   # Provider + useTranslation hook
├── pages/
│   ├── Login.tsx, LoginNew.tsx, Register.tsx, ForgotPassword.tsx
│   ├── Dashboard.tsx, ProductMetrics.tsx
│   ├── Profile.tsx, ChangePassword.tsx
│   └── admin/ (AdminDashboard, Users, AssignProducts)
├── services/api.ts          # Axios client + interceptors
├── store/authStore.ts       # Zustand (user, tokens, auth actions)
├── styles/animations.css    # Landing page keyframes
└── types/index.ts           # TypeScript interfaces
```

## Routes
| Ruta | Pagina | Acceso |
|------|--------|--------|
| `/` | Landing.tsx | Publico |
| `/login` | Login.tsx | Publico |
| `/login-new` | LoginNew.tsx | Publico |
| `/register` | Register.tsx | Publico |
| `/forgot-password` | ForgotPassword.tsx | Publico |
| `/dashboard` | Dashboard.tsx | JWT |
| `/dashboard/metrics/:slug` | ProductMetrics.tsx | JWT |
| `/profile` | Profile.tsx | JWT |
| `/change-password` | ChangePassword.tsx | JWT |
| `/admin` | AdminDashboard.tsx | JWT + Admin |
| `/admin/users` | Users.tsx | JWT + Admin |
| `/admin/products` | AssignProducts.tsx | JWT + Admin |

## Role-Based Routing
- `isAdmin: true` → redirige a `/admin` despues del login
- `isAdmin: false` → redirige a `/dashboard`
- Sin auth → redirige a `/login`
- Guards: `ProtectedRoute` (JWT), `AdminRoute` (JWT + isAdmin)
- `isCheckingAuth` flag en Zustand evita race condition en mount

## Auth Store (Zustand)
```typescript
interface AuthStore {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
  login(email, password): Promise<void>;
  logout(): void;
  checkAuth(): Promise<void>;
}
```

## API Service Pattern
```typescript
// Axios interceptor: auto-adds Bearer token, auto-refresh on 401
import { authAPI, productsAPI, usersAPI, dashboardAPI, aiAPI } from '../services/api';
```

## i18n Usage
```typescript
import { useTranslation } from '../i18n/LanguageContext';
const t = useTranslation();
// t.auth.login, t.dashboard.myProducts, t.admin.users, etc.
```
3 idiomas: ES (default), EN, PT. Persistencia en localStorage. Ver [../.claude/rules/i18n.md](../.claude/rules/i18n.md).

## Design System
Ver [../.claude/rules/design-system.md](../.claude/rules/design-system.md) para la referencia completa. Key rules:
- `primary-600: #0058E7` (botones), `primary-700: #0045B4` (hover)
- `strokeWidth: 1.66667` en iconos SVG (NO 2)
- `rounded-lg = 12px` (override en tailwind.config.js)
- NO usar colores hardcodeados de Tailwind (`bg-red-50`), usar tokens (`bg-error/10`)

## Product Cards
| Estado | Deteccion | UI |
|--------|-----------|-----|
| No conectado | `!productEmail \|\| !enableMetrics` | Badge gris, boton "Conectar" |
| Conectado | `productEmail && enableMetrics` | Badge verde, boton "Acceder" |
| Error | Error metricas | Panel rojo, boton "Reconectar" |

Backend "Advocates" → Frontend muestra "AdvocatesPro" (mapeo via `backendName`).

## Assets
| Asset | Path |
|-------|------|
| Background auth | `src/assets/images/magnetic-background.webp` |
| Logo footer | `src/assets/images/powered-by-magnetic-logo.svg` |
| Isologo | `src/assets/images/Isologo-Black.png` |
| Isotipos | `src/assets/images/*-Isotipo-Blue.png` (4 productos) |
| Imagotipos | `src/assets/images/*-Imagotipo-Blue.png` (4 productos) |

## Landing Page
Dark theme con animaciones. Ver [../docs/landing-page.md](../docs/landing-page.md).
- CSS classes: `.glass`, `.glass-dark`, `.gradient-text`, `.orb-primary`, `.hover-lift`
- Traducciones en `src/i18n/landingTranslations.ts`

## E2E Testing (Playwright)
```bash
# Requiere: backend en :3000 + seeds + frontend en :5173
npm run test:e2e          # 45+ tests headless
npm run test:e2e:headed   # Con navegador
```

Gotchas:
- `getByLabel()` no funciona (proyecto usa `<div>` labels, no `<label>`)
- Usar `getByPlaceholder()` o `getByRole('textbox')`
- `input[type="password"]` → usar `locator('input[type="password"]')`
- Regex i18n: `/correo|email/i` para funcionar en cualquier idioma

Ver [../docs/testing-e2e.md](../docs/testing-e2e.md) para detalles completos.

## Password Validation (Register)
5 reglas en tiempo real: 8+ chars, especial, numero, mayuscula, coincidencia.
Indicadores visuales (verde/rojo). Boton deshabilitado hasta cumplir todas.
