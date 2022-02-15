import { createApp } from 'vue'
import { MessageEventListener } from '@/utils/functions'
import App from './App.vue'
import router from './router'

import VueUi from '~/index' // 开发
import '~/theme-default/index.less' // 开发

const app = createApp(App)
app.use(VueUi)
app.use(router)
app.mount('#mine-h5-ui')
// 接收数据
MessageEventListener(path => {
  app.config.globalProperties.$router.push({
    path
  })
})
