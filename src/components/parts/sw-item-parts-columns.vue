<script setup >
import { ref,computed,onMounted,onBeforeMount,onBeforeUnmount,defineModel,defineProps } from 'vue';
import { BInputGroup,BFormInput,BButton,BFormRadio,BInputGroupText } from "bootstrap-vue-next";
import _ from 'lodash';
// -----------------------------------------------
// v-modelに親コンポーネントで定義したデータ（ref/reactive）を指定する際に使用
// -----------------------------------------------
// 正常：true 異常：false
const dm_result = defineModel("result",{ default: false })
// 選択肢入力
const dm_columns = defineModel("columns", { type: Array, default: [] })
// 選択結果
const dm_selected = defineModel("selected",{ default: 1 })  //rf_item_choiced_number

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
    // 選択肢
    item_choice_columns: {
        type: Array,
        required: false,
        default: () => [],
    },
    // 補足説明
    item_description: {
        type: String,
        required: false,
        default: "",
    },
    // 初期数値
    item_max_columns: {
        type: Number,
        required: false,
        default: 10,
    },
    // 選択初期値を有効にする
    item_selected_enable: {
        type: Boolean,
        required: false,
        default: false,
    },
});

// -----------------------------------------------
// ローカル変数
// -----------------------------------------------
// デバッグ用
//const rf_debug = ref(false)
//
const rf_render_key = ref(0)
const rf_interval = ref()  // 定期実行用
const rf_columns = ref([])  // 入力用

let local_max_column = 10;
let local_num_column = 2;
let local_radio_name = "";
// -----------------------------------------------
// 既定計算
// -----------------------------------------------
const state_column_data = computed(() => (n) => {
    return check_column_data(n)
})

// -----------------------------------------------
// コンポーネントがマウントされる直前に呼び出されるフックを登録します。
// -----------------------------------------------
onBeforeMount(() => {
    local_radio_name = get_unique_string();
    if( props.item_max_columns !== undefined ){
        local_max_column = props.item_max_columns;
    }
    for( let i=0;i<props.item_choice_columns.length;i++ ){
        //console.log("sw-item-parts-columns:onBeforeMount:props.item_choice_columns:"+JSON.stringify(props.item_choice_columns[i]))
        rf_columns.value[i] = props.item_choice_columns[i].value
        if( props.item_choice_columns[i].text !== undefined ){
            if( props.item_choice_columns[i].text !== props.item_choice_columns[i].value ){
                rf_columns.value[i] += "$"+props.item_choice_columns[i].text
            }
        }
    }
    dm_selected.value = 1
})
// -----------------------------------------------
// コンポーネントがマウントされた後に呼び出されるコールバックを登録します。
// -----------------------------------------------
onMounted(() => {
    if( local_num_column < rf_columns.value.length ){
        local_num_column = rf_columns.value.length;
        rf_render_key.value = rf_render_key.value + 1;
    }
    rf_interval.value = setInterval(() => {
        for( let i=0;i<local_num_column;i++ ){
            if( !check_column_data(i+1) ){
                dm_result.value = false;
                return;
            }
        }
        if( props.item_selected_enable ){
            if( dm_selected.value > 0 ){
                copy_column_data();
                dm_result.value = true;
            } else {
                dm_result.value = false;
            }
        } else {
            copy_column_data();
            dm_result.value = true;
        }
        //console.log("onMounted:state_column_data")
    }, 500);
})
// -----------------------------------------------
// コンポーネントがリアクティブな状態変更により DOM ツリーを更新しようとする直前に呼び出されるフックを登録します。
// -----------------------------------------------
// onBeforeUpdate(() => {})
// -----------------------------------------------
// コンポーネントがリアクティブな状態変更によって DOM ツリーを更新した後に呼び出されるコールバックを登録します。
// -----------------------------------------------
// onUpdated(() => {});
// -----------------------------------------------
// コンポーネントインスタンスがアンマウントされる直前に呼び出されるフックを登録します。
// -----------------------------------------------
onBeforeUnmount(() => {
    if(rf_interval.value){
        clearInterval(rf_interval.value);
    }
})
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
const required = (in_value) => {
    if( String(in_value) == "" ){
        return false;
    } else {
        return true;
    }
}
const plus_button = () => {
    local_num_column += 1;
    rf_columns.value.push("")
    //dm_columns.value.push({text:"",value:""})
    rf_render_key.value = rf_render_key.value + 1;
}
const minus_button = () => {
    if( local_num_column == dm_selected.value ){
        dm_selected.value -= 1;
    }
    local_num_column -= 1;
    rf_columns.value.pop()
    //dm_columns.value.pop()
    rf_render_key.value = rf_render_key.value + 1;
}
const change_column = () => {
    rf_render_key.value = rf_render_key.value + 1;
}
const input_column = (n) => {
    if( rf_columns.value[n-1] == "" ){
        rf_render_key.value = rf_render_key.value + 1;
    }
}
const get_unique_string = (myStrong) => {
    var strong = 1000;
    if (myStrong) strong = myStrong;
    return new Date().getTime().toString(16)+Math.floor(strong*Math.random()).toString(16)
}
const check_column_data = (n) => {
    if( required(rf_columns.value[n-1]) ){
        for( let i=0;i<local_num_column;i++ ){
            let src_column = get_column_data(i)
            let dst_column = get_column_data(n-1)
            if( i != n-1 ){
                //if( rf_columns.value[n-1] == rf_columns.value[i] ){
                if( dst_column.value == src_column.value ){
                    return false;
                }
            }
        }
        return true;
    } else {
        return false;
    }
}
const copy_column_data = () => {
    let tmp_columns = []
    for( let i=0;i<local_num_column;i++ ){
        let column = get_column_data(i)
        tmp_columns.push(column);
    }
    //console.log("sw-item-parts-columns:copy_column_data:tmp_columns:"+JSON.stringify(tmp_columns))
    if( !_.isEqual(dm_columns.value,tmp_columns) ){
        dm_columns.value = JSON.parse(JSON.stringify(tmp_columns));
        //console.log("sw-item-parts-columns:copy_column_data:dm_columns:"+JSON.stringify(dm_columns.value))
    }
}
const get_column_data = (i) => {
    let column = {}
    let tmps = rf_columns.value[i].split("$");
    if( tmps.length == 2 ){
        if( tmps[0].length > 0 && tmps[1].length > 0 ){
            column.text = tmps[1];
            column.value = tmps[0];
        } else {
            column.text = rf_columns.value[i];
            column.value = rf_columns.value[i];
        }
    } else {
        column.text = rf_columns.value[i];
        column.value = rf_columns.value[i];
    }
    return column;
}
</script>

<template>
<div class="item-editor">
    <label class="text-secondary mt-0 mb-0 small" >{{ props.item_subject }}</label>
    <div :key="rf_render_key">
        <div v-for="n in local_num_column" :key="n" class="mb-1"><!-- n は 1 から始まる -->
            <b-input-group>
                <template #prepend>
                    <b-input-group-text v-if="props.item_selected_enable">
                        <b-form-radio v-model="dm_selected" :name="local_radio_name" :value="n" />
                    </b-input-group-text>
                    <b-button v-if="n==local_num_column && n>2" variant="outline-success" @click="minus_button">
                        <span class="font-weight-bold">-</span>
                    </b-button>
                </template>
                <template #append v-if="n==local_num_column && n<local_max_column">
                    <b-button variant="outline-success" @click="plus_button">
                        <span class="font-weight-bold">+</span>
                    </b-button>
                </template>
                <b-form-input type="text" class="mt-0 mb-0" maxlength="100" @change="change_column()" @input="input_column(n)"
                        v-model="rf_columns[n-1]" :state="state_column_data(n)" :placeholder="props.item_placeholder" />
            </b-input-group>
        </div>
    </div>
    <label v-if='props.item_description!==""' class="text-secondary mt-1 mb-0 ms-1 small">{{ props.item_description }}</label>          
</div>
</template>

<style>
.item-editor {
  text-align: left;
  padding: 4px;
}
</style>