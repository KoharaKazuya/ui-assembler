var browserify = require('browserify');
var watchify   = require('watchify');
var fs         = require('fs');
var liveServer = require('live-server');

// ビルドディレクトリが無ければ作成
if (!fs.existsSync('build')) {
  fs.mkdirSync('build');
}

// JS のコンパイル
browserify(['src/main.js'], {
  cache: {},
  packageCache: {},
  plugin: [watchify]
})
.transform('babelify', {
  presets: ['es2015', 'react']
})
.bundle()
.pipe(fs.createWriteStream('build/bundle.js'));

// HTML のコピー
fs.watch('src/index.html', function() {
  fs.createReadStream('src/index.html')
  .pipe(fs.createWriteStream('build/index.html'));
});

// 開発用サーバーの起動
liveServer.start({
  root: "./build"
});
