<template>
<div class="item-viewer">
    <div v-if="rf_debug"> sw-item-viewr-text: {{ JSON.stringify(props.item_info,null,2) }} </div>
    <!-- Text -->
    <template v-if='props.view_mode=="stacked"'>
        <div :class="{ 'border-bottom': props.bottom_line }" >
            <label class="text-black mt-0 mb-0 small" >{{ props.item_info.name }}</label>
            <div class="ms-1 me-2 mt-1 mb-0" :class="{'text-danger': !props.item_info.result}">
                <span v-if='props.item_info.value==""'>&nbsp;</span>
                <span v-if='props.item_info.value!==""'>{{ get_password_char() }}</span>
            </div>
        </div>
    </template>
    <template v-if='props.view_mode=="lined"'>
        <div :class="{ 'border-bottom': props.bottom_line }" >
            <span class="text-secondary mt-0 mb-0 " >{{ props.item_info.name }} : </span>
            <span class="ms-1 me-2 mt-0 mb-0" :class="{'text-danger': !props.item_info.result}" >
                <span v-if='props.item_info.value==""'>&nbsp;</span>
                <span v-if='props.item_info.value!==""'>{{ get_password_char() }}</span>
            </span>
        </div>
    </template>
</div>
</template>

<script setup >
import { ref,defineProps } from 'vue';
//import SwLanguage from '../lib/sw-language.js'
//const { get_language } = SwLanguage()

// -----------------------------------------------
// v-modelに親コンポーネントで定義したデータ（ref/reactive）を指定する際に使用
// -----------------------------------------------

// -----------------------------------------------
// 親コンポーネントから子コンポーネントへデータを受け渡す
// -----------------------------------------------
const props = defineProps({
    // 入力データ情報
    item_info: {
        type: Object,
        required: true,
        default: null,
    },
    // 表示方法
    view_mode : {
        type: String,
        required: false,
        default: "stacked", // "stacked","lined", 
    },
    bottom_line : {
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

// -----------------------------------------------
// 既定計算 computed(() => {})
// -----------------------------------------------
// const item_info = computed(() => props.item_info);
// -----------------------------------------------
// 監視
// -----------------------------------------------
// watch( item_info, () => {})
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
const get_password_char = () => {
    let len = props.item_info.value.length
    if( len > 8 ){
        len = 8
    }
    return "*".repeat(len)
}
</script>

<style scoped>
.item-viewer {
  text-align: left;
  margin: 0px;
  padding: 4px;
}
</style>
  