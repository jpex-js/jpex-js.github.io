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
    props : {
      type : 'guide'
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
    props : {
      type : 'api'
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
  }
];
