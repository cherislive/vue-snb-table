English | [简体中文](./README.CN.md)

# vue-snb-table

vue-snb-table is a table componen for Vue.js.
Display multiple data with similar format. You can sort your data in a table.

[![GitHub stars](https://img.shields.io/github/stars/cherislive/vue-snb-table.svg?style=flat-square)](https://github.com/cherislive/vue-snb-table/stargazers)
[![Build Status](https://travis-ci.org/cherislive/vue-snb-table.svg?branch=master)](https://travis-ci.org/cherislive/vue-snb-table)
[![GitHub issues](https://img.shields.io/github/issues/cherislive/vue-snb-table.svg?style=flat-square)](https://github.com/cherislive/vue-snb-table/issues)
[![GitHub forks](https://img.shields.io/github/forks/cherislive/vue-snb-table.svg?style=flat-square)](https://github.com/cherislive/vue-snb-table/network)
[![GitHub last commit](https://img.shields.io/github/last-commit/google/skia.svg?style=flat-square)](https://github.com/cherislive/vue-snb-table)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](https://github.com/cherislive/vue-snb-table)
[![NPM](https://nodei.co/npm/vue-snb-table.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/vue-snb-table/)
[![NPM](https://nodei.co/npm-dl/vue-snb-table.png?months=9&height=3)](https://nodei.co/npm/vue-snb-table/)



## Demo

![https://cherislive.github.io/projrct/vue-snb-table/](./20190429-161829.png)

You can see a demo here: [https://cherislive.github.io/projrct/vue-snb-table/](https://cherislive.github.io/projrct/vue-snb-table/)


## Install

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
| data | Array | Table data | - | - |
| showHeader | Boolean | whether Table header is visible | - | true |
| headerFixed | Object | whether Table header is fixed | `state`: true/false | null |
| defaultSort | Object | set the default sort column and order. property `prop` is used to set default sort column, property `order` is used to set default sort order | `order`: asc, desc | if `prop` is set, and `order` is not set, then order is default to **ascending** |
| sortState | Object | set the handle sort column and order. property `prop` is used to set default sort column, property `order` is used to set default sort order | `order`: asc, desc | - |
| headerColsWidth | Array | columns width | -  | - |

### Events

| Event Name | Description | params |
| ----- | ----- | ----- |
| columnsReady | triggers when table element is ready | columns |
| sortChange | triggers when sort state or sort order changes | {sort: {prop, order}, column} |
| colsWidth | triggers when table data changes | widths |
| distanXChange | triggers when drag table rest assured is horizontal | width |
| rowClick | triggers when clicking a row | row |

## Table-column

### Attributes

| Option | Type | Description | Accepted Values | Default |
| ----- | ----- | ----- | ----- | ----- |
| prop | String | field name. You can also use its alias: property | -  | - |
| label | String | column label | -  | - |
| align | String | alignment | left/center/right | left |
| width | String | column width | -  | - |
| fixed | String | whether column is fixed. Will be fixed at left if true | true, false | false |
| sortable | Boolean | whether column can be sorted. Remote sorting can be done by setting this attribute to 'custom' and listening to the sort-change event of Table | true, false | false |
| formatter | Function(row, column, cellValue, index)	 | function that formats cell content | - | - |

## Table-header

### Attributes

| Option | Type | Description | Accepted Values | Default |
| ----- | ----- | ----- | ----- | ----- |
| columns | Array | columns | -  | - |
| colsWidth | Array | columns width | -  | - |
| distanX | Number | table rest assured is horizontal | left/center/right | left |
| defaultSort | Object | set the default sort column and order. property `prop` is used to set default sort column, property `order` is used to set default sort order | `order`: asc, desc | if `prop` is set, and `order` is not set, then order is default to **ascending** |
| sortState | Object | set the handle sort column and order. property `prop` is used to set default sort column, property `order` is used to set default sort order | `order`: asc, desc | - |

### Events

| Event Name | Description | params |
| ----- | ----- | ----- |
| sortChange | triggers when sort state or sort order changes | {sort: {prop, order}, column} |
| headerColsWidth | triggers when table columns changes | widths |

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
