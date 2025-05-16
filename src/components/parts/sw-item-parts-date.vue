<script setup >
import { ref,computed,defineModel,defineProps } from 'vue';
import { BFormInput, BBadge } from "bootstrap-vue-next";
import validator from 'validator';
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
    // // 説明
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
        default: "ShortDate",
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
        dm_result.value = true
    } else {
        dm_result.value = false
    }
}
const output_format = () => {
    //console.log("output="+rf_text.value)
    if( validator.isDate(rf_text.value)){
        if( props.item_output_format == "ShortDate" ){
            dm_text.value = moment(rf_text.value).format("YYYY/MM/DD");
        } else if( props.item_output_format == "MediumDate" ){
            dm_text.value = moment(rf_text.value).format("YYYY-MM-DD");
        } else if( props.item_output_format == "LongDate" ){
            dm_text.value = moment(rf_text.value).format("LL");
        } else if( props.item_output_format == "LongWeekDate" ){
            dm_text.value = get_week_date(moment(rf_text.value).format("llll"));
        } else {
            dm_text.value = moment(rf_text.value).format("YYYY-MM-DD");
        }
        dm_result.value = true;
    } else {
        dm_result.value = false;
    }
}
const get_week_date = (param) => {
    let ret = param.substring(0,param.lastIndexOf(" "));
    if( locale == "en" ){
        ret = ret.substring(0,ret.lastIndexOf(" "));
    }
    return ret;
}
</script>

<template>
<div class="item-editor">
    <!-- Text -->
    <label class="text-secondary mt-0 mb-0 small" >{{ props.item_subject }}</label>
    <template v-if='props.item_required && props.item_required_badge'>
        <b-badge variant="danger" class="mt-0 mb-0 ms-1">{{ get_language(locale,"selected_mandatory") }}</b-badge>
    </template>
    <b-form-input type="date" class="mt-0 mb-0" v-model="rf_text" 
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
