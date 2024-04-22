<script lang="ts" setup>
import type { MonteItem } from "@/altaSolicitude/dominio/resumen/MontesDelInstrumento";
import { UtilDates } from "@/core/utilities/UtilDates";
import type { ModeloTableItem } from "@/shared/dominio/ModeloTableItem";
import { classFila, containerTableBase } from "@/shared/views/BaseTable/BaseTableComposition";
import type { ItemsBtns } from "@/shared/views/BaseTable/BaseTableInterface";
import Button from "primevue/button";
import Column from "primevue/column";
import DataTable, { type DataTableRowSelectEvent } from "primevue/datatable";
import { computed, ref, toRefs } from "vue";
import { useI18n } from "vue-i18n";

interface Emits {
  (e: "editItem", value: MonteItem): void;
  (e: "deleteItem", value: MonteItem): void;
  (e: "viewItem", value: MonteItem): void;
  (e: "viewMonte", value: MonteItem): void;
}

const emit = defineEmits<Emits>();
const props = defineProps({
  valueTable: {
    type: Array,
    required: true,
  },
  modelo: {
    type: Array<ModeloTableItem>,
    required: true,
  },
  showTitle: {
    type: Boolean,
    default: true,
  },
  titleTable: {
    type: String,
    default: "Datos",
  },
  showEdit: {
    type: Boolean,
    default: false,
  },
  showDelete: {
    type: Boolean,
    default: false,
  },
  showView: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  scrollable: {
    type: Boolean,
    default: false,
  },
  scrollHeight: {
    type: String,
    default: "500px",
  },
});
const { showEdit, showDelete, showView, scrollHeight } = toRefs(props);
const { t } = useI18n();

const existGlobalWarning = computed(() => {
  let exist = false;
  props.valueTable.forEach((value) => {
    if (typeof value.warning !== "undefined" && value.warning.length > 0) {
      exist = true;
    }
  });
  return exist;
});

function formatDate(value: string) {
  return UtilDates.formatDateMoment(value, "DD/MM/YYYY");
}

const crud = ref<ItemsBtns[]>([]);
if (showEdit.value) {
  const item = { type: "edit", enable: true };
  crud.value.push(item);
}
if (showDelete.value) {
  const item = { type: "delete", enable: true };
  crud.value.push(item);
}
if (showView.value) {
  const item = { type: "view", enable: true };
  crud.value.push(item);
}

function onEdit(data: MonteItem) {
  emit("editItem", data);
}
function onDelete(data: MonteItem) {
  emit("deleteItem", data);
}
function onView(data: MonteItem) {
  emit("viewItem", data);
}
function onViewMonte(data: MonteItem) {
  emit("viewMonte", data);
}

function getClassButton(icon: string) {
  let typeClass = "";
  if (icon == "fa fa-envira") {
    typeClass = "fa fa-tree text-success";
  } else if (icon == "a fa-users") {
    typeClass = "fa fa-users text-success";
  } else if (icon == "fa fa-map-marker") {
    typeClass = "fa fa-map-marker text-danger";
  } else {
    typeClass = "fa fa-exclamation text-info";
  }
  return typeClass;
}

function verifyEmpty(data: string | undefined) {
  if (data == "" || data == undefined) {
    data = "-";
  }
  return data;
}
function formatNumber(number: number) {
  if (isNaN(number)) {
    return number;
  }
  return new Intl.NumberFormat("de-DE", { style: "decimal", minimumFractionDigits: 6 }).format(
    number
  );
}
function rowSelected(event: DataTableRowSelectEvent) {
  onViewMonte(event.data);
}
</script>
<template>
  <div class="BaseTablePredios">
    <div v-if="showTitle" class="title">{{ titleTable }}</div>
    <div :class="containerTableBase">
      <DataTable
        :rowClass="classFila"
        :value="valueTable"
        scrollable
        :loading="loading"
        :scrollHeight="scrollHeight"
        selectionMode="single"
        @rowSelect="rowSelected">
        <template #empty>
          <div class="empty-apartados">
            {{ t("alta-solicitude.limitacions.sin-resultados") }}
          </div>
        </template>
        <Column headerClass="warning" field="warning" v-if="existGlobalWarning">
          <template #body="slotProps">
            <div class="d-flex">
              <div
                v-for="(value, index) in slotProps.data.warning"
                v-show="value.message !== ''"
                :key="index"
                class="containerWarnings ttip">
                <p>
                  <i
                    v-tooltip.right="value.message"
                    :class="getClassButton(value.icon)"
                    aria-hidden="true" />
                </p>
              </div>
            </div>
          </template>
        </Column>
        <Column
          v-for="(value, index) in modelo"
          :key="index"
          :sortable="value.sort"
          :field="value.campo"
          :dataType="value.type"
          :header="t(value.title)">
          <template #body="slotProps">
            <div v-if="value.campo == 'nombreMonte'" class="nameMonte">
              <span> {{ slotProps.data[value.campo] }} </span>
            </div>
            <div v-else-if="value.title == 'Superficie'" class="superficie">
              {{ formatNumber(slotProps.data[value.campo]) }}
            </div>
            <div v-else-if="value.campo == 'superficieTotalOrdenada'" class="superficie">
              {{ formatNumber(slotProps.data[value.campo]) }}
            </div>
            <div v-else-if="value.type == 'date'">
              {{ formatDate(slotProps.data[value.campo]) }}
            </div>
            <div v-else>
              {{ verifyEmpty(slotProps.data[value.campo]) }}
            </div>
          </template>
        </Column>
        <Column>
          <template #body="slotProps">
            <div class="actions">
              <Button
                v-if="showEdit"
                icon="fa fa-pencil"
                severity="info"
                rounded
                text
                @click="onEdit(slotProps.data)" />
              <Button
                v-if="showDelete"
                icon="fa fa-times"
                severity="danger"
                rounded
                text
                @click="onDelete(slotProps.data)" />
              <Button
                v-if="showView"
                icon="fa fa-eye"
                severity="info"
                rounded
                text
                @click="onView(slotProps.data)" />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>
<style lang="scss">
.BaseTablePredios {
  .title {
    font-size: 20px;
    color: black;
  }

  .empty-apartados {
    color: rgb(112, 112, 112) !important;
    text-align: center;
  }

  .nameMonte {
    min-width: 20rem;
  }

  .superficie {
    text-align: center;
    width: 8rem;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
