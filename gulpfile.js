const { src, dest, parallel, series, watch } = require('gulp') //Подключили gulp и достали из него нужные функции
const sass = require('gulp-sass')(require('sass'))
const notify = require('gulp-notify') //плагин для оповещения об ошибках
const sourcemaps = require('gulp-sourcemaps')
const rename = require('gulp-rename')
const autoprefixer = require('gulp-autoprefixer')
const group_media = require('gulp-group-css-media-queries')
const cleanCSS = require('gulp-clean-css')
const browserSync = require('browser-sync').create()
const fileinclude = require('gulp-file-include')
const svgSprite = require('gulp-svg-sprite')
const ttf2woff = require('gulp-ttf2woff') //для IE, можно убрать
const ttf2woff2 = require('gulp-ttf2woff2')
const fonter = require('gulp-fonter') //otf in ttf
const fs = require('fs') //для работы с файловой системой (встроенная функция в node.js)
const del = require('del') //для удаления файлов
const uglify = require('gulp-uglify-es').default
const tinypng = require('gulp-tinypng-compress')
const concat = require('gulp-concat')
const babel = require('gulp-babel')
const gulpif = require('gulp-if')

let isProd = false // dev by default

const fonts = () => {
  src('./src/fonts/*.{woff,woff2}').pipe(dest('./app/fonts/'))
  src('./src/fonts/**.ttf').pipe(ttf2woff()).pipe(dest('./app/fonts/'))
  return src('./src/fonts/**.ttf').pipe(ttf2woff2()).pipe(dest('./app/fonts/'))
}

const cb = () => {}

let srcFonts = './src/scss/_fonts.scss'
let appFonts = './app/fonts/'

const fontsStyle = (done) => {
  //Записывает имена файлов сконвертированных шрифтов в fonts.scss
  let file_content = fs.readFileSync(srcFonts)
  if (file_content == '') {
    fs.writeFile(srcFonts, '', cb)
    fs.readdir(appFonts, function (err, items) {
      if (items) {
        let c_fontname
        for (var i = 0; i < items.length; i++) {
          let fontname = items[i].split('.')
          fontname = fontname[0]
          if (c_fontname != fontname) {
            fs.appendFile(
              srcFonts,
              '@include font("' +
                fontname +
                '", "' +
                fontname +
                '", "400", "normal");\r\n',
              cb
            )
          }
          c_fontname = fontname
        }
      }
    })
  }
  done()
}

const otf2ttf = () => {
  return src('./src/fonts/*.otf')
    .pipe(
      fonter({
        formats: ['ttf'],
      })
    )
    .pipe(dest('./src/fonts/'))
}

const svgSprites = () => {
  return src('./src/img/svg/**/*.svg')
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: '../sprite.svg', //название файла
          },
        },
      })
    )
    .pipe(dest('./app/img'))
}

const styles = () => {
  return src('./src/scss/**/*.scss') //получаем файлы .scss с любым названием из любой папки, которые находятся в папке scss
    .pipe(gulpif(!isProd, sourcemaps.init()))
    .pipe(
      sass({
        outputStyle: 'expanded',
      }).on('error', notify.onError())
    )
    .pipe(
      rename({
        suffix: '.min',
      })
    )
    .pipe(group_media())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['last 5 versions'],
        cascade: false,
      })
    )
    .pipe(gulpif(!isProd, cleanCSS({ level: 2 }))) //Уровень сжатия
    .pipe(gulpif(!isProd, sourcemaps.write('.')))
    .pipe(dest('./app/css/'))
    .pipe(browserSync.stream())
}

const htmlInclude = () => {
  return src('./src/*.html')
    .pipe(
      fileinclude({
        prefix: '@',
        basepath: '@file',
      })
    )
    .pipe(dest('./app'))
    .pipe(browserSync.stream())
}

const imgToApp = () => {
  return src([
    './src/img/**/*.{jpg,png,jpeg,svg}',
    '!' + './src/img/svg/**/*',
  ]).pipe(dest('./app/img'))
}

const resources = () => {
  return src('./src/resources/**').pipe(dest('./app'))
}

const scripts = () => {
  src('./src/js/vendor/**.js')
    .pipe(concat('vendor.js'))
    .pipe(gulpif(isProd, uglify().on('error', notify.onError())))
    .pipe(dest('./app/js/'))
  return src([
    './src/js/functions/**.js',
    './src/js/components/**.js',
    './src/js/main.js',
  ])
    .pipe(gulpif(!isProd, sourcemaps.init()))
    .pipe(
      babel({
        presets: ['@babel/env'],
      })
    )
    .pipe(concat('main.js'))
    .pipe(gulpif(isProd, uglify().on('error', notify.onError())))
    .pipe(gulpif(!isProd, sourcemaps.write('.')))
    .pipe(dest('./app/js'))
    .pipe(browserSync.stream())
}

const clean = () => {
  return del(['app/*'])
}

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: './app',
    },
  })

  watch('./src/scss/**/*.scss', styles) //слежение за файлами scss, каждый раз в случае их изменения вызывается функция styles
  watch(['./src/*.html', './src/html/**/*.html'], htmlInclude)
  watch(
    ['./src/img/**/*.{jpg,png,jpeg,svg}', '!' + './src/img/svg/**/*'],
    imgToApp
  )
  watch('./src/img/svg/**/*.svg', svgSprites)
  watch('./src/resources/**', resources)
  watch('./src/js/**/*.js', scripts)
}

exports.styles = styles //exports.styles - таск, функцию styles присваиваем в таск
exports.watchFiles = watchFiles
exports.otf2ttf = otf2ttf

/*последовательно вызывает функции при запуске gulp*/
exports.default = series(
  clean,
  parallel(htmlInclude, scripts, fonts, resources, imgToApp, svgSprites),
  fontsStyle,
  styles,
  watchFiles
)

const tinypngCompress = () => {
  return src('./src/img/**/*.{png,jpg,jpeg}')
    .pipe(
      tinypng({
        key: '1vsh708kfstsrrJhPv2QqznfPlNZJYjQ',
        log: true, // показывает в консоле названия картинок, которые сжимаются
        parallelMax: 50,
      })
    )
    .pipe(dest('./app/img'))
}

const stylesBuild = () => {
  return src('./src/scss/**/*.scss') //получаем файлы .scss с любым названием из любой папки, которые находятся в папке scss
    .pipe(
      sass({
        outputStyle: 'expanded',
      }).on('error', notify.onError())
    )
    .pipe(
      rename({
        suffix: '.min',
      })
    )
    .pipe(group_media())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['last 5 versions'],
        cascade: false,
      })
    )
    .pipe(
      cleanCSS({
        level: 2, //уровень сжатия
      })
    )
    .pipe(dest('./app/css/'))
}

const scriptsBuild = () => {
  return src('./src/js/**/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(
      rename({
        extname: '.min.js',
      })
    )
    .pipe(dest('./app/js'))
}

exports.build = series(
  clean,
  parallel(htmlInclude, scripts, fonts, resources, imgToApp, svgSprites),
  fontsStyle,
  stylesBuild,
  tinypngCompress
)
