import { usePageLoadStore } from '@/core/stores/pageLoad';
import { createPinia, setActivePinia, type Store } from 'pinia';
import { beforeAll, expect, test } from 'vitest';

let pageLoadStore: Store<
  'pageLoad',
  {
    loadingPage: boolean;
    text: string;
  },
  // eslint-disable-next-line @typescript-eslint/ban-types
  {},
  {
    showPageLoad(message: string): void;
    hiddenPageLoad(): void;
    sendMessage(message: string): void;
  }
>;

beforeAll(() => {
  setActivePinia(createPinia());
  pageLoadStore = usePageLoadStore();
});

test('pageLoadStore -> state', async () => {
  expect(pageLoadStore.$state.loadingPage).toBeFalsy();
  expect(pageLoadStore.$state.text).toBe('');
});

test('pageLoadStore -> showPageLoad', async () => {
  pageLoadStore.showPageLoad();
  expect(pageLoadStore.$state.loadingPage).toBeTruthy();
});
test('pageLoadStore -> hiddenPageLoad', async () => {
  pageLoadStore.hiddenPageLoad();
  expect(pageLoadStore.$state.loadingPage).toBeFalsy();
});
test('pageLoadStore -> sendMessage', async () => {
  pageLoadStore.sendMessage('message');
  expect(pageLoadStore.$state.text).toBe('message');
});
