<template>
<div class="item-editor">
    <!-- 項目名 -->
    <sw-item-parts-text v-model:text="rf_item_name" v-model:result="rf_item_name_result" item_required
        :item_subject='get_language(locale,"subject_item_name")' :item_placeholder='get_language(locale,"placeholder_item_name")' />
    <!-- 説明 -->
    <sw-item-parts-text v-model:text="rf_item_placeholder" v-model:result="rf_item_placeholder_result"
        :item_subject='get_language(locale,"subject_placeholder")' :item_placeholder='get_language(locale,"placeholder_placeholder")' />
    <!-- 補足説明 -->
    <sw-item-parts-text v-model:text="rf_item_description" v-model:result="rf_item_description_result"
        :item_subject='get_language(locale,"subject_description")' :item_placeholder='get_language(locale,"placeholder_description")'/>
    <!-- 項目キー -->
    <sw-item-parts-text v-model:text="rf_item_key" v-model:result="rf_item_key_result"
        :item_subject='get_language(locale,"subject_item_key")' :item_placeholder='get_language(locale,"placeholder_item_key")' 
        item_allowed_type="AlphaNumericPlus" />
    <!-- 条件付き表示 -->
    <div v-show="dm_condition_visible">
        <sw-item-parts-text2 v-model:text_1="rf_item_condition_key"  v-model:text_2="rf_item_condition_value" v-model:result="rf_item_condition_result"
            :item_subject='local_condition_subject' :item_placeholder='local_condition_placeholder' :item_append_text='local_condition_append_text' 
            :item_allowed_type='local_allowed_type' />
    </div>
    <!-- 必須選択 -->
    <sw-item-parts-radio-check v-model:selected_value="rf_item_required_selected" v-model:checked="rf_item_required_badge" v-model:result="rf_item_required_result"
            :item_subject='get_language(locale,"subject_required")' :item_select_options='local_required_select_columns' 
            :item_check_name='get_language(locale,"selected_badge")' />
    
    <b-row><b-col>
        <!-- 最小値 -->
        <sw-item-parts-numeric v-model:number="rf_item_min_number" v-model:result="rf_item_min_number_result"
            :item_subject='get_language(locale,"subject_min_value")' :item_placeholder='get_language(locale,"placeholder_min_value")' 
            :item_min_number=-32768 :item_max_number=32767 item_required />        
    </b-col><b-col>
        <!-- 最大値 -->
        <sw-item-parts-numeric v-model:number="rf_item_max_number" v-model:result="rf_item_max_number_result"
            :item_subject='get_language(locale,"subject_max_value")' :item_placeholder='get_language(locale,"placeholder_max_value")' 
            :item_min_number=-32768 :item_max_number=32767 item_required />        
    </b-col><b-col>
        <!-- 初期値 -->
        <sw-item-parts-numeric v-model:number="rf_item_init_number" v-model:result="rf_item_init_number_result"
            :item_subject='get_language(locale,"subject_init_value")' :item_placeholder='get_language(locale,"placeholder_init_value")' 
            :item_min_number=-32768 :item_max_number=32767 item_required />        
    </b-col><b-col>
        <!-- 単位 -->
        <sw-item-parts-text v-model:text="rf_item_unit" v-model:result="rf_item_unit_result"
            :item_subject='get_language(locale,"subject_unit")' :item_placeholder='get_language(locale,"placeholder_unit")' />    
    </b-col></b-row>
</div>
</template>
    
<script setup >
import { ref,watch,onBeforeMount,onMounted,defineModel,defineProps } from 'vue';
import { BRow,BCol } from "bootstrap-vue-next";
import SwLanguage from '../lib/sw-language.js'
const { get_language } = SwLanguage()
import SwItemPartsText from "../parts/sw-item-parts-text.vue"
import SwItemPartsText2 from "../parts/sw-item-parts-text-2.vue"
import SwItemPartsRadioCheck from "../parts/sw-item-parts-radio-check.vue"
import SwItemPartsNumeric from "../parts/sw-item-parts-numeric.vue"

// -----------------------------------------------
// v-modelに親コンポーネントで定義したデータ（ref/reactive）を指定する際に使用
// -----------------------------------------------
// 正常：true 異常：false
const dm_result = defineModel("result",{ type: Boolean, default: false })
// この項目のフォーム情報
const dm_item_form_info = defineModel("item_form_info",{ type: Object, default: () => {} })
//dm_item_form_info.value = {}
// 条件付き表示の表示：true 非表示：false
const dm_condition_visible = defineModel("condition_visible",{ type: Boolean, default: false })
// 項目名
const rf_item_name = ref("")
const rf_item_name_result = ref(false)
// 説明
const rf_item_placeholder = ref("")
const rf_item_placeholder_result = ref(false)
// 補足説明
const rf_item_description = ref("")
const rf_item_description_result = ref(false)
// 項目キー
const rf_item_key = ref("")
const rf_item_key_result = ref(false)
// 条件項目キー// 条件項目値
const rf_item_condition_key = ref("")
const rf_item_condition_value = ref("")
const rf_item_condition_result = ref(false)
// 必須選択：任意 // 必須バッジ表示
const rf_item_required_selected = ref(false)
const rf_item_required_badge = ref(false) 
const rf_item_required_result = ref(false)
// 最小値
const rf_item_min_number = ref(1)
const rf_item_min_number_result = ref(false)
// 最大値
const rf_item_max_number = ref(100)
const rf_item_max_number_result = ref(false)
// 初期値
const rf_item_init_number = ref(1)
const rf_item_init_number_result = ref(false)
// 単位
const rf_item_unit = ref("")
const rf_item_unit_result = ref(false)

// -----------------------------------------------
// 子コンポーネントから親コンポーネントへデータを受け渡す
// -----------------------------------------------
//const emit_xxxxx = defineEmits(['xxxxxxxxxx','xxxxxxxxx'])
    
// -----------------------------------------------
// 親コンポーネントから子コンポーネントへデータを受け渡す
// -----------------------------------------------
const props = defineProps({
    // 初期値
    init_item_info: {
        type: Object,
        required: false,
        default: null
    },
});

// -----------------------------------------------
// ローカル変数
// -----------------------------------------------
// ブラウザからデフォルトの言語を取得する
let locale = navigator.language;
if( locale != "ja" && locale != "en" ) locale = "en";
// 必須選択
const local_required_select_columns = [
    { text: get_language(locale,"selected_any"), value: false },
    { text: get_language(locale,"selected_mandatory"), value: true },
]
// 条件付き表示
const local_condition_subject = [get_language(locale,"subject_item_condition_1"),get_language(locale,"subject_item_condition_2")]
const local_condition_placeholder = [get_language(locale,"placeholder_item_condition_1"),get_language(locale,"placeholder_item_condition_2")]
const local_condition_append_text = [get_language(locale,"append_text_item_condition_1"),get_language(locale,"append_text_item_condition_2")]
// 条件付き表示の許可する文字
const local_allowed_type = ["AlphaNumericPlus","All"]

// -----------------------------------------------
// 既定計算
// -----------------------------------------------
// const state_xxxxx = computed(() => { return true or false; });
// -----------------------------------------------
// 監視
// -----------------------------------------------
watch([ rf_item_name,rf_item_placeholder,rf_item_description,rf_item_key,
        rf_item_condition_key,rf_item_condition_value,rf_item_required_selected,rf_item_required_badge,
        rf_item_min_number,rf_item_max_number,rf_item_init_number,rf_item_unit ], () => {
        //console.log("sw-item-editor-numeric:watch:-------")
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
    rf_item_name.value = get_language(locale,"type_numeric")
    //
    if( props.init_item_info !== null ){
        if( props.init_item_info.item_name !== undefined ){ rf_item_name.value = props.init_item_info.item_name; }
        if( props.init_item_info.item_placeholder !== undefined ){ rf_item_placeholder.value = props.init_item_info.item_placeholder; }
        if( props.init_item_info.item_description !== undefined ){ rf_item_description.value = props.init_item_info.item_description; }
        if( props.init_item_info.item_key !== undefined ){ rf_item_key.value = props.init_item_info.item_key; }
        if( props.init_item_info.item_condition_key !== undefined ){ rf_item_condition_key.value = props.init_item_info.item_condition_key; }
        if( props.init_item_info.item_condition_value !== undefined ){ rf_item_condition_value.value = props.init_item_info.item_condition_value; }
        if( props.init_item_info.item_required_selected !== undefined ){ rf_item_required_selected.value = props.init_item_info.item_required_selected; }
        if( props.init_item_info.item_required_badge !== undefined ){ rf_item_required_badge.value = props.init_item_info.item_required_badge; }
        // 最小値
        if( props.init_item_info.item_min_number !== undefined ){ rf_item_min_number.value = props.init_item_info.item_min_number; }
        // 最大値
        if( props.init_item_info.item_max_number !== undefined ){ rf_item_max_number.value = props.init_item_info.item_max_number; }
        // 初期値
        if( props.init_item_info.item_init_number !== undefined ){ rf_item_init_number.value = props.init_item_info.item_init_number; }
        // 単位
        if( props.init_item_info.item_unit !== undefined ){ rf_item_unit.value = props.init_item_info.item_unit; }
    }
});
// -----------------------------------------------
// コンポーネントがマウントされた後に呼び出されるコールバックを登録します。
// -----------------------------------------------
onMounted(() => {
    // このコンポーネントの入力が完了したか判断する
    if( is_result_value() ){
        dm_result.value = true; 
    } else {
        dm_result.value = false; 
    }
    // このコンポーネントの入力が完了したら、親コンポーネントと共有しているフォームデータを更新する
    if( dm_result.value ){
        dm_item_form_info.value = get_form_data();
    } else {
        dm_item_form_info.value = {};
    }
})
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
// onBeforeUnmount(() => {})
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
// 監視で使用する
const watch_task = () => {
    // このコンポーネントの入力が完了したか判断する
    if( is_result_value() ){
        dm_result.value = true; 
    } else {
        dm_result.value = false; 
    }
    // このコンポーネントの入力が完了したら、親コンポーネントと共有しているフォームデータを更新する
    if( dm_result.value ){
        dm_item_form_info.value = get_form_data();
    } else {
        dm_item_form_info.value = {};
    }
}
// 全てのフォーム入力が完了しているか判定する
const is_result_value = () => {
    if( rf_item_name_result.value && 
        rf_item_placeholder_result.value && 
        rf_item_description_result.value &&
        rf_item_key_result.value && 
        rf_item_condition_result.value && 
        rf_item_required_result.value && 
        rf_item_min_number_result.value && 
        rf_item_max_number_result.value && 
        rf_item_init_number_result.value && 
        rf_item_unit_result.value ){
        return true
    } else {
        return false
    }
}
// 全てのフォーム入力データを取得する
const get_form_data = () => {
    let form_data = {}
    form_data.item_type = props.init_item_info.item_type
    form_data.item_uuid = props.init_item_info.item_uuid
    form_data.item_sequence = props.init_item_info.item_sequence
    form_data.item_body_visible = props.init_item_info.item_body_visible 
    form_data.item_result = dm_result.value
    //
    form_data.item_name = rf_item_name.value
    form_data.item_placeholder = rf_item_placeholder.value
    form_data.item_description = rf_item_description.value
    form_data.item_key = rf_item_key.value
    form_data.item_condition_key = rf_item_condition_key.value
    form_data.item_condition_value = rf_item_condition_value.value
    form_data.item_required_selected = rf_item_required_selected.value
    form_data.item_required_badge = rf_item_required_badge.value
    //
    form_data.item_min_number = Number(rf_item_min_number.value)
    form_data.item_max_number = Number(rf_item_max_number.value)
    form_data.item_init_number = Number(rf_item_init_number.value)
    form_data.item_unit = rf_item_unit.value
    //console.log("sw-item-editor-number:get_form_data="+JSON.stringify(form_data))
    return form_data
}
</script>



<style scoped>
.item-editor {
  text-align: left;
  padding: 4px;
}
a,a:hover,a:visited{
    color: blue;
    font-weight: bold;
    text-decoration: none;
}
.fsize {
  font-size: 0.95rem;
}
</style>
