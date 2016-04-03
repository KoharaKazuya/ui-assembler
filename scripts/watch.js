var browserify = require('browserify');
var watchify   = require('watchify');
var fs         = require('fs');
var liveServer = require('live-server');

// ビルドディレクトリが無ければ作成
if (!fs.existsSync('build')) {
  fs.mkdirSync('build');
}

// JS のコンパイル
var b = browserify({
  entries: ['./src/main.js'],
  debug: true,
  cache: {},
  packageCache: {},
  plugin: [watchify]
});

function bundle() {
  b
  .transform('babelify', {
    presets: ['es2015', 'react']
  })
  .bundle()
  .pipe(fs.createWriteStream('build/bundle.js'));
}

b.on('update', bundle);
bundle();

// HTML のコピー
fs.watch('src/index.html', function() {
  fs.createReadStream('src/index.html')
  .pipe(fs.createWriteStream('build/index.html'));
});

// 開発用サーバーの起動
liveServer.start({
  root: "./build"
});
