<template>
<div class="table-wrapper" ref="tableWrapper">
  <table ref="tableContnt"
    @touchstart="touchStartHandle"
    @touchmove="touchMoveHandle"
    @touchend="touchEndHandle"
    @mousemove="mousemoveHandle"
    @mouseup="mouseupHandle"
    @mousedown="mousedownHandle"
    @webkit-transition-end="onTransitionEnd()"
    @transitionend="onTransitionEnd()"
    :style="{
      width: tableWidth + 'px'
    }"
  >
    <colgroup>
      <col v-for="(item, index) in colsWidth" :key="index" :width="item" />
    </colgroup>
    <thead v-if="showHeader">
      <tr ref="tableTheaderWrapper">
        <table-column-header v-for="(column, index) in panes"
          :class="[
            'table-column', 
            index === 0 ? 'first-table-column' : '', 
            index === panes.length - 1 ? 'last-table-column' : '', 
          ]" 
          :key="column.prop + index"
          :column="column"
          :sort="sort"
          @handleHeadSortClick="handleHeadSortClick"
        ></table-column-header>
      </tr>
    </thead>
    <tbody v-if="contentType !== 'header'">
      <table-row v-for="(row, index) in rows"
        :key="row.__vue_item_id"
        :row="row"
        :columns="panes"
        :isLastRow="index === rows.length - 1"
        @colsWidth="setColsWidth"
        @rowClick="rowClick"
      ></table-row>
    </tbody>
  </table>
</div>
</template>
<script>
import TableColumnHeader from './table-column-header.vue';
import TableRow from './table-row.vue';
export default {
  name: 'snb-table-thead',
  components: {
    TableColumnHeader, TableRow
  },
  props: {
    // 组件容器类型区分
    contentType: {
      type: String,
      default: ''
    },
    // 是否显示表头
    showHeader: {
      type: Boolean,
      default: true
    },
    // 表头格式
    panes: {
      type: Array,
      default: () => []
    },
    // 表内容数据
    rows: {
      type: Array,
      default: () => []
    },
    // 排序筛选
    sort: {
      type: Object,
      default: () => {}
    },
    // 表格各列宽度
    colsWidth: {
      type: Array,
      default: () => []
    },
    distanX: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      tableContnt: null, // table dom 元素
      tableWrapperWidth: 0, // 表格显示宽度
      leftColumnWidth: 0, // 固定列宽度
      direction: null, // 滚动方向标记 left/right
      isAnimation: false, // 动画中状态标记
      start: { // 位置标记 开始
        x: null,
        y: null
      },
      end: { // 位置标记 结束
        x: null,
        y: null
      },
      distan: { // 移动位置标记
        x: 0,
        y: 0
      },
    };
  },
  computed: {
    // 表格实际宽度
    tableWidth () {
      if (!this.colsWidth.length) {
        return Math.ceil(this.tableWrapperWidth);
      }
      let _width = 0;
      this.colsWidth.map(width => {
        _width = _width + width * 1;
      });
      _width = _width ? _width + 1 : _width;
      return Math.ceil(Math.max(_width, this.tableWrapperWidth));
    },
    overflowWidth () {
      return Math.ceil(Math.max(this.tableWidth - this.tableWrapperWidth, 0));
    },
    isScrollTable () {
      return this.tableWidth <= this.tableWrapperWidth;
    }
  },
  created() {
  },
  mounted () {
    this.tableContnt = this.$refs.tableContnt;
    this.setTableWrapperWidth(); // 设置表格实际宽度
    this.getHeaderCellsWidth();
  },
  methods: {
    // 设置表格实际宽度
    setTableWrapperWidth () {
      this.$nextTick(() => {
        this.tableWrapperWidth = this.$refs.tableWrapper && this.$refs.tableWrapper.offsetWidth || 0;       
      });
    },
    // 设置固定列宽
    setCellElWidth (width) {
      this.leftColumnWidth = width * 1;
    },
    // 设置全列宽
    setColsWidth (widths = []) {
      if (this.contentType !== 'body') return;
      this.$emit('colsWidth', widths);
    },
    getHeaderCellsWidth () {
      if (!this.$refs.tableTheaderWrapper) return;
      this.$nextTick(() => {
        const _colWidth = [];
        let _childDomArr = this.$refs.tableTheaderWrapper.querySelectorAll('.table-column');
        for (let i = 0; i < _childDomArr.length; i++) {
          _colWidth.push(_childDomArr[i].offsetWidth);
        }
        this.$emit('headerColsWidth', _colWidth);
      }); 
    },
    // 数据排序
    handleHeadSortClick (column) {
      this.$emit('handleHeadSortClick', column);
    },
    // 设置表格横轴滚动放心
    setTableDistanX () {
      if (this.contentType === 'leftFixed') return;
      this.tableContnt.style['transform'] = 'translateX(' + this.distanX + 'px)';
      this.tableContnt.style['transition'] = 'none';
    },
    /**
     * mousedown handle
     */
    mousedownHandle (event) {
      this.startHandle(event);
    },
    /**
     * mousemove handle
     */
    mousemoveHandle (event) {
      this.moveHandle(event);
    },
    /**
     * mouseup handle
     */
    mouseupHandle (event) {
      this.endHandle(event);
    },
    /**
     * touchstart handle
     */
    touchStartHandle (event) {
      let touch = event.touches[0];
      this.startHandle(touch);
    },
    /**
     * touchmove handle
     */
    touchMoveHandle (event) {
      let touch = event.touches[0];
      this.moveHandle(touch);
    },
    /**
     * touchend handle
     */
    touchEndHandle (event) {
      let touch = event.changedTouches[0];
      this.endHandle(touch);
    },
    onTransitionEnd () {
      this.isAnimation = false;
    },
    startHandle (offset) {
      if (this.contentType !== 'body') return;
      this.isAnimation = true;
      this.start.x = offset.pageX;
      this.start.y = offset.pageY;
    },
    moveHandle (offset) {
      if (this.contentType !== 'body' || !this.isAnimation) return;
      this.end.x = offset.pageX;
      this.end.y = offset.pageY;
      this.getTouchDirection(this.end.x - this.start.x, this.end.y - this.start.y);
      if (this.direction) {
        let _distanX = this.end.x - this.start.x;
        _distanX = Math.min(this.distan.x + _distanX, 0);
        _distanX = Math.max(this.overflowWidth * -1, _distanX);
        this.$emit('translateChange', _distanX, this.contentType);
      }
    },
    endHandle (offset) {
      if (this.contentType !== 'body') return;
      this.isAnimation = false;
      this.end.x = offset.pageX;
      let _distanX = this.distan.x + (this.end.x - this.start.x);
      _distanX = Math.min(_distanX, 0);
      _distanX = Math.max(this.overflowWidth * -1, _distanX);
      this.distan.x = _distanX;
    },
    /**
     * getAngle 计算角度
     */
    getAngle (x, y) {
      return Math.atan2(y, x) * 180 / Math.PI;
    },
    /**
     * getTouchDirection 获取滑动方向
     */
    getTouchDirection (x, y) {
      if (Math.abs(x) > 5) {
        let angle = this.getAngle(x, y);
        if (angle >= -45 && angle <= 45) { // 向右
          this.direction = 'right';
        } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) { // 向左
          this.direction = 'left';
        }
      } else {
        this.direction = null;
      }      
    },
    rowClick (row) {
      this.$emit('rowClick', row);
    }
  },
  watch: {
    distanX () {
      this.setTableDistanX();
    }
  }
};
</script>
<style lang="stylus">
.table-wrapper
  width 100%
  overflow hidden
</style>

