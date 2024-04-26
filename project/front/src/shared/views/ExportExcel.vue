<script setup lang="ts">
import i18nES from "@/core/i18n/devExtreme/es.json";
import I18nGL from "@/core/i18n/devExtreme/gl.json";
import type { ModeloTableItem } from "@/shared/dominio/ModeloTableItem";
import {
  DxColumn,
  DxDataGrid,
  DxExport,
  DxGrouping,
  DxGroupPanel,
  DxSelection,
} from "devextreme-vue/data-grid";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import { exportDataGrid } from "devextreme/excel_exporter";
import { loadMessages, locale } from "devextreme/localization";
import { Workbook } from "exceljs";
import saveAs from "file-saver";
//import Button from "primevue/dialog";
import { toRefs } from "vue";

loadMessages(I18nGL);
loadMessages(i18nES);
locale(navigator.language);
interface Emits {
  (e: "update:visible", value: boolean): void;
}
const emit = defineEmits<Emits>();
const props = defineProps({
  visible: {
    type: Boolean,
  },
  datos: {
    type: Array<unknown>,
    required: true,
  },
  modelo: {
    type: Array<ModeloTableItem>,
    required: true,
  },
  keyMain: {
    type: String,
    required: true,
  },
  showKey: {
    type: Boolean,
    default: true,
  },
  nameFile: {
    type: String,
    default: "datos",
  },
  csv: {
    type: Boolean,
    default: false,
  },
});
const { nameFile, csv, showKey, keyMain } = toRefs(props);
const TYPE_XLSX = ".xlsx";
const TYPE_CSV = ".csv";
const TYPE = csv.value ? "csv" : "xlsx";
const title = csv.value ? "Exportar a documento Csv" : "Exportar a Excel";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function onExporting(e: any) {
  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet("Employees");

  exportDataGrid({
    component: e.component,
    worksheet,
    autoFilterEnabled: true,
  }).then(() => {
    if (csv.value) {
      workbook.csv.writeBuffer().then(function (buffer) {
        saveAs(new Blob([buffer], { type: "application/octet-stream" }), nameFile.value + TYPE_CSV);
      });
    } else {
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(
          new Blob([buffer], { type: "application/octet-stream" }),
          nameFile.value + TYPE_XLSX
        );
      });
    }
  });
  e.cancel = true;
}
function onVisibleDialog(value: boolean) {
  emit("update:visible", value);
}

function showKeyMain(field: string) {
  return !(!showKey.value && field === keyMain.value);
}
</script>

<template>
  <Dialog
    :visible="visible"
    :header="title"
    :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    :style="{ width: '80vw' }"
    :maximizable="true"
    :modal="true"
    @update:visible="onVisibleDialog">
    <div class="dx-viewport">
      <div class="demo-container">
        <DxDataGrid
          id="gridContainer"
          :data-source="datos"
          :key-expr="keyMain"
          :show-borders="true"
          @exporting="onExporting">
          <DxGroupPanel :visible="true" />
          <DxGrouping :auto-expand-all="true" />
          <DxExport :enabled="true" :allow-export-selected-data="true" :formats="[TYPE]" />
          <DxSelection mode="multiple" />
          <DxColumn
            v-for="(value, key) in modelo"
            :key="key"
            :caption="value.title"
            :data-field="value.campo"
            :width="[value.width == 0 ? null : value.width]"
            :visible="showKeyMain(value.campo)" />
        </DxDataGrid>
      </div>
    </div>
  </Dialog>
</template>
