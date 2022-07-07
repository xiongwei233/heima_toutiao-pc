import Vue from 'vue'
import '@/styles/element-variables.scss'

import {
  Button,
  Select,
  Form,
  FormItem,
  Checkbox,
  CheckboxGroup,
  Input,
  Message,
  Container,
  Aside,
  Header,
  Main,
  MenuItem,
  Menu,
  Submenu,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Image
} from 'element-ui'

Vue.use(Button)
Vue.use(Select)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Main)
Vue.use(MenuItem)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Image)

// 全局方法
Vue.prototype.$message = Message
