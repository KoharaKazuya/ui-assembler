var browserify = require('browserify');
var fs         = require('fs');

// ビルドディレクトリが無ければ作成
if (!fs.existsSync('build')) {
  fs.mkdirSync('build');
}

// JS のコンパイル
browserify(['src/main.js'])
.transform('babelify', {
  presets: ['es2015', 'react']
})
.bundle()
.pipe(fs.createWriteStream('build/bundle.js'));

// HTML のコピー
fs.createReadStream('src/index.html')
.pipe(fs.createWriteStream('build/index.html'));
