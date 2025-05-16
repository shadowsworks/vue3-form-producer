# vue3-form-producer

業務アプリケーションに必要とされるフォームの作成から、フォームを使った入力画面、データ表示画面までをJSONデータで連携し、Vue.js / Bootstrap-Vue-Next でのフロントエンド開発におけるフォーム開発の生産性を飛躍的に向上するコンポーネントです。

# Install

```
npm install vue3-form-producer
```

# BootstrapVueNext Setup

Register BootstrapVueNext in your app entry point (typically app.js or main.js):

```
import { createApp } from 'vue'
import {createBootstrap} from 'bootstrap-vue-next'
import App from './App.vue'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue-next/dist/bootstrap-vue-next.css"

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas,far)

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(createBootstrap())
app.mount('#app')
```

詳しくは [BootstrapVueNext](https://bootstrap-vue-next.github.io/bootstrap-vue-next/) のサイトを参照ください

# Setup

```
import { swFormEditor, swFormInputter, swFormViewer, swListViewer } from 'vue3-form-producer'
import "vue3-form-producer/dist/vue3-form-producer.css"
```

# Usage

vue3-form-producer は、以下の4つのコンポーネントで構成されています。  
各コンポーネントの使い方は、以下のリンクから参照ください。

* フォーム作成コンポーネント / [sw-form-editor](https://vue3-form-producer-demo.shadows-works.com/editor)
* 入力フォームコンポーネント / [sw-form-inputter](https://vue3-form-producer-demo.shadows-works.com/inputter)
* データ表示コンポーネント / [sw-form-viewer](https://vue3-form-producer-demo.shadows-works.com/viewer)
* データ一覧表示コンポーネント / [sw-list-viewer](https://vue3-form-producer-demo.shadows-works.com/list)
