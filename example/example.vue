<template>
<div id="demo" :class="{
  'is-pc': !browser.isMobile
}">
  <div class="header">
    <div class="example-tips" v-if="!browser.isMobile">请在移动端打开，或者使用浏览器开发者模式。</div>
    <div class="inner">
      <h1>Slider 演示 <span>V3.0.2</span></h1>
      <a class="masthead-links" href="https://github.com/cherislive/vue-mint-slider">
        <svg height="22" class="octicon octicon-mark-github d-block mr-2 float-left" viewBox="0 0 16 16" version="1.1" width="24" aria-hidden="true"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>
      </a>
    </div>
  </div>  
  <div class="example-wrap">
    <div class="demo-item">
      <h3 class="demo-tit">基础滑动01</h3>
      <Slider>
        <SliderItem class="base-slider-item" style="background:#23b7e5;">Slider 1</SliderItem>
        <SliderItem class="base-slider-item" style="background:#27c24c;">Slider 2</SliderItem>
        <SliderItem class="base-slider-item" style="background:#7266ba;">Slider 3</SliderItem>
        <SliderItem class="base-slider-item" style="background:#fad733;">Slider 4</SliderItem>
      </Slider>
      <p class="demo-desc">默认配置</p>
    </div>

    <div class="demo-item">
      <h3 class="demo-tit">基础滑动02</h3>
      <Slider
        :showIndicators="false"
      >
        <SliderItem class="base-slider-item" style="background:#3a3f51;">Slider 1</SliderItem>
        <SliderItem class="base-slider-item" style="background:#27c24c;">Slider 2</SliderItem>
        <SliderItem class="base-slider-item" style="background:#7266ba;">Slider 3</SliderItem>
        <SliderItem class="base-slider-item" style="background:#fad733;">Slider 4</SliderItem>
        <SliderItem class="base-slider-item" style="background:#f05050;">Slider 5</SliderItem>
        <SliderItem class="base-slider-item" style="background:#23b7e5;">Slider 6</SliderItem>
      </Slider>
      <div class="demo-desc">
        隐藏分页器
        <pre>:showIndicators="false"</pre>
      </div>
    </div>

    <div class="demo-item">
      <h3 class="demo-tit">一次显示多个slides</h3>
      <Slider
        :perView="2"
        :perGroup="1"
      >
        <SliderItem class="base-slider-item" style="background:#f05050;">Slider 1</SliderItem>
        <SliderItem class="base-slider-item" style="background:#fad733;">Slider 2</SliderItem>
        <SliderItem class="base-slider-item" style="background:#7266ba;">Slider 3</SliderItem>
        <SliderItem class="base-slider-item" style="background:#27c24c;">Slider 4</SliderItem>
        <SliderItem class="base-slider-item" style="background:#23b7e5;">Slider 5</SliderItem>
        <SliderItem class="base-slider-item" style="background:#3a3f51;">Slider 6</SliderItem>
      </Slider>
      <div class="demo-desc">
        一次显示2个slides，slides的数量1个为一组
<pre>
:perView="2"
:perGroup="1"
</pre>
      </div>
    </div>

    <div class="demo-item">
      <h3 class="demo-tit">一次显示多个slides、Slides分组</h3>
      <Slider
        :perView="2"
        :perGroup="2"
      >
        <SliderItem class="base-slider-item" style="background:#7266ba;">Slider 1</SliderItem>
        <SliderItem class="base-slider-item" style="background:#f05050;">Slider 2</SliderItem>
        <SliderItem class="base-slider-item" style="background:#fad733;">Slider 3</SliderItem>
        <SliderItem class="base-slider-item" style="background:#27c24c;">Slider 4</SliderItem>
        <SliderItem class="base-slider-item" style="background:#23b7e5;">Slider 5</SliderItem>
        <SliderItem class="base-slider-item" style="background:#3a3f51;">Slider 6</SliderItem>
      </Slider>
      <div class="demo-desc">
        一次显示2个slides，slides的数量2个为一组
<pre>
:perView="2"
:perGroup="2"
</pre>
      </div>
    </div>

    <div class="demo-item">
      <h3 class="demo-tit">一次显示多个slides、Slides分组</h3>
      <Slider
        :perView="2.3"
        :perGroup="2"
      >
        <SliderItem class="base-slider-item" style="background:#27c24c;">Slider 1</SliderItem>
        <SliderItem class="base-slider-item" style="background:#23b7e5;">Slider 2</SliderItem>
        <SliderItem class="base-slider-item" style="background:#3a3f51;">Slider 3</SliderItem>
        <SliderItem class="base-slider-item" style="background:#7266ba;">Slider 4</SliderItem>
        <SliderItem class="base-slider-item" style="background:#f05050;">Slider 5</SliderItem>
        <SliderItem class="base-slider-item" style="background:#fad733;">Slider 6</SliderItem>
        <SliderItem class="base-slider-item" style="background:#27c24c;">Slider 7</SliderItem>
        <SliderItem class="base-slider-item" style="background:#23b7e5;">Slider 8</SliderItem>
        <SliderItem class="base-slider-item" style="background:#3a3f51;">Slider 9</SliderItem>
      </Slider>
      <div class="demo-desc">
        一次显示2个slides，slides的数量2个为一组
<pre>
:perView="2"
:perGroup="2"
</pre>
      </div>
    </div>

    <div>
      <h3 class="demo-tit">一次显示多个slides、Slides分组整倍数</h3>
      <Slider
        :perView="5"
        :perGroup="5"
        :groupFull="true"
      >
        <SliderItem class="base-slider-item" style="background:#27c24c;">1</SliderItem>
        <SliderItem class="base-slider-item" style="background:#23b7e5;">2</SliderItem>
        <SliderItem class="base-slider-item" style="background:#3a3f51;">3</SliderItem>
        <SliderItem class="base-slider-item" style="background:#7266ba;">4</SliderItem>
        <SliderItem class="base-slider-item" style="background:#f05050;">5</SliderItem>
        <SliderItem class="base-slider-item" style="background:#fad733;">6</SliderItem>
        <SliderItem class="base-slider-item" style="background:#27c24c;">7</SliderItem>
      </Slider>
      <div class="demo-desc">
        一次显示5个slides，slides的数量5个为一组，不足一组仍然保留位置
<pre>
:perView="5"
:perGroup="5"
:groupFull="true"
</pre>
      </div>
    </div>



  </div>
  <div class="footer">
    <p>Open sourced under MIT. <br />Copyright (c) 2019 CHERIS.CN, All rights reserved.</p>
    <ul class="quick-links">
    <li>
      <iframe src="https://ghbtns.com/github-btn.html?user=cherislive&repo=vue-mint-slider&type=star&count=false" frameborder="0" scrolling="0" width="50px" height="20px"></iframe>
    </li>
    <li>
      <iframe src="https://ghbtns.com/github-btn.html?user=cherislive&repo=vue-mint-slider&type=fork&count=false" frameborder="0" scrolling="0" width="50px" height="20px"></iframe>
    </li>
  </ul>
  </div>
</div>
</template>

<script>
  import { Slider, SliderItem } from '../src';
  export default {
    components: {
      Slider, SliderItem
    },
    data() {
      return {
        browser: {},
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
    }
  };
</script>

<style>
html,body,#demo{background:#f8f8f8;}
#demo{padding:60px 0 20px;}
#demo.is-pc{padding-top:100px;}
.header{position: fixed; left:0; top:0; z-index:10; width:100%;background:#fff;  margin:0 auto; border-bottom:1px solid #e5e5e5;}
.header .inner{display:block; margin:0 auto; padding: 10px 20px; overflow: hidden;}
.header .inner h1{font-size:16px; float: left;}
.header .inner h1 span{font-size:12px; color:#999;}
.header .masthead-links{float: right; display:block;color:#000; opacity:.3;}
.header .masthead-links svg{display:block;}
.example-tips{width:100%; text-align:center; font-size:14px; line-height:32px; background:#090723; color:rgba(255,255,255,.5);}
.example-wrap{max-width: 640px; width:90%; background:#fff; padding: 10px 15px; margin:0 auto; border:1px solid #e5e5e5;}
.example-wrap .demo-tit{text-align:center; font-size:14px; line-height:26px; color:#1e70cd; font-weight:normal;}
.example-wrap .demo-desc{font-size:12px; line-height:22px; color:#999; font-weight:normal;}
.base-slider-item{height:126px; color:#fff; font-size:36px; line-height:126px; text-align:center; background:#ccc;}
.demo-item{padding:0 0 40px;}
.quick-links{text-align:center;}
.footer{padding-top:20px;}
.footer p{font-size:12px; color:#999; text-align:center;}
.quick-links{padding-top:10px;} 
.quick-links li{display:inline-block;}
</style>
