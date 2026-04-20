# KudaBank — React Native Test Assignment

## Getting started

```bash
npm install
npx expo start
```

Scan the QR code with Expo Go on Android or iOS.

## Architecture notes

### API layer (`src/services/api.ts`)

A thin Axios instance centralises auth and response handling. All API functions are plain async functions — no library dependency.

The `BASE_URL` is hardcoded for simplicity. In a real app it would come from an environment variable (`EXPO_PUBLIC_API_URL`).

A request interceptor automatically attaches the `Authorization: Basic <token>` header from the in-memory credentials cache. A response interceptor stub is left in place — in a production app it would catch 401 responses, attempt a token refresh, and retry the original request before propagating the error.

### Form logic (`src/screens/Signup/hooks/useSignupForm.ts`)

Form state, validation, and submission live in a custom hook, keeping the screen component focused on rendering. In real world app React hook form or similar lib should be used to simplify the logic and provide real time ui updates on user input (e.g. hiding validation errors on input)

### Testing

Tests are written with **Jest** + **React Native Testing Library** using the `jest-expo` preset.

The coverage is intentionally selective — the goal is to demonstrate the testing approach rather than achieve 100% coverage.

**Approach:**

- Business logic (hooks, services) is tested in isolation via unit tests
- `useTheme` is mocked globally in `jest.setup.ts` to avoid async noise from `ThemeProvider`
- A shared `renderWithProviders` utility in `src/utils/test-utils.tsx` wraps components with necessary providers (`SafeAreaProvider`, `ThemeProvider`)
- Screen-level tests mock at the service boundary so they act as real integration tests of the hook → UI wiring

### State management

Minimal global state via React Context (`AppContext`) — tracks authentication and onboarding status, initialised on app start from `authService` and `userService` respectively. No external state library was added as the scope doesn't warrant it.
