/* global __dirname, __filename */

const path = require('path')
const fg = require('fast-glob')

const self = __filename
const resourcesDir = __dirname

const paths = fg.sync([`${resourcesDir}/**/*`]).filter(i => i !== self)
const resources = paths.map(($path, index) => {
  const extname = path.extname($path)

  const name = $path
    .replace(addSep(resourcesDir), '') // remove useless prefix
    .replace(extname, '')
    .replace(path.sep, '.')
  const module = `resource${index}`
  const type = detectType(extname)

  return {
    module,
    name,
    type,
    path: $path,
  }
})

module.exports = () => {
  const imports = resources
    .map(({ module, path }) => `import ${module} from '${path}'`)
    .join('\n')
  const objects = resources
    .map(
      ({ module, name, type }) =>
        `  {name: '${name}', type: '${type}', url: ${module}}`
    )
    .join(',\n')

  const code = `
${imports}
const objects = [
${objects}
]

objects.url = function(name, { type } = {}) {
  const resource = this.find(resource => {
    if (type) {
      return resource.name === name && resource.type === type
    } else {
      return resource.name === name
    }
  })
  const { url } = resource
  return url
}

objects.type = function(name) {
  const resource = this.find(resource => resource.name === name)
  const { type } = resource
  return type
}

objects.nu = function(name, { type } = {}) {
  const url = this.url(name, { type })
  return [name, url]
}

objects.group = function(prefix, { type } = {}) {
  let resources = this.filter(({ name }) => name.startsWith(prefix))

  if (type) {
    resources = resources.filter(({ type: $type }) => $type === type)
  }

  return resources
}

export default objects
`
  return { code }
}

function addSep(p) {
  const { sep } = path
  return p.endsWith(sep) ? p : `${p}${sep}`
}

function detectType(extname) {
  const types = [
    {
      // bvg is an image format supported by Black Engine
      type: 'image',
      re: /\.(png|jpg|jpeg|gif|bvg)/,
    },
    {
      type: 'audio',
      re: /\.(mp3|m4a)/,
    },
    {
      type: 'video',
      re: /\.(mp4)/,
    },
    {
      type: 'json',
      re: /\.(json)/,
    },
    {
      type: 'font',
      re: /\.(ttf|woff2|woff|otf|eot)/,
    },
    {
      type: 'text',
      re: /\.(atlas|text|cfg)/,
    },
  ]

  for (const { type, re } of types) {
    if (re.test(extname)) {
      return type
    }
  }

  return 'unknown'
}
