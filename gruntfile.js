module.exports = function(grunt) {

  grunt.initConfig({
    watch: {
      html: {
        files: ['public/views/**/*.html','public/index.html'],
        options: {
          livereload: true  //修改。重新启动
        }
      },
      js: {
        files: ['public/**/*.js', 'models/**/*.js', 'schemas/**/*.js'],
        //tasks: ['jshint'],  //测试语法检查
        options: {
          livereload: true
        }
      },
      css: {
        files: ['public/style/css/**/*.css'],
        //tasks: ['jshint'],  //测试语法检查
        options: {
          livereload: true
        }
      },
    },



    nodemon: {
      dev: {
        script:'app.js',
        options: {
          file: 'app.js',
          args: [],
          ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
          watchedExtensions: ['js'],
          watchedFolders: ['app'],  //监听的文件夹
          debug: true,
          delayTime: 1,
          env: {
            PORT: 3000
          },
          cwd: __dirname
        }
      }
    },

    // mochaTest: {
    //   options: {
    //     reporter: 'spec'
    //   },
    //   src: ['test/**/*.js']
    // },

    concurrent: {
      tasks:['nodemon','watch'],
      // tasks: ['nodemon', 'watch', 'less', 'uglify', 'jshint'],
      options: {
        logConcurrentOutput: true
      }
    }
  })

  // npm install grunt-contrib-watch --save-dev

  grunt.loadNpmTasks('grunt-contrib-watch')   //监听的文件修改重新执行
  grunt.loadNpmTasks('grunt-nodemon')     //实时监听app.js自动重启
  grunt.loadNpmTasks('grunt-concurrent')    //
  // grunt.loadNpmTasks('grunt-mocha-test')
  // grunt.loadNpmTasks('grunt-contrib-less')
  // grunt.loadNpmTasks('grunt-contrib-uglify')
  // grunt.loadNpmTasks('grunt-contrib-jshint')

  grunt.option('force', true)   //

  grunt.registerTask('default', ['concurrent'])   //注册任务

  // grunt.registerTask('test', ['mochaTest'])
}
