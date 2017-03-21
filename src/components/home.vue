<template>
  <div class="home">
    <div class="logo grid column middle center">
      <h1 class="cell">
        <img src="~src/assets/jpex.svg" style="">
      </h1>
      <h2 class="cell">Easy Dependency Injection</h2>
    </div>


      <div class="demo grid center middle row sm-hide md-hide" role="button" @click="nextExample()">
        <transition>
          <pre :key="example" class="language-javascript cell grid column"><code class="cell grow" v-html="examples[example]"></code></pre>
        </transition>
      </div>

    <div class="summary">
      <ul class="grid sm-wrap">
        <li class="cell">
          <h3>Dependency Injection</h3>
          <div>
            Easily register dependencies and inject them throughout your application. Just point and shoot - Jpex handles resolving, caching, and injecting all of your dependencies.
          </div>
        </li>
        <li class="cell">
          <h3>Class or Container pattern</h3>
          <div>
            Jpex can be used as a class generator, supporting deep inheritence and class configuration options, or as a stateless dependency injection container.
          </div>
        </li>
        <li class="cell">
          <h3>Extensible</h3>
          <div>
            Highly configurable, node &amp; web capable, with an extensive plugin system and a straightfoward API; Jpex can be used and moulded however you want.
          </div>
        </li>
      </ul>
    </div>

    <!-- <div class="demo grid center middle row sm-hide md-hide" role="button" @click="nextExample()">
      <transition>
        <pre :key="example" class="language-javascript cell grid column"><code class="cell grow" v-html="examples[example]"></code></pre>
      </transition>
    </div> -->

    <div class="get-started">
      <router-link to="/guide/getting-started" class="btn primary">Get Started</router-link>
      <a href="https://github.com/jpex-js/jpex" class="btn primary" target="_blank">
        <img src="../assets/github-light.png" class="btn-icon">
        <span>Source Code</span>
      </a>
    </div>

    <!-- <div class="demo grid center middle row sm-hide md-hide" role="button" @click="nextExample()">
      <transition>
        <pre :key="example" class="language-javascript cell grid column"><code class="cell grow" v-html="examples[example]"></code></pre>
      </transition>
    </div> -->
  </div>
</template>
<style lang="sass" scoped>
@import "~sass/variables";

.logo{
  h1{
    margin-bottom : 0;
  }
  h2{
    margin-top : 0;
    color : $gray;
  }
}

.home{
  h1, h2, h3{
    text-align : center;
  }
  .demo{
    position : relative;
    height : 20rem;
    pre{
      min-width : 25%;
      position : absolute;
      left : 50%;
      transform : translateX(-50%);
      min-height : 15rem;
      max-height : 100%;
      overflow-y : auto;

      &.v-enter{
        opacity : 0;
        left : 100%;
      }
      &.v-leave-to{
        opacity : 0;
        left : 0;
      }

      &.v-enter-active, &.v-leave-active{
        transition : all 1s;

      }
      code{
        padding : 1rem;
      }
    }
  }
  .summary{
    padding : 0 1rem;
    li{
      h3{
        color : $primary;
      }
      div{
        text-align : center;
        color : $gray;
      }
    }
  }
  .get-started{
    text-align : center;
  }
}
</style>
<script>
import hljs from 'src/utils/hljs';
import jpex from 'jpex/dist/jpex';

export default {
  data(){
    return {
      example : 0,
      timer : null
    };
  },
  computed : {
    examples(){
      return [
`// Classes
const Class = Jpex.extend(function(sayHello){
  this.method = function(){
    sayHello();
  };
});

const inst = new Class();

inst.method();`,

`// Containers
const Container = Jpex.extend();

const sayHello = Container.$resolve('sayHello');

sayHello();`,

`// Register Factories and Services
Jpex.register.factory('sayHello', function($log){
  return function(){
    $log('Hello World!');
  };
});

Jpex.register.service('sayHelloService', function($log){
  this.sayHello = function(){
    $log('Hello World!');
  };
});`,

`// Use Plugins
const Jpex = require('jpex');
const plugin = require('jpex-mocks');

Jpex.use(plugin);`
      ];
    }
  },
  methods : {
    nextExample(increment){
      if (increment === undefined){
        increment = 1;
      }

      const $timeout = jpex.$resolve('$timeout');

      $timeout.clear(this.timer);

      this.example = (this.example + increment) % this.examples.length;

      this.$nextTick(() => {
        this.format();
      });

      this.timer = $timeout(() => this.nextExample(), 15000);
    },
    format(){
      Array.prototype.slice.call(this.$el.querySelectorAll('pre > code')).forEach(block => hljs.highlightBlock(block));
    }
  },
  mounted(){
    this.nextExample(0);
  }
};
</script>
