import type { App } from 'vue'

/* 基础组件 start */
import MeButton from './MeButton' // 按钮
import MeIcon from './MeIcon' // 图标

/* 基础组件 end */

/* 表单组件 start */
import MeInput from './MeInput' // 输入框

import MeSearch from './MeSearch' // 搜索


// 所有组件
const components: any[] = [
  MeButton,
  MeIcon,
  MeInput,
  MeSearch
]

/**
 * 组件注册
 * @param {App} app Vue 对象
 * @returns {Void}
 */
const install = (app: App) => {
  // 注册组件
  components.forEach(component => app.component(component.name, component))

}

export {
  MeButton,
  MeIcon,
  MeInput,
  MeSearch
}
// 全部导出
export default {
  install,
  ...components
}
