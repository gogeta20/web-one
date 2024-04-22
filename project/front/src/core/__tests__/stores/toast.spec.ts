import { useToastStore } from '@/core/stores/toast';
import { createPinia, setActivePinia, type Store } from 'pinia';
import { beforeAll, expect, test } from 'vitest';

let toastStore: Store<
  'toast',
  {
    title: string;
    message: string;
    type: string;
  },
  // eslint-disable-next-line @typescript-eslint/ban-types
  {},
  {
    onShowToast({ title, message, type }: { title: string; message: string; type: string }): void;
  }
>;

beforeAll(() => {
  setActivePinia(createPinia());
  toastStore = useToastStore();
});

test('toastStore -> state', async () => {
  expect(toastStore.$state.title).toBe('');
  expect(toastStore.$state.message).toBe('');
  expect(toastStore.$state.type).toBe('');
});

test('toastStore -> onShowToast', async () => {
  const params = { title: 'title', message: 'message', type: 'type' };
  const response = toastStore.onShowToast(params);
  expect(response).toBeUndefined();
  expect(toastStore.$state.title).toBe('title');
  expect(toastStore.$state.message).toBe('message');
  expect(toastStore.$state.type).toBe('type');
});
