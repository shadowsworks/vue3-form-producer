<script setup >
import { onBeforeMount,defineModel,defineProps } from 'vue';
import { BFormGroup,BFormRadioGroup,BFormCheckbox } from "bootstrap-vue-next";

// -----------------------------------------------
// v-modelに親コンポーネントで定義したデータ（ref/reactive）を指定する際に使用
// -----------------------------------------------
// 正常：true 異常：false
const dm_result = defineModel("result",{ default: false })
// 選択値
const dm_selected = defineModel("selected_value",{ default: false })
// 選択値
const dm_checked = defineModel("checked",{ default: false })

// -----------------------------------------------
// 親コンポーネントから子コンポーネントへデータを受け渡す
// -----------------------------------------------
const props = defineProps({
    // 項目名
    item_subject: {
        type: String,
        required: true,
    },
    // 選択肢
    item_select_options: {
        type: Array,
        required: false,
        default: () => [],
    },
    // チェックボックス名
    item_check_name: {
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
});

// -----------------------------------------------
// ローカル変数
// -----------------------------------------------
// let view_item_name = "";
// -----------------------------------------------
// 既定計算
// -----------------------------------------------
// 入力監視

// -----------------------------------------------
// コンポーネントがマウントされる直前に呼び出されるフックを登録します。
// -----------------------------------------------
onBeforeMount(() => { 
    dm_result.value = true;
//     // dm_selected.value = props.item_init_value;
//     // dm_checked.value = props.item_init_check;
})
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

</script>

<template>
<div class="item-editor">
    <!-- Text -->
    <label class="text-secondary mt-0 mb-0 small" >{{ props.item_subject }}</label>
    <div v-if="dm_selected" class="float-end mt-1">
        <br><b-form-checkbox v-model="dm_checked" :value=true
                            :unchecked-value=false>{{ props.item_check_name }}</b-form-checkbox>
    </div>
    <b-form-group class="mt-0 mb-0">
        <b-form-radio-group v-model="dm_selected" :options="props.item_select_options" />
    </b-form-group>
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
