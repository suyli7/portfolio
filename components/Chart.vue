<template>
  <div class="chart">
    <span class="styled-text">recent gameplay time spent..</span>
    <div
      class="chart-item" 
      v-for="item in data"
      :key="item.name"
    >
      <span>
        {{item.name}} :: {{ `${item.percent * 100}%` }}
      </span>
      <div class="chart-item__block" :style="`width: ${item.percent * 100}%`">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: Array
  },
}
</script>
<style lang="scss" scoped>
  .chart {
    padding: $spacing-s;
    border: $border;
    margin-top: $spacing-xs;
  }
  .chart-item{
    margin-top: $spacing-xxs;
    span {
      font-size: $fs-xxs;
    }
    &__block {
      background: var(--text-color);
      height: 4px;
    }
  }
</style>