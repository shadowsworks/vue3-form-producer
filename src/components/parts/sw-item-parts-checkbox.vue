<script setup >
import { ref,computed,defineModel,defineProps } from 'vue';
import { BFormGroup, BFormCheckboxGroup, BBadge } from "bootstrap-vue-next";
//import validator from 'validator';
import SwLanguage from '../lib/sw-language.js'
const { get_language } = SwLanguage()

// -----------------------------------------------
// v-modelに親コンポーネントで定義したデータ（ref/reactive）を指定する際に使用
// -----------------------------------------------
// 正常：true 異常：false
const dm_result = defineModel("result",{ default: false })
// 選択値
const dm_selected_value = defineModel("selected_value",{ default: [] })
const dm_selected_text = defineModel("selected_text",{ default: [] })

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
    // 並び 横並び:true/縦並び:false
    item_line_selected: {
        type: Boolean,
        required: false,
        default: false,
    },
    // 選択肢
    item_choice_columns: {
        type: Array,
        required: false,
        default: () => [],
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
const state_input = computed(() => {
    let ret = required();
    result_update(ret);
    return ret;
});
// -----------------------------------------------
// 監視
// -----------------------------------------------
// watch([ dm_selected_value ], () => {
// -----------------------------------------------
// コンポーネントがマウントされる直前に呼び出されるフックを登録します。
// -----------------------------------------------
// onBeforeMount(() => {})
// -----------------------------------------------
// コンポーネントがマウントされた後に呼び出されるコールバックを登録します。
// -----------------------------------------------
// onMounted(() => { 
//     dm_number.value = props.item_init_number;
// });
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
        if( dm_selected_value.value.length == 0 ){
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
const update_value = (  ) => {
    setTimeout(() => {
        update_task()
    }, 100);
}
const update_task = (  ) => {
    //console.log("dm_selected_value="+JSON.stringify(dm_selected_value.value))
    dm_selected_text.value = [];
    //console.log("dm_selected_text="+JSON.stringify(dm_selected_text.value))
    for( let j=0;j<dm_selected_value.value.length;j++ ){
        for( let i=0;i<props.item_choice_columns.length;i++ ){
            if( props.item_choice_columns[i].value == dm_selected_value.value[j] ){
                dm_selected_text.value.push(props.item_choice_columns[i].text);
            }
        }
    }
    //console.log("dm_selected_text="+JSON.stringify(dm_selected_text.value))
}
</script>

<template>
<div class="item-editor">
    <!-- Text -->
    <label class="text-secondary mt-0 mb-0 small" >{{ props.item_subject }}</label>
    <template v-if='props.item_required && props.item_required_badge'>
        <b-badge variant="danger" class="mt-0 mb-0 ms-1">{{ get_language(locale,"selected_mandatory") }}</b-badge>
    </template>
    <b-form-group class="mt-0 mb-0">
        <b-form-checkbox-group v-model="dm_selected_value" 
            :options="props.item_choice_columns" 
            :state="state_input" :stacked="props.item_line_selected" @update:model-value="update_value()"/>
    </b-form-group>
    <label v-if='props.item_description!==""' class="text-secondary mt-1 mb-0 ms-1 small">{{ props.item_description }}</label>
    <div v-if="rf_debug">value:{{dm_selected_value}} text:{{dm_selected_text}} item_choice_columns:{{props.item_choice_columns}} </div>         
</div>
</template>

<style scoped>
.item-editor {
  text-align: left;
  padding: 4px;
}
</style>
