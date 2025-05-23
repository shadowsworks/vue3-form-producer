<template>
<div class="form-viewer">
    <div v-if="rf_debug">sw-form-viewer:{{ JSON.stringify(props.data_info,null,2) }} </div>
    <template v-for="(item_info) in sorted_data_info" v-bind:key="item_info.uuid">
        <sw-item-viewer
            :item_info="item_info"
            :view_mode="props.view_mode"
            :bottom_line="props.bottom_line"
            :text_align="props.text_align"
            :demo_mode="props.demo_mode"
        />
    </template>
</div>
</template>

<script setup >
import { ref,onBeforeMount,onMounted,defineProps } from 'vue';
import SwItemViewer from "./sw-item-viewer.vue"

// -----------------------------------------------
// v-modelに親コンポーネントで定義したデータ（ref/reactive）を指定する際に使用
// -----------------------------------------------

// -----------------------------------------------
// 親コンポーネントから子コンポーネントへデータを受け渡す
// -----------------------------------------------
const props = defineProps({
    // フォーム情報
    data_info: {
        type: Array,
        required: false,
        default: () => [],
    },
    view_mode : {
        type: String,
        required: false,
        default: "stacked", // "stacked","lined", 
    },
    bottom_line : {
        type: Boolean,
        required: false,
        default: false,
    },
    text_align: {
        type: String,
        required: false,
        default: "left", // "left","right", 
    },
    demo_mode : {
        type: Boolean,
        required: false,
        default: false,
    }
});
// -----------------------------------------------
// ローカル変数
// -----------------------------------------------
// デバッグ用
const rf_debug = ref(false)
// ブラウザからデフォルトの言語を取得する
//let locale = navigator.language;
//if( locale != "ja" && locale != "en" ) locale = "en";
let sorted_data_info = []

// -----------------------------------------------
// 既定計算 computed(() => {})
// -----------------------------------------------
// const state_xxxxx = computed(() => { return true or false; });
// -----------------------------------------------
// 監視
// -----------------------------------------------
// watch( rf_item_input, () => {});
// -----------------------------------------------
// コンポーネントがマウントされる直前に呼び出されるフックを登録します。
// -----------------------------------------------
onBeforeMount(() => {
    sorted_data_info = props.data_info
    //console.log("sw-form-viewer:onBeforeMount:sorted_data_info="+sorted_data_info)
    if( sorted_data_info !== null ){
        sorted_data_info.sort((a,b) => a.sequence - b.sequence)
    }
})
// -----------------------------------------------
// コンポーネントがマウントされた後に呼び出されるコールバックを登録します。
// -----------------------------------------------
onMounted(() => {
    //console.log("sw-form-viewer:onMounted:sorted_data_info="+sorted_data_info)
    if( sorted_data_info !== null ){
        sorted_data_info.sort((a,b) => a.sequence - b.sequence)
    }
})
// -----------------------------------------------
// コンポーネントがリアクティブな状態変更により DOM ツリーを更新しようとする直前に呼び出されるフックを登録します。
// -----------------------------------------------
// onBeforeUpdate() => {})
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

</script>

<style scoped>
.form-viewer {
  text-align: left;
  margin: 0px;
  padding: 4px;
}
</style>
  