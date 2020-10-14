var plugins = [{
      plugin: require('/Users/samueljmillward/Documents/GitHub/gatsby-tutorial/gatsby/node_modules/gatsby-plugin-react-helmet/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/samueljmillward/Documents/GitHub/gatsby-tutorial/gatsby/node_modules/gatsby-plugin-styled-components/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/samueljmillward/Documents/GitHub/gatsby-tutorial/gatsby/node_modules/gatsby-source-sanity/gatsby-ssr'),
      options: {"plugins":[],"projectId":"4ubew0ga","dataset":"production","watchMode":true,"token":"skEMcOxwnnm8bM1b2cA9BHceQL9FiIMRqLrYlsdjhPBFzYuiGJVXGSFbfsXRvzX7TBoPUyNVgsJECdqiTIcf2SjQp9tg8N4mHwKQHCf2cXR8tkZL3ZWYDT2NGuSEJORIPUBW7PH3QLqtSJTSeedelsXPY0Ge49pCNwUzh4AIqMebgiX8F5za"},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined
    }
    const result = plugin.plugin[api](args, plugin.options)
    if (result && argTransform) {
      args = argTransform({ args, result })
    }
    return result
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}
