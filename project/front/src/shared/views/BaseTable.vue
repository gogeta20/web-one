<script lang="ts" setup>
import { UtilDates } from "@/core/utilities/UtilDates";
import {
  classFila,
  containerTableBase,
  footerClassCenterResolve,
  footerResolve,
} from "@/shared/views/BaseTable/BaseTableComposition";
import type { ItemsBtns } from "@/shared/views/BaseTable/BaseTableInterface";
//import Button from "primevue/button";
import Column from "primevue/column";
import ConfirmPopup from "primevue/confirmpopup";
import DataTable, {
  type DataTableRowSelectEvent,
  type DataTableSortMeta,
} from "primevue/datatable";
import { useConfirm } from "primevue/useconfirm";
import { PropType, computed, ref, toRefs } from "vue";
import { useI18n } from "vue-i18n";
import type { ErrorCeldas } from "../../altaSolicitude/dominio/files/errorProcesado/ErrorProcesado";
import { iconDanger, iconInfo, iconSuccess, iconWarning } from "./BaseTable/BaseTableComposition";

const { t } = useI18n();
const confirm = useConfirm();

interface Emits {
  (e: "editItem", value: any): void;
  (e: "deleteItem", value: any): void;
  (e: "viewItem", value: any): void;
}
const emit = defineEmits<Emits>();

const props = defineProps({
  valueTable: {
    type: Array,
    required: true,
  },
  modelo: {
    type: Object,
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
  deleteMessage: {
    type: String,
    default: "",
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
  responsiveLayout: {
    type: String,
    default: "",
  },
  hideHeaderTable: {
    type: Boolean,
    default: false,
  },
  sortMode: {
    type: String,
    default: "",
  },
  sortField: {
    type: String,
    default: "",
  },
  multiSortMeta: {
    type: Array as PropType<DataTableSortMeta[]>,
    default: () => [{}],
  },
  sortOrder: {
    type: Number,
    default: 0,
  },
});
const {
  showEdit,
  showDelete,
  showView,
  scrollHeight,
  responsiveLayout,
  hideHeaderTable,
  sortMode,
  sortField,
  multiSortMeta,
  sortOrder,
} = toRefs(props);

const existGlobalWarning = computed(() => {
  let exist = false;
  props.valueTable.forEach((value) => {
    if (existWarning(value)) {
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

function onEdit(data: any) {
  emit("editItem", data);
}
function onDelete(event: Event, data: any) {
  if (event.currentTarget !== null) {
    const target: HTMLElement = event.currentTarget as HTMLElement;
    confirm.require({
      target: target,
      message: props.deleteMessage,
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        emit("deleteItem", data);
      },
    });
  }
}
function onView(data: any) {
  emit("viewItem", data);
}

function getClassButton(level: string) {
  let typeClass = "";
  if (level == "danger") {
    typeClass = iconDanger;
  } else if (level == "warning") {
    typeClass = iconWarning;
  } else if (level == "success") {
    typeClass = iconSuccess;
  } else {
    typeClass = iconInfo;
  }
  return typeClass;
}

function existWarning(data: any) {
  if (Object.prototype.hasOwnProperty.call(data, "warning")) {
    const item = data.warning;
    const itemLevel = data.level;
    if (itemLevel == "none") {
      return false;
    }
    if (Object.prototype.hasOwnProperty.call(item, "message")) {
      return true;
    }
  }
  return false;
}
function verifyEmpty(data: string | undefined | number) {
  if (data == "" || data == undefined) {
    data = "-";
  }
  return data;
}
function verifyEmptyError(data: string | undefined | number) {
  if (data == "" || data == undefined) {
    data = `\xa0`;
  }
  return data;
}
function titleArrayDiv(dataArray: string[]) {
  let formatTitle = "";
  for (const data in dataArray) {
    formatTitle += dataArray[data];
    formatTitle += "\r\n";
  }

  return formatTitle;
}
function rowSelected(event: DataTableRowSelectEvent) {
  if (showEdit.value) {
    onEdit(event.data);
  } else {
    onView(event.data);
  }
}
function formatTitle(title: string, type: string) {
  if (!hideHeaderTable.value) {
    if (type === "raw") {
      return title;
    } else {
      return t(title);
    }
  } else {
    return "";
  }
}
function resolveColumnStyle(width: number) {
  if (width === 0) {
    return "";
  } else {
    return "min-width: " + width + "rem";
  }
}
function titleCampoError(arrayErrores: ErrorCeldas[], keys: string[], campo: string) {
  let titleCampoError = "";

  arrayErrores.forEach((error: ErrorCeldas) => {
    if (typeof error["tipoNotificacion"] !== "undefined") {
      if (
        typeof error["indiceColumna"] !== "undefined" &&
        keys[parseInt(error["indiceColumna"])] === campo
      ) {
        if (typeof error["descripcionError"] !== "undefined") {
          titleCampoError = error["descripcionError"];
        }
      }
    } else {
      if (typeof error["indiceColumna"] !== "undefined") {
        const indiceColumna = parseInt(error["indiceColumna"]) + 1;
        if (keys[indiceColumna] === campo && typeof error["error"] !== "undefined") {
          error["error"].forEach((cadenaError: string) => {
            if (titleCampoError !== "") {
              titleCampoError += "</br>";
            }
            titleCampoError += cadenaError;
          });
        }
      }
    }
  });

  return titleCampoError;
}
function classCampoError(arrayErrores: ErrorCeldas[], keys: string[], campo: string) {
  let classCampoError = "";

  arrayErrores.forEach((error: ErrorCeldas) => {
    if (typeof error["tipoNotificacion"] !== "undefined") {
      if (
        typeof error["indiceColumna"] !== "undefined" &&
        keys[parseInt(error["indiceColumna"])] === campo
      ) {
        if (error["tipoNotificacion"] === "ERROR") {
          classCampoError = "errorCell";
        } else if (error["tipoNotificacion"] === "AVISO") {
          classCampoError = "warningCell";
        }
      }
    } else {
      const indiceColumna = parseInt(error["indiceColumna"]) + 1;
      if (keys[indiceColumna] === campo) {
        if (error["indiceColumna"] !== null && keys[indiceColumna] === campo) {
          classCampoError = "errorCell";
        }
      }
    }
  });

  return classCampoError;
}
</script>
<template>
  <ConfirmPopup />
  <div class="BaseTable">
    <label v-if="showTitle" class="title"> {{ titleTable }} </label>
    <div :class="containerTableBase">
      <DataTable
        :rowClass="classFila"
        :value="valueTable"
        :scrollable="scrollable"
        :loading="loading"
        :sortMode="sortMode === 'multiple' ? 'multiple' : 'single'"
        :sortField="sortMode !== 'multiple' ? sortField : ''"
        :sortOrder="sortMode !== 'multiple' ? sortOrder : undefined"
        :multiSortMeta="sortMode === 'multiple' ? multiSortMeta : undefined"
        :responsiveLayout="responsiveLayout"
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
            <div
              v-if="existWarning(slotProps.data)"
              v-tooltip.right="t(slotProps.data.warning.message)">
              <Button
                :disabled="true"
                :icon="slotProps.data.warning.icon"
                :class="getClassButton(slotProps.data.warning.level)" />
            </div>
          </template>
        </Column>
        <Column
          v-for="(value, index) in modelo"
          :key="index"
          :sortable="value.sort"
          :field="value.campo"
          :dataType="value.type"
          :style="resolveColumnStyle(value.width)"
          :header="formatTitle(value.title, value.type)">
          <template #body="slotProps">
            <div v-if="value.type == 'date'">
              {{ formatDate(slotProps.data[value.campo]) }}
            </div>
            <div v-else-if="value.type == 'arrayUnidimensional'">
              <div
                v-if="
                  Array.isArray(slotProps.data[value.campo]) &&
                  slotProps.data[value.campo].length > 0
                "
                class="column-array"
                :title="titleArrayDiv(slotProps.data[value.campo])">
                <span
                  v-for="(valorArray, indexArray) in slotProps.data[value.campo]"
                  :key="indexArray">
                  <div v-if="typeof value.arrayLength === 'undefined' || value.arrayLength === 0">
                    {{ valorArray }} <br />
                  </div>
                  <div v-else>
                    <div v-if="indexArray < value.arrayLength">{{ valorArray }} <br /></div>
                  </div>
                </span>
                <div v-if="typeof value.arrayLength !== 'undefined' && value.arrayLength > 0">
                  <div v-if="slotProps.data[value.campo].length > value.arrayLength">...</div>
                </div>
              </div>
              <div v-else>
                <p>-</p>
              </div>
            </div>
            <div v-else-if="value.type == 'raw'">
              <div
                v-if="slotProps.data['errores'] !== null && slotProps.data['errores'].length > 0"
                :title="
                  titleCampoError(
                    slotProps.data['errores'],
                    Object.keys(slotProps.data),
                    value.campo
                  )
                "
                :class="
                  classCampoError(
                    slotProps.data['errores'],
                    Object.keys(slotProps.data),
                    value.campo
                  )
                ">
                {{ verifyEmptyError(slotProps.data[value.campo]) }}
              </div>
              <div v-else>
                {{ verifyEmpty(slotProps.data[value.campo]) }}
              </div>
            </div>
            <div v-else>
              {{ verifyEmpty(slotProps.data[value.campo]) }}
            </div>
          </template>
          <template v-if="footerResolve(value.footer) !== ''" #footer>
            <div :class="footerClassCenterResolve(value.footer, value.center)">
              {{ value.footer }}
            </div>
          </template>
        </Column>
        <Column>
          <template #body="slotProps">
            <div class="actions">
              <Button
                v-if="showEdit"
                v-tooltip.left="t('core.buttons.edit')"
                icon="fa fa-pencil"
                severity="info"
                rounded
                text
                @click="onEdit(slotProps.data)" />
              <Button
                v-if="showDelete"
                v-tooltip.left="t('core.buttons.delete')"
                icon="fa fa-times"
                severity="danger"
                rounded
                text
                @click="onDelete($event, slotProps.data)" />
              <Button
                v-if="showView"
                v-tooltip.left="t('core.buttons.see')"
                icon="fa fa-eye"
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
.BaseTable {
  .title {
    font-size: 20px;
    color: black;
  }

  .empty-apartados {
    color: rgb(112, 112, 112) !important;
    text-align: center;
  }

  .warning {
    width: 4rem;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
  }

  .errorCell {
    background: #f9a0a0;
    border: 1px solid var(--error);
  }

  .warningCell {
    background: #ffe0b4;
    border: 1px solid var(--warning-color);
  }
}
</style>
