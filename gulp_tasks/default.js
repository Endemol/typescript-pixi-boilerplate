//	 ____        _ _     _   ____            _       _
//	| __ ) _   _(_) | __| | / ___|  ___ _ __(_)_ __ | |_
//	|  _ \| | | | | |/ _` | \___ \ / __| '__| | '_ \| __|
//	| |_) | |_| | | | (_| |  ___) | (__| |  | | |_) | |_
//	|____/ \__,_|_|_|\__,_| |____/ \___|_|  |_| .__/ \__|
//										      |_|


// --------------------------------------------------------------------------------------------------------------------
// CONSTANTS
// --------------------------------------------------------------------------------------------------------------------

var constants = {
    BrowserSync: {
        IDENTIFIER: 'typescript-pixi'
    }
};

// --------------------------------------------------------------------------------------------------------------------
// Gulp Libraries
// --------------------------------------------------------------------------------------------------------------------

var gulp = require('gulp');                             // Gulp
var browserSync = require('browser-sync');              // Open a new browser session and load changes instantly
var bs = browserSync.create(constants.BrowserSync.IDENTIFIER);
var del = require('del');                               // Delete files
var runSequence = require('run-sequence');              // Manage async tasks
var changed = require('gulp-changed');                  // Only affect changed files
var webpackStream = require('webpack-stream');				// compile and concat typescript and libs
var sourcemaps = require('gulp-sourcemaps');            // Source Maps
const path = require('path');


// --------------------------------------------------------------------------------------------------------------------
// Directory
// --------------------------------------------------------------------------------------------------------------------

var dir = {source: {}, library: {}, build: {}, assets: {}, binary: {}};

/**
 * Get Directories
 * @param {String} language
 */
function getDirectory(language) {

    // SOURCE -------------------------------------------------
    dir.source.root 	= 'source';
    dir.source.js 		= dir.source.root + '/js';
    dir.source.json 	= dir.source.root + '/json/'+language;
    dir.source.ts 		= dir.source.root + '/ts';
    dir.source.sass 	= dir.source.root + '/sass';
    dir.source.html 	= dir.source.root + '/html';
    dir.source.css 		= dir.source.root + '/css';

    // LIBRARY ------------------------------------------------
    dir.library.bower 	= 'bower_components';
    dir.library.npm 	= 'node_modules';

    // ASSETS -------------------------------------------------
    dir.assets.root 	= 'assets';
    dir.assets.images 	= dir.assets.root + '/images';
    dir.assets.fonts 	= dir.assets.root + '/fonts/'+language;
    dir.assets.sounds 	= dir.assets.root + '/sounds';

    // BUILD --------------------------------------------------
    dir.build.root 		= 'build';
    dir.build.js 		= dir.build.root + '/js/';
    dir.build.json 		= dir.build.root + '/json/';
    dir.build.css 		= dir.build.root + '/css/';
    dir.build.images 	= dir.build.root + '/images/';
    dir.build.fonts 	= dir.build.root + '/lang/'+language+'/';
    dir.build.json 		= dir.build.root + '/lang/'+language+'/';
    dir.build.sounds 	= dir.build.root + '/sounds/';
    dir.build.html 		= dir.build.root;
    dir.build.index 	= dir.build.root + '/index.html';
}
getDirectory('en');

// --------------------------------------------------------------------------------------------------------------------
// Constants
// --------------------------------------------------------------------------------------------------------------------
var deploymentID = {
    DEV:0,
    STAGING:1,
    PRODUCTION:2
};

// --------------------------------------------------------------------------------------------------------------------
// Utils
// --------------------------------------------------------------------------------------------------------------------

/**
 * Console Colours
 */
var cc = {
    cyan:'\033[0;36m',
    yellow:'\033[0;33m',
    pink:'\033[0;35m',
    clear:'\033[0m'
};

/**
 * Report Change
 * @param {{path:String, type:String}} event
 */
function reportChange(event){
    console.log('File ' + cc.pink + event.path + cc.clear + ' was ' + cc.cyan + event.type + cc.clear + ' running tasks...');
};

/**
 * Error Handler
 * @param error
 */
function errorHandler(error){
    console.log('Error',error.message);
};

// --------------------------------------------------------------------------------------------------------------------
// Gulp Tasks
// --------------------------------------------------------------------------------------------------------------------

// DEFAULT ------------------------------------------------
gulp.task('default', function () {

    runSequence(
        'clean',
        'ts',
        ['css','images','html'],
        'watch',
        'browser-sync'
    );
});

// CSS ----------------------------------------------------

gulp.task('css', function () {
    return gulp.src([dir.source.css+'/**/*'])
        .pipe(changed(dir.build.css))
        .pipe(gulp.dest(dir.build.css))
        .pipe(browserSync.get(constants.BrowserSync.IDENTIFIER).stream());
});

// IMAGES -------------------------------------------------
gulp.task('images', function () {
    return gulp.src([dir.assets.images+'/**/*'])
        .pipe(changed(dir.build.images))
        .pipe(gulp.dest(dir.build.images))
        .pipe(browserSync.get(constants.BrowserSync.IDENTIFIER).stream());
});

// HTML ---------------------------------------------------
gulp.task('html', function () {
    return gulp.src([dir.source.html+'/**/*'])
        .pipe(changed(dir.build.html))
        .pipe(gulp.dest(dir.build.html))
        .pipe(browserSync.get(constants.BrowserSync.IDENTIFIER).stream());
});

// TYPESCRIPT ---------------------------------------------
gulp.task('ts', function () {
    var config = require('../webpack.config.js');
    config.devtool = 'source-map';
    var src = dir.source.ts + '/**/*';
    var stream = gulp.src(src)
                 .pipe(webpackStream(require('../webpack.config.js')));
    stream =  stream.pipe(sourcemaps.write('./'));
    stream =  stream.pipe(gulp.dest(dir.build.root));
    stream =  stream.pipe(browserSync.get(constants.BrowserSync.IDENTIFIER).stream());
    return stream;

});

// CLEAN --------------------------------------------------
gulp.task('clean', function() {
    return del(dir.build.root, { force: true });
});

// WATCH --------------------------------------------------
gulp.task('watch', [], function() {
    gulp.watch(dir.source.css+'/**/*.css', ['css']).on('change', reportChange);
    gulp.watch(dir.source.ts+'/**/*.ts', ['ts']).on('change', reportChange);
    gulp.watch(dir.source.html+'/**/*', ['html']).on('change', reportChange);
    gulp.watch(dir.source.images+'/**/*', ['images']).on('change', reportChange);
});

// BROWSER SYNC -------------------------------------------
gulp.task('browser-sync', function() {

    bs.init({
        port: 8099,
        server: {
            baseDir: path.join(__dirname, '../' + dir.build.root),
            serveStaticOptions: {
                extensions: ["html", "css", "js"]
            }
        }
    });
});




