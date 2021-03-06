<template>
  <div class="viewer grid sm-column">
    <div class="links cell md-5 lg-3">
      <button class="btn md-hide lg-hide" @click="showMenu=!showMenu">=</button>
      <ul :class="{showMenu : showMenu}">
        <li v-for="link in links">
          <router-link :to="makeLink(link)" :class="{active : isActiveLink(link)}">
            {{link.name}}
          </router-link>
          <ul v-if="isActiveLink(link)" class="sub-links">
            <li v-for="anchor in anchors">
              <a :href="makeHash(link, anchor)" :class="{active : isActiveHash(anchor)}">
                {{anchor.name}}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="view cell sz" @scroll="onScroll" v-html="content">
    </div>
  </div>
</template>
<style lang="sass" scoped>
@import "~sass/variables";
.viewer{
  height : 100%;
  padding : 0.5rem 0;
  .links{
    border-right : 1px solid lighten($gray, 20%);
    padding : 1rem;
    overflow-y : auto;
    color : lighten(#000, 40%);

    a.active{
      color : lighten(#000, 10%);
    }

    .sub-links{
      color : lighten(#000, 60%);
    }

    > ul{
      @media(max-width:$sm-max){
        display : none;
        position:absolute;
        background-color:#fff;
        margin:0;
        border : 1px solid lighten($gray, 20%);
        width : 75%;
        &.showMenu{
          display : block;
        }
      }
    }
  }
  .view{
    padding : 1rem;
    overflow-y : auto;
  }
}
</style>
<script>
import routes from 'src/router/routes';
import debounce from 'src/utils/debounce';
import hljs from 'src/utils/hljs';

export default {
  props : {
    type : {
      required : true
    },
    contentId : {
      required : true
    }
  },
  data(){
    return {
      anchorElements : [],
      showMenu : false
    };
  },
  computed : {
    content(){
      const path = this.contentId;
      let content = require('content/' + this.type + '/' + path + '.md');
      return content;
    },
    links(){
      const contentList = routes.find(r => r.path === '/' + this.type + '/:contentId').contentList;
      const content = Object.keys(contentList).map(key => {
        return {path : key, name : contentList[key]};
      });
      return content;
    },
    anchors(){
      debugger;
      return this.anchorElements.map(el => {
        const path = el.id;
        const name = el.getAttribute('anchor') || el.getAttribute('title') || el.innerText;
        return {path, name};
      });
    }
  },
  methods : {
    getAnchorElements(){
      if (!this.$el){
        this.anchorElements = [];
        return;
      }
      const child = this.$el.querySelector('.view');
      if (!child){
        this.anchorElements = [];
        return;
      }
      this.anchorElements = Array.prototype.slice.call(child.querySelectorAll('h3,[anchor]'));
    },
    makeLink(link){
      return ['', this.type, link.path].join('/');
    },
    makeHash(link, hash){
      return [this.makeLink(link), hash.path].filter(n => n).join('#');
    },
    isActiveLink(link){
      return this.$route.path === this.makeLink(link);
    },
    isActiveHash(hash){
      this.recalcAnchors;
      return this.$route.hash === '#' + hash.path;
    },
    onScroll : debounce(function(evt){
      const element = evt.target;
      const scrollTop = element.getBoundingClientRect().top;
      let closestDistance = 1000, closestElement;

      this.anchorElements.forEach(anchor => {
        const top = anchor.getBoundingClientRect().top;
        const dist = top - scrollTop;
        if (dist < 0 && Math.abs(dist) < closestDistance){
          closestDistance = Math.abs(dist);
          closestElement = anchor;
        }else if (dist >= 0 && dist < 100 && dist < closestDistance){
          closestDistance = dist;
          closestElement = anchor;
        }
      });
      if (closestElement){
        this.$router.replace({hash : closestElement.id});
      }
    }, 500)
  },
  watch : {
    content(){
      this.$nextTick(() => {
        this.getAnchorElements();
        Array.prototype.slice.call(this.$el.querySelectorAll('pre > code')).forEach(block => hljs.highlightBlock(block));
      });
    }
  },
  mounted(){
    this.getAnchorElements();
    Array.prototype.slice.call(this.$el.querySelectorAll('pre > code')).forEach(block => hljs.highlightBlock(block));
    if (this.$route.hash){
      let el = document.querySelector(this.$route.hash);
      if (el){
        el.scrollIntoView();
      }
    }
  }
};
</script>
