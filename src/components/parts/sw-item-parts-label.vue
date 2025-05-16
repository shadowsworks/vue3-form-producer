<script setup >
import { ref,onMounted,defineProps } from 'vue';
//import { BFormTextarea,BBadge, BTabs, BTab } from "bootstrap-vue-next";
import MarkdownIt from 'markdown-it';
import 'github-markdown-css/github-markdown-light.css'

// -----------------------------------------------
// v-modelに親コンポーネントで定義したデータ（ref/reactive）を指定する際に使用
// -----------------------------------------------

// -----------------------------------------------
// 親コンポーネントから子コンポーネントへデータを受け渡す
// -----------------------------------------------
const props = defineProps({
    // ラベル
    item_label: {
        type: String,
        required: false,
        default: "",
    },
    // マークダウン 使用する:true/使用しない:false
    item_markdown_selected: {
        type: Boolean,
        required: false,
        default: false,
    },
    // 表示フォームの時に 表示する:true/表示しない:false
    item_show_selected: {
        type: Boolean,
        required: false,
        default: false,
    }
});

// -----------------------------------------------
// ローカル変数
// -----------------------------------------------
// ブラウザからデフォルトの言語を取得する
let locale = navigator.language;
if( locale != "ja" && locale != "en" ) locale = "en";
const markdown_html = ref("")
const plain_text = ref("")
// -----------------------------------------------
// 既定計算
// -----------------------------------------------

// -----------------------------------------------
// 監視
// -----------------------------------------------
//
// -----------------------------------------------
// コンポーネントがマウントされる直前に呼び出されるフックを登録します。
// -----------------------------------------------
// onBeforeMount(() => {})
// -----------------------------------------------
// コンポーネントがマウントされた後に呼び出されるコールバックを登録します。
// -----------------------------------------------
onMounted(() => renderMarkdown());
// -----------------------------------------------
// コンポーネントがリアクティブな状態変更により DOM ツリーを更新しようとする直前に呼び出されるフックを登録します。
// -----------------------------------------------
// onBeforeUpdate()
// -----------------------------------------------
// コンポーネントがリアクティブな状態変更によって DOM ツリーを更新した後に呼び出されるコールバックを登録します。
// -----------------------------------------------
//onUpdated(() => renderMarkdown());
// -----------------------------------------------
// コンポーネントインスタンスがアンマウントされる直前に呼び出されるフックを登録します。
// -----------------------------------------------
// onBeforeUnmount()
// -----------------------------------------------
// コンポーネントがアンマウントされた後に呼び出されるコールバックを登録します。
// -----------------------------------------------
// onUnmounted()
// -----------------------------------------------
// 子孫コンポーネントから伝搬するエラーをキャプチャーしたときに呼び出されるフックを登録します。
// -----------------------------------------------
// onErrorCaptured()

// -----------------------------------------------
// ローカル関数
// -----------------------------------------------
const renderMarkdown = () => {
    //console.log("dm_text="+dm_text.value)
    let markdown = new MarkdownIt();
    markdown_html.value = markdown.render(props.item_label);
    plain_text.value = escapeHTML(props.item_label).replace(/\n/g,"<br>")
}
const escapeHTML = (text) => {
    return text.replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, "&#x27;");
}
</script>

<template>
<div class="item-editor">
    <div class="preview_mode">
        <div v-if="!item_markdown_selected" v-html="plain_text"></div>
        <div v-if="item_markdown_selected" class="markdown-body" v-html="markdown_html"></div>
    </div>
</div>
</template>

<style scoped>
.item-editor {
  text-align: left;
  padding: 4px;
}
.preview_mode {
    box-sizing: border-box;
    margin: 7px 2px 7px 2px;
}
</style>
