# grunt-resources-html
 > Extract the resources from a html file (script-css) and deposit to a destination folder

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-resources-html --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-resources-html');
```

## The "grunt_resources_html" task

### Overview
In your project's Gruntfile, add a section named `grunt_resources_html` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  grunt_resources_html: {
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```
### Usage Examples

#### Default Options
In this example, resources are extracted from src to copied to dest.

```html
<!DOCTYPE html>
<html>
<head>    
    <link href="test/resources-origin/bootstrap.min.css" rel="stylesheet" />
    <script src="test/resources-origin/jquery-1.11.3.min.js"></script>
</head>
<body>
   
</body>
</html>
```

#### task grunt_resources_html

```js
grunt.initConfig({
  grunt_resources_html: {
      options: {
        verbose: false
      },
      dist: {
        src: ['test/index.html'],
        dest: 'test/resources-des/'
      }
    }
});
```
#### run task grunt_resources_html result

```shell
├── gruntfile.js
└── test
    └── resources-dest
        └── bootstrap.min.css
        └── jquery-1.11.3.min.js
```

### Compile Typescript
To compile changes made to the TS source file, you must run the grunt exec task

```js
grunt exec
```

Or execute the key combination ctrl + shift + B

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
* 2017-07-11   v1.0.2   Further edits of readme.md
* 2017-07-07   v1.0.0   Initial commits
