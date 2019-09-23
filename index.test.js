const { createLocalVue, mount } = require("@vue/test-utils")
const VueStaticData = require("./index")

describe("staticData", () => {
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
      reactiveProp: "reactive",
    }),
    staticData,
  }, {
    localVue,
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

  testStaticData("object", { staticProp: "static" })
  testStaticData("function", () => ({ staticProp: "static" }))
})

describe("options", () => {
  const localVue = createLocalVue()
  localVue.use(VueStaticData, {
    namespace: "static",
    freeze: true,
  })

  const Status = {
    accepted: "accepted",
    rejected: "rejected",
  }

  const wrapper = mount({
    template: "<div></div>",
    staticData: {
      Status,
    },
  }, {
    localVue,
  })

  it("namespace", () => {
    expect(wrapper.vm.static.Status.accepted).toBe("accepted")
  })

  it("freeze", () => {
    wrapper.vm.static.Status.accepted = false
    expect(wrapper.vm.static.Status.accepted).toBe("accepted")
  })
})
