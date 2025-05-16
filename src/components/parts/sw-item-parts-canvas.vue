<script setup >
import { ref,onBeforeMount,onMounted,defineModel,defineProps } from 'vue';
import { BBadge,BImg,BButton,BAlert } from "bootstrap-vue-next";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
//import validator from 'validator';
import moment from 'moment-timezone';
import SwLanguage from '../lib/sw-language.js'
const { get_language } = SwLanguage()
// -----------------------------------------------
// v-modelに親コンポーネントで定義したデータ（ref/reactive）を指定する際に使用
// -----------------------------------------------
// 正常：true 異常：false
const dm_result = defineModel("result",{ default: false })
// 写真
const dm_picture = defineModel("picture")

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
    // canvas の高さ
    item_height: {
        type: Number,
        required: false,
        default: 300,
    },
    // サインの線の太さ
    item_line_width: {
        type: Number,
        required: false,
        default: 3,
    },
    // サインの線の色
    item_stroke_style: {
        type: String,
        required: false,
        default: "black",
    }
});

// -----------------------------------------------
// ローカル変数
// -----------------------------------------------
// ブラウザからデフォルトの言語を取得する
let locale = navigator.language;
if( locale != "ja" && locale != "en" ) locale = "en";
//const rf_render_key = ref(0)
let local_button_name = get_language(locale,"button_sign")

const rf_canvas_modal = ref(false)
let dialog = null;
let canvas = null;
let context = null;
let isDragging = false;
let lastPosition = { x: null, y: null };
let epoch_milliseconds = "";

// -----------------------------------------------
// 既定計算
// -----------------------------------------------

// -----------------------------------------------
// コンポーネントがマウントされる直前に呼び出されるフックを登録します。
// -----------------------------------------------
onBeforeMount(() => {
    if( props.item_placeholder !== "" ){
        local_button_name = props.item_placeholder;
    }
});
// -----------------------------------------------
// コンポーネントがマウントされた後に呼び出されるコールバックを登録します。
// -----------------------------------------------
onMounted(() => {
    if( props.item_required ){
        dm_result.value = false;
    } else {
        dm_result.value = true;
    }
    dm_picture.value = null;
    epoch_milliseconds = String(moment().valueOf())
    dialog = document.getElementById("dialog");
    dialog.setAttribute("id","dialog-"+epoch_milliseconds)
    canvas = document.getElementById("canvas");
    canvas.setAttribute("id","canvas-"+epoch_milliseconds)
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
// onUnmounted(() => {})
// -----------------------------------------------
// 子孫コンポーネントから伝搬するエラーをキャプチャーしたときに呼び出されるフックを登録します。
// -----------------------------------------------
// onErrorCaptured()

// -----------------------------------------------
// ローカル関数
// -----------------------------------------------
const modal_open = () => {
    if( window.innerWidth > 800 ){
        dialog.width = 780;
    } else {
        dialog.width = window.innerWidth - 20;
    }
    context = canvas.getContext("2d");
    context.canvas.width = dialog.width - 70;
    context.canvas.height = props.item_height;

    // PC用
    canvas.addEventListener("mousedown", dragStart);
    canvas.addEventListener("mouseup", dragEnd);
    canvas.addEventListener("mouseout", dragEnd);
    canvas.addEventListener("mousemove", (e) => {
        //let x = e.layerX - canvas.getBoundingClientRect().left;
        //let y = e.layerY - canvas.getBoundingClientRect().top;
        //console.log("draw:x:"+e.layerX+":y:"+e.layerY)
        let x = e.layerX - 16;
        let y = e.layerY - 16;
        draw( x, y );
    });
    // SP
    canvas.addEventListener("touchstart", dragStart);
    canvas.addEventListener("touchcancel", dragEnd);
    canvas.addEventListener("touchend", dragEnd);
    canvas.addEventListener("touchmove", (e) => {
        // 描きづらいのでスワイプさせない
        e.preventDefault();
        let x = e.touches[0].clientX - canvas.getBoundingClientRect().left;
        let y = e.touches[0].clientY - canvas.getBoundingClientRect().top;
        draw( x, y );
    })
    context.clearRect(0, 0, canvas.width, canvas.height);
    dialog.showModal()
}
const modal_cancel = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    dialog.close();
}
const modal_clear = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
}
const modal_done = () => {
    dm_result.value = true;
    dm_picture.value = canvas.toDataURL();
    rf_canvas_modal.value = true;
    dialog.close();
}
const modal_erase = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    if( props.item_required ){
        dm_result.value = false;
    }
    dm_picture.value = null;
    rf_canvas_modal.value = false;
}
// 描画処理
const draw = (x, y) => {
    if (!isDragging) {
        return;
    }
    // 線端の形状, 太さ, 色
    context.lineCap = "round";
    context.lineWidth = props.item_line_width;
    context.strokeStyle = props.item_stroke_style;

    if (lastPosition.x === null || lastPosition.y === null) {
        context.moveTo(x, y);
    } else {
        context.moveTo(lastPosition.x, lastPosition.y);
    }
    context.lineTo(x, y);
    context.stroke();

    // 座標保持
    lastPosition.x = x;
    lastPosition.y = y;
}
// 描画の開始
const dragStart = () => {
    //console.log("dragStart:context:")
    context.beginPath();
    isDragging = true;
}
// 描画の終了
const dragEnd = () => {
    context.closePath();
    isDragging = false;
    // 座標リセット
    lastPosition.x = null;
    lastPosition.y = null;
}
</script>

<template>
<div class="item-editor">
    <!-- Text -->
    <label class="text-secondary mt-0 mb-0 small" >{{ props.item_subject }}</label>
    <template v-if='props.item_required && props.item_required_badge'>
        <b-badge variant="danger" class="mt-0 mb-0 ms-1">{{ get_language(locale,"selected_mandatory") }}</b-badge>
    </template>
    <div v-if="rf_canvas_modal" class="mt-1 mb-0">
        <b-img thumbnail :src="dm_picture" style="max-height:400px;max-width:100%;"></b-img>
    </div>
    <b-alert :model-value="!rf_canvas_modal && props.item_required" variant="danger" class="mt-1 mb-1 pt-2 pb-1">{{ get_language(locale,"please_sign") }}</b-alert>
    <div class="mt-1">
        <b-button class="me-1" variant="outline-primary" @click="modal_open()">
            <font-awesome-icon icon="pen-to-square" />&nbsp;{{ local_button_name }}
        </b-button>
        <b-button v-if="rf_canvas_modal" class="ms-1" variant="outline-primary" @click="modal_erase()">
            <font-awesome-icon icon="trash" />&nbsp;{{ get_language(locale,"button_erase") }}
        </b-button>
    </div>
    <label v-if='props.item_description!==""' class="text-secondary mt-1 mb-0 ms-1 small">{{ props.item_description }}</label>
</div>
<dialog id="dialog">
    <canvas id="canvas" style="background-color: #fcfcfc; padding: 0; margin: 0; border: 1px solid #f0f0f0;"></canvas>
    <div class="mt-2 text-end">
        <b-button variant="outline-primary" class="ms-2" @click="modal_clear()">{{ get_language(locale,"button_clear") }}</b-button>
        <b-button variant="outline-primary" class="ms-2" @click="modal_cancel()">{{ get_language(locale,"button_cancel") }}</b-button>
        <b-button variant="outline-primary" class="ms-2" @click="modal_done()">{{ get_language(locale,"button_done") }}</b-button>
    </div>
</dialog>
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
