<template>
<div v-if="false">
  <slot></slot>
</div>
</template>
<script>
export default {
  props: {
    prop: { default: null, type: String },
    label: { default: null, type: String },
    align: { default: null, type: String },
    width: { default: null, type: String },
    sortable: { default: false, type: Boolean },
    fixed: { default: false, type: Boolean },
    formatter: { default: v => v, type: Function },
  },
};
</script>
