export default [
  {
    path : '/',
    name : 'Home',
    component : require('components/home'),
    hidden : true
  },
  {
    path : '/guide',
    name : 'Guide',
    redirect : '/guide/intro'
  },
  {
    hidden : true,
    path : '/guide/:contentId',
    name : 'Guide',
    component : require('components/viewer'),
    props(route){
      return {
        contentId : route.params.contentId,
        type : 'guide'
      }
    },
    contentList : {
      'intro' : 'Introduction',
      'getting-started' : 'Getting Started',
      'factories' : 'Factories',
      'dependencies' : 'Dependencies',
      'extend' : 'Extension & Inheritence',
      'plugins' : 'Plugins'
    }
  },
  {
    path : '/api',
    name : 'API',
    redirect : '/api/jpex'
  },
  {
    hidden : true,
    path : '/api/:contentId',
    name : 'API',
    component : require('components/viewer'),
    props(route){
      return {
        contentId : route.params.contentId,
        type : 'api'
      };
    },
    contentList : {
      'jpex' : 'Jpex',
      'extend' : 'Jpex.extend',
      'register': 'Jpex.register',
      'use' : 'Jpex.use',
      'resolve' : 'Jpex.$resolve',
      'clearCache' : 'Jpex.$clearCache',
      'trigger' : 'Jpex.$trigger',
      'defaults' : 'Default Factories',
      'plugins' : 'Plugins'
    }
  },
  {
    path : '/plugins',
    name : 'Plugins',
    redirect : '/plugins/plugins'
  },
  {
    hidden : true,
    path : '/plugins/:contentId',
    name : 'Plugins',
    component : require('components/viewer'),
    props(route){
      return {
        contentId : route.params.contentId,
        type : 'plugins'
      };
    },
    contentList : {
      'plugins' : 'Plugins',
      'jpex-web' : 'jpex-web',
      'jpex-node' : 'jpex-node',
      'jpex-defaults' : 'jpex-defaults',
      'jpex-mocks' : 'jpex-mocks',
      'jpex-folder' : 'jpex-folder'
    }
  }
];
