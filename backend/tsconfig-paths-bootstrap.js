import tsConfig from './tsconfig.json'
import tsConfigPaths from 'tsconfig-paths'

const baseUrl = './' // Either absolute or relative path. If relative it's resolved to current working directory.
const paths = Object.keys(tsConfig.compilerOptions.paths).reduce(
  (prev, path) => {
    prev[path] = tsConfig.compilerOptions.paths[path].map(path =>
      path.replace('src', 'dist'),
    )
    return prev
  },
  {},
)

tsConfigPaths.register({
  baseUrl,
  paths: paths || {},
})
