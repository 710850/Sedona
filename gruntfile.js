module.exports = function(grunt) {

  require("load-grunt-tasks")(grunt);

  grunt.initConfig({



    csscomb: {
      style: {
        expand: true,
        src: ["source/less/**/*.less"]
      }
    },

    less: {
      style: {
        files: {
          "build/css/style.min.css": ["source/less/style.less"]
        }
      }
    },

    autoprefixer: {
      options: {
        browsers: ["last 2 version", "ie 10"]
      },
      style: {
        src: "build/css/style.min.css"
      }
    },

    cmq: {
      style: {
        files: {
          "build/css/style.min.css": ["build/css/style.min.css"]
        }
      }
    },

    cssmin: {
      style: {
        options: {
          keepSpecialComments: 0,
          report: "gzip"
        },
        files: {
          "build/css/style.min.css": ["build/css/style.min.css"],
          "build/css/reset.min.css": ["source/css/reset.css"]
        }
      }
    },

    replace: {
      build: {
        options: {
          patterns: [{
            match: /\.\.\/\.\.\/img\//g,
            replacement: '../img/'
          }]
        },
        files: [{
          expand: true,
          src: [
            "build/css/*.css"
          ]
        }]
      }
    },


        svgstore: {
          options: {
            prefix : 'icon-',
            cleanup: ['fill', 'style']
          },
          default : {
            files: {
              'build/img/sprite.svg': ['source/img/sprite_svg/*.svg']
            }
          }
        },






    imagemin: {
      images: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          src: ["build/img/**/*.{png,jpg,gif,svg,PNG,JPG,GIF,SVG}"]
        }]
      }
    },

    htmlmin: {
      html: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          caseSensitive: true,
          keepClosingSlash: false
        },
        files: {
          'build/index.html': 'source/index.html',
          'build/hotels.html': 'source/hotels.html'
        }
      }
    },

    // процесс копирования
    copy: {
      // копируем картинки
      img: {
        expand: true,
        // откуда
        cwd: 'source/img/',
        src: ['*.{png,jpg,gif,svg,PNG,JPG,GIF,SVG}'],
        // куда
        dest: 'build/img/'

      },

      favicon: {
        expand: true,
        cwd: 'source/',
        src: ['favicon*.*'],
        dest: 'build'
      }
    },

    clean: {
      build: ["build"]
    },

    uglify: {
      script: {
        files: {
          "build/js/scripts.min.js": ["source/js/**/*.js"]
        }
      }
    },

    // слежение за файлами
    watch: {
      // перезагрузка? да, детка!
      livereload: {
        options: { livereload: true },
        files: ['build/**/*']
      },
      // следить за стилями
      style: {
        // за фактом с сохранения каких файлов следить
        files: ['source/less/**/*.less'],
        // какую задачу при этом запускать (сами задачи — см. ниже)
        tasks: ['style'],
        options: {
          spawn: false
        }
      },
      // следить за картинками
      images: {
        // за фактом с сохранения каких файлов следить
        files: ['source/img/*.{png,jpg,gif,svg,PNG,JPG,GIF,SVG}'],
        // какую задачу при этом запускать (сами задачи — см. ниже)
        tasks: ['img'],
        options: {
          spawn: false
        }
      },

      svgsprite: {
        files: ['source/img/sprite_svg/*.svg'],
        tasks: ['svgstore'],
        options: {
          spawn: false
        }
      },

      // следить за файлами разметки
      html: {
        // за фактом с сохранения каких файлов следить
        files: ['source/*.html'],
        // какую задачу при этом запускать (указан сам процесс)
        tasks: ['html'],
        options: {
          spawn: false
        }
      },

      // следить за файлами разметки
      js: {
        // за фактом с сохранения каких файлов следить
        files: ['source/js/*.js'],
        // какую задачу при этом запускать (указан сам процесс)
        tasks: ['js'],
        options: {
          spawn: false
        }
      }
    },


     // локальный сервер, автообновление
    browserSync: {
      dev: {
        bsFiles: {
          // за изменением каких файлов следить для автообновления открытой в браузере страницы с локального сервера
          src : [
            'build/css/*.css',
            'build/js/*.js',
            'build/img/*.{png,jpg,gif,svg,PNG,JPG,GIF,SVG}',
            'build/*.html'
          ]
        },
        options: {
          watchTask: true,
          server: {
            // корень сервера
            baseDir: "build/"
          },
          // синхронизация между браузерами и устройствами (если одна и та же страница открыта в нескольких браузерах)
          ghostMode: {
            clicks: true,
            forms: true,
            scroll: false
          }
        }
      }
    }

  });

  grunt.registerTask("build", [
    "clean",
    "html",
    "style",
    "svgstore",
    "img",
    "js",
    "browserSync",
    "watch"
  ]);

  grunt.registerTask("style", [

    'less',
    'autoprefixer',
    'cmq',
    'cssmin',
    'replace'
  ]);

  grunt.registerTask("img", [
    'svgstore',
    'copy:img',
    'imagemin',
    'copy:favicon'
  ]);

  grunt.registerTask("html", [
    'htmlmin'
  ]);

  grunt.registerTask("js", [
    'uglify'
  ]);



};
