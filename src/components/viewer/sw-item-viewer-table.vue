<template>
<div class="item-viewer">
    <div v-if="rf_debug"> sw-item-viewr-text: {{ JSON.stringify(props.item_info,null,2) }} </div>
    <label class="text-secondary mt-0 mb-0 small" >{{ props.item_info.name }}</label>
    <b-table-simple class="mb-0" :bordered="rf_borderd">
        <b-thead>
            <b-tr>
                <b-th></b-th>
                <template v-for="(column_info) in props.item_info.columns" :key="column_info.text" >
                    <b-th class="text-secondary">{{ column_info.text }}</b-th>
                </template>
            </b-tr>
            <b-tr v-for="(row_info,row_index) in props.item_info.rows" :key="row_info.text">
                <b-th class="text-secondary">{{ row_info.text }}</b-th>
                <b-td :class="local_text_align" v-for="(column_info,col_index) in props.item_info.columns" :key="column_info.text" >
                    {{ props.item_info.value[row_index][col_index] }}
                </b-td>
            </b-tr>
        </b-thead>
    </b-table-simple>
</div>
</template>

<script setup >
import { ref,defineProps,onBeforeMount } from 'vue';
import { BTableSimple,BThead,BTr,BTh,BTd } from "bootstrap-vue-next";

// -----------------------------------------------
// v-modelに親コンポーネントで定義したデータ（ref/reactive）を指定する際に使用
// -----------------------------------------------

// -----------------------------------------------
// 親コンポーネントから子コンポーネントへデータを受け渡す
// -----------------------------------------------
const props = defineProps({
    // 入力データ情報
    item_info: {
        type: Object,
        required: true,
        default: null,
    },
    // 表示方法
    view_mode : {
        type: String,
        required: false,
        default: "stacked", // "stacked","lined", 
    },
    text_align : {
        type: String,
        required: false,
        default: "left", // "left","right", 
    }
});
// -----------------------------------------------
// ローカル変数
// -----------------------------------------------
// デバッグ用
const rf_debug = ref(false)
// ブラウザからデフォルトの言語を取得する
//let locale = navigator.language;
//if( locale != "ja" && locale != "en" ) locale = "en";
// 表の罫線
const rf_borderd = ref(false)
// セルの位置
let local_text_align = "text-start"

// -----------------------------------------------
// 既定計算 computed(() => {})
// -----------------------------------------------
// const item_info = computed(() => props.item_info);
// -----------------------------------------------
// 監視
// -----------------------------------------------
// watch( item_info, () => {})
// -----------------------------------------------
// コンポーネントがマウントされる直前に呼び出されるフックを登録します。
// -----------------------------------------------
onBeforeMount(() => {
    if( props.view_mode == "stacked" ){
        rf_borderd.value = true
    }
    if( props.view_mode == "lined" ){
        rf_borderd.value = false
    }
    if( props.text_align == "left" ){
        local_text_align = "text-start"
    }
    if( props.text_align == "right" ){
        local_text_align = "text-end"
    }
})
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

</script>

<style scoped>
.item-viewer {
  text-align: left;
  margin: 0px;
  padding: 4px;
}
</style>
  