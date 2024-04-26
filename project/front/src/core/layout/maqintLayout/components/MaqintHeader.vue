<script lang="ts" setup>
import { useUsuarioStore } from "@/auth/store/usuarioStore";
import BaseShowAyuda from "@/core/layout/maqintLayout/components/Ayuda/MaqintShowAyuda.vue";
import BaseChangeLanguage from "@/core/layout/maqintLayout/components/MaqintChangeLanguage.vue";
import MaqintConfimLogout from "@/core/layout/maqintLayout/components/MaqintConfirmLogout.vue";
import BaseShowNotifications from "@/core/layout/maqintLayout/components/MaqintShowNotifications.vue";
import MaqintHeader from "@/core/layout/maqintLayout/components/MaqintHeader.vue";
import {mainAppStore} from "@/auth/store/mainAppStore";
const appStore = mainAppStore();
import { defineComponent, onUnmounted, ref } from "vue";
import { RouterLink } from "vue-router";
import {rootConfig} from "@/core/config/config";

defineComponent({
  name: "BaseHeader",
});

defineProps({
  nombreApp: {
    type: String,
    default: "",
  },
  isOpenSideBar: {
    type: Boolean,
    default: null,
  },
});
const usuarioStore = useUsuarioStore();

const imgLogo = ref(
  usuarioStore.datos.typeLogin != "casExtranet"
    ? "/xorfor/images/xorfor-intranet-logo.png"
    : "/xorfor/images/xorfor-extranet-logo.png"
);
const emit = defineEmits(["menu-toggle"]);

const isOpenDropdown = ref(false);
const isOpenLogoutConfirm = ref(false);

// function onMenuToggle(event: Event) {
//   event.preventDefault();
//   emit("menu-toggle", event);
//   event.stopPropagation();
// }

const closeDropdown = () => {
  if (isOpenDropdown.value) isOpenDropdown.value = false;
};

window.addEventListener("click", closeDropdown);

onUnmounted(() => {
  window.removeEventListener("click", closeDropdown);
});

const onLogout = async () => {
  isOpenLogoutConfirm.value = true;
};

const handlerLogout = () => {
  isOpenLogoutConfirm.value = false;
};

</script>

<template>
  <MaqintConfimLogout :visible="isOpenLogoutConfirm" @cancelLogout="handlerLogout" />
  <header class="bh-header">
    <main class="bh-header__main">
      <button type="button" class="bh-header__toggle" @click="appStore.switchSidebar">
        <i class="fa-solid fa-bars"></i>
      </button>
      <div class="bh-controls">
        <nav>
          <ul class="menu-header__ul">
            <li>
              UNO
            </li>
            <li>
              dos
            </li>
            <li>
              tres
            </li>
            <li>
              tres
            </li>
            <li>
              tres
            </li>
            <li>
              tres tres tres
            </li>
          </ul>
        </nav>
      </div>
    </main>
    <div class="bh-controls">
      <nav>
        <ul class="bh-controls__list flex margin-0">
          <li>
            <BaseShowNotifications />
          </li>
          <li>
            <BaseShowAyuda />
          </li>
          <li>
            <BaseChangeLanguage />
          </li>
        </ul>
      </nav>
    </div>
    <div class="bh-profile">
<!--      <div class="bh-profile__picture">-->
<!--        <img-->
<!--          alt="Imaxe do/a usuario/a"-->
<!--          class="bh-profile__img"-->
<!--          src="/images/user/user-image-mini.png"-->
<!--          lazy-->
<!--          width="40"-->
<!--          height="40" />-->
<!--      </div>-->
      <div class="bh-profile__info">
        <div class="bh-profile__name">
          {{ usuarioStore.datos.nombre }}
          mauricio
        </div>
      </div>
    </div>

    <div class="bh-logout">
      <button class="p-button-rounded p-button-text bh-logout__link" @click="onLogout">
        <i class="fa-solid fa-power-off"></i>
      </button>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.bh-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid #eee;
  height: var(--header-height);
  width: 100%;
  background-color: #fff;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1);

  &__main {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
    //width: 50%;
    border-right: 2px solid #eee;
    padding: 0 1rem;
  }

  &__logo {
    display: inline-block;
    width: var(--sidbar-width);
    text-align: center;
    padding: 0.5rem 0;

    & img {
      height: 35px;
      object-fit: cover;
      object-position: center;
    }
  }

  &__toggle {
    display: flex;
    border: none;
    background-color: transparent;
    margin-right: 1rem;
    span {
      color: #555;
      font-size: 1.4rem;
      cursor: pointer;

      &:hover {
        color: var(--light-blue);
        transition: all 0.2s ease 0s;
      }
    }

    &:focus {
      outline: none;
    }

    &:hover {
      transform: scale(0.9);
    }
  }
}
.menu-header{
  &__ul{
    display: flex;
    gap: 2rem;
  }
}

.bh-controls {
  flex: 0;
}

.bh-profile {
  display: flex;
  align-items: center;
  justify-content: flex-end;

  &__picture {
    margin-right: 0.5rem;
  }

  &__img {
    height: 40px;
    border-radius: 9999px;
    transition: all 0.1s ease;
    object-fit: cover;
    object-position: center;

    &:hover {
      border-radius: 0;
      border: 1px solid #fff;
      box-shadow: 0 0 8px -3px rgb(0 0 0 / 60%);
    }
  }

  &__info {
    color: #888;
    display: none;
    flex-direction: column;
    justify-content: center;
    word-wrap: break-word;
  }

  &__name {
    font-size: 0.9em;
  }

  &__role {
    font-size: 0.82em;
    font-weight: 700;
  }
}

.bh-logout {
  display: none;
  min-width: 3.5rem;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease;
  margin-right: 0.5rem;
  min-height: 100%;

  .bh-logout__link {
    // padding: 0.5rem 1rem;
    color: #c65a5a;
    font-size: 1rem;
  }
}

.bh-dropdown {
  display: flex;
  position: relative;
  user-select: none;
  touch-action: manipulation;
  cursor: pointer;

  &__menu {
    cursor: initial;
    font-size: 0.9em;
    min-width: 100%;
    display: none;
    flex-direction: column;
    position: absolute;
    top: 100%;
    right: 0;
    left: inherit;
    margin-top: 0.5rem;
    padding: 0.5rem 0.7rem;
    color: var(--text-color);
    text-shadow: 1px 1px #fff;
    border-radius: 2px;
    border: 1px solid #e8e8e8;
    box-shadow: 4px 4px 10px -3px rgba(50, 50, 50, 0.1);
    background-color: rgba(255, 255, 255, 0.97);
    z-index: 1000;
  }

  &--open {
    .bh-dropdown__menu {
      display: block;
    }
  }
}

hr {
  margin: 0.5rem 0;
  border: none;
  border-top: 1px solid #e5e5e5;
}

@media (min-width: 540px) {
  .bh-controls {
    flex: 1;
  }
  .bh-dropdown {
    flex: 1;
  }
  .bh-profile__info {
    display: flex;
  }
  .bh-logout {
    display: flex;
  }
}
</style>
