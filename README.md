gulp-generate-css-import
==========================

gulp task to generate a CSS string with @imports for the passed files (mainly to be used with gulp-usemin)


## Why?

Simply because the minification must be able to know the paths so URL rewriting works as expected.


<!---
## Installation

```
npm install --save-dev gulp-generate-css-import
```
-->


## Example

File structure:
```
|-- public
  |-- styles
    |-- default
      |-- styles1.css
      |-- styles2.css
    |-- styles3.css
    |-- styles4.css
|-- gulpfile.js
```

`index.html` content:
```html
<html>
<head>
    <!-- build:css /style.css -->
    <link rel="stylesheet" type="text/css" href="/styles/default/styles1.css" />
    <link rel="stylesheet" type="text/css" href="/styles/default/styles2.css" />
    <link rel="stylesheet" type="text/css" href="/styles/styles3.css" />
    <link rel="stylesheet" type="text/css" href="/styles/styles4.css" />
    <!-- endbuild -->
</head>
<body>
</body>
</html>
```

`gulpfile.js` content:
```javascript
var gulp = require("gulp");
var usemin = require("gulp-usemin");
var minifyCss = require("gulp-minify-css");
var generateCssImport = require("gulp-generate-css-import");
var path = require("path");

var publicRoot = path.join(__dirname, "public");

gulp.task("usemin", function() {
  return gulp.src("./public/**/*.html")
    .pipe(usemin({
        relativeTo: publicRoot,
        css: [ generateCssImport(publicRoot), minifyCss(), "concat" ]
    }))
    .pipe(gulp.dest("build"));
});

gulp.task("default", ["usemin"]);
```


## License
gulp-generate-css-import is free and unencumbered public domain software. For more information, see the accompanying UNLICENSE file.