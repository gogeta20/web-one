<script setup>
import i18nES from '@/core/i18n/devExtreme/es.json';
import I18nGL from '@/core/i18n/devExtreme/gl.json';
import DxChart, {
  DxAdaptiveLayout,
  DxCommonSeriesSettings,
  DxSize,
  DxTooltip,
} from 'devextreme-vue/chart';
import DxPivotGrid, {
  DxExport,
  DxFieldChooser,
  DxFieldPanel,
  DxStateStoring,
} from 'devextreme-vue/pivot-grid';
import { exportPivotGrid } from 'devextreme/excel_exporter';
import { loadMessages, locale } from 'devextreme/localization';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';
import Checkbox from 'primevue/checkbox';
import { onMounted, ref, toRefs } from 'vue';

loadMessages(I18nGL);
loadMessages(i18nES);
locale(navigator.language);

const props = defineProps({
  dataSource: {
    type: Object,
    required: true,
  },
  rangeValues: {
    type: Array,
    default: () => [],
  },
  rangeColors: {
    type: Array,
    default: () => [],
  },
  title: {
    type: String,
    default: '',
  },
  keyStorage: {
    type: String,
    default: '_pivot_grid_',
  },
  nameFile: {
    type: String,
    default: 'datos',
  },
});

const main = ref(null);
const grid = ref(null);
const chart = ref(null);
const checked = ref(true);

const { dataSource, nameFile } = toRefs(props);

onMounted(() => {
  const pivotGrid = grid.value?.instance;
  const chartView = chart.value?.instance;
  pivotGrid?.bindChart(chartView, {
    dataFieldsDisplayMode: 'splitPanes',
    alternateDataFields: false,
  });
  checked.value = false;
});

const customizeTooltip = (args) => {
  const { originalValue, argumentText, seriesName, percentText } = args;
  return {
    html: `${seriesName} | ${argumentText}<div>| Total: ${originalValue}</div> <div> | Porcentaje:  ${percentText}</div> `,
  };
};
const isDataCell = (cell) => {
  return cell.area === 'data' && cell.rowType === 'D' && cell.columnType === 'D';
};

const isTotalCell = (cell) => {
  return (
    cell.type === 'T' ||
    cell.type === 'GT' ||
    cell.rowType === 'T' ||
    cell.rowType === 'GT' ||
    cell.columnType === 'T' ||
    cell.columnType === 'GT'
  );
};

const getCssStyles = ({ fill, font, bold }) => {
  return {
    'background-color': `#${fill}`,
    color: `#${font}`,
    'font-weight': bold ? 'bold' : undefined,
  };
};

const getExcelCellFormat = ({ fill, font, bold }) => {
  return {
    fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: fill } },
    font: { color: { argb: font }, bold },
  };
};

const getConditionalAppearance = (cell) => {
  if (isTotalCell(cell)) {
    return { fill: 'F2F2F2', font: '3F3F3F', bold: true };
  }
  const { value } = cell;
  const rangeValues = props.rangeValues;
  const rangeColors = props.rangeColors;

  const range = rangeValues.find((item) => value <= item);
  if (range) {
    return rangeColors[rangeValues.indexOf(range)];
  }
  return { font: '444', fill: 'FFFFFF' };
};

const onCellPrepared = ({ cell, area, cellElement }) => {
  cell.area = area;
  if (isDataCell(cell) || isTotalCell(cell)) {
    const appearance = getConditionalAppearance(cell);
    Object.assign(cellElement.style, getCssStyles(appearance));
  }
};

const onExporting = async (e) => {
  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet('Bahia sheet');
  await exportPivotGrid({
    component: e.component,
    worksheet: worksheet,
    customizeCell: ({ pivotCell, excelCell }) => {
      if (isDataCell(pivotCell) || isTotalCell(pivotCell)) {
        const appearance = getConditionalAppearance(pivotCell);
        Object.assign(excelCell, getExcelCellFormat(appearance));
      }
      const borderStyle = { style: 'thin', color: { argb: 'FF7E7E7E' } };
      excelCell.border = {
        bottom: borderStyle,
        left: borderStyle,
        right: borderStyle,
        top: borderStyle,
      };
    },
  });
  const bufferXLSX = await workbook.xlsx.writeBuffer();
  const bufferCSV = await workbook.csv.writeBuffer();
  const now = new Date().toLocaleDateString();
  const blobXLSX = new Blob([bufferXLSX], { type: 'application/octet-stream' });
  const blobCSV = new Blob([bufferCSV], { type: 'application/octet-stream' });
  const fileNameXLSX = `${nameFile.value}_${now}.xlsx`;
  const fileNameCSV = `${nameFile.value}_${now}.csv`;
  const imageName = `grafico_${now}`;
  const imageExtencion = 'png';
  await Promise.all([saveAs(blobXLSX, fileNameXLSX), saveAs(blobCSV, fileNameCSV)]);
  chart.value.instance.exportTo(imageName, imageExtencion);
  e.cancel = true;
};

const onContextMenuPreparing = (e) => {
  const source = e.component.getDataSource();
  const sourceField = e.field;

  if (sourceField) {
    if (!sourceField.groupName || sourceField.groupIndex === 0) {
      e.items.push({
        text: 'Hide field',
        onItemClick() {
          let fieldIndex;
          if (sourceField.groupName) {
            fieldIndex = source.getAreaFields(sourceField.area, true)[sourceField.areaIndex].index;
          } else {
            fieldIndex = sourceField.index;
          }

          source.field(fieldIndex, {
            area: null,
          });
          source.load();
        },
      });
    }

    if (sourceField.dataType === 'number') {
      const setSummaryType = function (args) {
        source.field(sourceField.index, {
          summaryType: args.itemData.value,
        });

        source.load();
      };
      const menuItems = [];

      e.items.push({ text: 'Summary Type', items: menuItems });

      ['Sum', 'Avg', 'Min', 'Max'].forEach((summaryType) => {
        const summaryTypeValue = summaryType.toLowerCase();

        menuItems.push({
          text: summaryType,
          value: summaryType.toLowerCase(),
          onItemClick: setSummaryType,
          selected: e.field.summaryType === summaryTypeValue,
        });
      });
    }
  }
};

defineExpose({
  pivotGrid: grid,
});
</script>

<template>
  <div ref="main" class="main dx-viewport">
    <div class="bh-field-checkbox">
      <Checkbox id="binary" v-model="checked" :binary="true" />
      <label for="binary">Mostrar/Ocultar gráfico</label>
    </div>
    <DxChart v-show="checked" ref="chart" :title="title">
      <DxTooltip :enabled="true" :customize-tooltip="customizeTooltip" />
      <DxAdaptiveLayout :width="450" />
      <DxSize :height="320" />
      <DxCommonSeriesSettings
        type="bar"
        hover-mode="allArgumentPoints"
        selection-mode="allArgumentPoints" />
    </DxChart>
    <DxPivotGrid
      id="pivotgrid"
      ref="grid"
      :data-source="dataSource"
      :show-column-lines="false"
      :show-row-lines="false"
      :show-borders="false"
      :row-alternation-enabled="true"
      :allow-sorting-by-summary="true"
      :allow-filtering="true"
      :show-column-grand-totals="false"
      :show-row-grand-totals="false"
      :show-row-totals="true"
      :show-column-totals="false"
      :height="490"
      :on-context-menu-preparing="onContextMenuPreparing"
      @exporting="onExporting"
      @cell-prepared="onCellPrepared">
      <DxExport :enabled="true" />
      <DxFieldChooser :enabled="true" title="Configuracion" :allow-search="true" />
      <DxFieldPanel
        :show-column-fields="true"
        :show-data-fields="true"
        :show-filter-fields="true"
        :show-row-fields="true"
        :allow-field-dragging="true"
        :visible="true" />

      <DxStateStoring :enabled="true" type="localStorage" :storage-key="keyStorage" />
    </DxPivotGrid>
  </div>
</template>

<style lang="scss">
@import 'devextreme/dist/css/dx.light.css';
@import 'devextreme/dist/css/dx.common.css';

.main {
  content-visibility: auto;
  contain-intrinsic-size: 1000px;
  overflow: auto;
}

.bh-field-checkbox {
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
