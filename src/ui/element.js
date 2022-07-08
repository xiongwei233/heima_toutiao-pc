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
  Image,
  Card,
  Breadcrumb,
  BreadcrumbItem,
  Col,
  DatePicker,
  Radio,
  RadioGroup,
  Option,
  Table,
  TableColumn,
  Tag,
  Pagination,
  MessageBox,
  RadioButton,
  Row,
  Dialog,
  Upload
} from 'element-ui'

Vue.use(Button)
Vue.use(Upload)
Vue.use(Row)
Vue.use(Dialog)
Vue.use(RadioButton)
Vue.use(Pagination)
Vue.use(Table)
Vue.use(TableColumn)
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
Vue.use(Card)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Col)
Vue.use(DatePicker)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Option)
Vue.use(Select)
Vue.use(Tag)

// 全局方法
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
