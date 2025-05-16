<script setup >
import { ref,watch,onBeforeMount,onMounted,defineModel,defineProps } from 'vue';
import { BFormSelect,BBadge } from "bootstrap-vue-next";
import SwLanguage from '../lib/sw-language.js'
const { get_language } = SwLanguage()

// -----------------------------------------------
// v-modelに親コンポーネントで定義したデータ（ref/reactive）を指定する際に使用
// -----------------------------------------------
// 正常：true 異常：false
const dm_result = defineModel("result",{ default: false })
// 選択値
const dm_selected_value = defineModel("selected_value",{ default: "" })
const dm_selected_text = defineModel("selected_text",{ default: "" })
//
const rf_render_key = ref(0)

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
        default: true,
    },
    // 入力必須の時バッジを表示する 表示する:true/表示しない:false
    item_required_badge: {
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
onBeforeMount(() => {
    //console.log("sw-item-parts-select:onBeforeMount:dm_selected_value="+dm_selected_value.value)
    //console.log("sw-item-parts-select:onBeforeMount:item_choiced_value="+props.item_choiced_value)
    if( dm_selected_value.value == "" ){
        if( props.item_choiced_value !== "" ){
            dm_selected_value.value = props.item_choiced_value;
        } else {
            if( props.item_choice_columns.length > 0 ){
                dm_selected_value.value = props.item_choice_columns[0].value;
            }
        }
    }
    dm_result.value = true;
})
// -----------------------------------------------
// コンポーネントがマウントされた後に呼び出されるコールバックを登録します。
// -----------------------------------------------
onMounted(() => {
    //console.log("sw-item-parts-select:onMounted:dm_selected_value="+dm_selected_value.value)
    //console.log("sw-item-parts-select:onMounted:item_choiced_value="+props.item_choiced_value)
    setTimeout(() => {
        rf_render_key.value = rf_render_key.value + 1
    }, 1000);
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
// formatter
//const datetimeFormatter = (value) => moment(value).tz('Asia/Tokyo').format("YYYY/MM/DD HH:mm")

// -----------------------------------------------
// ローカル関数
// -----------------------------------------------

</script>

<template>
<div class="item-editor" >
    <!-- Text -->
    <label class="text-secondary mt-0 mb-0 small" >{{ props.item_subject }}</label>
    <template v-if='props.item_required && props.item_required_badge'>
        <b-badge variant="danger" class="mt-0 mb-0 ms-1">{{ get_language(locale,"selected_mandatory") }}</b-badge>
    </template>
    <b-form-select v-model="dm_selected_value" :key="rf_render_key"
            :options="props.item_choice_columns" />
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
