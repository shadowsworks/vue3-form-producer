<script setup >
import { computed,defineModel,defineProps } from 'vue';
import { BFormInput,BBadge } from "bootstrap-vue-next";
//import validator from 'validator';
import SwLanguage from '../lib/sw-language.js'
const { get_language } = SwLanguage()
// -----------------------------------------------
// v-modelに親コンポーネントで定義したデータ（ref/reactive）を指定する際に使用
// -----------------------------------------------
// 正常：true 異常：false
const dm_result = defineModel("result",{ default: false })
// テキスト
const dm_text = defineModel("text",{ default: "" })

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
    // ハイフン
    item_hyphen_selected: {
        type: Boolean,
        required: false,
        default: false,
    },
    // 国際電話識別番号
    item_international_selected: {
        type: Boolean,
        required: false,
        default: false,
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
    //console.log("state_input:"+ret)
    ret = result_update(ret)
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
// onBeforeUpdate()
// -----------------------------------------------
// コンポーネントがリアクティブな状態変更によって DOM ツリーを更新した後に呼び出されるコールバックを登録します。
// -----------------------------------------------
// onUpdated(() => {})
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
    if( ret || dm_text.value.length > 0 ){
        if( props.item_hyphen_selected && !props.item_international_selected ){
            // ハイフンあり
            if( dm_text.value.match(/^0\d{1,4}-\d{1,4}-\d{1,5}$/) ) {
                dm_result.value = true;
                ret = true;
            } else {
                dm_result.value = false;
                ret = false;
            }
        } else if( !props.item_hyphen_selected && !props.item_international_selected ){
            // ハイフンなし
            if( dm_text.value.match(/^0\d{9,14}$/) ) {
                dm_result.value = true;
                ret = true;
            } else {
                dm_result.value = false;
                ret = false;
            }
        } else if( props.item_hyphen_selected && props.item_international_selected ){
            // 国際電話識別番号対応ハイフンあり
            if( dm_text.value.match(/^[+][-0-9]{10,18}$/) ) {
                dm_result.value = true;
                ret = true;
            } else {
                dm_result.value = false;
                ret = false;
            }
        } else { //if( !props.item_hyphen_selected && props.item_international_selected ){
            // 国際電話識別番号対応国際ハイフンなし
            if( dm_text.value.match(/^[+][0-9]{10,14}$/) ) {
                dm_result.value = true;
                ret = true;
            } else {
                dm_result.value = false;
                ret = false;
            }
        }
        //console.log("state_input:"+ret)
     } else if( ret == null ){
        dm_result.value = true;
    } else {
        dm_result.value = false;
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
    <b-form-input type="text" class="mt-0 mb-0" v-model="dm_text" 
        :state="state_input"
        :placeholder="props.item_placeholder"
    />
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
