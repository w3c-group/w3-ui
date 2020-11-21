const wm = new WeakMap()

export default {
  install: function(Vue: any) {
    Vue.directive('sl-model', {
      bind(el: any, binding: any, vnode: any) {
        const inputHandler = (event: any) => Vue.set(vnode.context, binding.expression, event.target.value)
        wm.set(el, inputHandler)
        el.value = binding.value
        el.addEventListener('input', inputHandler)
      },
      componentUpdated(el: any, binding: any) {
        el.value = binding.value
      },
      unbind(el: any) {
        const inputHandler = wm.get(el)
        el.removeEventListener(el, inputHandler)
      }
    })
  }
}
