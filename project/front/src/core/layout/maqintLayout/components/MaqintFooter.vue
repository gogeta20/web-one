<script lang="ts" setup>
import MaqintContact from "@/core/layout/maqintLayout/components/MaqintContact.vue";
import { defineComponent, ref } from "vue";

defineComponent({
  name: "BaseFooter",
});

defineProps({
  nombreApp: {
    type: String,
    default: "",
  },
  versionApp: {
    type: String,
    default: "",
  },
});

const contactDialog = ref(false);

function onOpenContact() {
  contactDialog.value = true;
}
</script>

<template>
  <div class="bh-footer">
    <header class="bh-footer__logo">
      <a href="https://www.xunta.gal">
        <img
          alt="Logo da Xunta"
          src="/images/xunta-galicia-logo.svg"
          width=""
          height="40"
          loading="lazy" />
        <span class="sr-only">Ligazón á web da Xunta</span>
      </a>
    </header>
    <main class="bh-footer__info">
      <p class="bh-footer__text">
        Servizo prestado pola Presidencia da Xunta de Galicia<br />
        Axencia para a Modernización Tecnolóxica de Galicia (Amtega)
      </p>
    </main>
    <nav class="bh-menu">
      <ul class="bh-menu__list">
        <li class="bh-menu__item">
          <i class="glyphicon glyphicon-bookmark" aria-hidden="true" />
          {{ nombreApp }} Ver. {{ versionApp }}
        </li>
        <li>
          <a href="#" @click="onOpenContact">
            <i class="glyphicon glyphicon-envelope" aria-hidden="true" />l
          </a>
        </li>
      </ul>
    </nav>
    <MaqintContact v-model:visible="contactDialog" />
  </div>
</template>

<style lang="scss" scoped>
.bh-footer {
  height: var(--footer-height);
  padding: 0.5rem;
  background-color: var(--medium-gray);
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.875rem;

  &__logo {
    flex: 0 1 180px;

    img {
      max-width: clamp(80px, 80%, 130px);
      height: min(40px, 100%);
    }
  }

  &__info {
    display: none;
    color: var(--light-gray);
    flex: 1;
  }
  &__text {
    margin-bottom: 0px;
  }
}

.bh-menu {
  font-size: 0.875rem;

  &__list {
    color: var(--light-gray);
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    align-content: flex-start;
    font-size: 0.875rem;

    a {
      color: var(--light-gray);
      text-decoration: none;
    }
  }
}
.bh-menu__item {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  margin-left: 1rem;
  word-break: break-word;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: clamp(0.675rem, 2.5vw, 0.875rem);
}

@media (min-width: 769px) {
  .bh-footer {
    &__info {
      display: initial;
    }
  }
}

@media (min-width: 540px) {
  .bh-menu {
    &__list {
      gap: 0.5rem;
      li:last-child {
        border-left: 1px dotted rgba(238, 238, 238, 0.7);
        padding: 0 7px 0 10px;
      }
    }
  }
}
</style>
