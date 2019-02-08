const isObject = require("isobject")

function install(Vue) {
  if (install.installed) return
  install.installed = true

  Vue.mixin({
    beforeCreate() {
      let staticData = this.$options.staticData
      if (typeof staticData === "function") staticData = staticData()
      if (isObject(staticData)) Object.assign(this, staticData)
    }
  })
}

module.exports = {
  install: install
}
