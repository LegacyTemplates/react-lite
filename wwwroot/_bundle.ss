{{* run in host project directory with `web run wwwroot/_bundle.ss` *}}

{{ ['/css/bundle.css','/js/lib.bundle.js','/js/bundle.js'] | map => fileDelete(it) | end }}

{{ false | assignTo: debug }}
{{* Copy same bundle defintions from _layout.html as-is *}}

{{ ['/assets/css/'] | bundleCss({ minify:debug, cache:!debug, disk:!debug }) }}

{{ (debug ? '.development' : '.production.min') | assignTo: envjs }}
{{ (debug ? '' : '.min') | assignTo: minjs }}
{{ [
    `/lib/react/react${envjs}.js`,
    `/lib/react-dom/react-dom${envjs}.js`,
    `/lib/react-router-dom/react-router-dom${minjs}.js`,
    `/lib/classnames/index.js`,
] | bundleJs({ minify:!debug, cache:!debug, disk:!debug, out:'/js/lib.bundle.js' }) }}

{{ [
    '/lib/@servicestack/client/index.js',
    'content:/src/components/',
    'content:/src/shared/',
    'content:/src/',
] | bundleJs({ minify:!debug, cache:!debug, disk:!debug, out:'/js/bundle.js' }) }}
