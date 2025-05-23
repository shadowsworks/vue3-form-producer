<template>
<div class="item-editor">
    <!-- 項目キー -->
    <sw-item-parts-text v-model:text="rf_item_key" v-model:result="rf_item_key_result"
            :item_subject='get_language(locale,"subject_item_key")' :item_placeholder='get_language(locale,"placeholder_item_key")' 
            item_allowed_type="AlphaNumericPlus" />
    <!-- 条件付き表示 -->
    <div v-show="dm_condition_visible">
        <sw-item-parts-text2 v-model:text_1="rf_item_condition_key"  v-model:text_2="rf_item_condition_value" v-model:result="rf_item_condition_result"
            :item_subject='local_condition_subject' :item_placeholder='local_condition_placeholder' :item_append_text='local_condition_append_text' 
            :item_allowed_type='local_allowed_type' />
    </div>
    <!-- 接頭辞 -->
    <sw-item-parts-text v-model:text="rf_item_prefix" v-model:result="rf_item_prefix_result"
            :item_subject='get_language(locale,"subject_prefix")' :item_placeholder='get_language(locale,"placeholder_prefix")' 
            item_allowed_type="All" />
    <!-- 接尾辞 -->
    <sw-item-parts-text v-model:text="rf_item_postfix" v-model:result="rf_item_postfix_result"
            :item_subject='get_language(locale,"subject_postfix")' :item_placeholder='get_language(locale,"placeholder_postfix")' 
            item_allowed_type="All" />
    <!-- リンク文字 -->
    <sw-item-parts-text v-model:text="rf_item_link_word" v-model:result="rf_item_link_word_result"
            :item_subject='get_language(locale,"subject_link_word")' :item_placeholder='get_language(locale,"placeholder_link_word")' 
            item_allowed_type="All" item_required />
    <!-- URL -->
    <sw-item-parts-url v-model:text="rf_item_link_url" v-model:result="rf_item_link_url_result"
            :item_subject='get_language(locale,"subject_link_url")' :item_placeholder='get_language(locale,"placeholder_link_url")' 
            item_required />
</div>
</template>

<script setup >
import { ref,watch,onBeforeMount,onMounted,defineModel,defineProps } from 'vue';
import SwLanguage from '../lib/sw-language.js'
const { get_language } = SwLanguage()
import SwItemPartsText from "../parts/sw-item-parts-text.vue"
import SwItemPartsText2 from "../parts/sw-item-parts-text-2.vue"
import SwItemPartsUrl from "../parts/sw-item-parts-url.vue"

// -----------------------------------------------
// v-modelに親コンポーネントで定義したデータ（ref/reactive）を指定する際に使用
// -----------------------------------------------
// 正常：true 異常：false
const dm_result = defineModel("result",{ type: Boolean, default: false })
// この項目のフォーム情報
const dm_item_form_info = defineModel("item_form_info",{ type: Object, default: () => {} })
//dm_item_form_info.value = {}
// 条件付き表示の表示：true 非表示：false
const dm_condition_visible = defineModel("condition_visible",{ type: Boolean, default: false })
// 項目キー
const rf_item_key = defineModel("item_key",{ type: String, default: "" })
const rf_item_key_result = ref(false)
// 条件項目キー// 条件項目値
const rf_item_condition_key = ref("")
const rf_item_condition_value = ref("")
const rf_item_condition_result = ref(false)
// 接頭辞
const rf_item_prefix = ref("")
const rf_item_prefix_result = ref(false)
// 接尾辞
const rf_item_postfix = ref("")
const rf_item_postfix_result = ref(true)
// リンク文字
const rf_item_link_word= ref("")
const rf_item_link_word_result = ref(true)
// URL
// リンク文字
const rf_item_link_url= ref("")
const rf_item_link_url_result = ref(true)

// -----------------------------------------------
// 子コンポーネントから親コンポーネントへデータを受け渡す
// -----------------------------------------------
//const emit_xxxxx = defineEmits(['xxxxxxxxxx','xxxxxxxxx'])

// -----------------------------------------------
// 親コンポーネントから子コンポーネントへデータを受け渡す
// -----------------------------------------------
const props = defineProps({
    // 初期値
    init_item_info: {
        type: Object,
        required: false,
        default: null
    },
});

// -----------------------------------------------
// ローカル変数
// -----------------------------------------------
// ブラウザからデフォルトの言語を取得する
let locale = navigator.language;
if( locale != "ja" && locale != "en" ) locale = "en";
// 条件付き表示
const local_condition_subject = [get_language(locale,"subject_item_condition_1"),get_language(locale,"subject_item_condition_2")]
const local_condition_placeholder = [get_language(locale,"placeholder_item_condition_1"),get_language(locale,"placeholder_item_condition_2")]
const local_condition_append_text = [get_language(locale,"append_text_item_condition_1"),get_language(locale,"append_text_item_condition_2")]
// 条件付き表示の許可する文字
const local_allowed_type = ["AlphaNumericPlus","All"]

// -----------------------------------------------
// 既定計算
// -----------------------------------------------
// const state_xxxxx = computed(() => { return true or false; });
// -----------------------------------------------
// 監視
// -----------------------------------------------
watch([ rf_item_key,
        rf_item_condition_key,rf_item_condition_value,
        rf_item_prefix,rf_item_postfix,rf_item_link_word,rf_item_link_url ], () => {
        //console.log("sw-item-editor-label:watch:-------")
        watch_task()
        setTimeout(() => {
            watch_task()
        }, 100);
        setTimeout(() => {
            watch_task()
        }, 200);
})
// -----------------------------------------------
// コンポーネントがマウントされる直前に呼び出されるフックを登録します。
// -----------------------------------------------
onBeforeMount(() => { 
    if( props.init_item_info !== null ){
        if( props.init_item_info.item_key !== undefined ){ rf_item_key.value = props.init_item_info.item_key; }
        if( props.init_item_info.item_condition_key !== undefined ){ rf_item_condition_key.value = props.init_item_info.item_condition_key; }
        if( props.init_item_info.item_condition_value !== undefined ){ rf_item_condition_value.value = props.init_item_info.item_condition_value; }
         // 接頭辞
        if( props.init_item_info.item_prefix !== undefined ){ rf_item_prefix.value = props.init_item_info.item_prefix; }
        // 接尾辞
        if( props.init_item_info.item_postfix !== undefined ){ rf_item_postfix.value = props.init_item_info.item_postfix; }
        // リンク文字
        if( props.init_item_info.item_link_word !== undefined ){ rf_item_link_word.value = props.init_item_info.item_link_word; }
        // リンク文字
        if( props.init_item_info.item_link_url !== undefined ){ rf_item_link_url.value = props.init_item_info.item_link_url; }
    }
})
// -----------------------------------------------
// コンポーネントがマウントされた後に呼び出されるコールバックを登録します。
// -----------------------------------------------
onMounted(() => {
    // このコンポーネントの入力が完了したか判断する
    if( is_result_value() ){
        dm_result.value = true; 
    } else {
        dm_result.value = false; 
    }
    // このコンポーネントの入力が完了したら、親コンポーネントと共有しているフォームデータを更新する
    if( dm_result.value ){
        dm_item_form_info.value = get_form_data();
    } else {
        dm_item_form_info.value = {};
    }
})
// -----------------------------------------------
// コンポーネントがリアクティブな状態変更により DOM ツリーを更新しようとする直前に呼び出されるフックを登録します。
// -----------------------------------------------
// onBeforeUpdate()
// -----------------------------------------------
// コンポーネントがリアクティブな状態変更によって DOM ツリーを更新した後に呼び出されるコールバックを登録します。
// -----------------------------------------------
// onUpdated();
// -----------------------------------------------
// コンポーネントインスタンスがアンマウントされる直前に呼び出されるフックを登録します。
// -----------------------------------------------
// onBeforeUnmount(() => {})
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
// 監視で使用する
const watch_task = () => {
    // このコンポーネントの入力が完了したか判断する
    if( is_result_value() ){
        dm_result.value = true; 
    } else {
        dm_result.value = false; 
    }
    // このコンポーネントの入力が完了したら、親コンポーネントと共有しているフォームデータを更新する
    if( dm_result.value ){
        dm_item_form_info.value = get_form_data();
    } else {
        dm_item_form_info.value = {};
    }
}
// 全てのフォーム入力が完了しているか判定する
const is_result_value = () => {
    if( rf_item_key_result.value && 
        rf_item_condition_result.value && 
        rf_item_prefix_result.value && 
        rf_item_postfix_result.value && 
        rf_item_link_word_result.value &&
        rf_item_link_url_result.value ){
        return true
    } else {
        return false
    }
}
// 全てのフォーム入力データを取得する
const get_form_data = () => {
    let form_data = {}
    form_data.item_type = props.init_item_info.item_type
    form_data.item_uuid = props.init_item_info.item_uuid
    form_data.item_sequence = props.init_item_info.item_sequence
    form_data.item_body_visible = props.init_item_info.item_body_visible 
    form_data.item_result = dm_result.value
    //
    form_data.item_key = rf_item_key.value
    form_data.item_condition_key = rf_item_condition_key.value
    form_data.item_condition_value = rf_item_condition_value.value
    // 接頭辞
    form_data.item_prefix = rf_item_prefix.value
    form_data.item_postfix = rf_item_postfix.value
    form_data.item_link_word = rf_item_link_word.value
    form_data.item_link_url = rf_item_link_url.value
    //console.log("sw-item-editor-label:get_form_data="+JSON.stringify(form_data))
    return form_data
}
</script>

<style scoped>
.item-editor {
  text-align: left;
  padding: 4px;
}
a,a:hover,a:visited{
    color: blue;
    font-weight: bold;
    text-decoration: none;
}
.fsize {
  font-size: 0.95rem;
}
</style>
