<template>
<div class="ui-snb-table">
  <div class="table-fixed">
    <table-content class="table-fixed-top"
      contentType="header"
      :panes="columns"
      :sort="sort"
      :colsWidth="colsWidth"
      :distanX="distanX"

      @headerColsWidth="setHeaderColsWidth"
      @handleHeadSortClick="handleHeadSortClick"
    />
    <table-content class="table-fixed-left"
      contentType="leftFixed"
      :showHeader="true"
      :panes="columns"
      :sort="sort"
      :colsWidth="colsWidth"
      :distanX="distanX"

      @handleHeadSortClick="handleHeadSortClick"
      :style="{
        width: leftColumnWidth + 'px'
      }"
    />
  </div>
</div>
</template>

<script>
import TableContent from './table-content.vue';
export default {
  name: 'snb-table-header',
  components: {
    TableContent,
  },
  props: {
    columns: { // 各个列属性
      type: Array,
      default: () => [],
    },
    colsWidth: { // 表格各列宽度
      type: Array,
      default: () => [],
    },
    distanX: { // table移动位置
      type: Number,
      default: 0,
    },
    defaultSort: { // 默认排序 由于涉及到数据分页这里只显示 不对数据进行排序处理
      type: Object,
      default: () => {}
    },
    sortState: { // 手动排序
      type: Object,
      default: () => {}
    },
  },
  data () {
    return {
      hasFixedCell: false, // 是否存在固定列
      tableWrapperWidth: 0, // 表格实际宽度
      sort: {
        prop: '',
        order: '',
        defaultProp: ''
      },
      rows: [],
      panes: [],
    };
  },
  computed: {
    // 固定列宽度
    leftColumnWidth () {
      if (!this.colsWidth.length) {
        return 0;
      }
      return this.colsWidth[0] * 1 || 0;
    },
  },
  created() {
    this.sort.prop = this.defaultSort ? this.defaultSort.prop : '';
    this.sort.order = this.defaultSort ? this.defaultSort.order : '';
    this.sort.defaultProp = this.defaultSort ? this.defaultSort.prop : '';
  },
  async mounted () {
  },
  methods: {
    // 数据排序
    handleHeadSortClick (column) {
      if (this.sort.prop !== column.prop) {
        this.sort.prop =  column.prop;
        this.sort.order = 'desc';
      } else {
        this.sort.order = this.sort.order || 'desc';
      }
      this.$emit('sortChange', this.sort);
    },
    // 设置全列宽
    setHeaderColsWidth (widths = []) {
      this.$emit('headerColsWidth', widths);
    },
  },
  watch: {
    // 定义排序显示状态
    sortState (sort = {}) {
      this.sort.order = sort.order || this.defaultSort.order || '';
    }
  }
};
</script>
<style lang="stylus">
.ui-snb-table
  position relative
  width 100%
  overflow hidden
  .table-fixed
    .table-fixed-top
      position absolute
      left 0
      top 0
      z-index 8
      overflow hidden
      width 100%
      background #dfd
    .table-fixed-left
      position absolute
      left 0
      top 0
      z-index 9
      overflow hidden
      background #fdd
      &.in-fixed-table
        box-shadow 0 0 5px rgba(0,0,0,.12)
  .hidden-columns
    display none
  th,td
    margin 0
    padding 0   
    white-space nowrap
    border 1px solid #ccc
    text-align left
    .cell
      padding 10px 5px
  .is-left
    text-align left
  .is-right
    text-align right 
  .is-center
    text-align center 
</style>
