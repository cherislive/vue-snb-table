<template>
<tr ref="tableTrWrapper">
  <td 
    v-for="(column, index) in columns" 
    :key="column.type" 
    :class="[
      'table-column', 
      column.align ? `is-${column.align}`: '',
      index === 0 ? 'first-table-column' : '', 
      index === columns.length - 1 ? 'last-table-column' : '',
    ]" 
    :style="minWidth(column.width)"
    @click="rowClick"
  >
    <TableCell
      :colspan="index"
      :row="row"
      :column="column"
    ></TableCell>
  </td>
</tr>
</template>

<script>
import TableCell from './table-cell';
export default {
  name: 'snb-table-row',
  components: {
    TableCell,
  },
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    row: {
      type: Object,
      default: () => {}
    },
    isLastRow: {
      type: Boolean,
      default: false
    },
  },
  data () {
    return {
    };
  },
  computed: {
  },
  created() {
  },
  mounted () {
    this.getCellsWidth();
  },
  methods: {
    getCellsWidth () {
      if (!this.isLastRow) return;
      this.$nextTick(() => {
        const _colWidth = [];
        let _childDomArr = this.$refs.tableTrWrapper.querySelectorAll('.table-column');
        for (let i = 0; i < _childDomArr.length; i++) {
          _colWidth.push(_childDomArr[i].offsetWidth);
        }
        this.$emit('colsWidth', _colWidth);
      });
    },
    minWidth (width) {
      if (width) {
        return { 'min-width': `${width}px` };
      }
    },
    rowClick () {
      this.$emit('rowClick', this.row);
    }
  },
  watch: {
    columns () {
      if (!this.isLastRow) return;
      this.getCellsWidth(); // 获取列宽度
    }
  }
};
</script>
