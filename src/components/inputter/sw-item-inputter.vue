<template>
<div class="item-inputter">
    <div v-if="rf_debug"> {{ JSON.stringify(props.item_info,null,2) }} </div>
    <!-- 短いテキスト -->
    <template v-if='props.item_info.item_type=="type_short_text" && rf_item_result'>
        <sw-item-parts-text 
            v-model:result="rf_result"
            v-model:text="rf_text"
            :item_subject="props.item_info.item_name"
            :item_placeholder="props.item_info.item_placeholder"
            :item_description="props.item_info.item_description"
            :item_required="props.item_info.item_required_selected"
            :item_required_badge="props.item_info.item_required_badge"
            :item_max_length="props.item_info.item_max_length"
            :item_append_text="props.item_info.item_append_text"
            :item_allowed_type="props.item_info.item_allowed_type"
        />
    </template>
    <!-- 長いテキスト -->
    <template v-if='props.item_info.item_type=="type_long_text" && rf_item_result'>
        <sw-item-parts-textarea 
            v-model:result="rf_result"
            v-model:text="rf_text"
            :item_subject="props.item_info.item_name"
            :item_placeholder="props.item_info.item_placeholder"
            :item_description="props.item_info.item_description"
            :item_required="props.item_info.item_required_selected"
            :item_required_badge="props.item_info.item_required_badge"
            :item_max_length="props.item_info.item_max_length"
            :item_number_of_rows="props.item_info.item_number_of_rows"
        />
    </template>
    <!-- 数値 -->
    <template v-if='props.item_info.item_type=="type_numeric" && rf_item_result'>
        <sw-item-parts-numeric 
            v-model:result="rf_result"
            v-model:number="rf_numeric"
            :item_subject="props.item_info.item_name"
            :item_placeholder="props.item_info.item_placeholder"
            :item_description="props.item_info.item_description"
            :item_required="props.item_info.item_required_selected"
            :item_required_badge="props.item_info.item_required_badge"
            :item_min_number="props.item_info.item_min_number"
            :item_max_number="props.item_info.item_max_number"
            :item_init_number="props.item_info.item_init_number"
            :item_unit="props.item_info.item_unit"
        />
    </template>
    <!-- 単一選択 -->
    <template v-if='props.item_info.item_type=="type_single_select" && rf_item_result'>
        <sw-item-parts-radio 
            v-model:result="rf_result"
            v-model:selected_value="rf_value"
            v-model:selected_text="rf_text"
            :item_subject="props.item_info.item_name"
            :item_description="props.item_info.item_description"
            :item_required="props.item_info.item_required_selected"
            :item_required_badge="props.item_info.item_required_badge"
            :item_line_selected="props.item_info.item_line_selected"
            :item_choice_columns="props.item_info.item_choice_columns"
            :item_choiced_value="props.item_info.item_choiced_value"
        />
    </template>
    <!-- 複数選択 -->
    <template v-if='props.item_info.item_type=="type_multi_select" && rf_item_result'>
        <sw-item-parts-checkbox 
            v-model:result="rf_result"
            v-model:selected_value="rf_array"
            v-model:selected_text="rf_array_text"
            :item_subject="props.item_info.item_name"
            :item_description="props.item_info.item_description"
            :item_required="props.item_info.item_required_selected"
            :item_required_badge="props.item_info.item_required_badge"
            :item_line_selected="props.item_info.item_line_selected"
            :item_choice_columns="props.item_info.item_choice_columns"
        />
    </template>
    <!-- スイッチ -->
    <template v-if='props.item_info.item_type=="type_switch" && rf_item_result'>
        <sw-item-parts-switch
            v-model:result="rf_result"
            v-model:selected="rf_text"
            :item_subject="props.item_info.item_name"
            :item_description="props.item_info.item_description"
            :item_required="props.item_info.item_required_selected"
            :item_required_badge="props.item_info.item_required_badge"
            :item_line_selected="props.item_info.item_line_selected"
            :item_on_value="props.item_info.item_on_value"
            :item_off_value="props.item_info.item_off_value"
        />
    </template>
    <!-- 日付 -->
    <template v-if='props.item_info.item_type=="type_date" && rf_item_result'>
        <sw-item-parts-date
            v-model:result="rf_result"
            v-model:text="rf_text"
            :item_subject="props.item_info.item_name"
            :item_description="props.item_info.item_description"
            :item_required="props.item_info.item_required_selected"
            :item_required_badge="props.item_info.item_required_badge"
            :item_output_format="props.item_info.item_output_format"
        />
    </template>
    <!-- 時刻 -->
    <template v-if='props.item_info.item_type=="type_time" && rf_item_result'>
        <sw-item-parts-time
            v-model:result="rf_result"
            v-model:text="rf_text"
            :item_subject="props.item_info.item_name"
            :item_description="props.item_info.item_description"
            :item_required="props.item_info.item_required_selected"
            :item_required_badge="props.item_info.item_required_badge"
            :item_output_format="props.item_info.item_output_format"
        />
    </template>
    <!-- 日時 -->
    <template v-if='props.item_info.item_type=="type_datetime" && rf_item_result'>
        <sw-item-parts-datetime
            v-model:result="rf_result"
            v-model:text="rf_text"
            :item_subject="props.item_info.item_name"
            :item_description="props.item_info.item_description"
            :item_required="props.item_info.item_required_selected"
            :item_required_badge="props.item_info.item_required_badge"
            :item_output_format="props.item_info.item_output_format"
        />
    </template>
    <!-- 写真 -->
    <template v-if='props.item_info.item_type=="type_picture" && rf_item_result'>
        <sw-item-parts-picture
            v-model:result="rf_result"
            v-model:picture="rf_picture"
            :item_subject="props.item_info.item_name"
            :item_placeholder="props.item_info.item_placeholder"
            :item_description="props.item_info.item_description"
            :item_required="props.item_info.item_required_selected"
            :item_required_badge="props.item_info.item_required_badge"
            :item_droparea_view="props.item_info.item_droparea_view_selected"
            :item_max_width="props.item_info.item_max_width"
            :item_max_height="props.item_info.item_max_height"
        />
    </template>
    <!-- パスワード -->
    <template v-if='props.item_info.item_type=="type_password" && rf_item_result'>
        <sw-item-parts-password
            v-model:result="rf_result"
            v-model:text="rf_text"
            :item_subject="props.item_info.item_name"
            :item_description="props.item_info.item_description"
            :item_required="props.item_info.item_required_selected"
            :item_required_badge="props.item_info.item_required_badge"
            :item_min_characters="props.item_info.item_min_characters"
            :item_character_type="props.item_info.item_character_type_selected"
            :item_password_view="props.item_info.item_password_view_selected"
        />
    </template>
    <!-- 氏名 -->
    <template v-if='props.item_info.item_type=="type_full_name" && rf_item_result'>
        <sw-item-parts-fullname
            v-model:result="rf_result"
            v-model:text_1="rf_text_1"
            v-model:text_2="rf_text_2"
            :item_name_1="props.item_info.item_name_1"
            :item_name_2="props.item_info.item_name_2"
            :item_placeholder_1="props.item_info.item_placeholder_1"
            :item_placeholder_2="props.item_info.item_placeholder_2"
            :item_description="props.item_info.item_description"
            :item_required="props.item_info.item_required_selected"
            :item_required_badge="props.item_info.item_required_badge"
            :item_max_length="props.item_info.item_max_length"
        />
    </template>
    <!-- 電話番号 -->
    <template v-if='props.item_info.item_type=="type_phone_number" && rf_item_result'>
        <sw-item-parts-phonenumber
            v-model:result="rf_result"
            v-model:text="rf_text"
            :item_subject="props.item_info.item_name"
            :item_placeholder="props.item_info.item_placeholder"
            :item_description="props.item_info.item_description"
            :item_required="props.item_info.item_required_selected"
            :item_required_badge="props.item_info.item_required_badge"
            :item_hyphen_selected="props.item_info.item_hyphen_selected"
            :item_international_selected="props.item_info.item_international_selected"
        />
    </template>
    <!-- メールアドレス -->
    <template v-if='props.item_info.item_type=="type_mail_address" && rf_item_result'>
        <sw-item-parts-mailaddress
            v-model:result="rf_result"
            v-model:text="rf_text"
            :item_subject="props.item_info.item_name"
            :item_placeholder="props.item_info.item_placeholder"
            :item_description="props.item_info.item_description"
            :item_required="props.item_info.item_required_selected"
            :item_required_badge="props.item_info.item_required_badge"
            :item_mail_address_selected="props.item_info.item_mail_address_selected"
        />
    </template>
    <!-- プルダウン -->
    <template v-if='props.item_info.item_type=="type_pulldown" && rf_item_result'>
        <sw-item-parts-select
            v-model:result="rf_result"
            v-model:selected_value="rf_value"
            v-model:selected_text="rf_text"
            :item_subject="props.item_info.item_name"
            :item_description="props.item_info.item_description"
            :item_required="props.item_info.item_required_selected"
            :item_required_badge="props.item_info.item_required_badge"
            :item_choice_columns="props.item_info.item_choice_columns"
            :item_choiced_value="props.item_info.item_choiced_value"
        />
    </template>
        <!-- URL -->
        <template v-if='props.item_info.item_type=="type_url" && rf_item_result'>
        <sw-item-parts-url
            v-model:result="rf_result"
            v-model:text="rf_text"
            :item_subject="props.item_info.item_name"
            :item_placeholder="props.item_info.item_placeholder"
            :item_description="props.item_info.item_description"
            :item_required="props.item_info.item_required_selected"
            :item_required_badge="props.item_info.item_required_badge"
            :item_url_link_selected="props.item_info.item_url_link_selected"
        />
    </template>
    <!-- マークダウン -->
    <template v-if='props.item_info.item_type=="type_markdown" && rf_item_result'>
        <sw-item-parts-markdown
            v-model:result="rf_result"
            v-model:text="rf_text"
            :item_subject="props.item_info.item_name"
            :item_placeholder="props.item_info.item_placeholder"
            :item_description="props.item_info.item_description"
            :item_required="props.item_info.item_required_selected"
            :item_required_badge="props.item_info.item_required_badge"
            :item_max_length="props.item_info.item_max_length"
            :item_number_of_rows="props.item_info.item_number_of_rows"
        />
    </template>
    <!-- ラベル -->
    <template v-if='props.item_info.item_type=="type_label" && rf_item_result'>
        <sw-item-parts-label
            :item_label="props.item_info.item_label"
            :item_markdown_selected="props.item_info.item_markdown_selected"
            :item_show_selected="props.item_info.item_show_selected"
        />
    </template>
    <!-- 表 -->
    <template v-if='props.item_info.item_type=="type_table" && rf_item_result'>
        <sw-item-parts-table
            v-model:result="rf_result"
            v-model:table="rf_table"
            :item_subject="props.item_info.item_name"
            :item_placeholder="props.item_info.item_placeholder"
            :item_description="props.item_info.item_description"
            :item_required="props.item_info.item_required_selected"
            :item_required_badge="props.item_info.item_required_badge"
            :item_max_length="props.item_info.item_max_length"
            :item_append_text="props.item_info.item_append_text"
            :item_allowed_type="props.item_info.item_allowed_type"
            :item_rows_columns="props.item_info.item_rows_columns"
            :item_columns_columns="props.item_info.item_columns_columns"
        />
    </template>
    <!-- ファイル -->
    <template v-if='props.item_info.item_type=="type_file" && rf_item_result'>
        <sw-item-parts-file
            v-model:result="rf_result"
            v-model:files="rf_array"
            :item_subject="props.item_info.item_name"
            :item_placeholder="props.item_info.item_placeholder"
            :item_description="props.item_info.item_description"
            :item_required="props.item_info.item_required_selected"
            :item_required_badge="props.item_info.item_required_badge"
            :item_droparea_view="props.item_info.item_droparea_view_selected"
            :item_output_method="props.item_info.item_output_method_selected"
            :item_max_files="props.item_info.item_max_files"
            :item_max_size="props.item_info.item_max_size"
        />
    </template>
    <!-- 手書きサイン -->
    <template v-if='props.item_info.item_type=="type_sign" && rf_item_result'>
        <sw-item-parts-canvas
            v-model:result="rf_result"
            v-model:picture="rf_picture"
            :item_subject="props.item_info.item_name"
            :item_placeholder="props.item_info.item_placeholder"
            :item_description="props.item_info.item_description"
            :item_required="props.item_info.item_required_selected"
            :item_required_badge="props.item_info.item_required_badge"
            :item_height="props.item_info.item_height"
        />
    </template>
    <!-- 参照リンク -->
    <template v-if='props.item_info.item_type=="type_link" && rf_item_result'>
        <sw-item-parts-link
            v-model:result="rf_result"
            v-model:picture="rf_picture"
            :item_subject="props.item_info.item_name"
            :item_placeholder="props.item_info.item_placeholder"
            :item_description="props.item_info.item_description"
            :item_required="props.item_info.item_required_selected"
            :item_required_badge="props.item_info.item_required_badge"
            :item_prefix="props.item_info.item_prefix"
            :item_postfix="props.item_info.item_postfix"
            :item_link_word="props.item_info.item_link_word"
            :item_link_url="props.item_info.item_link_url"
        />
    </template>
    <!--  -->
    <template v-if='!rf_item_result'>
        <b-alert :model-value="true" variant="warning">{{ get_language(locale,'alert_under_adjustment') }}</b-alert>
    </template>
    <div v-if='dm_custom[props.item_info.item_key]!==""' class="mx-2 text-danger">
        {{ dm_custom[props.item_info.item_key] }}
    </div>
    <div v-if='dm_custom[props.item_info.item_uuid]!=="" ' class="mx-2 text-danger">
        {{ dm_custom[props.item_info.item_uuid] }}
    </div>
</div>
</template>

<script setup >
import { ref,watch,onBeforeMount,onMounted,defineEmits,defineProps,defineModel } from 'vue';
import { BAlert } from "bootstrap-vue-next";
import SwLanguage from '../lib/sw-language.js'
const { get_language } = SwLanguage()
import SwItemPartsText from "../parts/sw-item-parts-text.vue"
import SwItemPartsTextarea from "../parts/sw-item-parts-textarea.vue"
import SwItemPartsNumeric from "../parts/sw-item-parts-numeric.vue"
import SwItemPartsRadio from "../parts/sw-item-parts-radio.vue"
import SwItemPartsCheckbox from "../parts/sw-item-parts-checkbox.vue"
import SwItemPartsSwitch from "../parts/sw-item-parts-switch.vue"
import SwItemPartsDate from "../parts/sw-item-parts-date.vue"
import SwItemPartsTime from "../parts/sw-item-parts-time.vue"
import SwItemPartsDatetime from "../parts/sw-item-parts-datetime.vue"
import SwItemPartsPicture from "../parts/sw-item-parts-picture.vue"
import SwItemPartsPassword from "../parts/sw-item-parts-password.vue"
import SwItemPartsFullname from "../parts/sw-item-parts-fullname.vue"
import SwItemPartsPhonenumber from "../parts/sw-item-parts-phonenumber.vue"
import SwItemPartsMailaddress from "../parts/sw-item-parts-mailaddress.vue"
import SwItemPartsSelect from "../parts/sw-item-parts-select.vue"
import SwItemPartsMarkdown from "../parts/sw-item-parts-markdown.vue"
import SwItemPartsUrl from "../parts/sw-item-parts-url.vue"
import SwItemPartsLabel from "../parts/sw-item-parts-label.vue"
import SwItemPartsTable from "../parts/sw-item-parts-table.vue"
import SwItemPartsFile from "../parts/sw-item-parts-file.vue"
import SwItemPartsCanvas from "../parts/sw-item-parts-canvas.vue"
import SwItemPartsLink from "../parts/sw-item-parts-link.vue"
    
// -----------------------------------------------
// v-modelに親コンポーネントで定義したデータ（ref/reactive）を指定する際に使用
// -----------------------------------------------
// 親コンポーネントには emits で返却する
// カスタムエラーメッセージ
const dm_custom = defineModel("custom",{ default: {} })

// -----------------------------------------------
// 子コンポーネントから親コンポーネントへデータを受け渡す
// -----------------------------------------------
const emit_item_value = defineEmits(['input_item_value'])

// -----------------------------------------------
// 親コンポーネントから子コンポーネントへデータを受け渡す
// -----------------------------------------------
const props = defineProps({
    item_info : {
        type: Object,
        required: true,
        default: null,
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
//const rf_interval = ref()  // 定期実行用
const rf_result = ref(null) //共通
const rf_text = ref("")  //共通
const rf_value = ref("")  //単一選択,プルダウン
const rf_numeric = ref(null)  //数値
const rf_array = ref([])  //複数選択
const rf_array_text = ref([])  //複数選択
const rf_picture = ref()  //写真
const rf_text_1 = ref("")  //氏名
const rf_text_2 = ref("")  //氏名
const rf_table = ref()  //表

const rf_item_result = ref(true)

// -----------------------------------------------
// 既定計算
// -----------------------------------------------
// const state_item_text = computed(() => {})
// -----------------------------------------------
// 監視
// -----------------------------------------------
watch( [rf_result,rf_text,rf_value,rf_numeric,rf_array,rf_picture,rf_text_1,rf_text_2], () => {
    //if( !props.demo_mode ){
        let value = input_item_value();
        emit_item_value('input_item_value', value );
    //}    
});
// -----------------------------------------------
// コンポーネントがマウントされる直前に呼び出されるフックを登録します。
// -----------------------------------------------
onBeforeMount(() => {
    if( props.item_info.item_result !== undefined ){
        rf_item_result.value = props.item_info.item_result
    }
})
// -----------------------------------------------
// コンポーネントがマウントされた後に呼び出されるコールバックを登録します。
// -----------------------------------------------
onMounted(() => {
    if( !props.demo_mode ){
        let value = input_item_value();
        emit_item_value('input_item_value', value );
    }
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
const input_item_value = () => {
    let value = {};
    if( rf_result.value === null ){
        value.result = true;
    } else {
        value.result = rf_result.value;
    }
    //console.log("sw-item-inputter:input_item_value:value.result="+rf_result.value)
    value.uuid = props.item_info.item_uuid;
    value.type = props.item_info.item_type;
    value.sequence = props.item_info.item_sequence;
    // 項目名
    if( props.item_info.item_name !== undefined ){
        value.name = props.item_info.item_name;
    }
    if( props.item_info.item_name_1 !== undefined && props.item_info.item_name_2 !== undefined ){
        value.name = [props.item_info.item_name_1,props.item_info.item_name_2];
    }
    if( props.item_info.item_key !== "" ){
        value.key = props.item_info.item_key;
    }
    //数値
    if( props.item_info.item_type=="type_numeric" ){
        value.value = rf_numeric.value;
        value.unit = props.item_info.item_unit;
    }
    //単一選択
    else if( props.item_info.item_type=="type_single_select" ){
        value.value = rf_value.value;
        value.text = rf_text.value;
    }
    //複数選択
    else if( props.item_info.item_type=="type_multi_select" ){
        value.value = rf_array.value;
        value.text = rf_array_text.value;
    }
    //プルダウン
    else if( props.item_info.item_type=="type_pulldown" ){
        value.value = rf_value.value;
        value.text = rf_text.value;
    }
    //写真
    else if( props.item_info.item_type=="type_picture" ){
        value.value = rf_picture.value;  
    }
    //氏名
    else if( props.item_info.item_type=="type_full_name" ){
        value.value = [rf_text_1.value,rf_text_2.value];
    }
    //URL
    else if( props.item_info.item_type=="type_url" ){
        value.value = rf_text.value;
        value.url_link = props.item_info.item_url_link_selected;
    }
    //ラベル
    else if( props.item_info.item_type=="type_label" ){
        value.label = props.item_info.item_label;
        value.markdown = props.item_info.item_markdown_selected;
        value.show = props.item_info.item_show_selected;
        //console.log("sw-item-inputter:input_item_value:item_info="+props.item_info)
    }
    //表
    else if( props.item_info.item_type=="type_table" ){
        value.value = rf_table.value;
        value.rows = props.item_info.item_rows_columns;
        value.columns = props.item_info.item_columns_columns;
        //console.log("sw-item-inputter:input_item_value:item_info="+props.item_info)
    }
    //ファイル
    else if( props.item_info.item_type=="type_file" ){
        value.value = rf_array.value;  
    }
    //手書きサイン
    else if( props.item_info.item_type=="type_sign" ){
        value.value = rf_picture.value;  
    }
    //共通
    else {
        value.value = rf_text.value;
    }
    return value;
}
</script>

<style scoped>
.item-inputter {
  text-align: left;
  margin: 0px;
  padding: 4px;
}
</style>