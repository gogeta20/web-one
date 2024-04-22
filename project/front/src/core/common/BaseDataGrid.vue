<script setup>
import i18nES from '@/core/i18n/devExtreme/es.json';
import I18nGL from '@/core/i18n/devExtreme/gl.json';
import {
  DxColumnChooser,
  DxDataGrid,
  DxExport,
  DxFilterPanel,
  DxFilterRow,
  DxGrouping,
  DxGroupPanel,
  DxHeaderFilter,
  DxPager,
  DxPaging,
  DxSearchPanel,
  DxStateStoring,
} from 'devextreme-vue/data-grid';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { loadMessages, locale } from 'devextreme/localization';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';
import 'jspdf-autotable';
import { ref, toRefs } from 'vue';

loadMessages(I18nGL);
loadMessages(i18nES);
locale(navigator.language);

const props = defineProps({
  dataStore: {
    type: Object,
    required: true,
  },
  keyStorage: {
    type: String,
    default: '_data_grid_',
  },
  nameFile: {
    type: String,
    default: 'datos',
  },
});

const { dataStore, nameFile } = toRefs(props);

const dataGrid = ref(null);

const pageSizes = [10, 25, 50, 100];

const onExporting = async (e) => {
  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet('Bahia sheet');
  await exportDataGrid({
    component: e.component,
    worksheet: worksheet,
    customizeCell: function (options) {
      const excelCell = options;
      excelCell.font = { name: 'Arial', size: 12 };
      excelCell.alignment = { horizontal: 'left' };
    },
  });
  const bufferXLSX = await workbook.xlsx.writeBuffer();
  const bufferCSV = await workbook.csv.writeBuffer();
  const now = new Date().toLocaleDateString();
  const blobXLSX = new Blob([bufferXLSX], { type: 'application/octet-stream' });
  const blobCSV = new Blob([bufferCSV], { type: 'application/octet-stream' });
  const fileNameXLSX = `${nameFile.value}_${now}.xlsx`;
  const fileNameCSV = `${nameFile.value}_${now}.csv`;
  await Promise.all([saveAs(blobXLSX, fileNameXLSX), saveAs(blobCSV, fileNameCSV)]);
  e.cancel = true;
};

defineExpose({
  dataGrid,
});
</script>

<template>
  <div class="dx-viewport">
    <DxDataGrid
      ref="dataGrid"
      :data-source="dataStore"
      :allow-column-reordering="true"
      :row-alternation-enabled="true"
      :show-borders="true"
      :hover-state-enabled="true"
      :show-column-lines="false"
      :show-row-lines="false"
      :allow-sorting-by-summary="true"
      :allow-filtering="true"
      :show-column-grand-totals="false"
      :show-row-grand-totals="false"
      :show-row-totals="true"
      :show-column-totals="false"
      :column-hiding-enabled="true"
      @exporting="onExporting">
      <DxHeaderFilter :visible="true" />
      <DxColumnChooser :enabled="true" mode="select" :allowSearch="true" />
      <DxExport :enabled="true" />
      <DxFilterRow :visible="true" />
      <DxFilterPanel :visible="true" />
      <DxPager :allowed-page-sizes="pageSizes" :show-page-size-selector="true" />
      <DxGroupPanel :visible="true" />
      <DxGrouping :auto-expand-all="false" />
      <DxPaging :page-size="10" />
      <DxSearchPanel :visible="true" :highlight-case-sensitive="true" />
      <DxStateStoring :enabled="true" type="localStorage" :storage-key="keyStorage" />
    </DxDataGrid>
  </div>
</template>

<style lang="scss">
@import 'devextreme/dist/css/dx.light.css';
@import 'devextreme/dist/css/dx.common.css';

.main {
  padding: 1rem;
  content-visibility: auto;
  contain-intrinsic-size: 1000px;
  overflow: auto;
}

.bh-export-pdf {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
}
</style>
