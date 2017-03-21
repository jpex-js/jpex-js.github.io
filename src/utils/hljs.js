import hljs from 'highlight.js/lib/highlight';
import lang from 'highlight.js/lib/languages/javascript';
require('highlight.js/styles/github.css');

hljs.registerLanguage('javascript', lang);

export default hljs;
