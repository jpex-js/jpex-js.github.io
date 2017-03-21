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
    component : require('components/guide'),
    contentList : {
      'intro' : 'Introduction',
      'getting-started' : 'Getting Started',
      'factories' : 'Factories',
      'dependencies' : 'Dependencies',
      'extend' : 'Extension & Inheritence',
      'plugins' : 'Plugins'
    }
  }
];
