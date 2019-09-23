# Vue Static Data

## Overview

Add `staticData` to [Vue instances][vue-instances] and watch in awe as it does nothing.


## Setup

Install with:

```
yarn add vue-static-data
```

Add and configure:

```js
import Vue from 'vue'
import staticData from 'vue-static-data'

Vue.use(staticData)
```

Configuration options:

```js
Vue.use(staticData, {
  namespace: 'myData',  // a single string namespace to nest values under
  freeze: true,         // a flag to freeze data, useful for enums
})
```

## Usage

```vue
<template>
  <div>
    <button @click="updateStatic" v-text="staticProp" />
    <button @click="updateReactive" v-text="reactiveProp" />
  </div>
</template>

<script>
export default {
  // Object | Function
  staticData: () => ({
    staticProp: "static"
  }),
  data: () => ({
    reactiveProp: "reactive"
  }),
  methods: {
    updateStatic() {
      this.staticProp = "static clicked"
    },
    updateReactive() {
      this.reactiveProp = "reactive clicked"
    }
  }
}
</script>
```

## Author

[Matthew Wagerfield][github]

## License

[MIT][mit]

[vue-instances]: https://vuejs.org/v2/guide/instance
[mit]: https://opensource.org/licenses/MIT
[github]: https://github.com/wagerfield
