<template>
  <div class="app-header cell grid row middle">
    <div class="cell">
      <router-link to="/">
        <img src="~src/assets/jpex-inverse.svg" style="height:2.5rem;">
      </router-link>
    </div>
    <ul class="links cell grid grow">
      <li v-for="link in links" class="cell">
        <router-link :to="link.path">
          {{link.name}}
        </router-link>
      </li>
    </ul>
  </div>
</template>
<style lang="sass" scoped>
@import "~sass/variables";
a{
  color : inherit;
  text-decoration : none;
}

.app-header{
  padding : 0.5rem 1rem;
  background-color : lighten($primary, 10%);
  color : #FFF;

  .links{
    list-style : none;
    padding : 0;
    margin : 0;
    padding-left : 1rem;
    justify-content : flex-end;
    li a{
      display : block;
      padding : 1rem;
      text-decoration : none;
      color : #FFF;
      &:hover{
      color : darken(#FFF, 10%);
    }
    }
  }
}
</style>
<script>
import routes from 'src/router/routes';

export default {
  computed : {
    links(){
      return routes.filter(r => !r.hidden);
    }
  }
};
</script>
