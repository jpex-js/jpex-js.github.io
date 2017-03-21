<template>
  <div class="app grid column">
    <app-header/>
    <app-content/>
  </div>
</template>
<style lang="sass" scoped>
.app{
  height : 100vh;
}
</style>
<script>
import appContent from './content';
import appHeader from './header';

export default {
  components : {appContent, appHeader}
};
</script>
