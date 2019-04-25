import SnbTable from './table.vue';
import SnbTableColumn from './table-column.vue';
import SnbTableHeader from './table-header.vue';
export default {
  install(Vue) {
      Vue.component('snb-table', SnbTable);
      Vue.component('snb-table-column', SnbTableColumn);
      Vue.component('snb-table-header', SnbTableHeader);
  },
  settings() {
  },
};
export {
  SnbTable,
  SnbTableColumn,
  SnbTableHeader
};