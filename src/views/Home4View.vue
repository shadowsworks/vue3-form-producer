<template>
  <header class="sticky-top">
    <div class="header_title py-2">
      <div class="float-start ms-3 bars-icon" @click="sidemenu_open()"><font-awesome-icon icon="bars" /></div>
      <div class="text-center me-4">vue3-form-producer</div>
    </div>
  </header>
  <b-offcanvas v-model="rf_state_side_menu" title="メニュー" style="width:30%;"
        header-class="bg-secondary text-light" body-class="px-0 py-0">
    <b-list-group class="mx-0 px-0">
      <b-list-group-item button @click="home1()">Editer</b-list-group-item>
      <b-list-group-item button @click="home2()">Inputter</b-list-group-item>
      <b-list-group-item button @click="home3()">Viewer</b-list-group-item>
      <b-list-group-item button @click="home4()">List</b-list-group-item>
    </b-list-group>
  </b-offcanvas>

  <b-container fluid class="mt-2">
    <div class="home">
      <sw-list-viewer ref="sw_list_viewer"
          :data_list="local_view_template"
          :exclude_columns="local_exclude_columns"
      />
    </div>
    <b-button @click="set_item_viewer()">詳細</b-button>
    <div class="home">
      <sw-form-viewer :key="rf_render_key"
          :data_info="local_form_viewer"
      />
    </div>

  </b-container>

</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from "vue-router";
import { BContainer,BOffcanvas,BListGroup,BListGroupItem,BButton } from "bootstrap-vue-next";
import ViewTemplate from "../assets/ViewTemplate3.json";
import SwListViewer from "../components/viewer/sw-list-viewer.vue"
import SwFormViewer from "../components/viewer/sw-form-viewer.vue"
// -----------------------------------------------
// v-modelに親コンポーネントで定義したデータ（ref/reactive）を指定する
// -----------------------------------------------
const rf_state_side_menu = ref(false)
const rf_render_key = ref(0)

// -----------------------------------------------
// ローカル変数
// -----------------------------------------------
let local_view_template = []
let ViewTemplate1 = JSON.parse(JSON.stringify(ViewTemplate))
let ViewTemplate2 = JSON.parse(JSON.stringify(ViewTemplate))
let ViewTemplate3 = JSON.parse(JSON.stringify(ViewTemplate))
ViewTemplate1[0].value = ViewTemplate1[0].value + " 01"
ViewTemplate2[0].value = ViewTemplate2[0].value + " 02"
ViewTemplate3[0].value = ViewTemplate3[0].value + " 03"
local_view_template.push(ViewTemplate1)
local_view_template.push(ViewTemplate2)
local_view_template.push(ViewTemplate3)

let local_exclude_columns = []
local_exclude_columns.push("8fc84646-a4da-4adb-b1ea-e86351aabb5c")
local_exclude_columns.push("a15e91a3-64c3-4955-9a14-789d0d5d6cf3")
local_exclude_columns.push("d56ed66f-157f-4d8e-a747-07df667c6d1a")
local_exclude_columns.push("e63fa5a0-b3d0-4977-91d7-fe97e76f531e")
local_exclude_columns.push("1331349d-f366-4e4c-bc0b-7eacb357edd2")
local_exclude_columns.push("d791f678-b571-4ea7-ab04-2e330cfb6e7c")
local_exclude_columns.push("e2271bfd-dbe5-40c6-b996-5c516e97644b")
local_exclude_columns.push("switch")

const sw_list_viewer = ref();

let local_form_viewer = []

// -----------------------------------------------
// 既定計算
// -----------------------------------------------
// const state_item_text = computed(() => {})
// -----------------------------------------------
// コンポーネントがマウントされる直前に呼び出されるフックを登録します。
// -----------------------------------------------
// onBeforeMount(() => {})
// -----------------------------------------------
// コンポーネントがマウントされた後に呼び出されるコールバックを登録します。
// -----------------------------------------------
// onMounted(() => {})
// -----------------------------------------------
// コンポーネントがリアクティブな状態変更により DOM ツリーを更新しようとする直前に呼び出されるフックを登録します。
// -----------------------------------------------
// onBeforeUpdate(() => {})
// -----------------------------------------------
// コンポーネントがリアクティブな状態変更によって DOM ツリーを更新した後に呼び出されるコールバックを登録します。
// -----------------------------------------------
// onUpdated(() => {});
// -----------------------------------------------
// コンポーネントインスタンスがアンマウントされる直前に呼び出されるフックを登録します。
// -----------------------------------------------
// onBeforeUnmount(() => {})
// -----------------------------------------------
// コンポーネントがアンマウントされた後に呼び出されるコールバックを登録します。
// -----------------------------------------------
// onUnmounted(() => {})
// -----------------------------------------------
// 子孫コンポーネントから伝搬するエラーをキャプチャーしたときに呼び出されるフックを登録します。
// -----------------------------------------------
// onErrorCaptured(() => {})

// -----------------------------------------------
// ローカル関数
// -----------------------------------------------
const sidemenu_open = () => {
  console.log("HomeView:sidemenu_open")
  rf_state_side_menu.value = !rf_state_side_menu.value
}
const router = useRouter()
const home1 = () => {
  // 画面遷移
  router.push({ name:"Home1View" });
}
const home2 = () => {
  // 画面遷移
  router.push({ name:"Home2View" });
}
const home3 = () => {
  // 画面遷移
  router.push({ name:"Home3View" });
}
const home4 = () => {
  // 画面遷移
  router.push({ name:"Home4View" });
}
const set_item_viewer = () => {
  let data_info = sw_list_viewer.value.get_selected_data()
  if( data_info !== null ){
    //console.log("set_item_viewer:"+JSON.stringify(data_info))
    local_form_viewer = JSON.parse(JSON.stringify(data_info))
    rf_render_key.value = rf_render_key.value + 1
  }
}
</script>

<style scoped>
.header_title {
  font-size: 1.5em;
  font-weight: bold;
  background-color: darkblue;
  color: #ffffff
}
.bars-icon {
  cursor: pointer;
}
</style>
