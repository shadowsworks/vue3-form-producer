<script setup >
import { ref,watch,onBeforeMount,onMounted,defineModel,defineProps } from 'vue';
import { BBadge,BListGroup,BListGroupItem,BProgress,BProgressBar } from "bootstrap-vue-next";
//import validator from 'validator';
import SwLanguage from '../lib/sw-language.js'
const { get_language } = SwLanguage()
// -----------------------------------------------
// v-modelに親コンポーネントで定義したデータ（ref/reactive）を指定する際に使用
// -----------------------------------------------
// 正常：true 異常：false
const dm_result = defineModel("result",{ default: false })
// ファイル
const dm_files = defineModel("files",{ default: ()  => [] })

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
    // ドロップエリアを表示する 表示する:true/表示しない:false
    item_droparea_view: {
        type: Boolean,
        required: false,
        default: false,
    },
    // データ取得方法 Base64:true/File Object:false
    item_output_method: {
        type: Boolean,
        required: false,
        default: false,
    },
    // 最大ファイル数
    item_max_files: {
        type: Number,
        required: false,
        default: 80,
    },
    // 最大ファイルサイズ（合計）
    item_max_size: {
        type: Number,
        required: false,
        default: 80,
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
const rf_render_key = ref(0)
const rf_local_files_state = ref(true)
let local_placeholder = get_language(locale,"placeholder_drop_here")
let local_files_array = []
let local_files_size = 0
let local_files_max_size = 0
let local_files_state = ""
let local_progress_variant = "success"
let state_input_color = "border-danger"

// -----------------------------------------------
// 既定計算
// -----------------------------------------------
//
// -----------------------------------------------
// 監視
// -----------------------------------------------
watch( [dm_files,rf_render_key], () => {
    //console.log("watch:dm_files="+JSON.stringify(dm_files.value,null,1))
    set_state_input_color()
})
// -----------------------------------------------
// コンポーネントがマウントされる直前に呼び出されるフックを登録します。
// -----------------------------------------------
onBeforeMount(() => {
    if( props.item_placeholder !== "" ){
        local_placeholder = props.item_placeholder
    }
    set_state_input_color()
})
// -----------------------------------------------
// コンポーネントがマウントされた後に呼び出されるコールバックを登録します。
// -----------------------------------------------
onMounted(() => {
    local_files_array = [];
    local_files_max_size = props.item_max_size * 1024 * 1024;
});
// -----------------------------------------------
// コンポーネントがリアクティブな状態変更により DOM ツリーを更新しようとする直前に呼び出されるフックを登録します。
// -----------------------------------------------
// onBeforeUpdate()
// -----------------------------------------------
// コンポーネントがリアクティブな状態変更によって DOM ツリーを更新した後に呼び出されるコールバックを登録します。
// -----------------------------------------------
// onUpdated(() => {})
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

// -----------------------------------------------
// ローカル関数
// -----------------------------------------------
const required = () => {
    if( props.item_required ){
        if( dm_files.value.length === 0 ){
            dm_result.value = false;
            return false;
        } else {
            dm_result.value = true;
            return true;
        }
    } else {
        dm_result.value = null;
        return null;
    }
}
// ファイルの選択
const item_file_input = async ( event ) => {
    let file = event.target.files[0];
    await item_file_set(file);
    rf_render_key.value = rf_render_key.value + 1;
}
const get_file_base64 = (image_file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            resolve(event.target.result);
        };
        reader.onerror = (error) => {
            reject(error);
        };
        reader.readAsDataURL(image_file);
    });
}
const item_file_summary = () => {
    local_files_size = 0
    let files_size = 0
    for( let i=0;i<local_files_array.length;i++ ){
        files_size += local_files_array[i].size
    }
    if( ( files_size / local_files_max_size ) > ( local_files_array.length / props.item_max_files ) ){
        local_files_size = files_size
    } else {
        local_files_size = ( local_files_array.length / props.item_max_files ) * local_files_max_size
    }
}
const item_file_clear = (index) => {
    local_files_array.splice( index,1 );
    item_file_summary()
    dm_files.value = local_files_array;
    //console.log("item_file_clear:dm_files="+JSON.stringify(dm_files.value,null,1))
    rf_render_key.value = rf_render_key.value + 1;
}
const item_file_set = async(file) => {
    let file_info = {}
    file_info.name = file.name;
    if( props.item_output_method ){
        file_info.base64 = await get_file_base64(file);
        file_info.size = file_info.base64.length;
    } else {
        file_info.file_object = file;
        file_info.size = file.size;
    }
    //console.log("sw-item-parts-file:item_file_set:"+local_files_max_size+":"+file_info.size+":"+local_files_size)
    if( local_files_array.length < props.item_max_files && 
        local_files_max_size >= file_info.size + local_files_size ){
        local_files_array.push(file_info)
        item_file_summary()
        dm_files.value = local_files_array;
        rf_render_key.value = rf_render_key.value + 1;
        //console.log("sw-item-parts-file:item_file_input:dm_files="+JSON.stringify(local_files_array))
    } else {
        local_progress_variant = "danger"
        rf_render_key.value = rf_render_key.value + 1;
        setTimeout(() => {
            local_progress_variant = "success"
            rf_render_key.value = rf_render_key.value + 1;
        }, 500);
    }
}
//"item_max_files":5,"item_max_size":10
const drop_zone = async (event) => {
    event.preventDefault();
    //console.log("sw-item-parts-picture:drop_zone:event="+JSON.stringify(event,null,2))
    if( event.dataTransfer.items ) {
        // ドロップしたものがファイルでない場合は拒否する
        for( let i=0;i<event.dataTransfer.items.length;i++ ){
            let item = event.dataTransfer.items[i]
            if ( item.kind === "file" ) {
                let file = item.getAsFile();
                //console.log("sw-item-parts-picture:drop_zone:file="+file.name)
                await item_file_set(file);
            }
        }
    } 
}
const set_state_input_color = () => {
    let ret = required();
    if( ret == false  ){
        state_input_color = "border-danger"
    } else if( ret ){
        state_input_color = "border-success"
    } else {
        state_input_color = "";
    }
}
</script>

<template>
<div class="item-editor">
    <!-- Text -->
    <label class="text-secondary mt-0 mb-0 small" >{{ props.item_subject }}</label>
    <template v-if='props.item_required && props.item_required_badge'>
        <b-badge variant="danger" class="mt-0 mb-0 ms-1">{{ get_language(locale,"selected_mandatory") }}</b-badge>
    </template>
    <div v-if="props.item_droparea_view" class="border dropzone mb-1 rounded d-flex align-items-center justify-content-center" 
        @drop="drop_zone($event)" @dragover.prevent @dragenter.prevent >
        {{ local_placeholder }}
    </div>
    <div :key="rf_render_key">
        <div v-if="rf_local_files_state" class="input-group mt-0 border rounded" :class="state_input_color" >
            <input class="form-control" type="file" @change="item_file_input" />
        </div>
        <label v-if='props.item_description!==""' class="text-secondary mt-1 mb-0 ms-1 small">{{ props.item_description }}</label>
        <div v-if="local_files_array.length>0" class="mt-1">
            <b-progress :max="local_files_max_size">
                <b-progress-bar :variant="local_progress_variant" :value="local_files_size"> {{ local_files_state }}</b-progress-bar>
            </b-progress>
            <b-list-group class="mt-1">
                <b-list-group-item class="d-flex justify-content-between align-items-center"
                    v-for="(local_file,index) in local_files_array" :key="local_file.name">
                    {{ local_file.name }}
                    <a href="#nogo" @click="item_file_clear(index)"><font-awesome-icon icon="fa-regular fa-trash-can" /></a>
                </b-list-group-item>
            </b-list-group>
        </div>
    </div>
    <div v-if="rf_debug">{{ local_files_array }}</div>
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
.dropzone {
    height: 100px;
    width: 100%;
    background-color: #fafafa;
}
</style>
