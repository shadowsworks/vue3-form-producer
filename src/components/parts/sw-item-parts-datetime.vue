<script setup >
import { ref,computed,defineModel,defineProps } from 'vue';
import { BFormInput, BBadge } from "bootstrap-vue-next";
//import validator from 'validator';
import moment from 'moment-timezone';
import SwLanguage from '../lib/sw-language.js'
const { get_language } = SwLanguage()
// -----------------------------------------------
// v-modelに親コンポーネントで定義したデータ（ref/reactive）を指定する際に使用
// -----------------------------------------------
// 正常：true 異常：false
const dm_result = defineModel("result",{ default: false })
// テキスト
const dm_text = defineModel("text",{ default: "" })
const rf_text = ref("")

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
    // item_placeholder: {
    //     type: String,
    //     required: false,
    //     default: "",
    // },
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
    // 出力フォーマット
    item_output_format: {
        type: String,
        required: false,
        default: "ShortDateTime1",
    },
});

// -----------------------------------------------
// ローカル変数
// -----------------------------------------------
// ブラウザからデフォルトの言語を取得する
let locale = navigator.language;
if( locale != "ja" && locale != "en" ) locale = "en";
moment.locale(locale);

// -----------------------------------------------
// 既定計算
// -----------------------------------------------
// 入力監視
const state_input = computed(() => {
    let ret = required();
    //console.log("state_input:"+ret)
    result_update(ret);
    return ret;
});

// -----------------------------------------------
// コンポーネントがマウントされる直前に呼び出されるフックを登録します。
// -----------------------------------------------
// onBeforeMount(() => {})
// -----------------------------------------------
// コンポーネントがマウントされた後に呼び出されるコールバックを登録します。
// -----------------------------------------------
// onMounted(() => {});
// -----------------------------------------------
// コンポーネントがリアクティブな状態変更により DOM ツリーを更新しようとする直前に呼び出されるフックを登録します。
// -----------------------------------------------
// onBeforeUpdate(() => {})
// -----------------------------------------------
// コンポーネントがリアクティブな状態変更によって DOM ツリーを更新した後に呼び出されるコールバックを登録します。
// -----------------------------------------------
// onUpdated(() => {})
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
const output_format = () => {
    let tmp_datetime = rf_text.value+":00"
    //console.log("output="+tmp_datetime)
    if( props.item_output_format == "ShortDateTime1" ){
        dm_text.value = moment(tmp_datetime).format("YYYY/MM/DD HH:mm");
    } else if( props.item_output_format == "ShortDateTime2" ){
        dm_text.value = moment(tmp_datetime).format("YYYY-MM-DD HH:mm");
    } else if( props.item_output_format == "ShortDateTime3" ){
        dm_text.value = moment(tmp_datetime).format("YYYY-MM-DDTHH:mm:00");
    } else if( props.item_output_format == "MediumDateTime" ){
        dm_text.value = moment(tmp_datetime).format("lll");
    } else if( props.item_output_format == "LongDateTime" ){
        dm_text.value = moment(tmp_datetime).format("llll");
    } else {
        dm_text.value = moment(tmp_datetime).format("YYYY/MM/DD HH:mm");
    }
    dm_result.value = true;
}
</script>

<template>
<div class="item-editor">
    <!-- Text -->
    <label class="text-secondary mt-0 mb-0 small" >{{ props.item_subject }}</label>
    <template v-if='props.item_required && props.item_required_badge'>
        <b-badge variant="danger" class="mt-0 mb-0 ms-1">{{ get_language(locale,"selected_mandatory") }}</b-badge>
    </template>
    <b-form-input type="datetime-local" class="mt-0 mb-0" v-model="rf_text" 
        :state="state_input" @vue:updated="output_format()"
    />
    <label v-if='props.item_description!==""' class="text-secondary mt-1 mb-0 ms-1 small">{{ props.item_description }}</label>          
</div>
</template>

<style scoped>
.item-editor {
  text-align: left;
  padding: 4px;
}
</style>
