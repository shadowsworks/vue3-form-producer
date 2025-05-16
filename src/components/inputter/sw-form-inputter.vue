<template>
<div class="form-inputter">
    <div v-if="rf_debug">sw-form-inputter: {{ JSON.stringify(props.form_info,null,2) }} </div>
    <template v-for="(item_info) in props.form_info" v-bind:key="item_info.item_uuid">
        <div v-show="is_item_key(item_info,props.form_info)">
          <sw-item-inputter
            :item_info="item_info"
            :demo_mode="props.demo_mode"
            @input_item_value="input_item_value" 
            v-model:custom="rf_custom_message"
        />
        </div>
    </template>
    <div v-if="!props.demo_mode">
        <b-alert :model-value="!dm_result" variant="danger" class="m-2 py-2">
            {{ get_language(locale,'blank_items_or_invalid_items') }}
        </b-alert>
    </div>
</div>
</template>

<script setup >
import { ref,defineModel,defineProps,defineExpose } from 'vue';
import { BAlert } from "bootstrap-vue-next";
import SwLanguage from '../lib/sw-language.js'
const { get_language } = SwLanguage()
import SwItemInputter from "./sw-item-inputter.vue"

// -----------------------------------------------
// v-modelに親コンポーネントで定義したデータ（ref/reactive）を指定する際に使用
// -----------------------------------------------
// 正常：true 異常：false
const dm_result = defineModel("result",{ default: false })
// 入力データ
const dm_value = defineModel("value",{ default: [] })

// -----------------------------------------------
// 親コンポーネントから子コンポーネントへデータを受け渡す
// -----------------------------------------------
const props = defineProps({
    // フォーム情報
    form_info: {
        type: Array,
        required: false,
        deafult: [],
    },
    demo_mode : {
        type: Boolean,
        required: false,
        default: false,
    }
});
// -----------------------------------------------
// ローカル変数
// -----------------------------------------------
// デバッグ用
const rf_debug = ref(false)
// ブラウザからデフォルトの言語を取得する
let locale = navigator.language;
if( locale != "ja" && locale != "en" ) locale = "en";

const rf_custom_message = ref()
rf_custom_message.value = {}

// -----------------------------------------------
// 既定計算 computed(() => {})
// -----------------------------------------------
// const state_xxxxx = computed(() => { return true or false; });
// -----------------------------------------------
// 監視
// -----------------------------------------------
// watch( rf_item_input, () => {
//     console.log("rf_item_input="+JSON.stringify(rf_item_input.value))
// });
// -----------------------------------------------
// コンポーネントがマウントされる直前に呼び出されるフックを登録します。
// -----------------------------------------------
// onBeforeMount(() => {})
// -----------------------------------------------
// コンポーネントがマウントされた後に呼び出されるコールバックを登録します。
// -----------------------------------------------
// onMounted(() => {})
// -----------------------------------------------
// コンポーネントがリアクティブな状態変更により DOM ツリーを更新しようとする直前に呼び出されるフックを登録します。
// -----------------------------------------------
// onBeforeUpdate() => {})
// -----------------------------------------------
// コンポーネントがリアクティブな状態変更によって DOM ツリーを更新した後に呼び出されるコールバックを登録します。
// -----------------------------------------------
// onUpdated(() => {});
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
const is_item_key = (item_info,form_info) => {
    // 条件付き表示がセットされている時
    if( item_info.item_condition_key !== "" && item_info.item_condition_value !== "" ){
        for( let i=0;i<form_info.length;i++ ){
            if( item_info.item_condition_key === form_info[i].item_key && item_info.item_uuid !== form_info[i].item_uuid ){
                // item_info.item_condition_value が入力された時
                for( let j=0;j<dm_value.value.length;j++ ){
                    if( form_info[i].item_uuid === dm_value.value[j].uuid ){
                        if( Array.isArray(dm_value.value[j].value) ){
                            for( let k=0;k<dm_value.value[j].value.length;k++ ){
                                if( item_info.item_condition_value == dm_value.value[j].value[k] ){
                                    return true;// 表示する
                                }
                            }
                        } else {
                            if( item_info.item_condition_value == dm_value.value[j].value ){
                                return true;// 表示する
                            }
                        }
                    }
                }
            }
        }
        return false;// 表示しない
    }
    return true; // 表示する
}
// sw-item-inputter で入力があった時に駆動(emit駆動)
const input_item_value = (item_value) => {
    //console.log("sw-form-inputter:item_value="+JSON.stringify(item_value,null,1))
    update_input_item_value(item_value);
    //rf_item_inputter_render_key.value = rf_item_inputter_render_key.value + 1;  //sw-item-editor の画面を更新する
}
const update_input_item_value = (item_value) => {
    let new_flag = true;
    let result_flag = true;
    for( let i=0;i<dm_value.value.length;i++ ){
        if( dm_value.value[i].uuid == item_value.uuid ){
            //console.log("update_input_item_value="+JSON.stringify(item_value,null,2))
            dm_value.value[i] = item_value;
            new_flag = false;
        }
        if( !dm_value.value[i].result ){
            result_flag = false;
        }
    }
    if( new_flag ){
        dm_value.value.push(item_value)
    }
    dm_result.value = result_flag
    // Clean Up
    for( let i=0;i<dm_value.value.length;i++ ){
        let clean_flag = true;
        for( let j=0;j<props.form_info.length;j++ ){
            if( dm_value.value[i].uuid == props.form_info[j].item_uuid ){
                clean_flag = false;
            }
        }
        if( clean_flag ){
            dm_value.value[i].deleted = true;
        }
    }
    for( let k=0;k<dm_value.value.length;k++ ){
        if( dm_value.value[k].deleted !== undefined ){
            dm_value.value.splice( k,1 );
        }
    }
    //console.log("sw-form-inputter:update_input_item_value:dm_value="+JSON.stringify(dm_value.value));
}
// -----------------------------------------------
// パブリック関数
// -----------------------------------------------
const get_value_by_item_uuid = (item_uuid) => {
    for( let i=0;i<dm_value.value.length;i++ ){
        if( dm_value.value[i].uuid == item_uuid ){
            return dm_value.value[i].value
        }
    }
    return ""
}
const get_value_by_item_key = (item_key) => {
    for( let i=0;i<dm_value.value.length;i++ ){
        if( dm_value.value[i].key == item_key ){
            return dm_value.value[i].value
        }
    }
    return ""
}
const set_message_by_item_uuid = (item_uuid, message) => {
    rf_custom_message.value[item_uuid] = message
}
const set_message_by_item_key = (item_key, message) => {
    rf_custom_message.value[item_key] = message
}
const clear_message_by_item_uuid = (item_uuid) => {
    rf_custom_message.value[item_uuid] = ""
}
const clear_message_by_item_key = (item_key) => {
    rf_custom_message.value[item_key] = ""
}
const get_file_info_by_item_key = (item_key) => {
    for( let i=0;i<dm_value.value.length;i++ ){
        if( dm_value.value[i].key == item_key ){
            console.log("get_file_object_by_item_key="+JSON.stringify(dm_value.value[i]))
            return dm_value.value[i].value;
        }
    }
    return ""
}
const get_file_info_by_item_uuid = (item_uuid) => {
    for( let i=0;i<dm_value.value.length;i++ ){
        if( dm_value.value[i].uuid == item_uuid ){
            console.log("get_file_object_by_item_uuid="+JSON.stringify(dm_value.value[i]))
            return dm_value.value[i].value;
        }
    }
    return ""
}
defineExpose({
    get_value_by_item_uuid,
    get_value_by_item_key,
    set_message_by_item_uuid,
    set_message_by_item_key,
    clear_message_by_item_uuid,
    clear_message_by_item_key,
    get_file_info_by_item_key,
    get_file_info_by_item_uuid
});
</script>

<style scoped>
.form-inputter {
  text-align: left;
  margin: 0px;
  padding: 4px;
}
</style>
  