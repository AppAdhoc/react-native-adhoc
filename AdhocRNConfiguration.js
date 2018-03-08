var fs = require('fs')
var path = require('path')
var moduleName = 'app'
//inquirer.prompt(questions).then((answers) => {
  //const {  moduleName } = answers
  //if (moduleName == undefined) {
  // moduleName = "app"
 //}
 // console.log(moduleName)
  getConfigureFiles('./android', function(f, s) {
    // 找到settings.gradle
    var isSettingGradle = f.match(/settings\.gradle/)
    if (isSettingGradle != null) {
      console.log('find settings.gradle in android project ' + f)
      configureSetting(f, moduleName)
    }

    // 找到project下的build.gradle
    var isProjectGradle = f.match(/.*\/build\.gradle/)
    if (isProjectGradle != null) {
      console.log('\nfind build.gradle in android project ' + f)
      configureGradle(f)
//      configureAppKey(f, appKey)
    }
  })
  //})

  



// 判断文件
function exists(file) {
  return fs.existsSync(file) || file.existsSync(file)
}

function isFile(file) {
  return exists(file) && fs.statSync(file).isFile()
}

function getAllFiles(dir, findOne) {

  if (typeof findOne !== 'function') {
    throw new TypeError('The argument "findOne" must be a function')
  }

  eachFileSync(path.resolve(dir), findOne)
}

function eachFileSync(dir, findOne) {
  var stats = fs.statSync(dir)
  findOne(dir, stats)

  // 遍历子目录
  if (stats.isDirectory()) {
    var files = fullPath(dir, fs.readdirSync(dir))
    // console.log(dir);
    files.forEach(function(f) {
      eachFileSync(f, findOne)
    })
  }
}

function fullPath(dir, files) {
  return files.map(function(f) {
    return path.join(dir, f)
  })
}

function getAndroidManifest(dir, findOne) {
  if (typeof findOne !== 'function') {
    throw new TypeError('The argument "findOne" must be a function')
  }

  eachFileSync(path.resolve(dir), findOne)
}

function getConfigureFiles(dir, findOne) {
  if (typeof findOne !== 'function') {
    throw new TypeError('The argument "findOne" must be a function')
  }

  eachFileSync(path.resolve(dir), findOne)
}


function configureSetting(file, moduleName) {
  if (!isFile(file)) {
    console.log('configuration Adhoc error!!')
    return
  }

  var rf = fs.readFileSync(file, 'utf-8')
  var isAlreadyWrite = rf.match(/.*react-native-adhoc.*/)
  if (isAlreadyWrite == null) {
    var re = new RegExp("\n.*include.*':" + moduleName + "'", 'gi')
    var searchKey = rf.match(re)
    if (searchKey != null) {
      rf = rf.replace("\n", "\ninclude ':react-native-android' \nproject(':react-native-adhoc').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-adhoc/android/app')\n")
      fs.writeFileSync(file, rf, 'utf-8')
    } else {
      console.log('Did not find include in settings.gradle: ' + file)
    }
  }
}

function configureGradle(file) {
  if (!isFile(file)) {
    console.log('configuration Adhoc error!!')
    return
  }

  var rf = fs.readFileSync(file, 'utf-8')
  var isAlreadyWrite = rf.match(/.*react-native-adhoc.*/)
  if (isAlreadyWrite == null) {
    var searchKey = rf.match(/\n.*compile fileTree.*\n/)
    if (searchKey != null) {
      rf = rf.replace(
        searchKey[0],
        searchKey[0] +
        "    compile project(':react-native-adhoc')\n"
      )
      fs.writeFileSync(file, rf, 'utf-8')
    } else {
      console.log('Did not find "compile" in ' + file)
    }
  }
}
