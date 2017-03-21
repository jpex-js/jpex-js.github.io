const Jpex = require('jpex/dist/jpex').extend();
const plugin = require('jpex-web/dist/jpex-web');

Jpex.use(plugin);

window.Jpex = Jpex;
