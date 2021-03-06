[English](./README.md) | 简体中文

# vue-snb-table Table 表格

Table 表格. 用于展示多条结构类似的数据，可对数据进行排序操作。

[![GitHub stars](https://img.shields.io/github/stars/cherislive/vue-snb-table.svg?style=flat-square)](https://github.com/cherislive/vue-snb-table/stargazers)
[![Build Status](https://travis-ci.org/cherislive/vue-snb-table.svg?branch=master)](https://travis-ci.org/cherislive/vue-snb-table)
[![GitHub issues](https://img.shields.io/github/issues/cherislive/vue-snb-table.svg?style=flat-square)](https://github.com/cherislive/vue-snb-table/issues)
[![GitHub forks](https://img.shields.io/github/forks/cherislive/vue-snb-table.svg?style=flat-square)](https://github.com/cherislive/vue-snb-table/network)
[![GitHub last commit](https://img.shields.io/github/last-commit/google/skia.svg?style=flat-square)](https://github.com/cherislive/vue-snb-table)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](https://github.com/cherislive/vue-snb-table)
[![NPM](https://nodei.co/npm/vue-snb-table.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/vue-snb-table/)
[![NPM](https://nodei.co/npm-dl/vue-snb-table.png?months=9&height=3)](https://nodei.co/npm/vue-snb-table/)



## 预览

![https://cherislive.github.io/projrct/vue-snb-table/](./20190429-161829.png)

页面预览: [https://cherislive.github.io/projrct/vue-snb-table/](https://cherislive.github.io/projrct/vue-snb-table/)

## 安装

```bash
$ npm install vue-snb-table
```

## Import

### Import using module

Import components to your project:

``` js
// in ES6 modules
import { SnbTable, SnbTableColumn, SnbTableHeader } from 'vue-snb-table';

// in CommonJS
const { SnbTable, SnbTableColumn, SnbTableHeader } = require('vue-snb-table');

// in Global variable
const { SnbTable, SnbTableColumn, SnbTableHeader } = VueSnbTable;
```

And register components:

``` js
Vue.component('snb-table', SnbTable);
Vue.component('snb-table-column', SnbTableColumn);
Vue.component('snb-table-header', SnbTableHeader);
```

### Import using script tag

``` html
<script src="../node-modules/vue-snb-table/dist/index.js"></script>
```

``` js
const SnbTable = VueSnbTable.SnbTable;
const SnbTableColumn = VueSnbTable.SnbTableColumn;
const SnbTableHeader = VueSnbTable.SnbTableHeader;

new Vue({
  el: 'body',
  components: {
    'snb-table': SnbTable,
    'snb-table-column': SnbTableColumn,
    'snb-table-header': SnbTableHeader
  }
});
```

## Usage

Work on a Vue instance:

```HTML
<SnbTableHeader
  :columns="columns" 
  :colsWidth="colsWidth" 
/>
<snb-table>
  <snb-table-column prop="data1" label="data1" />
  <snb-table-column prop="data2" label="data2" />
  <snb-table-column prop="data3" label="data3">
    <template slot-scope="scope">{{scope.data3}}</template>
  </snb-table-column>
</snb-table>
```
## Table

### Attributes

| Option | Type | Description | Accepted Values | Default |
| ----- | ----- | ----- | ----- | ----- |
| data | Array | 显示的数据。 | - | - |
| showHeader | Boolean | 是否显示表头。 | - | true |
| headerFixed | Object | 固定表头。 | `state`: true/false | null |
| defaultSort | Object | 默认的排序列的 `prop` 和顺序。它的`prop`属性指定默认的排序的列，`order`指定默认排序的顺序 | `order`: asc, desc | 如果只指定了`prop`, 没有指定`order`, 则默认顺序是**ascending** |
| sortState | Object | 可以通过该属性设置排序列的 `prop` 和顺序。它的`prop`属性指定排序的列，`order`指定默认排序的顺序 | `order`: asc, desc | - |
| headerColsWidth | Array | 表头各个列宽。 | -  | - |

### Events

| Event Name | Description | params |
| ----- | ----- | ----- |
| columnsReady | 当表格的列的数据状态加载完成的时候会触发该事件，该事件用于自定义表头的情况。 | columns |
| sortChange | 当表格的排序条件发生变化的时候会触发该事件。 | {sort: {prop, order}, column} |
| colsWidth | 当表格的数据发生变化的时候会触发该事件，返回各个列宽。 | widths |
| distanXChange | 当拖动表格横向滚动的时候会触发该事件。 | width |
| rowClick | 当某一行被点击时会触发该事件。| row |

## Table-column

### Attributes

| Option | Type | Description | Accepted Values | Default |
| ----- | ----- | ----- | ----- | ----- |
| prop | String | 对应列内容的字段名，也可以使用 property 属性。 | -  | - |
| label | String | 显示的标题。 | -  | - |
| align | String | 对齐方式。 | left/center/right | left |
| width | String | 对应列的宽度。 | -  | - |
| fixed | String | 列是否固定在左侧。 | true, false | false |
| sortable | Boolean | 对应列是否可以排序。 | true, false | false |
| formatter | Function(row, column, cellValue, index)	 | 用来格式化内容。 | - | - |

## Table-header

### Attributes

| Option | Type | Description | Accepted Values | Default |
| ----- | ----- | ----- | ----- | ----- |
| columns | Array | 各个列属性。 | -  | - |
| colsWidth | Array | 各个列宽。 | -  | - |
| distanX | Number | 表格横向滚动的距离。 | left/center/right | left |
| defaultSort | Object | 默认的排序列的 `prop` 和顺序。它的`prop`属性指定默认的排序的列，`order`指定默认排序的顺序 | `order`: asc, desc | 如果只指定了`prop`, 没有指定`order`, 则默认顺序是ascending |
| sortState | Object | 可以通过该属性设置排序列的 `prop` 和顺序。它的`prop`属性指定排序的列，`order`指定默认排序的顺序 | `order`: asc, desc | - |

### Events

| Event Name | Description | params |
| ----- | ----- | ----- |
| sortChange | 当表格的排序条件发生变化的时候会触发该事件。 | {sort: {prop, order}, column} |
| headerColsWidth | 表头各个列宽。当表格的渲染完成的时候会触发该事件。 | widths |

## Development

Watching with hot-reload:

```bash
$ npm run dev
```

Develop on real remote device:

```bash
$ npm run remote-dev {{ YOUR IP ADDRESS }}
```

## License

MIT
