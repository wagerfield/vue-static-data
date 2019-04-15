# Vue Static Data

Add `staticData` to [Vue instances][vue-instances] and watch in awe as it does nothing.

    yarn add vue-static-data

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
  staticData() {
    return {
      staticProp: "static"
    };
  },
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
