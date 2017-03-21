<template>
  <div class="try-it grid row sm-wrap">
    <pre class="language-javascript cell sm-12 sz-8 input">
      <code contenteditable @input="onInput($event.target.innerText)" @blur="format"><slot></slot></code>
    </pre>
    <div class="cell sm-12 sz-3 output">
      <pre>{{output}}</pre>
    </div>
  </div>
</template>
<style lang="sass" scoped>
  .try-it{
    padding : 1rem;
    justify-content : space-around;
  }
  .input{
    resize : vertical;
    min-height : 150px;
    border : 1px solid #CCC;
    margin : 0;
    display : flex;
    code{
      display : inline-block;
      padding : 1rem;
      overflow : auto;
      width : 100%;
    }
  }
  .run{
    padding : 0 1rem;
  }
  .output{
    border : 1px solid #CCC;
    min-height : 150px;
    word-break : break-word;
    white-space : normal;
  }
</style>
<script>
import debounce from 'src/utils/debounce';

const Jpex = require('jpex/dist/jpex');
const jpexWeb = require('jpex-web/dist/jpex-web');
const instantiator = require('jpex/src/instantiator');
if (!Jpex.$$using['jpex-web']){
  Jpex.use(jpexWeb);
}
const hljs = require('highlight.js/lib/highlight');
hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));
require('highlight.js/styles/github.css');

export default {
  props : {
    arguments : {
      type : Object,
      default(){
        return {};
      }
    }
  },
  data(){
    return {
      input : ''
    };
  },
  computed : {
    output(){
      return this.run();
    }
  },
  methods : {
    onInput : debounce(function (value) {
      this.input = value;
    }, 250),
    run(){
      const code = `
        "use strict";
        ${this.input}`;

      const keys = Object.keys(this.arguments);
      const args = keys.map(key => this.arguments[key]);

      if (!keys.includes('Jpex')){
        keys.push('Jpex');
        args.push(Jpex.extend());
      }

      keys.unshift({});
      keys.push(code);

      var result;

      try{
        const fn = instantiator(Function, keys);

        result = fn.apply(null, args);
      }catch(e){
        result = e && e.message || 'Uncaught error';
      }

      if (result === undefined || result === null){
        result = '';
      }else if (typeof result === 'function'){
        result = result.toString();
      }else if (typeof result !== 'string'){
        result = JSON.stringify(result);
      }

      return result;
    },
    format(){
      const block = this.$el.querySelector('.input code');
      hljs.highlightBlock(block);
    }
  },
  mounted(){
    this.format();
    const text = this.$slots && this.$slots.default && this.$slots.default[0] && this.$slots.default[0].text || '';
    this.input = text;
  }
};
</script>
