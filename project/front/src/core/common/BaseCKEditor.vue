<script setup lang="ts">
import { onMounted, ref, toRefs, watch } from "vue";
const editor = ref(Editor);
const sizeEditor = ref("editor-normal");
const isEditorFocus = ref(false);
const props = defineProps({
  editorValue: {
    type: Object,
    default: () => ({
      textValue: "",
    }),
  },
  editorValueFormat: {
    type: Object,
    default: () => ({
      textValue: "",
    }),
  },
  exteriorExpand: {
    type: Object,
    default: () => ({
      expand: false,
    }),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  mode: {
    type: String,
    default: "base",
  },
  min: {
    type: String,
    default: "200",
  },
  required: {
    type: Boolean,
    default: false,
  },
  config: {
    type: Object,
    default: () => ({
      toolbar: {
        items: [
          "bold",
          "italic",
          "underline",
          "|",
          "removeFormat",
          "|",
          "bulletedList",
          "|",
          "|",
          "cut",
          "copy",
          "paste",
          "|",
          "undo",
          "redo",
          "|",
          "expand",
          "|",
          "insertTable",
        ],
      },
    }),
  },
});
const { editorValue, editorValueFormat, min } = toRefs(props);
const minimo = min.value + "px";
const onReady = (editor: CKEditor) => {
  editor.ui
    .getEditableElement()
    .parentElement.insertBefore(editor.ui.view.toolbar.element, editor.ui.getEditableElement());

  const divRowEditor = document.createElement("div");
  const divEditorContainer = document.createElement("div");

  if (props.mode === "dina4") {
    divRowEditor.className = "ckeditor-dina4-row-editor";
    divEditorContainer.className = "ckeditor-dina4-editor-container";
  } else {
    divRowEditor.className = "ckeditor-base-row-editor";
    divEditorContainer.className = "ckeditor-base-editor-container";
  }

  divRowEditor.appendChild(divEditorContainer);

  editor.ui.view.editable.element.parentElement.insertBefore(
    divRowEditor,
    editor.ui.view.editable.element
  );

  divEditorContainer.appendChild(editor.ui.view.editable.element);
};

const expandEditor = () => {
  if (sizeEditor.value === "editor-normal") {
    sizeEditor.value = "editor-fullscreen";

    props.exteriorExpand.expand = true;
  } else {
    sizeEditor.value = "editor-normal";
    props.exteriorExpand.expand = false;
  }
};

const idEditor = () => {
  return isEditorFocus.value ? "ckeditor-actual-body" : "ckeditor-body";
};

function hoverCkeditor() {
  isEditorFocus.value = true;
}

function leaveCkeditor() {
  isEditorFocus.value = false;
}

function formatTextValue() {
  if (!editorValue.value.textValue.includes("<br")) {
    const reRN = /\r\n/gi;
    editorValue.value.textValue = editorValue.value.textValue.replace(reRN, "<br /><br />");
  }

  editorValueFormat.value.textValue = editorValue.value.textValue;
  const reP = /<p>/gi;
  editorValueFormat.value.textValue = editorValueFormat.value.textValue.replace(reP, "");

  const rePFinal = /<\/p>/gi;
  editorValueFormat.value.textValue = editorValueFormat.value.textValue.replace(
    rePFinal,
    "<br /><br />"
  );

  const reBr = /<br>/gi;
  editorValueFormat.value.textValue = editorValueFormat.value.textValue.replace(reBr, "<br />");

  editorValueFormat.value.textValue = editorValueFormat.value.textValue.replace(/&nbsp;/gi, " ");

  const cadenaFinal = editorValueFormat.value.textValue.slice(
    -12,
    editorValueFormat.value.textValue.length
  );

  if (cadenaFinal === "<br /><br />") {
    editorValueFormat.value.textValue = editorValueFormat.value.textValue.slice(0, -12);
  }
}

watch(
  editorValue,
  () => {
    formatTextValue();
  },
  { deep: true }
);

onMounted(() => {
  formatTextValue();
});
</script>

<template>
  <div
    :id="idEditor()"
    :class="idEditor"
    @expand="expandEditor()"
    @mouseover="hoverCkeditor"
    @mouseleave="leaveCkeditor"
    @focus="hoverCkeditor"
    @blur="leaveCkeditor">
    <div :class="sizeEditor">
    </div>
  </div>
</template>

<style lang="scss" scoped>
.editor-normal {
  background: white;
  border: 1px solid #d5d5d5;
}
.i-required {
  background-color: var(--color-required) !important;
}

.editor-fullscreen {
  background: white;
  border: 1px solid #d5d5d5;
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgb(255, 255, 255);
  z-index: 10;
}

::v-deep(.ckeditor-base-editor-container .base-ckeditor) {
  height: fit-content;
  min-height: v-bind(minimo);
  padding: 0.6cm 0.6cm;
  background-color: white;
  box-sizing: border-box;
}

::v-deep(.ckeditor-dina4-editor-container .base-ckeditor) {
  width: calc(21cm + 2px);
  min-height: calc(29.7cm + 2px);
  height: fit-content;
  padding: 2cm 1.2cm;
  margin: 2.5rem;
  border: 1px hsl(0, 0%, 82.7%) solid;
  background-color: white;
  box-shadow: 0 0 5px hsla(0, 0%, 0%, 0.1);
  box-sizing: border-box;
}

::v-deep(.ckeditor-base-row-editor) {
  position: relative;
  justify-content: center;
  overflow-y: auto;
  background-color: #f2f2f2;
}

::v-deep(.editor-normal .ckeditor-base-row-editor) {
  max-height: 280px;
}

::v-deep(.editor-fullscreen .ckeditor-base-row-editor) {
  max-height: 960px;
}

::v-deep(.ckeditor-dina4-row-editor) {
  display: flex;
  position: relative;
  justify-content: center;
  overflow-y: auto;
  background-color: #f2f2f2;
  border: 1px solid hsl(0, 0%, 77%);
  max-height: 700px;
}

::v-deep(.ckeditor-base-editor-container) {
  flex-direction: row;
  flex-wrap: nowrap;
  position: relative;
  width: 100%;
  justify-content: center;
}

::v-deep(.ckeditor-dina4-editor-container) {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  position: relative;
  width: 100%;
  justify-content: center;
}
</style>
