<script lang="ts" setup>
import { rootConfig } from '@/core/config/config';

const baseUrl = rootConfig.baseURL;
</script>

<template>
  <div class="bh-error">
    <header class="bh-error__header">
      <h1 class="bh-error__title">A páxina que buscabas non existe</h1>
      <h3 class="bh-error__subtitle">Escribiches algo mal ou ben a páxina cambiou de ubicación</h3>
      <h3>
        <a :href="baseUrl">IR AO INICIO</a>
      </h3>
    </header>
    <footer class="bh-error__footer" />
  </div>
</template>
<style lang="scss" scoped>
.bh-error {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  &__header {
    margin-top: 5.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__title {
    color: var(--primary-color);
  }

  &__subtitle {
    color: #777;
  }

  &__footer {
    width: 100%;
    height: 55%;
    background: url('/images/error/anchor_cancer_bg.png') no-repeat bottom center,
      url('/images/error/cancer_anchor_line_bg.png') repeat-x bottom center;
    background-size: contain;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>
