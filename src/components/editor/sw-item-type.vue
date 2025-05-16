<script setup >
    import { defineEmits,defineProps } from 'vue';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
    //import validator from 'validator';
    import { BButton } from "bootstrap-vue-next";
    // -----------------------------------------------
    // v-modelに親コンポーネントで定義したデータ（ref/reactive）を指定する際に使用
    // -----------------------------------------------
    //const dm_model = defineModel()
    const emit_click_type = defineEmits(['click_type'])
    // -----------------------------------------------
    // 親コンポーネントから子コンポーネントへデータを受け渡す
    // -----------------------------------------------
    const props = defineProps({
        item_type: {
            type: String,
            required: true,
        },
        item_name: {
            type: String,
            required: true,
        },
        icon_name: {
            type: Array,
            required: true,
        },
    })
    // -----------------------------------------------
    // ローカル変数
    // -----------------------------------------------
    // ブラウザからデフォルトの言語を取得する
    // -----------------------------------------------
    // 既定計算
    // -----------------------------------------------
    // 短文テキスト
    // const state_item_text = computed(() => {})
    // -----------------------------------------------
    // コンポーネントがマウントされる直前に呼び出されるフックを登録します。
    // -----------------------------------------------
    // onBeforeMount()
    // -----------------------------------------------
    // コンポーネントがマウントされた後に呼び出されるコールバックを登録します。
    // -----------------------------------------------
    // onMounted(() => {})
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
    //const required = (in_model) => {}
    const click_type = ( item_type ) => {
        emit_click_type('click_type', item_type);
    }

</script>

<template>
    <div class="item-type d-grid gap-2">
        <b-button variant="outline-secondary" size="sm" class="item_button" @click="click_type(props.item_type)">
            <font-awesome-icon :icon="props.icon_name" size="2x" />
            <br class="item_line_visible">
            <span class="item_type_visible">{{ props.item_name }}</span>
        </b-button>
    </div>
</template>

<style scoped>
@media (min-width: 1024px) {
    .item-type {
        text-align: left;
        padding: 1px;
    }
    .fsize {
        font-size: 0.8rem;
    }
    .item_button {
        text-align: center;
    }
}
@media screen and (min-width:768px) and ( max-width:1023px) {
    .item-type {
        text-align: left;
        padding: 1px;
    }
    .fsize {
        font-size: 0.8rem;
    }
    .item_line_visible {
        display: none;
    }
    .item_type_visible {
        margin-left: 10px;
    }
    .item_button {
        text-align: left;
    }
}
@media (max-width: 767px) {
    .item-type {
        text-align: left;
        padding: 1px;
    }
    .fsize {
        font-size: 0.8rem;
    }
    .item_type_visible {
        display: none;
    }
    .item_button {
        text-align: center;
    }
}
</style>