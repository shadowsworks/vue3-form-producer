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
      <b-row>
        <b-col cols="6">
          <sw-form-inputter ref="rf_inputter_comonents"
                v-model:result="rf_input_data_result"
                v-model:value="rf_input_data_info"
                :form_info="local_input_template"
            />
          <div class="mx-3 mb-3">
            <b-row>
              <b-col>
                <div class="d-grid gap-2">
                  <b-button variant="primary" @click="regist_button()" :disabled="!rf_input_data_result">登録する</b-button>
                </div>
              </b-col>
              <b-col>
                <div class="d-grid gap-2">
                  <b-button variant="outline-danger">キャンセルする</b-button>
                </div>
              </b-col>
            </b-row>
          </div>
        </b-col>
        <b-col cols="6">
          {{ rf_input_data_result }}<br>
          {{ rf_input_data_info }}
          <hr>
          local_item2_get_value:{{ local_item2_get_value }}<br>
          local_item3_get_value:{{ local_item3_get_value }}
        </b-col>
      </b-row>
      
    </div>
  </b-container>

</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from "vue-router";
import { BContainer,BOffcanvas,BListGroup,BListGroupItem,BRow,BCol,BButton } from "bootstrap-vue-next";
import InputTemplate from "../assets/InputTemplate4.json";
import SwFormInputter from "../components/inputter/sw-form-inputter.vue"

// -----------------------------------------------
// v-modelに親コンポーネントで定義したデータ（ref/reactive）を指定する
// -----------------------------------------------
const rf_state_side_menu = ref(false)
//const rf_form_info = ref()
const rf_input_data_info = ref();
rf_input_data_info.value = [];
const rf_input_data_result = ref();
rf_input_data_result.value = false;

const rf_inputter_comonents = ref();

// -----------------------------------------------
// ローカル変数
// -----------------------------------------------
let local_input_template = InputTemplate
//let local_item1_get_value = ""
let local_item2_get_value = ""
let local_item3_get_value = 0

// -----------------------------------------------
// 既定計算
// -----------------------------------------------
// const state_item_text = computed(() => {})
// -----------------------------------------------
// 監視
// -----------------------------------------------
// watch([ rf_input_data_info ], () => {
//     setTimeout(() => {
//       regist_button()
//     }, 500);
// },{ deep: true })

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
const regist_button = async () => {
  //let local_item1_get_file_object = rf_inputter_comonents.value.get_file_info_by_item_key("item1")
  let local_item1_get_file_object = rf_inputter_comonents.value.get_file_info_by_item_uuid("575898e9-25d4-4c83-acbc-47e56f9da1ff")
  console.log("local_item1_get_file_object:"+JSON.stringify(local_item1_get_file_object))
  for( let i=0;i<local_item1_get_file_object.length;i++ ){
    console.log("local_item1_get_file_object:"+local_item1_get_file_object[i].file_object.name)
  }
  
  //575898e9-25d4-4c83-acbc-47e56f9da1ff
  //local_item2_get_value = rf_inputter_comonents.value.get_value_by_item_uuid("c9c382d1-58a1-460a-a665-7610254726af")
  
  // //local_item2_get_value = rf_inputter_comonents.value.get_value_by_item_uuid("c9c382d1-58a1-460a-a665-7610254726af")
    // //console.log("regist_button:"+local_item2_get_value)
    // local_item2_get_value = rf_inputter_comonents.value.get_value_by_item_key("item2")
    // //console.log("regist_button:"+local_item2_get_value)
    // if( local_item2_get_value == "eeeeee" ){
    //   console.log("regist_button:"+local_item2_get_value)
    //   rf_inputter_comonents.value.set_message_by_item_key("item2","error2")
    // } else {
    //   rf_inputter_comonents.value.set_message_by_item_key("item2","")
    // }
    // local_item3_get_value = rf_inputter_comonents.value.get_value_by_item_key("item3")
    // //console.log("regist_button:"+local_item3_get_value)
    // if( local_item3_get_value == 4 ){
    //   rf_inputter_comonents.value.set_message_by_item_key("item3","error3")
    // } else {
    //   rf_inputter_comonents.value.set_message_by_item_key("item3","")
    // }
    // local_item1_get_value = rf_inputter_comonents.value.get_value_by_item_uuid("c9c382d1-58a1-460a-a665-7610254726af")
    // if( local_item1_get_value == "abcabc" ){
    //   rf_inputter_comonents.value.set_message_by_item_key("item1","error1")
    //   rf_inputter_comonents.value.set_message_by_item_uuid("c9c382d1-58a1-460a-a665-7610254726af","error1")
    // } else {
    //   rf_inputter_comonents.value.clear_message_by_item_key("item1")
    //   rf_inputter_comonents.value.clear_message_by_item_uuid("c9c382d1-58a1-460a-a665-7610254726af")
    // }
    await navigator.clipboard.writeText(JSON.stringify(rf_input_data_info.value));
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
