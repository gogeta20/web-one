import { rootConfig } from '@/core/config/config';
import es from '@/core/i18n/locales/es.json';
import gl from '@/core/i18n/locales/gl.json';
import ToastService from 'primevue/toastservice';
import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';

const i18n = createI18n({
  legacy: false,
  locale: 'gl',
  fallbackLocale: 'gl',
  messages: {
    gl,
    es,
  },
  globalInjection: true,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Job = (...args: any[]) => any;

export function withSetup<T extends Job>(composable: T) {
  let result;
  const app = createApp({
    setup() {
      result = composable();
      return () => {
        // This is intentional
      };
    },
  });
  app.use(ToastService);
  app.use(i18n);
  app.mount(document.createElement('div'));
  return { result, app };
}

export function baseUrl(url: string) {
  return `${rootConfig.apiURL}${url}`;
}

export const meEnvironment = 'preview';
