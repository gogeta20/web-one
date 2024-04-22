<script setup lang="ts">
import { loginUser } from "@/auth/infrastructure/useCases/LoginUser";
import { useI18nStore } from "@/core/i18n/store/i18nStore";
import SubMenuLogin from "@/core/layout/maqintLayout/components/SubMenuLogin.vue";
import { usePageLoadStore } from "@/core/stores/pageLoad";
import { UtilHelper } from "@/core/utilities/UtilHelper";
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();
const i18nStore = useI18nStore();

onMounted(async () => {
  locale.value = i18nStore.getLanguage();
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

const nombreUsuario = ref("");
const passwordUsuario = ref("");
const messageError = ref("");
const pageLoadStore = usePageLoadStore();

const transUser = ref(t("login.usuario"));
const transPass = ref(t("login.password"));

const onLogin = async () => {
  if (!nombreUsuario.value) {
    messageError.value = t("login.msg-missing-user");
    return;
  }
  if (!passwordUsuario.value) {
    messageError.value = t("login.msg-missing-pass");
    return;
  }
  messageError.value = "";
  pageLoadStore.showPageLoad();
  await UtilHelper.wait(2000);
  await loginUser(nombreUsuario.value, passwordUsuario.value, true);
  pageLoadStore.hiddenPageLoad();
  pageLoadStore.sendMessage("");
};
</script>

<template>
  <main class="bh-login">
    <section class="bh-login__content">
      <article class="bh-login__item">
        <header class="bh-login__logo">
          <picture>
            <img
              src="/images/x.png"
              loading="lazy"
              :alt="nombreApp"
              class="home__img"
              width="355"
              height="80" />
          </picture>
        </header>
        <form class="bh-form" method="#">
          <h2 class="bh-form__title">{{ t("login.identifiquese") }}</h2>
          <div class="bh-form__item">
            <input
              v-model="nombreUsuario"
              autocomplete="username"
              class="bh-form__input"
              type="text"
              required
              :placeholder="transUser"
              aria-label="{{ t('login.usuario') }}" />
          </div>

          <div class="bh-form__item">
            <input
              v-model="passwordUsuario"
              class="bh-form__input"
              type="password"
              required
              autocomplete="current-password"
              :placeholder="transPass"
              aria-label="{{ t('login.password') }}"
              @keyup.enter="onLogin" />
            <small class="p-error">{{ messageError }}</small>
          </div>

          <button type="button" class="bh-form__button" aria-label="Entrar" @click="onLogin">
            {{ t("login.entrar") }}
          </button>
        </form>
        <SubMenuLogin />
      </article>
      <article class="bh-login__item bh-login--info">
        <div class="bh-xunta">
          <a href="http://www.xunta.gal" class="bh-xunta__logo">
            <picture>
              <img
                alt="Logo da Xunta"
                loading="lazy"
                src="/images/xunta-galicia-logo.svg"
                width="310"
                height="100" />
            </picture>
          </a>
        </div>
        <div class="bh-xunta__text">
          <p>{{ t("login.msg-xg") }}<br />{{ t("login.msg-tech") }}</p>
        </div>
        <div class="bh-xunta__version">
          {{ nombreApp }} Ver.
          <span data-version>{{ versionApp }}</span>
        </div>
      </article>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.bh-login {
  background: url("../../../public/images/bg-login.jpg") repeat-y top center;
  // background: url("../images/login/bg/login-bg.png") repeat-y top center;
  background-size: cover;
  background-color: var(--light-blue);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin: 0 auto;
}

.bh-login__content {
  display: grid;
  grid-template-columns: 1fr;
  box-shadow: 0 0 20px 0 rgb(0 0 0 / 10%);
  margin: 4rem;
}

.bh-login__item {
  min-width: clamp(300px, 90vw, 500px);
  background-color: #fff;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
}

.bh-login__logo {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;

  & img {
    height: 80px;
    margin: 6rem 0 3rem 0;
    object-fit: contain;
    object-position: center;
  }
}

.bh-form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.bh-form__title {
  margin: 0;
  color: var(--primary-color);
  font-size: 2rem;
  font-weight: 300;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0;
  margin-inline-end: 0;
  margin-bottom: 1rem;
}

.bh-form__item {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1rem;
}

.bh-form__input {
  display: block;
  width: 100%;
  height: 3rem;
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: var(--border-radius);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
}

.bh-form__input:focus {
  border-color: var(--light-blue);
  outline: 0;
  -webkit-box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%), 0 0 8px rgb(102 175 233 / 60%);
  box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%), 0 0 8px rgb(102 175 233 / 60%);
}

.bh-form__button {
  appearance: none;
  user-select: none;
  display: inline-block;
  text-align: start;
  cursor: pointer;
  padding: 0.5rem 1rem;
  color: #fff;
  vertical-align: middle;
  touch-action: manipulation;
  background-color: #1d71b8;
  border-color: #1a63a2;
  font-size: 1rem;
  border: 1px solid transparent;
  border-radius: var(--border-radius);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  white-space: nowrap;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
}

.bh-form__button:hover {
  color: #fff;
  background-color: #16568c;
  border-color: #11436d;
}

.bh-form__button:focus {
  outline: none;
  color: #fff;
  background-color: #16568c;
  border-color: #082034;
}

.bh-form__button[disabled] {
  color: #d2d5db;
  background: #6c7589;
  cursor: not-allowed;
}

.bh-login-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 5rem 1rem 2rem;
}

.bh-login-nav__item {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 0.5rem;
  align-items: baseline;
  color: var(--primary-color);
  justify-content: center;
  font-size: 1rem;
  min-width: 80px;
}

.bh-login-nav__item a {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  text-decoration: none;
  gap: 0.5rem;
  align-items: baseline;
  justify-content: center;
}

i {
  font-size: 2rem;
  color: var(--light-blue);
  top: 7px;
}

.bh-login--info {
  display: none;
  background-color: var(--medium-blue);
  justify-content: flex-end;
  padding: 0 4rem;
  font-weight: 700;
}

.bh-xunta__logo {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.bh-xunta__text {
  padding: 0 2rem;
  color: #fff;
}

.bh-xunta__version {
  color: #fff;
  padding: 0 2rem 4rem;
}

@media (min-width: 992px) {
  .bh-login__content {
    grid-template-columns: 1fr 1fr;
  }

  .bh-login--info {
    display: flex;
  }
}

@media (min-width: 540px) {
  .bh-login__item {
    padding: 2rem 4rem;
  }
}
</style>
