<script setup >
import { ref,computed,watch,defineModel,defineProps } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { BFormInput,BInputGroup,BButton,BBadge } from "bootstrap-vue-next";
import validator from 'validator';
import sha256 from 'crypto-js/sha256'
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
    // 最小文字数
    item_min_characters: {
        type: Number,
        required: false,
        default: 8,
    },
    // 含める文字 "Lowercase" or "Uppercase" or "Numeric" or "Symbols"
    item_character_type: {
        type: Array,
        required: false,
        default: () => ["Lowercase","Uppercase","Numeric"],
    },
    // パスワード表示ボタンを表示する 表示する:true/表示しない:false
    item_password_view: {
        type: Boolean,
        required: false,
        default: false,
    },
    // パスワードをハッシュする ハッシュする:true/ハッシュしない:false
    item_password_hash: {
        type: Boolean,
        required: false,
        default: true,
    },
});

// -----------------------------------------------
// ローカル変数
// -----------------------------------------------
// ブラウザからデフォルトの言語を取得する
let locale = navigator.language;
if( locale != "ja" && locale != "en" ) locale = "en";
const rf_render_key = ref(0)
const rf_password_text = ref("")
let local_icon_name = "eye"
let local_icon_eye = "eye"
let local_icon_eye_slash = "eye-slash"
let local_input_type = "password"
let local_input_type_text = "text"
let local_input_type_password = "password"

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
// 監視
// -----------------------------------------------
watch( [rf_password_text], () => {
    //console.log("watch:props.item_password_hash="+props.item_password_hash)
    if( props.item_password_hash ){
        if( rf_password_text.value.length > 1 ){
            dm_text.value = String(sha256(rf_password_text.value))
        } else {
            dm_text.value = rf_password_text.value
        }
        //console.log("watch:dm_text.value="+rf_password_text.value+":"+dm_text.value)
    } else {
        dm_text.value = rf_password_text.value
    }
})
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
// formatter
//const datetimeFormatter = (value) => moment(value).tz('Asia/Tokyo').format("YYYY/MM/DD HH:mm")

// -----------------------------------------------
// ローカル関数
// -----------------------------------------------
const required = () => {
    if( props.item_required ){
        if( String(rf_password_text.value) == "" ){
            return false;
        } else {
            return true;
        }
    } else {
        return null;
    }
}
const result_update = (ret) => {
    if( ret || rf_password_text.value.length > 0 ){
        // 最小文字数
        if( props.item_min_characters > rf_password_text.value.length ){
            dm_result.value = false;
            return false;
        }
        // 含める文字 "Lowercase" or "Uppercase" or "Numeric" or "Symbols"
        let options = {};
        options.minLength = props.item_min_characters;  //最小文字数
        if( props.item_character_type.includes("Lowercase") ){
            options.minLowercase = 1;
        } else {
            options.minLowercase = 0;
        }
        if( props.item_character_type.includes("Uppercase") ){
            options.minUppercase = 1;
        } else {
            options.minUppercase = 0;
        }
        if( props.item_character_type.includes("Numeric") ){
            options.minNumbers = 1;
        } else {
            options.minNumbers = 0;
        }
        if( props.item_character_type.includes("Symbols") ){
            options.minSymbols = 1;
        } else {
            options.minSymbols = 0;
        }
        ret = validator.isStrongPassword(rf_password_text.value, options);
        if( ret ){
            dm_result.value = true;
        } else {
            dm_result.value = false;
        }
     } else if( ret == null ){
        dm_result.value = true;
    } else {
        dm_result.value = false;
    }
    return ret;
}
const click_icon_button = () => {
    if( local_icon_name == local_icon_eye ){
        local_icon_name = local_icon_eye_slash;
        local_input_type = local_input_type_text;
    } else {
        local_icon_name = local_icon_eye;
        local_input_type = local_input_type_password;
    }
    rf_render_key.value = rf_render_key.value + 1;
}
</script>

<template>
<div class="item-editor">
    <!-- Text -->
    <label class="text-black mt-0 mb-0 small" >{{ props.item_subject }}</label>
    <template v-if='props.item_required && props.item_required_badge'>
        <b-badge variant="danger" class="mt-0 mb-0 ms-1">{{ get_language(locale,"selected_mandatory") }}</b-badge>
    </template>
    <b-input-group :key="rf_render_key">
        <template v-if='props.item_password_view' #append>
            <b-button variant="outline-secondary" @click=click_icon_button() ><font-awesome-icon :icon="local_icon_name" /></b-button>
        </template>
        <b-form-input :type="local_input_type" class="mt-0 mb-0" v-model="rf_password_text" 
            :state="state_input" autocomplete="off" 
            :placeholder="props.item_placeholder"
            maxlength=100 />
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
