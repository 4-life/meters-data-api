import gulp from 'gulp';
import del from 'del';
import ts from 'gulp-typescript';
import log from 'fancy-log';

const tsProject = ts.createProject('tsconfig.json');
const buildTsProject = ts.createProject('tsconfig.json');

const clean = () => {
  return del([ './dist' ]);
};

const compile = () => {
  return tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest('./dist'));
};

const buildCompile = () => {
  return buildTsProject.src()
    .pipe(buildTsProject())
    .js.pipe(gulp.dest('./dist'));
};

const end = (done) => {
  log('Success!');
  done();
};

export const dev = gulp.series(clean, compile, (done) => end(done));
export const build = gulp.series(clean, buildCompile, (done) => end(done));
export const watch = () => gulp.watch('./src/**/*.{ts,js}', dev);

export default dev;
