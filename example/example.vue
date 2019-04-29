<template>
<div id="demo" :class="{
  'is-pc': !browser.isMobile
}">
  <div class="header">
    <div class="example-tips" v-if="!browser.isMobile">请在移动端打开，或者使用浏览器开发者模式。</div>
    <div class="inner">
      <h1>Table 表格 <span>V2.6.1</span></h1>
      <a class="masthead-links" target="_blank" href="https://github.com/cherislive/vue-snb-table">
        <svg height="22" class="octicon octicon-mark-github d-block mr-2 float-left" viewBox="0 0 16 16" version="1.1" width="24" aria-hidden="true"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>
      </a>
    </div>
  </div>  
  <div class="example-wrap">
    <div class="demo-tit">
      <h1>Table 表格</h1>
      <p>用于展示多条结构类似的数据，可对数据进行排序、筛选、对比或其他自定义操作。</p>
    </div>

    <div class="demo-item">
      <div class="demo-tit"><h3>基础表格</h3></div>
      <div class="demo-block">
        <SnbTable :data="tableData">
          <SnbTableColumn prop="name" label="姓名" />
          <SnbTableColumn prop="gender" label="性别" />
          <SnbTableColumn prop="email" label="邮箱" />
        </SnbTable>
        <div class="demo-desc" v-highlight>
          默认配置
<pre><code>&lt;SnbTable :data="tableData"&gt;
  &lt;SnbTableColumn prop="name" label="姓名" /&gt;
  &lt;SnbTableColumn prop="gender" label="性别" /&gt;
  &lt;SnbTableColumn prop="email" label="邮箱" /&gt;
&lt;/SnbTable&gt;
</code></pre>
        </div>
      </div>
    </div>

    <div class="demo-item">
      <div class="demo-tit">
        <h3>固定列</h3>
        <p>横向内容过多时，可选择固定列。</p>
      </div>
      <div class="demo-block">
        <SnbTable :data="tableData">
          <SnbTableColumn prop="name" label="姓名" />
          <SnbTableColumn prop="gender" label="性别" fixed />
          <SnbTableColumn prop="email" label="邮箱" />
          <SnbTableColumn prop="address" label="地址" />
        </SnbTable>
        <div class="demo-desc" v-highlight>
          固定列需要使用fixed属性，它接受 Boolean 值，固定的列默认固定在左侧。
<pre><code>&lt;SnbTable :data="tableData"&gt;
  &lt;SnbTableColumn prop="name" label="姓名" /&gt;
  &lt;SnbTableColumn prop="gender" label="性别" fixed /&gt;
  &lt;SnbTableColumn prop="address" label="地址" /&gt;
&lt;/SnbTable&gt;
</code></pre>
        </div>
      </div>
    </div>

    <div class="demo-item">
      <div class="demo-tit">
        <h3>固定表头</h3>
        <p>纵向内容过多时，可选择固定表头。(本组件建议采用表头分离方式)</p>
      </div>
      <div class="demo-block">
        <SnbTable :data="[]">
          <SnbTableColumn prop="name" label="姓名" />
          <SnbTableColumn prop="gender" label="性别" />
        </SnbTable>
        <div class="demo-desc" v-highlight>
          由于在移动端，通常采用lodemore滚动加载，而不是传统的分页这里的固定表头使用场景局限性比较强。这里不做演示。
<pre><code>&lt;SnbTable :data="tableData" :headerFixed="{
  state: true,
  top: 200
}"&gt;
  &lt;SnbTableColumn prop="name" label="姓名" /&gt;
  &lt;SnbTableColumn prop="gender" label="性别" fixed /&gt;
&lt;/SnbTable&gt;
</code></pre>
        </div>
      </div>
    </div>


    <div class="demo-item">
      <div class="demo-tit">
        <h3>排序</h3>
        <p>对表格进行排序，可快速查找或对比数据。</p>
      </div>
      <div class="demo-block">
        <SnbTable 
          :data="tableData"
          :sortState="sortState"
          :defaultSort="defaultSort"
          @sortChange="sortChange"
        >
          <SnbTableColumn prop="name" label="姓名"  />
          <SnbTableColumn prop="gender" label="性别" :formatter="(val) => {
            return val === 'male' ? '男' : '女';
            }" sortable />
          <SnbTableColumn prop="email" label="邮箱" sortable />
        </SnbTable>
        <div class="demo-desc" v-highlight>
          由于在移动端，通常采用lodemore滚动加载，排序建议在组件外处理。
<pre><code>
&lt;template&gt;
  &lt;SnbTable 
    :data="tableData"
    :sortState="sortState"
    :defaultSort="defaultSort"
    @sortChange="sortChange"
  &gt;
    &lt;SnbTableColumn prop="name" label="姓名" /&gt;
    &lt;SnbTableColumn prop="gender" label="性别" fixed /&gt;
  &lt;/SnbTable&gt;
&lt;/template&gt;

&lt;script&gt;
  import _ from 'lodash';
  // some code
  data() {
    return {
      tableData: [],
      sortState: {}, // 存储手动排序的结果
      defaultSort: { // 列表默认排序
        prop: '',
        order: ''
      }
    };
  },
  methods: {
    // 数据排序
    sortChange (sort) {
      const order = sort.order === 'asc' ? 'desc' : 'asc';
      this.sortState = {
        prop: sort.prop,
        order: order
      };
      this.tableData = _.orderBy(this.tableData, this.sortState.prop, this.sortState.order);
    },
  }
&lt;script&gt;
</code></pre>
        </div>
      </div>
    </div>



    <div class="demo-item">
      <div class="demo-tit">
        <h3>表头分离</h3>
        <p>纵向内容过多时，可采用表头分离方式。</p>
      </div>
      <div class="demo-block">
         表头
        <SnbTableHeader
          :columns="columns" 
          :colsWidth="colsWidth" 
          :distanX="tableHeaderDistanX"
          :defaultSort="defaultSort"
          :sortState="sortState"
          @sortChange="sortChange"
          @headerColsWidth="setHeaderColsWidth"
        />
        表内容 （通常隐藏表头）
        <SnbTable 
          :data="tableData"
          :showHeader="false"
          :sortState="sortState"
          :defaultSort="defaultSort"
          :headerColsWidth="headerColsWidth" 
          @columnsReady="setColumns"
          @colsWidth="setColsWidth"
          @sortChange="sortChange"
          @distanXChange="distanXChange"
        >
          <SnbTableColumn prop="name" label="姓名" />
          <SnbTableColumn prop="gender" label="性别字段" :formatter="(val) => {
            return val === 'male' ? '男' : '女';
            }" sortable />
          <SnbTableColumn prop="email" label="邮箱" sortable />
          <SnbTableColumn prop="email" label="邮箱" sortable />
          <SnbTableColumn prop="email" label="邮箱" sortable />
        </SnbTable>
        <div class="demo-desc" v-highlight>
          这里的参数较多，因为表头、表body分离后，我们不仅要保证排序功能的正常使用，而且列宽度要相互撑开。例如性别，他的宽度就是由header部分撑开的。
<pre><code>
&lt;template&gt;
  &lt;SnbTableHeader 
    :columns="columns" 
    :colsWidth="colsWidth" 
    :distanX="tableHeaderDistanX"
    :defaultSort="defaultSort"
    :sortState="sortState"
    @sortChange="sortChange"
    @headerColsWidth="setHeaderColsWidth"
  &gt;
  &lt;SnbTable 
    :data="tableData"
    :showHeader="false"
    :sortState="sortState"
    :defaultSort="defaultSort"
    :headerColsWidth="headerColsWidth" 
    @columnsReady="setColumns"
    @colsWidth="setColsWidth"
    @sortChange="sortChange"
    @distanXChange="distanXChange"
  &gt;
    &lt;SnbTableColumn prop="name" label="姓名" /&gt;
    &lt;SnbTableColumn prop="gender" label="性别" fixed /&gt;
  &lt;/SnbTable&gt;
&lt;/template&gt;

&lt;script&gt;
  import _ from 'lodash';
  // some code
  data() {
    return {
      tableData: [],
      columns: [], // 表头
      colsWidth: [], // body列宽度
      headerColsWidth: [], // 表头列宽度
      tableHeaderDistanX: 0, // 表头横向滚动宽度
      sortState: {}, // 存储手动排序的结果
      defaultSort: { // 列表默认排序
        prop: '',
        order: ''
      }
    };
  },
  methods: {
    // 设置表头
    setColumns (columns) {
      this.columns = columns;
    },
    // 设置列宽
    setColsWidth (width = []) {
      this.colsWidth = width;
    },
    // 设置表头列宽
    setHeaderColsWidth (width = []) {
      this.headerColsWidth = width;
    },
    // 设置表头横向滚动
    distanXChange (width = 0) {
      this.tableHeaderDistanX = width;
    },
    // 数据排序
    sortChange (sort) {
      const order = sort.order === 'asc' ? 'desc' : 'asc';
      this.sortState = {
        prop: sort.prop,
        order: order
      };
      this.tableData = _.orderBy(this.tableData, this.sortState.prop, this.sortState.order);
    },
  }
&lt;script&gt;
</code></pre>
        </div>
      </div>
    </div>

  </div>
  <div class="footer">
    <span>Copyright &copy; 2019 <a href="https://www.cheris.cn" target="_blank">cheris.cn</a>. All Rights Reserved.</span>
    <a class="masthead-links" target="_blank" href="https://github.com/cherislive/vue-snb-table">
      <svg height="22" class="octicon octicon-mark-github d-block mr-2 float-left" viewBox="0 0 16 16" version="1.1" width="24" aria-hidden="true"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>
    </a>
  </div>
</div>
</template>

<script>
  import _ from 'lodash';
  import { SnbTable, SnbTableColumn, SnbTableHeader } from '../src';
  export default {
    components: {
      SnbTable, SnbTableColumn, SnbTableHeader
    },
    data() {
      return {
        browser: {},
        tableData: [{
          name: 'blanca hidalgo',
          gender: 'male',
          email: 'blanca.hidalgo@example.com',
          address: 'No. 189, Grove St, Los Angeles'
        }, {
          name: 'delphine fournier',
          gender: 'female',
          email: 'delphine.fournier@example.com',
          address: 'No. 189, Grove St, Los Angeles'
        }, {
          name: 'iiris hatala',
          gender: 'female',
          email: 'iiris.hatala@example.com',
          address: 'No. 189, Grove St, Los Angeles'
        }, {
          name: 'anastasia garcia',
          gender: 'male',
          email: 'anastasia.garcia@example.com',
          address: 'No. 189, Grove St, Los Angeles'
        }, {
          name: 'tanya johnston',
          gender: 'male',
          email: 'tanya.johnston.garcia@example.com',
          address: 'No. 189, Grove St, Los Angeles'
        }],
        columns: [], // 表头
        colsWidth: [], // body列宽度
        headerColsWidth: [], // 表头列宽度
        tableHeaderDistanX: 0, // 表头横向滚动宽度
        sortState: {}, // 存储手动排序的结果
        defaultSort: { // 列表默认排序
          prop: '',
          order: ''
        }
      };
    },
    computed: {},
    created() {
      this.initEnvironment();
    },
    methods: {
      // 初始化环境
      initEnvironment() {
        let u = navigator.userAgent;
        this.browser.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; // Android 终端
        this.browser.isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // iOS 终端
        this.browser.isMobile = !!u.match(/AppleWebKit.*Mobile.*/); // 是否为移动终端
      },
      // 设置表头
      setColumns (columns) {
        this.columns = columns;
      },
      // 设置列宽
      setColsWidth (width = []) {
        this.colsWidth = width;
      },
      // 设置表头列宽
      setHeaderColsWidth (width = []) {
        this.headerColsWidth = width;
      },
      // 设置表头横向滚动
      distanXChange (width = 0) {
        this.tableHeaderDistanX = width;
      },
      // 数据排序
      sortChange (sort) {
        const order = sort.order === 'asc' ? 'desc' : 'asc';
        this.sortState = {
          prop: sort.prop,
          order: order
        };
        this.tableData = _.orderBy(this.tableData, this.sortState.prop, this.sortState.order);
      },
    }
  };
</script>

<style>
html,body,#demo{background:#fff;}
#demo{padding:60px 0 20px; color:#606266;}
#demo.is-pc{padding-top:100px;}
.header{position: fixed; left:0; top:0; z-index:10; width:100%;background:#fff;  margin:0 auto; border-bottom:1px solid #e5e5e5;}
.header .inner{display:block; margin:0 auto; padding: 10px 20px; overflow: hidden;}
.header .inner h1{font-size:16px; float: left;}
.header .inner h1 span{font-size:12px; color:#999;}
.header .masthead-links{float: right; display:block;color:#000; opacity:.3;}
.header .masthead-links svg{display:block;}
.example-tips{width:100%; text-align:center; font-size:14px; line-height:32px; background:#090723; color:rgba(255,255,255,.5);}
.example-wrap{max-width: 640px; width:90%; background:#fff; margin:0 auto;}
.example-wrap .demo-desc{padding:10px 0; font-size:12px; line-height:22px; color:#999; font-weight:normal;}
.base-slider-item{height:126px; color:#fff; font-size:36px; line-height:126px; text-align:center; background:#ccc;}
.demo-item{padding:0 0 30px;}
.demo-tit{padding:10px; font-size:14px; line-height:26px; color:#5e6d82;}
.demo-tit h1{font-size:26px; line-height:32px; font-weight:normal; color:#1f2f3d;}
.demo-tit h3{font-size:18px; line-height:26px; font-weight:normal; color:#1f2f3d;}
.demo-block{padding:10px; border: 1px solid #ebebeb; border-radius: 3px; transition: .2s;}
.demo-block:hover{box-shadow: 0 0 8px 0 rgba(232,237,250,.6), 0 2px 4px 0 rgba(232,237,250,.5);}
.quick-links{text-align:center;}
.footer{padding-top:20px; text-align:center; color:#999; font-size:12px;}
.footer p{font-size:12px; color:#999; text-align:center;}
.footer a{color:#999;}
.quick-links{padding-top:10px;} 
.quick-links li{display:inline-block;}
.footer .masthead-links{display:inline-block;color:#000; opacity:.3;}
.footer .masthead-links svg{display:block;}
</style>
