<template>
<div class="item-editor">
    
<b-card no-body>
    <!-- ヘッダー共通 -->
    <b-card-header class="px-3 py-1">
        <b-button variant="light" size="sm" class="my-0 py-0 float-end" 
                    @click="collapse_body_unvisible()" v-show="rf_body_visible">
            <span style="font-size:1.2em;"><font-awesome-icon icon="fa-solid fa-caret-up" /></span>
        </b-button>
        <b-button variant="light" size="sm" class="m-0 py-0 float-end" 
                    @click="collapse_body_visible()" v-show="!rf_body_visible">
            <span style="font-size:1.2em;"><font-awesome-icon icon="fa-solid fa-caret-down" /></span>
        </b-button>
        <div class="pt-1">
            <a href="#nogo" @click="toggle_collapse_body_visible()">{{ local_item_subject }}</a>
            <span v-show="!rf_body_visible"> : {{ local_collapse_item_name }}</span>
        </div>
    </b-card-header>

    <!-- ボディ -->
    <b-collapse visible v-model="rf_body_visible">
        <b-card-body class="py-0 pb-3">
            <!-- 短いテキスト -->
            <template v-if='props.init_item_info.item_type=="type_short_text"'>
                <sw-item-editor-short-text 
                    v-model:result="rf_result"
                    v-model:item_form_info="rf_work_item_body_info"
                    v-model:condition_visible="rf_condition_visible"
                    :init_item_info="init_item_info"
                />
            </template>
            <!-- 長いテキスト -->
            <template v-if='props.init_item_info.item_type=="type_long_text"'>
                <sw-item-editor-long-text
                    v-model:result="rf_result"
                    v-model:item_form_info="rf_work_item_body_info"
                    v-model:condition_visible="rf_condition_visible"
                    :init_item_info="init_item_info"
                />
            </template>
            <!-- 数値 -->
            <template v-if='props.init_item_info.item_type=="type_numeric"'>
                <sw-item-editor-numeric
                    v-model:result="rf_result"
                    v-model:item_form_info="rf_work_item_body_info"
                    v-model:condition_visible="rf_condition_visible"
                    :init_item_info="init_item_info"
                />
            </template>
            <!-- 単一選択 -->
            <template v-if='props.init_item_info.item_type=="type_single_select"'>
                <sw-item-editor-single-select
                    v-model:result="rf_result"
                    v-model:item_form_info="rf_work_item_body_info"
                    v-model:condition_visible="rf_condition_visible"
                    :init_item_info="init_item_info"
                />
            </template>
            <!-- 複数選択 -->
            <template v-if='props.init_item_info.item_type=="type_multi_select"'>
                <sw-item-editor-multi-select
                    v-model:result="rf_result"
                    v-model:item_form_info="rf_work_item_body_info"
                    v-model:condition_visible="rf_condition_visible"
                    :init_item_info="init_item_info"
                />
            </template>
            <!-- スイッチ -->
            <template v-if='props.init_item_info.item_type=="type_switch"'>
                <sw-item-editor-switch
                    v-model:result="rf_result"
                    v-model:item_form_info="rf_work_item_body_info"
                    v-model:condition_visible="rf_condition_visible"
                    :init_item_info="init_item_info"
                />
            </template>
            <!-- 日付 -->
            <template v-if='props.init_item_info.item_type=="type_date"'>
                <sw-item-editor-date
                    v-model:result="rf_result"
                    v-model:item_form_info="rf_work_item_body_info"
                    v-model:condition_visible="rf_condition_visible"
                    :init_item_info="init_item_info"
                />
            </template>
            <!-- 時刻 -->
            <template v-if='props.init_item_info.item_type=="type_time"'>
                <sw-item-editor-time
                    v-model:result="rf_result"
                    v-model:item_form_info="rf_work_item_body_info"
                    v-model:condition_visible="rf_condition_visible"
                    :init_item_info="init_item_info"
                />
            </template>
            <!-- 日時 -->
            <template v-if='props.init_item_info.item_type=="type_datetime"'>
                <sw-item-editor-datetime
                    v-model:result="rf_result"
                    v-model:item_form_info="rf_work_item_body_info"
                    v-model:condition_visible="rf_condition_visible"
                    :init_item_info="init_item_info"
                />
            </template>
            <!-- 写真 -->
            <template v-if='props.init_item_info.item_type=="type_picture"'>
                <sw-item-editor-picture
                    v-model:result="rf_result"
                    v-model:item_form_info="rf_work_item_body_info"
                    v-model:condition_visible="rf_condition_visible"
                    :init_item_info="init_item_info"
                />
            </template>
            <!-- パスワード -->
            <template v-if='props.init_item_info.item_type=="type_password"'>
                <sw-item-editor-password
                    v-model:result="rf_result"
                    v-model:item_form_info="rf_work_item_body_info"
                    v-model:condition_visible="rf_condition_visible"
                    :init_item_info="init_item_info"
                />
            </template>
            <!-- 氏名 -->
            <template v-if='props.init_item_info.item_type=="type_full_name"'>
                <sw-item-editor-fullname
                    v-model:result="rf_result"
                    v-model:item_form_info="rf_work_item_body_info"
                    v-model:condition_visible="rf_condition_visible"
                    :init_item_info="init_item_info"                />
            </template>
            <!-- 電話番号 -->
            <template v-if='props.init_item_info.item_type=="type_phone_number"'>
                <sw-item-editor-phonenumber
                    v-model:result="rf_result"
                    v-model:item_form_info="rf_work_item_body_info"
                    v-model:condition_visible="rf_condition_visible"
                    :init_item_info="init_item_info"   
                />
            </template>
            <!-- メールアドレス -->
            <template v-if='props.init_item_info.item_type=="type_mail_address"'>
                <sw-item-editor-mailaddress
                    v-model:result="rf_result"
                    v-model:item_form_info="rf_work_item_body_info"
                    v-model:condition_visible="rf_condition_visible"
                    :init_item_info="init_item_info"  
                />
            </template>
            <!-- プルダウン -->
            <template v-if='props.init_item_info.item_type=="type_pulldown"'>
                <sw-item-editor-pulldown
                    v-model:result="rf_result"
                    v-model:item_form_info="rf_work_item_body_info"
                    v-model:condition_visible="rf_condition_visible"
                    :init_item_info="init_item_info" 
                />
            </template>
            <!-- URL -->
            <template v-if='props.init_item_info.item_type=="type_url"'>
                <sw-item-editor-url
                    v-model:result="rf_result"
                    v-model:item_form_info="rf_work_item_body_info"
                    v-model:condition_visible="rf_condition_visible"
                    :init_item_info="init_item_info" 
                />
            </template>
            <!-- マークダウン -->
            <template v-if='props.init_item_info.item_type=="type_markdown"'>
                <sw-item-editor-long-text 
                    v-model:result="rf_result"
                    v-model:item_form_info="rf_work_item_body_info"
                    v-model:condition_visible="rf_condition_visible"
                    :init_item_info="init_item_info" 
                />
            </template>
            <!-- ラベル -->
            <template v-if='props.init_item_info.item_type=="type_label"'>
                <sw-item-editor-label
                    v-model:result="rf_result"
                    v-model:item_form_info="rf_work_item_body_info"
                    v-model:condition_visible="rf_condition_visible"
                    :init_item_info="init_item_info" 
                />
            </template>
            <!-- 表 -->
            <template v-if='props.init_item_info.item_type=="type_table"'>
                <sw-item-editor-table
                    v-model:result="rf_result"
                    v-model:item_form_info="rf_work_item_body_info"
                    v-model:condition_visible="rf_condition_visible"
                    :init_item_info="init_item_info" 
                />
            </template>
            <!-- ファイル -->
            <template v-if='props.init_item_info.item_type=="type_file"'>
                <sw-item-editor-file
                    v-model:result="rf_result"
                    v-model:item_form_info="rf_work_item_body_info"
                    v-model:condition_visible="rf_condition_visible"
                    :init_item_info="init_item_info"
                />
            </template>
            <!-- 手書きサイン -->
            <template v-if='props.init_item_info.item_type=="type_sign"'>
                <sw-item-editor-sign
                    v-model:result="rf_result"
                    v-model:item_form_info="rf_work_item_body_info"
                    v-model:condition_visible="rf_condition_visible"
                    :init_item_info="init_item_info"
                />
            </template>
            <!-- リンク -->
            <template v-if='props.init_item_info.item_type=="type_link"'>
                <sw-item-editor-link
                    v-model:result="rf_result"
                    v-model:item_form_info="rf_work_item_body_info"
                    v-model:condition_visible="rf_condition_visible"
                    :init_item_info="init_item_info"
                />
            </template>
            
            <div v-if="rf_debug">init_item_info:{{ JSON.stringify(init_item_info) }}::rf_result:{{ JSON.stringify(rf_result) }}</div>
        </b-card-body>

        <!-- フッター共通 -->
        <b-card-footer class="px-3 pt-1 py-1">
            <b-button variant="light" size="sm" class="m-0 float-end" :title="language('copy')" @click="click_copy_item('copy')">
                <span style="font-size:1.2em; color:blue;"><font-awesome-icon icon="fa-regular fa-copy" /></span>
            </b-button>
            <b-button variant="light" size="sm" class="m-0 float-end" :title="language('delete')" @click="click_delete_item('delete')">
                <span style="font-size:1.2em; color:red;"><font-awesome-icon icon="fa-regular fa-trash-can" /></span>
            </b-button>
            <b-button variant="light" size="sm" class="m-0" :title="language('view_item_condition')" 
                @click="toggle_condition_visible()" v-show="!rf_condition_visible">
                <span style="font-size:1.2em; color:blue;"><font-awesome-icon icon="fa-solid fa-circle-exclamation" /></span>
            </b-button>
            <b-button variant="light" size="sm" class="m-0" :title="language('hide_item_condition')" 
                @click="toggle_condition_visible()" v-show="rf_condition_visible">
                <span style="font-size:1.2em; color:red;"><font-awesome-icon icon="fa-solid fa-circle-exclamation" /></span>
            </b-button>
        </b-card-footer>
    </b-collapse>
</b-card>

</div>
</template>

<script setup >
import { ref,watch,onBeforeMount,onMounted,defineEmits,defineProps,defineExpose } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { BCollapse,BCard,BCardHeader,BCardBody,BCardFooter,BButton } from "bootstrap-vue-next";
import _ from 'lodash';
import SwLanguage from '../lib/sw-language.js'
const { get_language } = SwLanguage()
import SwItemEditorShortText from "./sw-item-editor-short-text.vue"
import SwItemEditorLongText from "./sw-item-editor-long-text.vue"
import SwItemEditorNumeric from "./sw-item-editor-numeric.vue"
import SwItemEditorSingleSelect from "./sw-item-editor-single-select.vue"
import SwItemEditorMultiSelect from "./sw-item-editor-multi-select.vue"
import SwItemEditorSwitch from "./sw-item-editor-switch.vue"
import SwItemEditorDate from "./sw-item-editor-date.vue"
import SwItemEditorTime from "./sw-item-editor-time.vue"
import SwItemEditorDatetime from "./sw-item-editor-datetime.vue"
import SwItemEditorPicture from "./sw-item-editor-picture.vue"
import SwItemEditorPassword from "./sw-item-editor-password.vue"
import SwItemEditorFullname from "./sw-item-editor-fullname.vue"
import SwItemEditorPhonenumber from "./sw-item-editor-phonenumber.vue"
import SwItemEditorMailaddress from "./sw-item-editor-mailaddress.vue"
import SwItemEditorPulldown from "./sw-item-editor-pulldown.vue"
import SwItemEditorUrl from "./sw-item-editor-url.vue"
import SwItemEditorLabel from "./sw-item-editor-label.vue"
import SwItemEditorTable from "./sw-item-editor-table.vue"
import SwItemEditorFile from "./sw-item-editor-file.vue"
import SwItemEditorSign from "./sw-item-editor-sign.vue"
import SwItemEditorLink from "./sw-item-editor-link.vue"

// -----------------------------------------------
// v-modelに親コンポーネントで定義したデータ（ref/reactive）を指定する際に使用
// -----------------------------------------------
// 親コンポーネントには emits で返却する
// -----------------------------------------------
// 子コンポーネントから親コンポーネントへデータを受け渡す
// -----------------------------------------------
const emit_action_info = defineEmits(['updated_item_info','click_copy_item','click_delete_item'])

// -----------------------------------------------
// 親コンポーネントから子コンポーネントへデータを受け渡す
// -----------------------------------------------
const props = defineProps({
    // 初期セット
    init_item_info: {
        type: Object,
        required: true,
        default: null,
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
// 題名
let local_item_subject = "";
// カードボディが非表示の時の項目名
let local_collapse_item_name = "";
// カードボディの表示：true 非表示：false
const rf_body_visible = ref(true)
// 条件付き表示の表示：true 非表示：false
const rf_condition_visible = ref(false)
// 入力チェックの結果
const rf_result = ref()
// 編集用
const rf_work_item_body_info = ref(null)
// 比較用
let tmp_item_body_info = {}

// -----------------------------------------------
// 既定計算
// -----------------------------------------------
// const state_xxxxx = computed(() => { return true or false; });
// -----------------------------------------------
// 監視
// -----------------------------------------------
watch(rf_work_item_body_info,() => {
    if( rf_work_item_body_info.value == null ) return
    if( rf_result.value && !_.isEqual(tmp_item_body_info,rf_work_item_body_info.value) ){
        //console.log("sw-item-editor:watch:item_body_info="+tmp_item_body_info.item_body_visible+":"+rf_work_item_body_info.value.item_body_visible)
        // 画面のカードボディの状態を反映
        rf_work_item_body_info.value.item_body_visible = rf_body_visible.value
        // 親コンポーネントへの返却
        emit_action_info('updated_item_info', JSON.parse(JSON.stringify(rf_work_item_body_info.value)));
        // 更新比較用データの保存
        tmp_item_body_info = JSON.parse(JSON.stringify(rf_work_item_body_info.value))
    }
},{ deep: true })
// -----------------------------------------------
// コンポーネントがマウントされる直前に呼び出されるフックを登録します。
// -----------------------------------------------
onBeforeMount(() => {
    //console.log("sw-item-editor:onBeforeMount:props.init_item_info="+JSON.stringify(props.init_item_info,null,2))
    // カードヘッダーの項目種別表示
    local_item_subject = get_language(locale,props.init_item_info.item_type);
    // 編集用データの保存
    rf_work_item_body_info.value = JSON.parse(JSON.stringify(props.init_item_info));
    // 比較用データの保存
    tmp_item_body_info = JSON.parse(JSON.stringify(props.init_item_info));
    //console.log("sw-item-editor:onBeforeMount:rf_work_item_body_info="+JSON.stringify(rf_work_item_body_info.value,null,2))
});
// -----------------------------------------------
// コンポーネントがマウントされた後に呼び出されるコールバックを登録します。
// -----------------------------------------------
onMounted(() => {
    //console.log("sw-item-editor:onMounted:props.init_item_info="+JSON.stringify(props.init_item_info))
    // bodyの表示
    rf_body_visible.value = props.init_item_info.item_body_visible;
    if( props.init_item_info.item_type == "type_label" ){
        local_collapse_item_name = adjust_length_string(props.init_item_info.item_label)
    } else if( props.init_item_info.item_type == "type_link" ){
        local_collapse_item_name = adjust_length_string(props.init_item_info.item_link_word)
    } else if( props.init_item_info.item_type == "type_full_name" ){
        local_collapse_item_name = adjust_length_string(rf_work_item_body_info.value.item_name_1 + " "
                                    + rf_work_item_body_info.value.item_name_2)
    } else {
        local_collapse_item_name = adjust_length_string(props.init_item_info.item_name)
    }
});
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
const language = (param) => {
    return get_language(locale,param);
}
// 表示文字数を制限する
const adjust_length_string = (data) => {
    if( data !== null ){
        if( data.length > 30 ){
            // substr(何文字目からスタートするか, 最大値);
            return data.substr(0, 30) + '...';
        }
    }
    //文字数がオーバーしていなければそのまま返す
    return data;
}

// sw-item-editor-xxxxx でコピーアイコンがクリックされた時に駆動
const click_copy_item = () => {
    //console.log("sw-item-editor:click_copy_item="+item_func+":"+props.init_item_info.item_uuid)
    // sw-form-editor に emit する
    emit_action_info('click_copy_item', props.init_item_info.item_uuid);
}
// sw-item-editor-xxxxx で削除アイコンがクリックされた時に駆動
const click_delete_item = () => {
    //console.log("sw-item-editor:click_delete_item="+item_func+":"+props.init_item_info.item_uuid)
    // sw-form-editor に emit する
    emit_action_info('click_delete_item', props.init_item_info.item_uuid);
}

// 入力フォームのボディを表示・非表示にする
const collapse_body_visible = () => {
    rf_body_visible.value = true
    set_local_collapse_item_name()
    //console.log("sw-item-editor:collapse_body_visible:item_body_visible="+rf_work_item_body_info.value.item_body_visible)
}
const collapse_body_unvisible = () => {
    rf_body_visible.value = false
    rf_work_item_body_info.value.item_body_visible = rf_body_visible.value
}
const toggle_collapse_body_visible = () => {
    rf_body_visible.value = !rf_body_visible.value
    if( rf_body_visible.value ){
        set_local_collapse_item_name()
    }

}
const set_local_collapse_item_name = () => {
    if( props.init_item_info.item_type == "type_label" ){
        local_collapse_item_name = adjust_length_string(rf_work_item_body_info.value.item_label)
    } else if( props.init_item_info.item_type == "type_link" ){
        local_collapse_item_name = adjust_length_string(props.init_item_info.item_link_word)
    } else if( props.init_item_info.item_type == "type_full_name" ){
        local_collapse_item_name = adjust_length_string(rf_work_item_body_info.value.item_name_1 + " "
                                    + rf_work_item_body_info.value.item_name_2)
    } else {
        local_collapse_item_name = adjust_length_string(rf_work_item_body_info.value.item_name)
    }
    rf_work_item_body_info.value.item_body_visible = rf_body_visible.value
}
const toggle_condition_visible = () => {
    rf_condition_visible.value = !rf_condition_visible.value
}
defineExpose({ collapse_body_visible, collapse_body_unvisible })
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
  