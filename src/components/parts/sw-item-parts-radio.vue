<script setup >
import { ref,watch,onMounted,defineModel,defineProps } from 'vue';
import { BFormGroup,BFormRadioGroup,BBadge } from "bootstrap-vue-next";
//import validator from 'validator';
import SwLanguage from '../lib/sw-language.js'
const { get_language } = SwLanguage()

// -----------------------------------------------
// v-modelに親コンポーネントで定義したデータ（ref/reactive）を指定する際に使用
// -----------------------------------------------
// 正常：true 異常：false
const dm_result = defineModel("result",{ type: Boolean, default: false })
// 選択値
const dm_selected_value = defineModel("selected_value",{ type: String, default: "" })
const dm_selected_text = defineModel("selected_text",{ type: String, default: "" })

// -----------------------------------------------
// 親コンポーネントから子コンポーネントへデータを受け渡す
// -----------------------------------------------
const props = defineProps({
    // 項目名
    item_subject: {
        type: String,
        required: true,
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
    // 並び 横並び:true/縦並び:false
    item_line_selected: {
        type: Boolean,
        required: false,
        default: false,
    },
    // 選択肢
    item_choice_columns: {
        type: Array,
        required: false,
        default: () => [],
        // フォーマット [{ text: "xxxxxx", value: "xxxxx" },{ text: "xxxxxx", value: "xxxxx" },,,{}]
    },
    // 選択された選択肢の value
    item_choiced_value: {
        type: String,
        required: false,
        default: "",
    },
});

// -----------------------------------------------
// ローカル変数
// -----------------------------------------------
// デバッグ用
const rf_debug = ref(false)
// ブラウザからデフォルトの言語を取得する
let locale = navigator.language;
if( locale != "ja" && locale != "en" ) locale = "en";

// -----------------------------------------------
// 既定計算
// -----------------------------------------------
// 入力監視
// -----------------------------------------------
// 監視
// -----------------------------------------------
watch([ dm_selected_value ], () => {
    for( let i=0;i<props.item_choice_columns.length;i++ ){
        if( props.item_choice_columns[i].value == dm_selected_value.value ){
            dm_selected_text.value = props.item_choice_columns[i].text;
        }
    }
})
// -----------------------------------------------
// コンポーネントがマウントされる直前に呼び出されるフックを登録します。
// -----------------------------------------------
// onBeforeMount(() => {})
// -----------------------------------------------
// コンポーネントがマウントされた後に呼び出されるコールバックを登録します。
// -----------------------------------------------
onMounted(() => { 
    //console.log("sw-item-parts-radio:onMounted:item_choiced_value="+props.item_choiced_value)
    // console.log("sw-item-parts-radio:onMounted:item_choice_columns="+JSON.stringify(props.item_choice_columns))
    // console.log("sw-item-parts-radio:onMounted:dm_selected_value="+dm_selected_value.value)
    dm_selected_value.value = props.item_choiced_value;
    dm_result.value = true;
});
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

</script>

<template>
<div class="item-editor">
    <!-- Text -->
    <label class="text-black mt-0 mb-0 small" >{{ props.item_subject }}</label>
    <template v-if='props.item_required && props.item_required_badge'>
        <b-badge variant="danger" class="mt-0 mb-0 ms-1">{{ get_language(locale,"selected_mandatory") }}</b-badge>
    </template>
    <b-form-group class="mt-0 mb-0">
        <b-form-radio-group v-model="dm_selected_value" 
            :options="props.item_choice_columns" :stacked="props.item_line_selected" />
    </b-form-group>
    <label v-if='props.item_description!==""' class="text-secondary mt-1 mb-0 ms-1 small">{{ props.item_description }}</label>
    <div v-if="rf_debug">value:{{dm_selected_value}} text:{{dm_selected_text}}</div>
</div>
</template>

<style scoped>
.item-editor {
  text-align: left;
  padding: 4px;
}
input::placeholder {
  opacity: 0.6;
  color: gray;
}
</style>
