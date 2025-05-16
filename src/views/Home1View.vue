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
      <!-- <dev >test_init_form:{{ test_init_form }}<br>rf_form_info:{{ rf_form_info }}</dev> -->
      <sw-form-editor 
          :init_form_info="test_init_form" 
          v-model:form_info="rf_form_info" />
    </div>
  </b-container>

</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from "vue-router";
import { BContainer,BOffcanvas,BListGroup,BListGroupItem } from "bootstrap-vue-next";
import SwFormEditor from '../components/editor/sw-form-editor.vue';

// -----------------------------------------------
// v-modelに親コンポーネントで定義したデータ（ref/reactive）を指定する
// -----------------------------------------------
const rf_state_side_menu = ref(false)
const rf_form_info = ref()

// -----------------------------------------------
// ローカル変数
// -----------------------------------------------
// let test_init_form = [{ 
//     "item_uuid": "0523af9d-6091-451e-ad48-2c1745b2a9b8", 
//     "item_sequence": 0, 
//     "item_type": "type_short_text", 
//     "item_name": "短いテキストname", 
//     "item_placeholder": "短いテキストplaceholder", 
//     "item_description": "短いテキストdescription", 
//     "item_key": "itemkey1", 
//     "item_condition_key": "itemkey2", 
//     "item_condition_value": "value3", 
//     "item_required_selected": true, 
//     "item_required_badge": true, 
//     "item_max_length": 45, 
//     "item_allowed_type": "Alpha", 
//     "item_expand": false 
// }]
let test_init_form = null

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
