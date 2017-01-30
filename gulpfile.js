// Requiring nodes.
const browserSync = require('browser-sync').create(),			// For Live Reload. 
			del = require('del'),
			gulp = require('gulp'),
			autoprefixer = require('gulp-autoprefixer'),
			cssnano = require('gulp-cssnano'),			// For minifying css.
			htmlmin = require('gulp-htmlmin'),					// For minifying html.
			imagemin = require('gulp-imagemin'),				// For minifying images.
			sass = require('gulp-sass'),
			uglify = require('gulp-uglify'),		// For minifying javascript.
			runSequence = require('run-sequence');
			
const reload = browserSync.reload;


// Build production files, the default task
gulp.task('default', ['build-clean'], callback =>
  runSequence(
    'styles',
    ['html', 'scripts', 'images'],
    callback
  )
);


// Initializing the SERVER for live reloading.
// Watching for changes in HTML, CSS and JS.
gulp.task('serve', () => {
	browserSync.init({
		notify: false,
		// https: true,
		server: {
			baseDir: 'app/'
		},
		port: 3000
	});

	gulp.watch('app/**/*.html', reload);
	gulp.watch('app/styles/**/*.{sass,scss,css}', ['styles', reload]);
	gulp.watch('app/scripts/**/*.js', ['scripts', reload]);
	gulp.watch('app/images/**/*', reload);	
});


gulp.task('serve:public', ['default'], () => {
	browserSync.init({
		notify: false,
		// https: true,
		server: {
			baseDir: 'public/'
		},
		port: 3001
	});
});


// Clean output directory
gulp.task('build-clean', () => del(['public/*']));


// For MINIFYING HTML
gulp.task('html', () => {
	return gulp.src('app/*.html')
    .pipe(htmlmin({
    	removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeRedundantAttributes: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      removeOptionalTags: true
    }))
    .pipe(gulp.dest('public/'))
});

// Comment it if you don't want to use SASS
// For Compiling SASS and adding AUTOPREFIXER_BROWSERS
gulp.task('styles', () => {
	const AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
  ];

	return gulp.src('app/styles/**/*.sass')
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
		.pipe(gulp.dest('app/styles/'))
		.pipe(gulp.dest('public/styles/'))
});

// Uncomment it if you want to use CSS
// For Minifying CSS and adding AUTOPREFIXER_BROWSERS
// gulp.task('styles', () => {
// 	const AUTOPREFIXER_BROWSERS = [
//     'ie >= 10',
//     'ie_mob >= 10',
//     'ff >= 30',
//     'chrome >= 34',
//     'safari >= 7',
//     'opera >= 23',
//     'ios >= 7',
//     'android >= 4.4',
//     'bb >= 10'
//   ];

// 	return gulp.src('app/styles/**/*.css')
// 		.pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
// 		.pipe(cssnano())
// 		.pipe(gulp.dest('app/styles/'))
// 		.pipe(gulp.dest('public/styles/'))
// });


// For MINIFYING JS.
gulp.task('scripts', () => {
	gulp.src('app/scripts/**/*.js')
			.pipe(uglify())
			.pipe(gulp.dest('public/scripts/'))
});


// For MINIFYING IMAGES.
gulp.task('images', () => {
	gulp.src('app/images/**/*')
			.pipe(imagemin())
			.pipe(gulp.dest('public/images/'));
});