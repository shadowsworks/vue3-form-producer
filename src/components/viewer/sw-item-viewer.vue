<template>
<div class="item-viewer">
    <div v-if="rf_debug">sw-item-viewer: {{ JSON.stringify(props.item_info,null,2) }} </div>
    <!-- 短いテキスト -->
    <template v-if='props.item_info.type=="type_short_text"'>
        <sw-item-viewer-text 
            :item_info="props.item_info"
            :view_mode="rf_view_mode"
            :bottom_line="rf_bottom_line"
        />
    </template>
    <!-- 長いテキスト -->
    <template v-if='props.item_info.type=="type_long_text"'>
        <sw-item-viewer-multiline
            :item_info="props.item_info"
            :view_mode="rf_view_mode"
            :bottom_line="rf_bottom_line"
        />
    </template>
    <!-- 数値 -->
    <template v-if='props.item_info.type=="type_numeric"'>
        <sw-item-viewer-text 
            :item_info="props.item_info"
            :view_mode="rf_view_mode"
            :bottom_line="rf_bottom_line"
            :text_align="rf_text_align"
        />
    </template>
    <!-- 単一選択 -->
    <template v-if='props.item_info.type=="type_single_select"'>
        <sw-item-viewer-text 
            :item_info="props.item_info"
            :view_mode="rf_view_mode"
            :bottom_line="rf_bottom_line"
        />
    </template>
    <!-- 複数選択 -->
    <template v-if='props.item_info.type=="type_multi_select"'>
        <sw-item-viewer-texts 
            :item_info="props.item_info"
            :view_mode="rf_view_mode"
            :bottom_line="rf_bottom_line"
        />
    </template>
    <!-- スイッチ -->
    <template v-if='props.item_info.type=="type_switch"'>
        <sw-item-viewer-text 
            :item_info="props.item_info"
            :view_mode="rf_view_mode"
            :bottom_line="rf_bottom_line"
        />
    </template>
    <!-- 日付 -->
    <template v-if='props.item_info.type=="type_date"'>
        <sw-item-viewer-text 
            :item_info="props.item_info"
            :view_mode="rf_view_mode"
            :bottom_line="rf_bottom_line"
        />
    </template>
    <!-- 時刻 -->
    <template v-if='props.item_info.type=="type_time"'>
        <sw-item-viewer-text 
            :item_info="props.item_info"
            :view_mode="rf_view_mode"
            :bottom_line="rf_bottom_line"
        />
    </template>
    <!-- 日時 -->
    <template v-if='props.item_info.type=="type_datetime"'>
        <sw-item-viewer-text 
            :item_info="props.item_info"
            :view_mode="rf_view_mode"
            :bottom_line="rf_bottom_line"
        />
    </template>
    <!-- 写真 -->
    <template v-if='props.item_info.type=="type_picture"'>
        <sw-item-viewer-picture 
            :item_info="props.item_info"
            :view_mode="rf_view_mode"
            :bottom_line="rf_bottom_line"
        />
    </template>
    <!-- パスワード -->
    <template v-if='props.item_info.type=="type_password"'>
        <sw-item-viewer-password
            :item_info="props.item_info"
            :view_mode="rf_view_mode"
            :bottom_line="rf_bottom_line"
        />
    </template>
    <!-- 氏名 -->
    <template v-if='props.item_info.type=="type_full_name"'>
        <sw-item-viewer-fullname 
            :item_info="props.item_info"
            :view_mode="rf_view_mode"
            :bottom_line="rf_bottom_line"
        />
    </template>
    <!-- 電話番号 -->
    <template v-if='props.item_info.type=="type_phone_number"'>
        <sw-item-viewer-text 
            :item_info="props.item_info"
            :view_mode="rf_view_mode"
            :bottom_line="rf_bottom_line"
        />
    </template>
    <!-- メールアドレス -->
    <template v-if='props.item_info.type=="type_mail_address"'>
        <sw-item-viewer-text 
            :item_info="props.item_info"
            :view_mode="rf_view_mode"
            :bottom_line="rf_bottom_line"
        />
    </template>
    <!-- プルダウン -->
    <template v-if='props.item_info.type=="type_pulldown"'>
        <sw-item-viewer-text 
            :item_info="props.item_info"
            :view_mode="rf_view_mode"
            :bottom_line="rf_bottom_line"
        />
    </template>
        <!-- URL -->
        <template v-if='props.item_info.type=="type_url"'>
            <sw-item-viewer-url
            :item_info="props.item_info"
            :view_mode="rf_view_mode"
            :bottom_line="rf_bottom_line"
        />
    </template>
    <!-- マークダウン -->
    <template v-if='props.item_info.type=="type_markdown"'>
        <sw-item-viewer-html
            :item_info="props.item_info"
            :view_mode="rf_view_mode"
            :bottom_line="rf_bottom_line"
        />
    </template>
    <!-- ラベル -->
    <template v-if='props.item_info.type=="type_label"'>
        <sw-item-viewer-label
            :item_info="props.item_info"
            :view_mode="rf_view_mode"
            :bottom_line="!rf_bottom_line"
        />
    </template>
    <!-- 表 -->
    <template v-if='props.item_info.type=="type_table"'>
        <sw-item-viewer-table
            :item_info="props.item_info"
            :view_mode="rf_view_mode"
            :text_align="rf_text_align"
        />
    </template>
    <!-- ファイル -->
    <template v-if='props.item_info.type=="type_file"'>
        <sw-item-viewer-file
            :item_info="props.item_info"
            :view_mode="rf_view_mode"
            :text_align="rf_text_align"
        />
    </template>
    <!-- サイン -->
    <template v-if='props.item_info.type=="type_sign"'>
        <sw-item-viewer-picture 
            :item_info="props.item_info"
            :view_mode="rf_view_mode"
            :bottom_line="rf_bottom_line"
        />
    </template>
    <!-- 参照リンク -->
</div>
</template>
    
<script setup >
import { ref,watch,onBeforeMount,onMounted,defineProps } from 'vue';
import SwItemViewerText from "./sw-item-viewer-text.vue"
import SwItemViewerTexts from "./sw-item-viewer-texts.vue"
import SwItemViewerMultiline from "./sw-item-viewer-multiline.vue"
import SwItemViewerHtml from "./sw-item-viewer-html.vue"
import SwItemViewerFullname from "./sw-item-viewer-fullname.vue"
import SwItemViewerPicture from "./sw-item-viewer-picture.vue"
import SwItemViewerPassword from "./sw-item-viewer-password.vue"
import SwItemViewerUrl from "./sw-item-viewer-url.vue"
import SwItemViewerLabel from "./sw-item-viewer-label.vue"
import SwItemViewerTable from "./sw-item-viewer-table.vue"
import SwItemViewerFile from "./sw-item-viewer-file.vue"

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
    view_mode : {
        type: String,
        required: false,
        default: "stacked", // "stacked","lined", 
    },
    bottom_line : {
        type: Boolean,
        required: false,
        default: false,
    },
    text_align: {
        type: String,
        required: false,
        default: "left", // "left","right", 
    },
    demo_mode: {
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
const rf_bottom_line = ref(true)
const rf_view_mode = ref("lined") // stacked or lined
const rf_text_align = ref("left") // left or right
const rf_render_key = ref(0)
const rf_item_info = ref()

// -----------------------------------------------
// 既定計算 computed(() => {})
// -----------------------------------------------
// const state_xxxxx = computed(() => { return true or false; });
// -----------------------------------------------
// 監視
// -----------------------------------------------
//watch( props.item_info, () => {
watch( rf_item_info, () => {
    rf_render_key.value = rf_render_key.value + 1
})
// -----------------------------------------------
// コンポーネントがマウントされる直前に呼び出されるフックを登録します。
// -----------------------------------------------
onBeforeMount(() => {
    if( props.view_mode == "stacked" || props.view_mode == "lined" ){
        rf_view_mode.value = props.view_mode
    }
    rf_bottom_line.value = props.bottom_line
    if( props.text_align == "left" || props.text_align == "right" ){
        rf_text_align.value = props.text_align
    }
})
// -----------------------------------------------
// コンポーネントがマウントされた後に呼び出されるコールバックを登録します。
// -----------------------------------------------
onMounted(() => {
    rf_item_info.value = props.item_info;
})
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
      