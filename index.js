var isObject = require("isobject")

var defaults = {
  namespace: null,
  freeze: false,
}

function install(Vue, options) {
  // run once
  if (install.installed) return
  install.installed = true

  // options
  options = Object.assign({}, defaults, options)

  Vue.mixin({
    beforeCreate: function() {
      // data
      var data = this.$options.staticData
      if (typeof data === "function"){
        data = data()
      }

      if (isObject(data)) {
        // namespace
        var target = this
        if (options.namespace) {
          this[options.namespace] = {}
          target = this[options.namespace]
        }

        // assign
        Object.keys(data).forEach(name => {
          target[name] = options.freeze
            ? Object.freeze(data[name])
            : data[name]
        })
      }
    }
  })
}

module.exports = {
  install: install
}
