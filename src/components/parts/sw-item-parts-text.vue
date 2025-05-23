<script setup >
import { computed,defineModel,defineProps } from 'vue';
import { BFormInput,BInputGroup,BInputGroupText,BBadge } from "bootstrap-vue-next";
import validator from 'validator';
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
    // 追加テキスト
    item_append_text: {
        type: String,
        required: false,
        default: "",
    },
    // 許可する文字 "All" or "Alpha" or "Numeric" or "Alphanumeric" or "Ascii"
    item_allowed_type: {
        type: String,
        required: false,
        default: "All",
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
    ret = result_update(ret);
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
    if( ret ){
        ret = allowed_type(props.item_allowed_type,dm_text.value);
        //console.log("state_input:"+ret)
        if( ret ){
            dm_result.value = true;
        } else {
            dm_result.value = false;
        }
     } else if( ret == null ){
        if( dm_text.value !== "" ){
            ret = allowed_type(props.item_allowed_type,dm_text.value);
            //console.log("item_allowed_type:"+props.item_allowed_type.toLowerCase())
            //console.log("state_input:"+ret)
            if( ret ){
                dm_result.value = true;
            } else {
                dm_result.value = false;
            }
        } else {
            dm_result.value = true;
        }
    } else {
        dm_result.value = false;
    }
    return ret;
}
const allowed_type = (item_allowed_type, text_value) => {
    let ret = true;
    // 許可する文字 "All" or "Alpha" or "Numeric" or "Alphanumeric" or "Ascii" or "AlphanumericPlus"
    if( item_allowed_type.toLowerCase() == "alpha" ){
        ret = validator.isAlpha(text_value)
    } else if( item_allowed_type.toLowerCase() == "numeric" ){
        ret = validator.isNumeric(text_value)
    } else if( item_allowed_type.toLowerCase() == "alphanumeric" ){
        ret = validator.isAlphanumeric(text_value)
    } else if( item_allowed_type.toLowerCase() == "ascii" ){
        ret = validator.isAscii(text_value)
    } else if( item_allowed_type.toLowerCase() == "alphanumericplus" ){
        ret = is_alphanumeric_plus(text_value)
    } else {
        //console.log("item_allowed_type:"+item_allowed_type)
    }
    return ret;
}
const is_alphanumeric_plus = ( text_value ) => {
    let allowedSymbols = ['-', '_']
    let regex = new RegExp(`^[a-zA-Z0-9${allowedSymbols.join('')}]+$`);
    return regex.test(text_value);
}

</script>

<template>
<div class="item-editor">
    <!-- Text -->
    <label class="text-dark mt-0 mb-0 small" >{{ props.item_subject }}</label>
    <template v-if='props.item_required && props.item_required_badge'>
        <b-badge variant="danger" class="mt-0 mb-0 ms-1">{{ get_language(locale,"selected_mandatory") }}</b-badge>
    </template>
    <b-input-group>
        <template v-if='props.item_append_text!==""' #append>
            <b-input-group-text>{{ props.item_append_text }}</b-input-group-text>
        </template>
        <b-form-input type="text" class="mt-0 mb-0" v-model="dm_text" 
            :state="state_input"
            :placeholder="props.item_placeholder"
            :maxlength="props.item_max_length" />
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
