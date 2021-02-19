let projectFolder = "dist", // final folder name
    sourceFolder = "src"; // work folder name

let path = {           //object with pathes to the file          
    build: {                                 //create final destination folder                           
        html: projectFolder + "/",
        css: projectFolder + "/css/",
        img: projectFolder + "/img/",
        fonts: projectFolder + "/fonts/"
    },
    src: {                                 //find files in source folder                           
        html: [sourceFolder + "/*.pug", "!" + sourceFolder + "/_*.pug"], //exclude all files, that begins from _ in his name
        css: sourceFolder + "/scss/style.{sass,scss}",
        img: sourceFolder + "/img/**/*.{jpg,png,svg,gif,ico,webp}", //search for only image format files
        fonts: sourceFolder + "/fonts/**"          //search for only ttf format fonts
    },
    watch: {                                 //change listening                         
        html: sourceFolder + "/**/*.pug", //listen all HTML file etc.
        css: sourceFolder + "/scss/**/*.{sass,scss}",
        img: sourceFolder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
        fonts: sourceFolder + "/fonts/**"
    },

}

let { src, dest } = require('gulp'),  //scenaries and plugins;
    gulp = require('gulp'),
    browsersync = require('browser-sync').create(),  //auto refresh page
    del = require('del'),    //auto delete files
    sass = require('gulp-sass'),   // gulp sass
    autoprefixer = require('gulp-autoprefixer'),  //autoprefixer
    rename = require('gulp-rename'), // adds 'min' to name file
    groupMedia = require('gulp-group-css-media-queries'),
    imagemin = require('gulp-imagemin'),       //optimize images
    sourcemaps = require('gulp-sourcemaps'), //
    pug = require('gulp-pug');




function browserSync(params) { //create function, that refresh our page
    browsersync.init({
        server: {
            baseDir: "./" + projectFolder + "/"
        },
        port: 3000,
        notify: false
    })
}

function html() {                       //collect html function
    return src(path.src.html)  //callback html files from sourse folder
        .pipe(pug({
            pretty: '\t'
        }  // Your options in here.
        ))
        .pipe(dest(path.build.html))              // create new html in final folder 
        .pipe(browsersync.stream())     //refresh page     
}

function css() {
    return src(path.src.css)  //callback css files from sourse folder
        .pipe(sourcemaps.init())
        .pipe(
            sass({
                outputStyle: "expanded"
            })
        )
        .pipe(groupMedia())

        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 5 versions"],
                cascade: true
            })
        )
        .pipe(sourcemaps.write())
        .pipe(dest(path.build.css))  //upload file before compressing and optimizing
        /*
                .pipe(cleanCss())
                .pipe(
                    rename({
                        extname: ".min.css"
                    })
                )
                .pipe(dest(path.build.css))   */    // create new css in final folder  and upload file after compressing and optimizing
        .pipe(browsersync.stream())     //refresh page     
}


function images() {                       //collect img function
    return src(path.src.img)  //callback img files from sourse folder
        .pipe(
            imagemin({
                progressive: true,
                svgoPlugins: [{ removeViewBox: false }],
                interlaced: true,
                optimizationLevel: 5
            })
        )
        .pipe(dest(path.build.img))              // create new img in final folder  
        .pipe(browsersync.stream())     //refresh page     
}

function watchFiles(params) {   //real time watcher for changes in files
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.img], images);
    gulp.watch([path.watch.fonts], fonts);
}

function fonts() {                       //collect fonts function
    return src(path.src.fonts)  //callback fonts files from sourse folder
        .pipe(dest(path.build.fonts))              // create new fonts in final folder  
        .pipe(browsersync.stream())     //refresh page     
}

function clean(params) { //function, that clean dist folder
    return del("!" + "./" + projectFolder + "/js/**/*", "./" + projectFolder + "/");
}

let build = gulp.series(clean, gulp.parallel(css, html, images, fonts));      //include functions in the execution process
let watch = gulp.parallel(build, watchFiles, browserSync); // include in gulp

exports.fonts = fonts;
exports.images = images;
exports.css = sass;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;