<template>
<th :class="[  
  column.align ? `is-${column.align}`: '',
  isAscending ? 'ascending' : '',
  isDescending ? 'descending' : '',
]" ref="elColumn"
  @click="handleClick"
>
  <div class="cell">{{column.label}} <span class="caret-wrapper" v-if="isSortCell"><i class="sort-caret ascending"></i><i class="sort-caret descending"></i></span></div>  
</th>
</template>

<script>
export default {
  name: 'snb-table-column-header',
  props: {
    column: {
      type: Object,
      default: () => {}
    },
    sort: {
      type: Object,
      default: () => {}
    },
    // isFixedCell: {
    //   type: Boolean,
    //   default: false
    // },
  },
  data () {
    return {
    };
  },
  computed: {
    isSortCell () {
      if (!this.sort) return false;
      return this.column.sortable || 
        this.sort.prop === this.column.prop ||         
        this.sort.defaultProp === this.column.prop;
    },
    isAscending () {
      return this.sort && this.sort.prop === this.column.prop && this.sort.order === 'asc';
    },
    isDescending () {
      return this.sort && this.sort.prop === this.column.prop && this.sort.order === 'desc';
    }
  },
  created() {
  },
  mounted () {
  },
  methods: {
    handleClick () {
      if (this.isSortCell) {
        this.$emit('handleHeadSortClick', this.column);
      }
    }
  }
};
</script>
<style lang="stylus">
.caret-wrapper
  position relative
  display inline-flex
  flex-direction column
  align-items center
  width 12px
  height 22px
  vertical-align middle
  overflow hidden
.sort-caret
  position absolute
  left 1px
  width 0
  height 0
  border 5px solid transparent
  &.ascending
    border-bottom-color #c0c4cc
    top 0px
  &.descending
    border-top-color #c0c4cc
    bottom 0px
th.ascending
  .sort-caret
    &.ascending
      border-bottom-color #f75b5b
th.descending
  .sort-caret
    &.descending
      border-top-color #6282fb
</style>