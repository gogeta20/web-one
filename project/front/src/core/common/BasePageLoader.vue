<script lang="ts" setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  text: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div v-if="loading" class="bh-loader">
    <div class="bh-loader__dot" />
    <div class="bh-loader__dot" />
    <div class="bh-loader__text">{{ text === "" ? t("core.states.loading") : text }}</div>
  </div>
</template>
<style lang="scss" scoped>
@keyframes big-o {
  10% {
    opacity: 0.7;
  }
  50% {
    opacity: 0.1;
  }
  100% {
    opacity: 0.7;
  }
}

@keyframes dot1 {
  10% {
    opacity: 0.7;
    transform: rotate(0);
  }
  50% {
    opacity: 0.2;
  }
  100% {
    opacity: 0.7;
    transform: rotate(360deg);
  }
}
@keyframes dot2 {
  10% {
    opacity: 0.1;
    transform: rotate(0);
  }
  50% {
    opacity: 0.7;
  }
  100% {
    opacity: 0.1;
    transform: rotate(-360deg);
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
    visibility: hidden;
  }
  to {
    opacity: 1;
    visibility: visible;
  }
}

.bh-loader {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(17, 132, 185, 0.9);
  z-index: 9999;
  animation: fade-in 0.4s linear 0s forwards;
  &:after {
    content: "";
    opacity: 0.7;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 70px;
    width: 70px;
    background-image: url(/images/loader/loader1.png);
    background-size: 100% 100%;
    background-position: 0 0;
    background-repeat: no-repeat;
    animation: big-o 1.3s infinite linear;
  }
  &__dot {
    opacity: 0.7;
    position: absolute;
    top: 50%;
    left: 50%;
    height: 70px;
    width: 70px;
    margin-top: -35px;
    margin-left: -35px;
    background-image: url(/images/loader/loader2.png);
    background-size: 100% 100%;
    background-position: 0 0;
    background-repeat: no-repeat;
    &:nth-child(1) {
      animation: dot1 1.3s infinite ease-in-out;
    }

    &:nth-child(2) {
      animation: dot2 1.3s infinite ease-in-out;
    }
  }
  &__text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin-top: 55px;
    font-size: 1.2em;
    font-weight: bold;
    color: #fff;
    text-align: center;
    opacity: 0.7;
    animation: fade-in 0.4s linear 0s forwards;
  }
}
</style>
