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
        default: "ShortTime",
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
    result_update(ret)
    return ret;
});

// -----------------------------------------------
// コンポーネントがマウントされる直前に呼び出されるフックを登録します。
// -----------------------------------------------
// onBeforeMount(() => { 
//     dm_text.value = props.item_init_text;
// })
// -----------------------------------------------
// コンポーネントがマウントされた後に呼び出されるコールバックを登録します。
// -----------------------------------------------
// onMounted(() => {
//     rf_item_inputter_render_key.value = rf_item_inputter_render_key.value + 1;  //sw-item-editor の画面を更新する
// });
// -----------------------------------------------
// コンポーネントがリアクティブな状態変更により DOM ツリーを更新しようとする直前に呼び出されるフックを登録します。
// -----------------------------------------------
// onBeforeUpdate()
// -----------------------------------------------
// コンポーネントがリアクティブな状態変更によって DOM ツリーを更新した後に呼び出されるコールバックを登録します。
// -----------------------------------------------
// onUpdated(() => {
//     rf_item_inputter_render_key.value = rf_item_inputter_render_key.value + 1;  //sw-item-editor の画面を更新する
// })
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
const required = () => {
    if( props.item_required ){
        if( String(rf_text.value) == "" ){
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
        dm_result.value = true;
    } else {
        dm_result.value = false;
    }
}
const output_format = () => {
    //console.log("output="+rf_text.value)
    let tmp_time = "2000-01-01T"+rf_text.value+":01";
    //console.log("output="+tmp_time+" "+locale)
    if( props.item_output_format == "ShortTime" ){
        dm_text.value = moment(tmp_time).format("LT");
    } else if( props.item_output_format == "LongTime" ){
        if( locale == "ja" ){
            dm_text.value = moment(tmp_time).format("HH時mm分");
        } else {
            dm_text.value = moment(tmp_time).format("HH:mm");
        }
    } else {
        dm_text.value = moment(tmp_time).format("LT");
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
    <b-form-input type="time" class="mt-0 mb-0" v-model="rf_text" 
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
