const { createLocalVue, mount } = require("@vue/test-utils")
const VueStaticData = require("./index")

const localVue = createLocalVue()
const template = `
<div>
  <p class="reactive" v-text="reactiveProp" />
  <p class="static" v-text="staticProp" />
</div>
`

const wrap = (staticData) => mount({
  template,
  data: () => ({
    reactiveProp: "reactive"
  }),
  staticData
}, {
  localVue
})

localVue.use(VueStaticData)

const testStaticData = (name, staticData) => {
  test(name, () => {
    const wrapper = wrap(staticData)
    const render = jest.spyOn(wrapper.vm, "_render")
    const reactiveEl = wrapper.find(".reactive")
    const staticEl = wrapper.find(".static")

    expect(wrapper.isVueInstance()).toBeTruthy()
    expect(reactiveEl.is("p")).toBeTruthy()
    expect(staticEl.is("p")).toBeTruthy()

    expect(reactiveEl.text()).toBe("reactive")
    expect(staticEl.text()).toBe("static")

    expect(render).toHaveBeenCalledTimes(0)

    wrapper.vm.reactiveProp = "reactive updated"
    wrapper.vm.staticProp = "static updated"

    expect(render).toHaveBeenCalledTimes(1)

    expect(reactiveEl.text()).toBe("reactive updated")
    expect(staticEl.text()).toBe("static")

    wrapper.vm.staticProp = "static updated again"
    wrapper.vm.reactiveProp = "reactive updated again"

    expect(render).toHaveBeenCalledTimes(2)

    expect(reactiveEl.text()).toBe("reactive updated again")
    expect(staticEl.text()).toBe("static updated again")
  })
}

testStaticData("staticData object", { staticProp: "static" })
testStaticData("staticData function", () => ({ staticProp: "static" }))
