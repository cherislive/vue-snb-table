<template>
<div class="ui-snb-table">
  <div class="table-fixed">
    <table-content class="table-fixed-top" v-if="showHeader && (hasFixedCell || inHeaderFixed)"
      contentType="header"
      :panes="panes"
      :sort="sort"
      :colsWidth="colsWidth"
      :distanX="distanX"

      :rows="rows"
      @handleHeadSortClick="handleHeadSortClick"
      @translateChange="translateChange"
      :class="{
        'in-fixed-header': inHeaderFixed
      }"
    />
    <table-content class="table-fixed-left" v-if="hasFixedCell"
      contentType="leftFixed"
      :showHeader="showHeader"
      :panes="panes"
      :sort="sort"
      :colsWidth="colsWidth"
      :distanX="distanX"

      :rows="rows"
      @handleHeadSortClick="handleHeadSortClick"
      @translateChange="translateChange"
      @rowClick="rowClick"
      :style="{
        width: leftColumnWidth + 'px'
      }"
      :class="{
        'in-fixed-table': Math.abs(distanX) > 5
      }"
    />
  </div>
  <table-content
    contentType="body"
    :showHeader="showHeader"
    :panes="panes"
    :sort="sort"
    :colsWidth="colsWidth"
    :distanX="distanX"

    :rows="rows"
    @handleHeadSortClick="handleHeadSortClick"
    @colsWidth="setColsWidth"
    @translateChange="translateChange"
    @rowClick="rowClick"
  />
  <div class="hidden-columns"><slot></slot></div>
</div>
</template>

<script>
import TableContent from './table-content.vue';
export default {
  name: 'snb-table',
  components: {
    TableContent,
  },
  props: {
    data: { // table数据
      type: Array,
      default: () => [],
    },
    defaultSort: { // 默认排序 由于涉及到数据分页这里只显示 这里并不会在组件内对数据进行排序处理
      type: Object,
      default: () => {}
    },
    sortState: { // 手动排序 只对表头排序状态进行改变
      type: Object,
      default: () => {}
    },
    headerFixed: { // 表头是否吸顶
      type: Object,
      default: () => {}
    },
    headerColsWidth: { // 表头列宽
      type: Array,
      default: () => [],
    },
    // 是否显示表头
    showHeader: { // 是否显示表头
      type: Boolean,
      default: true
    },
  },
  data () {
    return {
      hasFixedCell: false, // 是否存在固定列
      tableWrapperWidth: 0, // 表格实际宽度
      colsWidth: [], // 表格各列宽度
      sort: {
        prop: '',
        order: '',
        defaultProp: ''
      },
      rows: [],
      panes: [],
      distanX: 0
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
    inHeaderFixed () {
      let _fheaderFixedOpt = this.headerFixed || {};
      return _fheaderFixedOpt.state;
    }
  },
  created() {
    this.sort.prop = this.defaultSort ? this.defaultSort.prop : '';
    this.sort.order = this.defaultSort ? this.defaultSort.order : '';
    this.sort.defaultProp = this.defaultSort ? this.defaultSort.prop : '';
  },
  async mounted () {
    await this.calcPaneInstances(); // 设置表头数据
    await this.mapDataToRows();    // 整理 tbody 数据
    if (this.headerColsWidth && this.headerColsWidth.length) {
      this.emitColsWidth();
    }
  },
  methods: {
    // 设置表头数据
    calcPaneInstances () {
      if (this.$slots.default) {
        const paneSlots = this.$slots.default.filter(vnode => vnode.tag &&
          vnode.componentOptions && 
          vnode.componentOptions.Ctor.options.name === 'snb-table-column'
        );
        const panes = paneSlots.map(({ componentInstance }) => componentInstance);
        const panesChanged = !(panes.length === this.panes.length && panes.every((pane, index) => pane === this.panes[index]));
        if (panesChanged) {
          // this.panes = panes;
          this.reductionColumns(panes);
        }
      } else if (this.panes.length !== 0) {
        // this.panes = [];
        this.reductionColumns();
      }
    },
    // 表头数据整理
    reductionColumns (columns = []) {
      let _columns = [];
      let fixedCell = null;
      if (columns && columns.length) {
        columns.map(item => {
          if (item.fixed && !fixedCell) {
            fixedCell = item || {};
          } else {
            _columns.push(item);            
          }
        });
        if (fixedCell) {
          _columns.unshift(fixedCell);
        }
      }
      this.panes = _columns;
      this.$emit('columnsReady', _columns);
      this.hasFixedCell = !!fixedCell;
    },
    // 整理 tbody 数据
    mapDataToRows () {
      const data = this.data;
      let rowId = 0;
      this.rows = data
        .map(rowData => {
          rowData.__vue_item_id = rowId++;
          return rowData;
        });
    },
    // 数据排序
    handleHeadSortClick (column) {
      if (this.sort.prop !== column.prop) {
        this.sort.prop =  column.prop;
        this.sort.order = 'asc';
      } else {
        this.sort.order = this.sort.order || 'asc';
      }
      this.$emit('sortChange', this.sort, column);
    },
    // 设置全列宽
    setColsWidth (widths = []) {
      this.colsWidth = widths;
      this.emitColsWidth();
    },
    // 设置列宽度
    emitColsWidth () {
      const widths = this.colsWidth;
      if (!widths || !widths.length) return;
      const _headerColsWidth = this.headerColsWidth;
      if (!_headerColsWidth || !_headerColsWidth.length) {
        this.$emit('colsWidth', widths);
        return;
      }
      const _width = [];
      widths.map((width, index) => {
        _width[index] = Math.max(_headerColsWidth[index] || 0, widths[index] || 0);
      });
      this.colsWidth = _width;
      this.$emit('colsWidth', _width);
      this.translateChange(this.distanX);
    },
    // 设置横向偏移量
    translateChange (width) {
      this.distanX = width;
      this.$emit('distanXChange', width);
    },
    // 整行点击
    rowClick (row) {
      this.$emit('rowClick', row);
    }
  },
  watch: {
    data () {
      this.mapDataToRows();    // 整理 tbody 数据
    },
    // 定义排序显示状态
    sortState (sort = {}) {
      this.sort.order = sort.order || this.defaultSort.order || '';
    },
    headerColsWidth () {
      this.emitColsWidth();
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
