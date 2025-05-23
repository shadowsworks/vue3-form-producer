<script setup >
import { computed,defineModel,defineProps } from 'vue';
import { BFormInput,BInputGroup,BInputGroupText,BRow,BCol } from "bootstrap-vue-next";
import validator from 'validator';

// -----------------------------------------------
// v-modelに親コンポーネントで定義したデータ（ref/reactive）を指定する際に使用
// -----------------------------------------------
// 正常：true 異常：false
const dm_result = defineModel("result",{ type: Boolean, default: false })
// テキスト
const dm_text_1 = defineModel("text_1",{ type: String, default: "" })
const dm_text_2 = defineModel("text_2",{ type: String, default: "" })

// -----------------------------------------------
// 親コンポーネントから子コンポーネントへデータを受け渡す
// -----------------------------------------------
const props = defineProps({
    // 項目名
    item_subject: {
        type: Array,
        required: true,
    },
    // 説明
    item_placeholder: {
        type: Array,
        required: false,
        default: () => ["",""],
    },
    // 補足説明
    item_description: {
        type: Array,
        required: false,
        default: () => ["",""],
    },
    // 必須入力
    item_required: {
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
        type: Array,
        required: false,
        default: () => ["",""],
    },
    // 許可する文字 "All" or "Alpha" or "Numeric" or "Alphanumeric" or "Ascii"
    item_allowed_type: {
        type: Array,
        required: false,
        default: () => ["All","All"],
    },
});

// -----------------------------------------------
// ローカル変数
// -----------------------------------------------
// let view_item_name = "";
// -----------------------------------------------
// 既定計算
// -----------------------------------------------
// 入力監視
const state_input = computed(() => {
    let ret = required();
    ret = result_update(ret);
    return ret;
});

// -----------------------------------------------
// コンポーネントがマウントされる直前に呼び出されるフックを登録します。
// -----------------------------------------------
// onBeforeMount(() => { 
//     if( props.item_init_text[0] !== undefined ){
//         dm_text_1.value = props.item_init_text[0];
//     }
//     if( props.item_init_text[1] !== undefined ){
//         dm_text_2.value = props.item_init_text[1];
//     }
// })
// -----------------------------------------------
// コンポーネントがマウントされた後に呼び出されるコールバックを登録します。
// -----------------------------------------------
// onMounted(() => { 
//     dm_text.value = props.item_init_text;
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
    if( ret ){
        ret = allowed_type(props.item_allowed_type[0],dm_text_1.value);
        if( ret ){
            ret = allowed_type(props.item_allowed_type[1],dm_text_2.value);
        }
        //console.log("state_input:"+ret)
        if( ret ){
            dm_result.value = true;
        } else {
            dm_result.value = false;
        }
     } else if( ret == null ){
        if( dm_text_1.value !== "" || dm_text_2.value !== "" ){
            ret = allowed_type(props.item_allowed_type[0],dm_text_1.value);
            if( ret ){
                ret = allowed_type(props.item_allowed_type[1],dm_text_2.value);
            }
            //console.log("item_allowed_type[0]:"+props.item_allowed_type[0].toLowerCase())
            //console.log("item_allowed_type[1]:"+props.item_allowed_type[1].toLowerCase())
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
    // 許可する文字 "All" or "Alpha" or "Numeric" or "Alphanumeric" or "Ascii"
    if( item_allowed_type.toLowerCase() == "alpha" ){
        ret = validator.isAlpha(text_value)
    } else if( item_allowed_type.toLowerCase() == "numeric" ){
        ret = validator.isNumeric(text_value)
    } else if( item_allowed_type.toLowerCase() == "alphanumeric" ){
        ret = validator.isAlphanumeric(text_value)
    } else if( item_allowed_type.toLowerCase() == "ascii" ){
        ret = validator.isAscii(text_value)
    } else {
        //console.log("item_allowed_type:"+item_allowed_type)
    }
    return ret;
}
</script>

<template>
<div class="item-editor">
    <!-- Text -->
    <b-row><b-col>
        <label class="text-black mt-0 mb-0 small" >{{ props.item_subject[0] }}</label>
        <b-input-group>
            <template v-if='props.item_append_text[0]!==""' #append>
                <b-input-group-text>{{ props.item_append_text[0] }}</b-input-group-text>
            </template>
            <b-form-input type="text" class="mt-0 mb-0" v-model="dm_text_1" 
                :state="state_input"
                :placeholder="props.item_placeholder[0]"
                :maxlength="props.item_max_length[0]" />
        </b-input-group>
        <label v-if='props.item_description[0]!==""' class="text-secondary mt-1 mb-0 ms-1 small">{{ props.item_description[0] }}</label>
    </b-col><b-col>
        <label class="text-black mt-0 mb-0 small" >{{ props.item_subject[1] }}</label>
        <b-input-group>
            <template v-if='props.item_append_text[1]!==""' #append>
                <b-input-group-text>{{ props.item_append_text[1] }}</b-input-group-text>
            </template>
            <b-form-input type="text" class="mt-0 mb-0" v-model="dm_text_2" 
                :state="state_input"
                :placeholder="props.item_placeholder[1]"
                :maxlength="props.item_max_length[1]" />
        </b-input-group>
        <label v-if='props.item_description[1]!==""' class="text-secondary mt-1 mb-0 ms-1 small">{{ props.item_description[1] }}</label>
    </b-col></b-row>    
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
