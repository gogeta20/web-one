<script setup lang="ts">
import { useAyudaStore } from "@/shared/store/ayudaStore";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
const ayudaStore = useAyudaStore();
const { t } = useI18n();
const datosContactoProvincias = computed(() => {
  return ayudaStore.datosContacto.datosContacto;
});
const loadingDatosContacto = computed(() => {
  return ayudaStore.loadingDatosContacto;
});

function formatEmail(email: string) {
  return "mailto: " + email;
}
</script>

<template>
  <div>
    <div v-if="!loadingDatosContacto">
      <div>
        <div class="row subrayado">
          <div class="col-1 apartado-contacto" />
          <div class="strong-no-margin col-2 apartado-contacto">
            {{ datosContactoProvincias.CORUÑA.provincia }}
          </div>
          <div class="strong-no-margin col-3 apartado-contacto">
            {{ datosContactoProvincias.LUGO.provincia }}
          </div>
          <div class="strong-no-margin col-3 apartado-contacto">
            {{ datosContactoProvincias.OURENSE.provincia }}
          </div>
          <div class="strong-no-margin col-3 apartado-contacto">
            {{ datosContactoProvincias.PONTEVEDRA.provincia }}
          </div>
        </div>
        <div class="row apartado-contacto-fila">
          <div class="col-1 apartado-contacto">
            <i class="icon-custom fa-solid fa-square-phone" />
          </div>
          <div class="col-2 apartado-contacto">{{ datosContactoProvincias.CORUÑA.telefono }}</div>
          <div class="col-3 apartado-contacto">{{ datosContactoProvincias.LUGO.telefono }}</div>
          <div class="col-3 apartado-contacto">{{ datosContactoProvincias.OURENSE.telefono }}</div>
          <div class="col-3 apartado-contacto">
            {{ datosContactoProvincias.PONTEVEDRA.telefono }}
          </div>
        </div>
        <div class="row apartado-contacto-fila">
          <div class="col-1 apartado-contacto">
            <i class="icon-custom fa-solid fa-square-envelope" />
          </div>
          <div class="col-2 apartado-contacto">
            <a
              v-if="datosContactoProvincias.CORUÑA.email !== ''"
              class="subrayado-custom"
              :href="formatEmail(datosContactoProvincias.CORUÑA.email)"
              >{{ datosContactoProvincias.CORUÑA.email }}</a
            >
          </div>
          <div class="col-3 apartado-contacto">
            <a
              v-if="datosContactoProvincias.LUGO.email !== ''"
              class="subrayado-custom"
              :href="formatEmail(datosContactoProvincias.LUGO.email)"
              >{{ datosContactoProvincias.LUGO.email }}</a
            >
          </div>
          <div class="col-3 apartado-contacto">
            <a
              v-if="datosContactoProvincias.OURENSE.email !== ''"
              class="subrayado-custom"
              :href="formatEmail(datosContactoProvincias.OURENSE.email)"
              >{{ datosContactoProvincias.OURENSE.email }}</a
            >
          </div>
          <div class="col-3 apartado-contacto">
            <a
              v-if="datosContactoProvincias.PONTEVEDRA.email !== ''"
              class="subrayado-custom"
              :href="formatEmail(datosContactoProvincias.PONTEVEDRA.email)"
              >{{ datosContactoProvincias.PONTEVEDRA.email }}</a
            >
          </div>
        </div>
      </div>
      <div class="margen_superior_10 resumo_xorfor">
        <span class="apartado-contacto">{{ t("axuda.dudas-datos-contacto-a") }}</span>
        <span class="apartado-contacto">{{ t("axuda.dudas-datos-contacto-b") }}</span>
      </div>
    </div>
    <div v-else class="list-loading">
      <i class="pi pi-spin pi-spinner" style="font-size: 3rem" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.icon-custom {
  color: var(--primary-color);
  justify-content: center;
  display: flex;
  font-size: 2rem;
  padding: 5px;
}
.strong-no-margin {
  font-weight: bold;
}
.subrayado-custom {
  color: var(--primary-color);
  border-bottom: solid 1px var(--primary-color);
}
.apartado-contacto {
  display: flex;
  justify-content: center;
  align-items: center;
}

.apartado-contacto-fila {
  border-bottom: solid;
  border-width: 2px;
  border-color: #d5d5d5;
}
.resumo_xorfor {
  margin: 0px;
  border: 2px solid #cfcfcf;
  border-radius: 12px;
  padding: 10px;
  text-align: center;
  color: #0079ac;
  background-color: #cceecc;
  margin-top: 10px;
  font-weight: bold;
  font-size: 1.2em;
}
</style>
