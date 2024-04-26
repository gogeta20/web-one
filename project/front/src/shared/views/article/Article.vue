<script setup lang="ts" >
const props = defineProps({
  href: {
    type: String,
    default: '',
  },
  image: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  signe: {
    type: String,
    default:'',
  },
});
</script>
<template>
  <div class="item-7">
    <a :href="href" class="card">
      <div class="thumb" :style="image"></div>
      <article>
        <h1>{{ title }}</h1>
        <p>{{ description }}</p>
        <span>{{ signe }}</span>
      </article>
    </a>
  </div>
</template>
<style scoped lang="scss">

.card {
  background: white;
  text-decoration: none;
  color: #444;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  min-height: 100%;

  // sets up hover state
  position: relative;
  top: 0;
  transition: all .1s ease-in;

  &:hover {
    top: -2px;
    box-shadow: 0 4px 5px rgba(0,0,0,0.2);
  }

  article {
    padding: 20px;
    flex: 1;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  h1 {
    font-size: 20px;
    margin: 0;
    color: #333;
  }

  p {
    flex: 1;
    line-height: 1.4;
  }

  span {
    font-size: 12px;
    font-weight: bold;
    color: #999;
    text-transform: uppercase;
    letter-spacing: .05em;
    margin: 2em 0 0 0;
  }

  .thumb {
    padding-bottom: 60%;
    background-size: cover;
    background-position: center center;
  }
}

.item-1 {
  @media (min-width: 60em) {
    grid-column: 1 / span 2;

    h1 {
      font-size: 24px;
    }
  }
}
</style>