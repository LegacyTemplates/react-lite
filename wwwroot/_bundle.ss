```code
* run in host project directory with `web run wwwroot/_bundle.ss` *

false | to => debug
(debug ? '' : '.min')       | to => min
(debug ? '' : '[hash].min') | to => dist

{{ [`/css/lib.bundle${dist}.css`,`/js/lib.bundle${dist}.js`,`/js/bundle${dist}.js`] 
   | map => it.replace('[hash]','.*').findFiles()
   | flat
   | do => it.VirtualPath.deleteFile() }}

* Copy same bundle definitions from _layout.html as-is *

['!/assets/css/default.css','/assets/css/'] | bundleCss({ disk:!debug, out:`/css/lib.bundle${dist}.css` })

(debug ? '.development' : '.production.min') | to => env

{{ [
    `/lib/react/react${env}.js`,
    `/lib/react-dom/react-dom${env}.js`,
    `/lib/react-router-dom/react-router-dom${min}.js`,
    '/lib/@servicestack/client/servicestack-client.umd.js',
    '/lib/@servicestack/react/servicestack-react.umd.js',
] | bundleJs({ disk:!debug, out:`/js/lib.bundle${dist}.js` }) }}

{{ [
    'content:/src/components/',
    'content:/src/shared/',
    'content:/src/',
] | bundleJs({ minify:!debug, cache:!debug, disk:!debug, out:`/js/bundle${dist}.js`, iife:true }) }}
```
