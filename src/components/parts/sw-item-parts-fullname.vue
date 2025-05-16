<script setup >
import { computed,defineModel,defineProps } from 'vue';
import { BFormInput, BInputGroup, BInputGroupText, BRow, BCol, BBadge } from "bootstrap-vue-next";
import SwLanguage from '../lib/sw-language.js'
const { get_language } = SwLanguage()
// -----------------------------------------------
// v-modelに親コンポーネントで定義したデータ（ref/reactive）を指定する際に使用
// -----------------------------------------------
// 正常：true 異常：false
const dm_result = defineModel("result",{ default: false })
// テキスト
const dm_text_1 = defineModel("text_1",{ default: "" })
const dm_text_2 = defineModel("text_2",{ default: "" })

// -----------------------------------------------
// 親コンポーネントから子コンポーネントへデータを受け渡す
// -----------------------------------------------
const props = defineProps({
    // 項目名
    item_name_1: {
        type: String,
        required: true,
    },
    item_name_2: {
        type: String,
        required: true,
    },
    // 説明
    item_placeholder_1: {
        type: String,
        required: false,
        default: "",
    },
    item_placeholder_2: {
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
    item_append_text_1: {
        type: String,
        required: false,
        default: "",
    },
    item_append_text_2: {
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
    result_update(ret)
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
        if( dm_text_1.value !== "" && dm_text_2.value !== "" ){
            return true;
        } else {
            return false;
        }
    } else {
        if( dm_text_1.value == "" && dm_text_2.value == "" ){
            return null;
        } else if( dm_text_1.value !== "" && dm_text_2.value !== "" ){
            return null;
        } else {
            return false
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
    <b-row><b-col>
        <label class="text-secondary mt-0 mb-0 small" >{{ props.item_name_1 }}</label>
        <template v-if='props.item_required && props.item_required_badge'>
            <b-badge variant="danger" class="mt-0 mb-0 ms-1">{{ get_language(locale,"selected_mandatory") }}</b-badge>
        </template>
        <b-input-group>
            <template v-if='props.item_append_text_1!==""' #append>
                <b-input-group-text>{{ props.item_append_text_1 }}</b-input-group-text>
            </template>
            <b-form-input type="text" class="mt-0 mb-0" v-model="dm_text_1" 
                :state="state_input"
                :placeholder="props.item_placeholder_1"
                :maxlength="props.item_max_length" />
        </b-input-group>
    </b-col><b-col>
        <label class="text-secondary mt-0 mb-0 small" >{{ props.item_name_2 }}</label>
        <template v-if='props.item_required && props.item_required_badge'>
            <b-badge variant="danger" class="mt-0 mb-0 ms-1">{{ get_language(locale,"selected_mandatory") }}</b-badge>
        </template>
        <b-input-group>
            <template v-if='props.item_append_text_2!==""' #append>
                <b-input-group-text>{{ props.item_append_text_2 }}</b-input-group-text>
            </template>
            <b-form-input type="text" class="mt-0 mb-0" v-model="dm_text_2" 
                :state="state_input"
                :placeholder="props.item_placeholder_2"
                :maxlength="props.item_max_length" />
        </b-input-group>
    </b-col></b-row>
    <label v-if='props.item_description!==""' class="text-secondary mt-1 mb-0 ms-1 small">{{ props.item_description }}</label>
</div>
</template>

<style scoped>
.item-editor {
  text-align: left;
  padding: 4px;
}
</style>
