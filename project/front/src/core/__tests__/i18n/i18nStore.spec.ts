import { useI18nStore } from '@/core/i18n/store/i18nStore';
import { createPinia, setActivePinia, type Store } from 'pinia';
import { beforeAll, expect, test } from 'vitest';

let i18nStore: Store<
  'i18n',
  {
    language: string;
  },
  // eslint-disable-next-line @typescript-eslint/ban-types
  {},
  {
    setLanguage(locale: string): void;
    getLanguage(): string;
  }
>;

beforeAll(() => {
  setActivePinia(createPinia());
  i18nStore = useI18nStore();
});

test('i18nStore -> state', async () => {
  expect(i18nStore.$state.language).toBe('gl');
});

test('i18nStore -> setLanguage', async () => {
  expect(i18nStore.setLanguage('es')).toBeUndefined();
});
test('i18nStore -> getLanguage', async () => {
  i18nStore.setLanguage('gm');
  expect(i18nStore.getLanguage()).toBe('gm');
});
