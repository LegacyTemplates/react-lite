{{* run in host project directory with `web run wwwroot/_bundle.ss` *}}

{{ false | assignTo: debug }}
{{ (debug ? '' : '[hash].min') | assignTo: min }}
{{ [`/css/bundle${min}.css`,`/js/lib.bundle${min}.js`,`/js/bundle${min}.js`] 
   | map => filesFind(replace(it,'[hash]','.*'))
   | flatten
   | map => fileDelete(it.VirtualPath) | end }}

{{* Copy same bundle defintions from _layout.html as-is *}}

{{ ['!/assets/css/default.css','/assets/css/'] | bundleCss({ disk:!debug, out:`/css/lib.bundle${min}.css` }) }}

{{ (debug ? '.development' : '.production.min') | assignTo: env }}
{{ [
    `/lib/react/react${env}.js`,
    `/lib/react-dom/react-dom${env}.js`,
    `/lib/react-router-dom/react-router-dom${min}.js`,
    '/lib/classnames/index.js',
    '/lib/@servicestack/client/servicestack-client.umd.js',
    '/lib/@servicestack/react/servicestack-react.umd.js',
] | bundleJs({ disk:!debug, out:`/js/lib.bundle${min}.js` }) }}

{{ [
    'content:/src/components/',
    'content:/src/shared/',
    'content:/src/',
] | bundleJs({ minify:!debug, cache:!debug, disk:!debug, out:`/js/bundle${min}.js`, iife:true }) }}
