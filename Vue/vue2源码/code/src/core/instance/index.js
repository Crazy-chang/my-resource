import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  // 满足条件后执行初始化
  this._init(options)
}

// 挂载初始化方法 Vue.prototype._init 
initMixin(Vue)

// 实例数据状态相关方法： Vue.prototype.$data/$props/$set/$delete,$watch
stateMixin(Vue)

// 实例事件相关方法： Vue.prototype.$on/$once/$off/$emit
eventsMixin(Vue)

// 实例生命周期相关方法：Vue.prototype._update/$forceUpdate/$destory
lifecycleMixin(Vue)

// 实例渲染相关方法：Vue.prototype.$nextTick/_render
renderMixin(Vue)

export default Vue
