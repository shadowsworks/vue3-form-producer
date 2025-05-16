<script setup >
import { computed,onMounted,defineModel,defineProps } from 'vue';
import { BFormInput,BInputGroup,BInputGroupText,BBadge } from "bootstrap-vue-next";
//import validator from 'validator';
import SwLanguage from '../lib/sw-language.js'
const { get_language } = SwLanguage()
// -----------------------------------------------
// v-modelに親コンポーネントで定義したデータ（ref/reactive）を指定する際に使用
// -----------------------------------------------
// 正常：true 異常：false
const dm_result = defineModel("result",{ default: false })
// 数値
const dm_number = defineModel("number",{ default: null })

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
    // 最小値
    item_min_number: {
        type: Number,
        required: false,
        default: 0,
    },
    // 最大値
    item_max_number: {
        type: Number,
        required: false,
        default: 9999999,
    },
    // 初期値
    item_init_number: {
        type: Number,
        required: false,
        default: null,
    },
    // 単位
    item_unit: {
        type: String,
        required: false,
        default: "",
    },
});

// -----------------------------------------------
// ローカル変数
// -----------------------------------------------
// ブラウザからデフォルトの言語を取得する
let locale = navigator.language;
if( locale != "ja" && locale != "en" ) locale = "en";

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
// onBeforeMount(() => { 
//     dm_number.value = props.item_init_number;
// })
// -----------------------------------------------
// コンポーネントがマウントされた後に呼び出されるコールバックを登録します。
// -----------------------------------------------
onMounted(() => { 
    if( props.item_init_number !== null ){
        dm_number.value = props.item_init_number;
    }
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
const required = () => {
    if( props.item_required ){
        if( String(dm_number.value) == "" ){
            return false;
        } else {
            //console.log("required:dm_number.value:"+dm_number.value)
            if( dm_number.value >= props.item_min_number && dm_number.value <= props.item_max_number ){
                return true;
            } else {
                return false;
            }
        }
    } else {
        if( String(dm_number.value) == "" ){
            return null;
        } else {
            if( dm_number.value >= props.item_min_number && dm_number.value <= props.item_max_number ){
                return null;
            } else {
                return false;
            }
        }
    }
}
const result_update = (ret) => {
    if( ret || ret == null ){
        dm_result.value = true
    } else {
        dm_result.value = false
    }
}
</script>

<template>
<div class="item-editor">
    <!-- Text -->
    <label class="text-secondary mt-0 mb-0 small" >{{ props.item_subject }}</label>
    <template v-if='props.item_required && props.item_required_badge'>
        <b-badge variant="danger" class="mt-0 mb-0 ms-1">{{ get_language(locale,"selected_mandatory") }}</b-badge>
    </template>
    <b-input-group>
        <template v-if='props.item_unit!==""' #append>
            <b-input-group-text>{{ props.item_unit }}</b-input-group-text>
        </template>
        <b-form-input type="number" class="mt-0 mb-0" v-model="dm_number" 
            :state="state_input"
            :placeholder="props.item_placeholder"
            :min="props.item_min_number" 
            :max="props.item_max_number" />
    </b-input-group>
    <label v-if='props.item_description!==""' class="text-secondary mt-1 mb-0 ms-1 small">{{ props.item_description }}</label>          
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
