<template>
<div class="form-editor" v-show="!rf_form_check_enable">

<div class="mx-1 mb-2 pb-2 border-bottom">
    <b-button size="sm" class="mx-1" variant="outline-primary" @click="form_download()" v-if="button_form_download_enable">
        <font-awesome-icon icon="download" /><span class="item_type_visible">&nbsp;{{ get_language(locale,"button_download") }}</span> 
    </b-button>
    <b-button size="sm" class="mx-1" variant="outline-primary" @click="form_copy_to_clipboard()" v-if="button_form_copy_to_clipboard_enable">
        <font-awesome-icon icon="clipboard" /><span class="item_type_visible">&nbsp;{{ get_language(locale,"button_copy_to_clipboard") }}</span>
    </b-button>
    <b-button size="sm" class="mx-1" variant="outline-primary" @click="form_import()" v-if="button_form_import_enable">
        <font-awesome-icon icon="file-import" /><span class="item_type_visible">&nbsp;{{ get_language(locale,"button_import") }}</span>
    </b-button>
    <div class="float-end">
        <b-button size="sm" class="mx-1" variant="outline-primary" @click="form_reset()" v-if="button_form_reset_enable">
            <font-awesome-icon icon="arrows-rotate" /><span class="item_type_visible">&nbsp;{{ get_language(locale,"button_reset") }}</span>
        </b-button>
        <b-button size="sm" class="mx-1" variant="outline-primary" @click="form_check()" v-if="button_form_check_enable" :disabled="rf_disabled_button_form_check">
            <font-awesome-icon icon="list-check" /><span class="item_type_visible">&nbsp;{{ get_language(locale,"button_form_check") }}</span>
        </b-button>
    </div>
</div>

<b-row>
    <b-col cols="3" class="border-end">
        <b-row class="ms-1 me-0 border-bottom">
            <b-col class="mx-1 px-0">{{ get_language(locale,"title_item_type_to_add") }}</b-col>
        </b-row>
        <b-row class="mx-1">
            <b-col md="12" lg="6" class="item mx-0 px-0" v-for="(type_info) in local_item_type" v-bind:key="type_info.item_type">
                <sw-item-type 
                    :item_type="type_info.item_type" 
                    :item_name="type_info.item_name" 
                    :icon_name="type_info.icon_name" 
                    @click_type="click_type" 
                />
            </b-col>
        </b-row>
    </b-col>
    <b-col><!-- 5 -->
        <div class="ms-0 me-2 border-bottom">
            {{ get_language(locale,"title_item_setting") }}
            <b-button v-if="!rf_main_inputter_visible" variant="outline-secondary" size="sm" class="my-0 ms-1 px-2 py-0 float-end"  @click="main_inputter_expand()" >
                <font-awesome-icon icon="fa-solid fa-chevron-left" />
            </b-button>
            <b-button variant="outline-secondary" size="sm" class="my-0 ms-1 px-2 py-0 float-end" @click="collapse_all_unvisible()" :disabled="rf_disabled_button_form_check" >
                <font-awesome-icon icon="fa-solid fa-caret-up" />
            </b-button>
            <b-button variant="outline-secondary" size="sm" class="my-0 ms-1 px-2 py-0 float-end" @click="collapse_all_visible()" :disabled="rf_disabled_button_form_check" >
                <font-awesome-icon icon="fa-solid fa-caret-down" />
            </b-button>
        </div>
        <div :key="rf_item_editor_render_key">
            <template v-for="(work_item_info) in work_form_array" :key="work_item_info.item_uuid" >
                <sw-item-editor ref="ref_item_editor" class="drag_item" draggable="true" 
                    @dragstart="drag_list($event,work_item_info.item_uuid)" 
                    @drop="drop_list($event,work_item_info.item_uuid)" 
                    @dragover.prevent 
                    @dragenter.prevent
                    :init_item_info="work_item_info" 
                    @updated_item_info="updated_item_info" 
                    @click_copy_item="click_copy_item" 
                    @click_delete_item="click_delete_item" 
                />
            </template>
        </div>
    </b-col>
    <b-col cols="4" class="border-start" v-show="rf_main_inputter_visible">
        <div class="ms-0 me-2 border-bottom">
            {{ get_language(locale,"title_preview") }}
            <b-button variant="outline-secondary" size="sm" class="my-0 ms-1 px-2 py-0 float-end" @click="main_inputter_shrink()" >
                <font-awesome-icon icon="fa-solid fa-chevron-right" />
            </b-button>
        </div>
        <div :key="rf_item_inputter_render_key">
            <sw-form-inputter
                v-model:result="input_data_result"
                v-model:value="input_data_info"
                :form_info="work_form_array"
                demo_mode
            />
        </div>
    </b-col>
</b-row>

<div v-if="rf_debug" :key="rf_item_editor_render_key">
    <div>form_info:{{ form_info }}</div>
    <div>item-editor:{{ work_form_array }}</div>
    <div>item-inputter:{{ input_data_result }}:{{ input_data_info }}</div>
</div>

</div><!-- form-editor ------------------------------------------------------------------------->

<!--- sw-form-inputter & sw-form-viewer ------------------------------------------------------------------------------------------->
<div class="form-editor" v-if="rf_form_check_enable">

<div class="mx-1 mb-2 pb-2 border-bottom">
    <b-button size="sm" class="mx-1" variant="outline-primary" @click="data_download()" v-if="button_data_download_enable">
        <font-awesome-icon icon="download" /><span class="item_type_visible">&nbsp;{{ get_language(locale,"button_download") }}</span> 
    </b-button>
    <b-button size="sm" class="mx-1" variant="outline-primary" @click="data_copy_to_clipboard()" v-if="button_data_copy_to_clipboard_enable">
        <font-awesome-icon icon="clipboard" /><span class="item_type_visible">&nbsp;{{ get_language(locale,"button_copy_to_clipboard") }}</span>
    </b-button>
    <div class="float-end">
        <b-button size="sm" class="mx-1" variant="outline-primary" @click="form_check()" v-if="button_form_download_enable">
            <font-awesome-icon icon="reply" /><span class="item_type_visible">&nbsp;{{ get_language(locale,"button_back") }}</span> 
        </b-button>
    </div>
</div>
<b-row>
    <b-col class="border-end">
        <div class="ms-1 me-2 border-bottom">
            {{ get_language(locale,"title_input_form") }}
            <b-button v-if="!rf_sub_inputter_visible" variant="outline-secondary" size="sm" class="my-0 ms-1 px-2 py-0 float-end" @click="sub_inputter_expand()" >
                <font-awesome-icon icon="fa-solid fa-chevron-left" />
            </b-button>
        </div>
        <div :key="rf_item_inputter_render_key">
            <sw-form-inputter
                v-model:result="input_data_result"
                v-model:value="input_data_info"
                :form_info="check_form_array"
            />
        </div>
    </b-col>
    <b-col md="12" lg="6" v-show="rf_sub_inputter_visible">
        <div class="ms-0 me-2 border-bottom">
            {{ get_language(locale,"title_view_form") }}
            <b-button variant="outline-secondary" size="sm" class="my-0 ms-1 px-2 py-0 float-end" @click="sub_inputter_shrink()" >
                <font-awesome-icon icon="fa-solid fa-chevron-right" />
            </b-button>
        </div>
        <div :key="rf_item_viewer_render_key">
            <sw-form-viewer
                :data_result="input_data_result"
                :data_info="input_data_info"
                view_mode="lined"
                bottom_line
                text_align="right"
            />
        </div>
    </b-col>
</b-row>
</div><!-- form_check ------------------------------------------------------------------------->

<!-- インポート -------------------------------------------------------------------------------------------->
<b-modal v-model="rf_form_import_modal" :title="get_language(locale,'button_import')" @ok="import_form_array" :ok-disabled="state_import_ok">
    <b-form-textarea type="text" class="mt-0 mb-0" v-model="rf_text_import_modal" rows=16 />
</b-modal>


</template>
  
<script setup >
import { ref,watch,computed,onBeforeMount,defineProps,defineModel } from 'vue';
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { BRow,BCol,BButton,BModal,BFormTextarea } from "bootstrap-vue-next";
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment-timezone';
import SwLanguage from '../lib/sw-language.js'
const { get_language } = SwLanguage()
import SwSchemaType from '../lib/sw-schema-type.js'
const { get_schema_type } = SwSchemaType()
import SwItemType from "./sw-item-type.vue"
import SwItemEditor from "./sw-item-editor.vue"
import SwFormInputter from "../inputter/sw-form-inputter.vue"
import SwFormViewer from "../viewer/sw-form-viewer.vue"
// -----------------------------------------------
// v-modelに親コンポーネントで定義したデータ（ref/reactive）を指定する際に使用
// -----------------------------------------------
const form_info = defineModel("form_info",{ default: ()  => [] })

// -----------------------------------------------
// 親コンポーネントから子コンポーネントへデータを受け渡す
// -----------------------------------------------
const props = defineProps({
    // 初期値
    init_form_info: {
        type: Object,
        required: false,
        default: null
    },
    // オプション
    options: {
        type: Object,
        required: false,
        default: null
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
moment.locale(locale);
//画面を更新するためのキー
const rf_item_editor_render_key = ref(0)  //sw-item-editor の画面を更新するためのキー
const rf_item_inputter_render_key = ref(0)  //sw-item-inputter の画面を更新するためのキー
const rf_item_viewer_render_key = ref(0)  //sw-item-viewer の画面を更新するためのキー
const rf_form_import_modal = ref(false) //インポート
const rf_text_import_modal = ref("")
const rf_disabled_button_form_check = ref(true) //
const rf_main_inputter_visible = ref(true)
const rf_sub_inputter_visible = ref(true)

// 子コンポーネントの参照
const ref_item_editor = ref(null)

// 入力フォームの確認画面
const rf_form_check_enable = ref(false)

// ボタン表示
let button_form_download_enable = true
let button_form_copy_to_clipboard_enable = true
let button_form_import_enable = true
let button_form_reset_enable = true
let button_form_check_enable = true
let button_data_download_enable = true
let button_data_copy_to_clipboard_enable = true

// 作業用フォーム情報
let work_form_array = []
let remove_work_item_info = {};
let tmp_work_form_array = {};
let output_form_array = {};
let check_form_array = {};

const input_data_info = ref();
input_data_info.value = [];
const input_data_result = ref();
input_data_result.value = false;

const local_item_type = [
  { item_type: "type_short_text", item_name: get_language(locale,"type_short_text"), icon_name: ['fas','font'] },
  { item_type: "type_long_text", item_name: get_language(locale,"type_long_text"), icon_name: ['fas','pencil'] },
  { item_type: "type_numeric", item_name: get_language(locale,"type_numeric"), icon_name: ['fas','dice-six'] },
  { item_type: "type_table", item_name: get_language(locale,"type_table"), icon_name: ['fas','table'] },
  { item_type: "type_single_select", item_name: get_language(locale,"type_single_select"), icon_name: ['far','circle-check'] },
  { item_type: "type_multi_select", item_name: get_language(locale,"type_multi_select"), icon_name: ['far','square-check'] },
  { item_type: "type_pulldown", item_name: get_language(locale,"type_pulldown"), icon_name: ['far','rectangle-list'] },
  { item_type: "type_switch", item_name: get_language(locale,"type_switch"), icon_name: ['fas','toggle-off'] },
  { item_type: "type_date", item_name: get_language(locale,"type_date"), icon_name: ['far','calendar'] },
  { item_type: "type_time", item_name: get_language(locale,"type_time"), icon_name: ['far','clock'] },
  { item_type: "type_datetime", item_name: get_language(locale,"type_datetime"), icon_name: ['far','calendar-plus'] },
  { item_type: "type_picture", item_name: get_language(locale,"type_picture"), icon_name: ['far','image'] },
  { item_type: "type_password", item_name: get_language(locale,"type_password"), icon_name: ['fas','key'] },
  { item_type: "type_full_name", item_name: get_language(locale,"type_full_name"), icon_name: ['far','user'] },
  { item_type: "type_phone_number", item_name: get_language(locale,"type_phone_number"), icon_name: ['fas','phone'] },
  { item_type: "type_mail_address", item_name: get_language(locale,"type_mail_address"), icon_name: ['far','envelope'] },
  { item_type: "type_url", item_name: get_language(locale,"type_url"), icon_name: ['fas','globe'] },
  { item_type: "type_markdown", item_name: get_language(locale,"type_markdown"), icon_name: ['fas','code'] },
  { item_type: "type_file", item_name: get_language(locale,"type_file"), icon_name: ['far','file'] },
  { item_type: "type_sign", item_name: get_language(locale,"type_sign"), icon_name: ['far','pen-to-square'] },
  { item_type: "type_label", item_name: get_language(locale,"type_label"), icon_name: ['far','note-sticky'] },
  { item_type: "type_link", item_name: get_language(locale,"type_link"), icon_name: ['fa-solid','fa-link'] },
];

// -----------------------------------------------
// 既定計算
// -----------------------------------------------
const state_import_ok = computed(() => {
    if( rf_text_import_modal.value.length > 10 ){
        try {
            JSON.parse(rf_text_import_modal.value)
            return false
        } catch (err) {
            return true
        }
    } else {
        return true
    }
})
// -----------------------------------------------
// 監視
// -----------------------------------------------
watch( rf_item_editor_render_key, () => {
    if( work_form_array.length > 0 ){
        rf_disabled_button_form_check.value = false
    } else {
        rf_disabled_button_form_check.value = true
    }
})
// -----------------------------------------------
// コンポーネントがマウントされる直前に呼び出されるフックを登録します。
// -----------------------------------------------
onBeforeMount(() => {
    if( props.init_form_info !== null ){
        work_form_array = JSON.parse(JSON.stringify(props.init_form_info))
    }
    //console.log("sw-form-editor:onBeforeMount:work_form_array="+JSON.stringify(work_form_array,null,1))

    if( props.options !== null ){
        if( props.options.form_download_enable !== undefined ){
            if( props.options.form_download_enable ){
                button_form_download_enable = true
            }
        }
    }
    if( props.options !== null ){
        if( props.options.form_copy_to_clipboard_enable !== undefined ){
            if( props.options.form_copy_to_clipboard_enable ){
              button_form_copy_to_clipboard_enable = true
            }
        }
    }
    if( props.options !== null ){
        if( props.options.form_import_enable !== undefined ){
            if( props.options.form_import_enable ){
              button_form_import_enable = true
            }
        }
    }
    if( props.options !== null ){
        if( props.options.form_reset_enable !== undefined ){
            if( props.options.form_reset_enable ){
              button_form_reset_enable = true
            }
        }
    }
    if( props.options !== null ){
        if( props.options.form_check_enable !== undefined ){
            if( props.options.form_check_enable ){
              button_form_check_enable = true
            }
        }
    }

    if (window.matchMedia('(max-width: 767px)').matches) {
        main_inputter_shrink()
        sub_inputter_shrink()
    }
})
// -----------------------------------------------
// コンポーネントがマウントされた後に呼び出されるコールバックを登録します。
// -----------------------------------------------
// onMounted(() => {})
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
// sw-item-type でボタンがクリックされた時に駆動
const click_type = (item_type) => {
    // 編集用フォームに新しい型を追加する
    work_form_array.push(get_schema_type(item_type))
    reset_sequence_form(work_form_array);
    // 項目設定を再描画
    update_form_editor()
}
// sw-item-editor で入力があった時に駆動(emit駆動)
const updated_item_info = (item_info) => {
    if( Object.keys(item_info).length === 0 ) return //空Objectの時は無処理
    //console.log("sw-form-editor:updated_item_info:item_info="+JSON.stringify(item_info,null,2))
    update_work_form_array(item_info);
    update_form_inputter(); //sw-form-inputter の画面を更新する
}
// sw-item-editor-xxxxx でコピーアイコンがクリックされた時に駆動
const click_copy_item = (item_uuid) => {
    //console.log("sw-form-editor:click_copy_item="+item_uuid)
    work_form_array.push(get_clone_item(item_uuid))
    reset_sequence_form(work_form_array);
    // 項目設定を再描画
    update_form_editor()
}
// sw-item-editor-xxxxx で削除アイコンがクリックされた時に駆動
const click_delete_item = (item_uuid) => {
    //console.log("sw-form-editor:click_delete_item="+item_uuid)
    // 編集用フォームから削除する
    remove_work_form_array(item_uuid);
    reset_sequence_form(work_form_array);
    // 画面を更新
    update_form_editor();  //sw-item-editor の画面を更新する
    update_form_inputter(); //sw-form-inputter の画面を更新する
}
// 作業用フォームのシーケンスをリセットする
const reset_sequence_form = (form_array) => {
    //console.log("sw-form-editor:reset_sequence_form="+JSON.stringify(form_array,null,1))
    for( let i=0;i<form_array.length;i++ ){
        form_array[i].item_sequence = i;
    }
}
// 作業用フォームに項目情報を追加更新する
const update_work_form_array = (item_info) => {
    if( item_info.item_uuid === undefined ) return
    let update_flag = false
    for( let i=0;i<work_form_array.length;i++ ){
        if( work_form_array[i].item_uuid == item_info.item_uuid ){
            //console.log("sw-form-editor:update_work_form_array:item_info="+JSON.stringify(item_info,null,2))
            work_form_array[i]=JSON.parse(JSON.stringify(item_info))
            update_flag = true
            break;
        }
    }
    if( !update_flag ){
        work_form_array.push(JSON.parse(JSON.stringify(item_info)))
    }
    //console.log("sw-form-editor:update_work_form_array:work_form_array="+JSON.stringify(work_form_array,null,2))
}
// 作業用フォームの項目情報を削除する
const remove_work_form_array = (item_uuid) => {
    for( let i=0;i<work_form_array.length;i++ ){
        if( work_form_array[i].item_uuid == item_uuid ){
            //console.log("sw-form-editor:remove_work_form_array:work_form_array="+JSON.stringify(work_form_array[i],null,2))
            remove_work_item_info = work_form_array[i]; // 削除するものを一時退避
            work_form_array.splice( i,1 );
            break;
        }
    }
}
// 作業用フォームに一時退避した項目情報を挿入する
const insert_work_form_array = (item_uuid) => {
    for( let i=0;i<work_form_array.length;i++ ){
        if( work_form_array[i].item_uuid == item_uuid ){
            //console.log("sw-form-editor:insert_work_form_array:remove_work_item_info="+JSON.stringify(remove_work_item_info,null,2))
            work_form_array.splice( i,0,remove_work_item_info );  // 一時退避したものをインサート
            break;
        }
    }
}
// 作業用フォームから指定した項目情報のクローンを取得する
const get_clone_item = (item_uuid) => {
    let item_info = {};
    for( let i=0;i<work_form_array.length;i++ ){
        if( work_form_array[i].item_uuid == item_uuid ){
            item_info = JSON.parse(JSON.stringify(work_form_array[i]))
            item_info.item_uuid = uuidv4();
            //console.log("sw-form-editor:get_clone_item:item_info="+JSON.stringify(item_info,null,2))
            break;
        }
    }
    return item_info;
}

// 項目のドラッグした時
const drag_list = ($event,item_uuid) => {
    //console.log("sw-form-editor:drag_list:item_info="+JSON.stringify(item_info,null,2))
    $event.dataTransfer.setData("drag_item_uuid", item_uuid);
}
// 項目のドロップした時
const drop_list = ($event,item_uuid) => {
    //console.log("sw-form-editor:drop_list:item_info="+JSON.stringify(item_info,null,2))
    // ドラッグしてきた item_info をディープコピーで退避
    let drag_item_uuid = $event.dataTransfer.getData("drag_item_uuid");
    //console.log("sw-form-editor:drop_list:drag_item_info="+drag_item_uuid)
    // ドロップした場所のチェック
    if( item_uuid == drag_item_uuid ){
        //console.log("sw-form-editor:drop_list:同じUUID")
        return;
    }
    // ドラッグしてきた item_info を work_form_array から削除
    remove_work_form_array(drag_item_uuid)
    // ドロップした場所の item_info の前にドラッグしてきた item_info を挿入
    insert_work_form_array(item_uuid)
    // item_sequence をリセット
    reset_sequence_form(work_form_array)
    // 画面を更新
    update_form_editor();  //sw-item-editor の画面を更新する
    update_form_inputter(); //sw-form-inputter の画面を更新する
}

// sw-form-editor の画面を更新する
const update_form_editor = () => {
    rf_item_editor_render_key.value = rf_item_editor_render_key.value + 1;  //sw-item-editor の画面を更新する
}

// sw-form-inputter の画面を更新する
const update_form_inputter = () => {
    let diff_work_form_array = JSON.parse(JSON.stringify(work_form_array))
    delete diff_work_form_array.item_body_visible;
    let diff_tmp_work_form_array = JSON.parse(JSON.stringify(tmp_work_form_array))
    delete diff_tmp_work_form_array.item_body_visible;

    if( !_.isEqual(diff_work_form_array,diff_tmp_work_form_array) ){
        rf_item_inputter_render_key.value = rf_item_inputter_render_key.value + 1;  //sw-form-inputter の画面を更新する
        rf_item_viewer_render_key.value = rf_item_viewer_render_key.value + 1;  //sw-form-viewer の画面を更新する
        tmp_work_form_array = JSON.parse(JSON.stringify(work_form_array))
    }
}

// フォームの出力用JSONデータを生成する
const make_output_form = () => {
    output_form_array = JSON.parse(JSON.stringify(work_form_array))
    for( let i=0;i<output_form_array.length;i++ ){
        delete output_form_array[i].item_body_visible
        delete output_form_array[i].item_result
    }
}
// 出力用JSONデータをダウンロードする
const form_download = () => {
    if( work_form_array.length > 0 ){
        make_output_form()
        let blob = new Blob([JSON.stringify(output_form_array,null,2)], {type: "text/plain"});
        let element = document.createElement("a");
        element.href = URL.createObjectURL(blob);
        element.target = "_blank";
        element.download = "download-form-"+moment().format("YYYYMMDDHHmmss")+".json";
        element.click();
    }
}
// 出力用JSONデータをクリップボードにコピーする
const form_copy_to_clipboard = async () => {
    if( work_form_array.length > 0 ){
        make_output_form()
        try {
            await navigator.clipboard.writeText(JSON.stringify(output_form_array));
        } catch (err) {
            console.error('sw-form-editor:form_copy_to_clipboard:Failed to copy: ', err);
        }
    }
}
// インポート用の画面を表示する
const form_import = () => {
    rf_form_import_modal.value = !rf_form_import_modal.value 
}
// JSONデータをインポートする
const import_form_array = (event) => {
    try {
        let import_form_array = JSON.parse(rf_text_import_modal.value)
        for( let i=0;i<import_form_array.length;i++ ){
            import_form_array[i].item_body_visible = true
            import_form_array[i].item_result = false
        }
        //console.log("sw-form-editor:import_form_array:import_form_array="+JSON.stringify(import_form_array))
        work_form_array = JSON.parse(JSON.stringify(import_form_array))
        reset_sequence_form(work_form_array);
        // 項目設定を再描画
        update_form_editor()
        // 初期化
        rf_text_import_modal.value = ""
    } catch (err) {
        console.error('sw-form-editor:import_form_array:Failed to parse: ', err);
        if( rf_text_import_modal.value ) event.preventDefault()
    }
}
// 入力フォームをリセットする
const form_reset = () => {
    //console.log("sw-form-editor:form_reset:props.init_form_info="+props.init_form_info)
    if( props.init_form_info !== null ){
        work_form_array = props.init_form_info
    } else {
        work_form_array = []
    }
    // 項目設定を再描画
    update_form_editor()
    update_form_inputter(); //sw-form-inputter の画面を更新する
}
// 入力フォームの確認画面に遷移する
const form_check = () => {
    check_form_array = JSON.parse(JSON.stringify(work_form_array))
    rf_form_check_enable.value = !rf_form_check_enable.value
}
// 出力用JSONデータをダウンロードする
const data_download = () => {
    if( input_data_info.value.length > 0 ){
        let blob = new Blob([JSON.stringify(input_data_info.value,null,2)], {type: "text/plain"});
        let element = document.createElement("a");
        element.href = URL.createObjectURL(blob);
        element.target = "_blank";
        element.download = "download-data-"+moment().format("YYYYMMDDHHmmss")+".json";
        element.click();
    }
}
// 出力用JSONデータをクリップボードにコピーする
const data_copy_to_clipboard = async () => {
    if( input_data_info.value.length > 0 ){
        make_output_form()
        try {
            await navigator.clipboard.writeText(JSON.stringify(input_data_info.value));
        } catch (err) {
            console.error('sw-form-editor:data_copy_to_clipboard:Failed to copy: ', err);
        }
    }
}
// 入力フォームのボディを表示・非表示にする
const collapse_all_visible = () => {
    // 子コンポーネントのメソッドを呼び出す
    for( let i=0;i<ref_item_editor.value.length;i++ ){
        ref_item_editor.value[i].collapse_body_visible()
    }
}
const collapse_all_unvisible = () => {
    // 子コンポーネントのメソッドを呼び出す
    for( let i=0;i<ref_item_editor.value.length;i++ ){
        ref_item_editor.value[i].collapse_body_unvisible()
    }
}
// 入力フォームの見え消し
const main_inputter_expand = () => {
    rf_main_inputter_visible.value = true
}
const main_inputter_shrink = () => {
    rf_main_inputter_visible.value = false
}
const sub_inputter_expand = () => {
    rf_sub_inputter_visible.value = true
}
const sub_inputter_shrink = () => {
    rf_sub_inputter_visible.value = false
}

</script>

<style scoped>
@media (min-width: 768px) {
    .form-editor {
        text-align: left;
        padding: 4px;
    }
    .item {
        cursor: pointer;
    }
    .drag_item:hover {
        cursor: grab;
    }
    .drag_item:active {
        cursor: grabbing;
    }
}
@media (max-width: 767px) {
    .form-editor {
        text-align: left;
        padding: 4px;
    }
    .item {
        cursor: pointer;
    }
    .drag_item:hover {
        cursor: grab;
    }
    .drag_item:active {
        cursor: grabbing;
    }
    .item_type_visible {
        display: none;
    }
}
</style>
  