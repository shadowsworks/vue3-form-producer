<script setup >
import { computed,onBeforeMount,defineModel,defineProps,ref } from 'vue';
import { BFormInput,BInputGroup,BInputGroupText,BBadge,BTableSimple,BThead,BTr,BTh,BTd } from "bootstrap-vue-next";
import validator from 'validator';
import SwLanguage from '../lib/sw-language.js'
const { get_language } = SwLanguage()
// -----------------------------------------------
// v-modelに親コンポーネントで定義したデータ（ref/reactive）を指定する際に使用
// -----------------------------------------------
// 正常：true 異常：false
const dm_result = defineModel("result",{ default: false })
// テキスト
const dm_table = defineModel("table",{ default: () => [() => []] })

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
    // 許可する文字 "All" or "Alpha" or "Numeric" or "Alphanumeric" or "Ascii"
    item_allowed_type: {
        type: String,
        required: false,
        default: "All",
    },
    // 行
    item_rows_columns: {
        type: Array,
        required: false,
        default: () => [],
    },
    // 列
    item_columns_columns: {
        type: Array,
        required: false,
        default: () => [],
    },
    item_append_text: {
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
const rf_table_array = ref([]);

// -----------------------------------------------
// 既定計算
// -----------------------------------------------
// 入力監視
const state_input = computed(() => (row,col) => {
    let ret = required(row,col);
    //console.log("state_input:"+ret)
    ret = result_update(ret,row,col);
    return ret;
});

// -----------------------------------------------
// コンポーネントがマウントされる直前に呼び出されるフックを登録します。
// -----------------------------------------------
onBeforeMount(() => {
    for(let i=0; i<props.item_rows_columns.length; i++){
        rf_table_array.value[i] = [];
        for(let j=0; j<props.item_columns_columns.length; j++){
            rf_table_array.value[i][j] = '';
        }
    }
})
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
const required = (row,col) => {
    if( props.item_required ){
        if( String(rf_table_array.value[row][col]) == "" ){
            return false;
        }
        return true;
    } else {
        return null;
    }
}
const result_update = (ret,row,col) => {
    if( ret ){
        dm_result.value = true;
        ret = allowed_type(props.item_allowed_type,String(rf_table_array.value[row][col]));
        for(let i=0; i<props.item_rows_columns.length; i++){
            for(let j=0; j<props.item_columns_columns.length; j++){
                let local_ret = allowed_type(props.item_allowed_type,String(rf_table_array.value[i][j]));
                if( !local_ret ){
                    dm_result.value = false;
                    break;
                }
            }
        }
     } else if( ret == null ){
        dm_result.value = true;
        if( rf_table_array.value[row][col] !== "" ){
            ret = allowed_type(props.item_allowed_type,rf_table_array.value[row][col]);
        }
        for(let i=0; i<props.item_rows_columns.length; i++){
            for(let j=0; j<props.item_columns_columns.length; j++){
                if( rf_table_array.value[i][j] !== "" ){
                    let local_ret = allowed_type(props.item_allowed_type,rf_table_array.value[i][j]);
                    if( !local_ret ){
                        dm_result.value = false;
                        break;
                    }
                }
            }
        }
    } else {
        dm_result.value = false;
    }
    dm_table.value = rf_table_array.value;
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
    <label class="text-secondary mt-0 mb-0 small" >{{ props.item_subject }}</label>
    <template v-if='props.item_required && props.item_required_badge'>
        <b-badge variant="danger" class="mt-0 mb-0 ms-1">{{ get_language(locale,"selected_mandatory") }}</b-badge>
    </template>
    <b-table-simple bordered class="mb-0">
        <b-thead>
            <b-tr>
                <b-th></b-th>
                <template v-for="(columns_columns) in props.item_columns_columns" :key="columns_columns.text" >
                    <b-th class="text-secondary">{{ columns_columns.text }}</b-th>
                </template>
            </b-tr>
            <b-tr v-for="(rows_columns,row_index) in props.item_rows_columns" :key="rows_columns.text">
                <b-th class="text-secondary">{{ rows_columns.text }}</b-th>
                <b-td v-for="(item_columns_columns,col_index) in props.item_columns_columns" :key="item_columns_columns.text" >
                    <b-input-group>
                        <template v-if='props.item_append_text!==""' #append>
                            <b-input-group-text>{{ props.item_append_text }}</b-input-group-text>
                        </template>
                        <b-form-input type="text" class="mt-0 mb-0" v-model="rf_table_array[row_index][col_index]" 
                            :state="state_input(row_index,col_index)"
                            :placeholder="props.item_placeholder"
                            :maxlength="props.item_max_length" />
                    </b-input-group>
                </b-td>
            </b-tr>
        </b-thead>
    </b-table-simple>
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
