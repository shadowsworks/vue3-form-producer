<template>
<div class="item-viewer">
    <div v-if="rf_debug"> sw-item-viewr-label: {{ JSON.stringify(props.item_info,null,2) }} </div>
    <!-- Text -->
    <template v-if='props.item_info.show'>
        <div :class="{ 'border-bottom': props.bottom_line }" >
            <div class="ms-1 me-2 mt-1 mb-0" :class="{'text-danger': !props.item_info.result}">
                <span v-if='props.item_info.value==""'>&nbsp;</span> 
                <template v-if='props.item_info.markdown'><div class="markdown-body" v-html="markdown_html"></div></template> 
                <template v-if='!props.item_info.markdown'>{{ props.item_info.label }}</template> 
            </div>
        </div>
    </template>
</div>
</template>

<script setup >
import { ref,watch,computed,defineProps } from 'vue';
import MarkdownIt from 'markdown-it';
import 'github-markdown-css/github-markdown-light.css'
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
const markdown_html = ref("")

// -----------------------------------------------
// 既定計算 computed(() => {})
// -----------------------------------------------
const rf_item_info = computed(() => props.item_info);
// -----------------------------------------------
// 監視
// -----------------------------------------------
watch( rf_item_info, () => {
    renderMarkdown()
})
// -----------------------------------------
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
const renderMarkdown = () => {
    //console.log("dm_text="+dm_text.value)
    let markdown = new MarkdownIt();
    markdown_html.value = markdown.render(props.item_info.label);
};
</script>

<style scoped>
.item-viewer {
  text-align: left;
  margin: 0px;
  padding: 4px;
}
</style>
  