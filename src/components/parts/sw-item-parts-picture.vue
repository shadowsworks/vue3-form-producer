<script setup >
import { ref,computed,onBeforeMount,onMounted,defineModel,defineProps } from 'vue';
import { BBadge,BImg } from "bootstrap-vue-next";
//import validator from 'validator';
import SwLanguage from '../lib/sw-language.js'
const { get_language } = SwLanguage()
// -----------------------------------------------
// v-modelに親コンポーネントで定義したデータ（ref/reactive）を指定する際に使用
// -----------------------------------------------
// 正常：true 異常：false
//const dm_result = defineModel("result",{ default: false })
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
    // ドロップエリアを表示する 表示する:true/表示しない:false
    item_droparea_view: {
        type: Boolean,
        required: false,
        default: false,
    },
    item_max_width: {
        type: Number,
        required: false,
        default: 80,
    },
    item_max_height: {
        type: Number,
        required: false,
        default: 80,
    }
});

// -----------------------------------------------
// ローカル変数
// -----------------------------------------------
// ブラウザからデフォルトの言語を取得する
let locale = navigator.language;
if( locale != "ja" && locale != "en" ) locale = "en";
const rf_render_key = ref(0)

const rf_image_preview_show = ref({ type: Boolean, default: false });
let local_placeholder = get_language(locale,"placeholder_drop_here")

// -----------------------------------------------
// 既定計算
// -----------------------------------------------
// 入力監視
const state_input_color = computed(() => {
    let ret = required();
    //console.log("state_input_color:"+ret)
    if( ret == false  ){
        return "border-danger"
    } else if( ret ){
        return "border-success"
    } else {
        return "";
    }
});
// -----------------------------------------------
// コンポーネントがマウントされる直前に呼び出されるフックを登録します。
// -----------------------------------------------
onBeforeMount(() => {
    if( props.item_placeholder !== "" ){
        local_placeholder = props.item_placeholder
    }
})
// -----------------------------------------------
// コンポーネントがマウントされた後に呼び出されるコールバックを登録します。
// -----------------------------------------------
onMounted(() => {
    dm_picture.value = null;
    rf_image_preview_show.value = false;
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
        //console.log("dm_picture="+JSON.stringify(dm_picture,null,1))
        if( dm_picture.value === null || String(dm_picture.value) == "" ){
            return false;
        } else {
            return true;
        }
    } else {
        return null;
    }
}
// 画像の選択
const item_image_input = async ( event ) => {
    let image_file = event.target.files[0];
    let image_base64 = await get_base64(image_file);
    let image_data = await get_image_data(image_base64);
    dm_picture.value = resize_image(image_data);
    rf_image_preview_show.value = true;
}
const resize_image = (image_data) => {
    let bounds = {};
    bounds.width = props.item_max_width;
    bounds.height = props.item_max_height;
    let rect = fit_rect_into_bounds(image_data,bounds)
    let canvas = document.createElement('canvas');
    canvas.width = rect.width;
    canvas.height = rect.height;
    let ctx = canvas.getContext('2d');
    ctx.drawImage(image_data, 0, 0, rect.width, rect.height);
    return canvas.toDataURL('image/png');
}
const get_base64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            resolve(event.target.result);
        };
        reader.onerror = (error) => {
            reject(error);
        };
        reader.readAsDataURL(file);
    });
}
const get_image_data = (image_base64) => {
    return new Promise((resolve, reject) => {
        let image = new Image();
        image.onload = () => { resolve(image); };
        image.onerror = () => { reject(image); };
        image.src = image_base64;
    });
}
const fit_rect_into_bounds = (rect, bounds) => {
    let rectRatio = rect.width / rect.height;
    let boundsRatio = bounds.width / bounds.height;
    let newDimensions = {};
    if(rectRatio > boundsRatio) {
        newDimensions.width = bounds.width;
        newDimensions.height = rect.height * (bounds.width / rect.width);
    } else {
        newDimensions.width = rect.width * (bounds.height / rect.height);
        newDimensions.height = bounds.height;
    }
    return newDimensions;
}
const item_image_clear = () => {
    dm_picture.value = null;
    rf_image_preview_show.value = false;
    rf_render_key.value = rf_render_key.value + 1;
}
const drop_zone = async (event) => {
    event.preventDefault();
    console.log("sw-item-parts-picture:drop_zone:event="+JSON.stringify(event,null,2))
    if( event.dataTransfer.items ) {
        // ドロップしたものがファイルでない場合は拒否する
        for( let i=0;i<event.dataTransfer.items.length;i++ ){
            let item = event.dataTransfer.items[i]
            if (item.kind === "file") {
                let file = item.getAsFile();
                console.log("sw-item-parts-picture:drop_zone:size="+file.size)
                if( !file.type.match('image.*') ){
                    return
                }
                console.log("sw-item-parts-picture:drop_zone:file="+file.name)
                let image_base64 = await get_base64(file);
                console.log("sw-item-parts-picture:drop_zone:image_base64="+image_base64.length)
                let image_data = await get_image_data(image_base64);
                dm_picture.value = resize_image(image_data);
                rf_image_preview_show.value = true;
            }
        }
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
    <div class="input-group mt-0 border rounded" :class="state_input_color" :key="rf_render_key">
        <input class="form-control" type="file" @change="item_image_input" accept="image/*" />
        <button class="btn btn-outline-secondary" type="button" @click="item_image_clear">{{ get_language(locale,"button_clear") }}</button>
    </div>
    <label v-if='props.item_description!==""' class="text-secondary mt-1 mb-0 ms-1 small">{{ props.item_description }}</label>
    <div v-show="rf_image_preview_show" class="mt-0 mb-0">
        <b-img thumbnail :src="dm_picture" class="image-shadow" style="max-height:400px;max-width:100%;"></b-img>
    </div>
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
