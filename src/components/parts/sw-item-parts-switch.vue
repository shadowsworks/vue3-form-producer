<script setup >
import { ref,watch,computed,onBeforeMount,defineModel,defineProps } from 'vue';
import { BFormCheckbox,BBadge } from "bootstrap-vue-next";
//import validator from 'validator';
import SwLanguage from '../lib/sw-language.js'
const { get_language } = SwLanguage()

// -----------------------------------------------
// v-modelに親コンポーネントで定義したデータ（ref/reactive）を指定する際に使用
// -----------------------------------------------
// 正常：true 異常：false
const dm_result = defineModel("result",{ type: Boolean, default: false })
// 選択値
const dm_selected = defineModel("selected",{ type: String, default: "" })

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
    // ON
    item_on_value: {
        type: String,
        required: false,
        default: "",
    },
    // OFF
    item_off_value: {
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
const rf_selected = ref(false)
//dm_result.value = true;

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
watch([ rf_selected ], () => {
        watch_task()
        setTimeout(() => {
            watch_task()
        }, 100);
        setTimeout(() => {
            watch_task()
        }, 200);
})
// -----------------------------------------------
// コンポーネントがマウントされる直前に呼び出されるフックを登録します。
// -----------------------------------------------
onBeforeMount(() => {
    dm_selected.value = props.item_off_value
})
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

// -----------------------------------------------
// ローカル関数
// -----------------------------------------------
const required = () => {
    if( props.item_required ){
        if( dm_selected.value == props.item_on_value ){
            return true;
        } else {
            return false;
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
    return ret;
}
// 監視で使用する
const watch_task = () => {
    if( rf_selected.value ){
        dm_selected.value = props.item_on_value
    } else {
        dm_selected.value = props.item_off_value
    }
}
</script>

<template>
<div class="item-editor">
    <!-- Text -->
    <label class="text-black mt-0 mb-0 small" >{{ props.item_subject }}</label>
    <template v-if='props.item_required && props.item_required_badge'>
        <b-badge variant="danger" class="mt-0 mb-0 ms-1">{{ get_language(locale,"selected_mandatory") }}</b-badge>
    </template>
    <b-form-checkbox v-model="rf_selected" switch :state="state_input">{{ props.item_placeholder }}</b-form-checkbox>
    <label v-if='props.item_description!==""' class="text-secondary mt-1 mb-0 ms-1 small">{{ props.item_description }}</label>
    <div v-if="rf_debug">item_placeholder:{{props.item_placeholder}}</div>        
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
