<script setup lang="ts">
import { customCookie } from "@/core/config/config";
import { UtilHelper } from "@/core/utilities/UtilHelper";
import { ref } from "vue";
const PATH_LOGIN_EXTRANET = "/Autenticacion/indexExtranet";
const PATH_LOGIN_INTRANET = "/Autenticacion/indexIntranet";
const PATH_INTRANET = "/Autenticacion/dev";
const NAME_COOKIE = "redirectLogin";
const baseUrl = ref("");

const redirect = customCookie.get(NAME_COOKIE);
const base = UtilHelper.getBaseUrl();
let pathResolve = "";
if (redirect == "ldap") {
  pathResolve = PATH_INTRANET;
} else if (redirect == "casIntranet") {
  pathResolve = PATH_LOGIN_INTRANET;
} else {
  pathResolve = PATH_LOGIN_EXTRANET;
}
UtilHelper.deleteCookie(NAME_COOKIE);
baseUrl.value = `${base}${pathResolve}`;
</script>

<template>
  <div class="bh-error">
    <header class="bh-error__header">
      <h1 class="bh-error__title">Sesión finalizada correctamente</h1>
      <h3 class="bh-error__subtitle">Se quere volver iniciar sesión prema no seguiente botón:</h3>
      <h3>
        <a :href="baseUrl">ACCESO</a>
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
    background: url("/images/error/anchor_cancer_bg.png") no-repeat bottom center,
      url("/images/error/cancer_anchor_line_bg.png") repeat-x bottom center;
    background-size: contain;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>
