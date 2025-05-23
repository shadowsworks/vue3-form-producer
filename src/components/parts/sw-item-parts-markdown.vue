<script setup >
import { ref,computed,defineModel,defineProps } from 'vue';
import { BFormTextarea,BBadge,BTabs,BTab } from "bootstrap-vue-next";
import MarkdownIt from 'markdown-it';
import 'github-markdown-css/github-markdown-light.css'
import SwLanguage from '../lib/sw-language.js'
const { get_language } = SwLanguage()
// -----------------------------------------------
// v-modelに親コンポーネントで定義したデータ（ref/reactive）を指定する際に使用
// -----------------------------------------------
// 正常：true 異常：false
const dm_result = defineModel("result",{ type: Boolean, default: false })
// テキスト
const dm_text = defineModel("text",{ type: String, default: "" })

// -----------------------------------------------
// 親コンポーネントから子コンポーネントへデータを受け渡す
// -----------------------------------------------
const props = defineProps({
    // 項目名
    item_subject: {
        type: String,
        required: true,
    },
    // 説明
    item_placeholder: {
        type: String,
        required: false,
        default: "",
    },
    // 補足説明
    item_description: {
        type: String,
        required: false,
        default: "",
    },
    // 必須入力 必須:true/任意:false
    item_required: {
        type: Boolean,
        required: false,
        default: false,
    },
    // 入力必須の時バッジを表示する 表示する:true/表示しない:false
    item_required_badge: {
        type: Boolean,
        required: false,
        default: false,
    },
    // 最大文字数
    item_max_length: {
        type: Number,
        required: false,
        default: 100,
    },
    // 行数
    item_number_of_rows: {
        type: Number,
        required: false,
        default: 3,
    },
});

// -----------------------------------------------
// ローカル変数
// -----------------------------------------------
// ブラウザからデフォルトの言語を取得する
let locale = navigator.language;
if( locale != "ja" && locale != "en" ) locale = "en";
const markdown_html = ref("")

// -----------------------------------------------
// 既定計算
// -----------------------------------------------
// 入力監視
const state_input = computed(() => {
    let ret = required();
    result_update(ret);
    return ret;
});

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
//onMounted(() => renderMarkdown());
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
const required = () => {
    if( props.item_required ){
        if( String(dm_text.value) == "" ){
            return false;
        } else {
            return true;
        }
    } else {
        return null;
    }
}
const result_update = (ret) => {
    if( ret || ret == null ){
        dm_result.value = true
    } else {
        dm_result.value = false
    }
}
const renderMarkdown = () => {
    //console.log("dm_text="+dm_text.value)
    let markdown = new MarkdownIt();
    markdown_html.value = markdown.render(dm_text.value);
    //rf_render_key.value = rf_render_key.value + 1;
    //markdown_body.value = true;
};
</script>

<template>
<div class="item-editor" >
    <!-- Text -->
    <b-tabs small @vue:updated="renderMarkdown">
        <b-tab :title='get_language(locale,"tab_edit")' active >
            <label class="text-black mt-0 mb-0 small" >{{ props.item_subject }}</label>
            <template v-if='props.item_required && props.item_required_badge'>
                <b-badge variant="danger" class="mt-0 mb-0 ms-1">{{ get_language(locale,"selected_mandatory") }}</b-badge>
            </template>
            <b-form-textarea type="text" class="mt-0 mb-0" v-model="dm_text" 
                    :state="state_input"
                    :placeholder="props.item_placeholder"
                    :rows="props.item_number_of_rows"
                    :maxlength="props.item_max_length" />
            <label v-if='props.item_description!==""' class="text-secondary mt-1 mb-0 ms-1 small">{{ props.item_description }}</label>
        </b-tab>
        <b-tab :title='get_language(locale,"tab_preview")'>
            <div class="preview_mode" >
                <div class="markdown-body" v-html="markdown_html"></div>
            </div>
        </b-tab>
    </b-tabs>
              
</div>
</template>

<style scoped>
.item-editor {
  text-align: left;
  padding: 4px;
}
textarea::placeholder {
  opacity: 0.6;
  color: gray;
}
.preview_mode {
    box-sizing: border-box;
    margin: 7px 2px 7px 2px;
}
</style>
