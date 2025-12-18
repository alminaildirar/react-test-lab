## 🚀 Todo App

- Kullanıcı giriş/çıkış (cookie tabanlı basit auth)
- Todo ekleme, silme, tamamlama (CRUD)
- Todo listeleme ve detay sayfası
- Auth guard (login olmadan protected sayfalara erişim yok)
- Responsive ve erişilebilir (ARIA-first) UI

---

## 🛠 Kullanılan Teknolojiler

### Frontend

- **Next.js (App Router)**
- **React 19**
- **TypeScript**
- Modern CSS (Grid, Flexbox, responsive layout)

### Testing

- **Vitest** – Unit & integration test runner
- **React Testing Library (RTL)** – Kullanıcı davranışı odaklı testler
- **MSW (Mock Service Worker)** – API isteklerini izole ederek test etme
- **Playwright** – Uçtan uca (E2E) testler
- **Custom Test Matchers** – Test okunabilirliğini artırmak için

---

## 🧪 Testler

### ✅ Unit & Integration Tests (Vitest + RTL)

- Todo ekleme / silme / toggle etme
- Loading ve error state’leri
- Form davranışları
- Auth success/fail senaryolar
- Routing ve redirect logic
- Accessibility odaklı element seçimi  
  (`getByRole`, `getByLabelText`)

### ✅ API & Data Layer

- MSW ile `/api/todos` ve `/api/login` endpoint’leri
- Başarılı ve hatalı response senaryoları

### ✅ E2E Tests (Playwright)

- Login olmadan protected route’a erişim
- Login → Todo ekleme → Toggle → Silme akışı
- Browser ortamında auth + middleware testleri

---

## 📂 Proje Yapısı

```txt
tests/
 ├─ auth/          → Login & auth testleri
 ├─ todos/         → Todo component & page testleri
 ├─ components/    → UI component testleri
 ├─ setupTests.tsx → Test setup & custom matcher’lar

e2e/
 ├─ auth.spec.ts        → Auth guard testleri
 └─ todos-flow.spec.ts → Full kullanıcı akışı
```

## Testleri Çalıştırma

Projede hem unit/integration hem de uçtan uca (E2E) testler bulunmaktadır.

---

### 🧪 Unit & Integration Testleri (Vitest)

Component, page ve hook testlerini çalıştırır.

```bash
yarn test
```

### 🧪 E2E Testleri (Playwright)

Gerçek browser ortamında tam kullanıcı akışını test eder.

```bash
yarn test:e2e
```
