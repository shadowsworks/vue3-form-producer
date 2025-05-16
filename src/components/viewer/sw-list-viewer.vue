<template>
<div class="item-viewer">
    <div v-if="rf_debug">sw-list-viewer: {{ JSON.stringify(props.data_list,null,2) }} </div>
    <b-table selectable responsive striped hover bordered :items="list_items" :fields="list_fields" select-mode="single" ref="sw_list_table">
        <template #head()="head">
            <span class="text-nowrap">{{ head.label }}</span>
        </template>
        <template #cell()="data">
            <template v-if="is_picture(data.value)" >
                <b-img :src="get_picture(data.value)" width="100" height="auto"></b-img>
            </template> 
            <template v-if="is_file(data.value)" >
                {{ get_file_name(data.value) }}
            </template>
            <template v-if="!is_picture(data.value)&&!is_file(data.value)">
                <span class="text-nowrap">{{ get_data(data.value) }}</span>
            </template>
        </template>
    </b-table>
</div>
</template>
    
<script setup >
import { ref,onBeforeMount,defineProps,defineExpose } from 'vue';
import { BTable,BImg } from "bootstrap-vue-next";

// -----------------------------------------------
// v-modelに親コンポーネントで定義したデータ（ref/reactive）を指定する際に使用
// -----------------------------------------------

// -----------------------------------------------
// 親コンポーネントから子コンポーネントへデータを受け渡す
// -----------------------------------------------
const props = defineProps({
    // 入力データ情報
    data_list: {
        type: Array,
        required: true,
        default: null,
    },
    // 表示しない列 uuid or key を指定
    exclude_columns: {
        type: Array,
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
// const rf_text_align = ref("left") // left or right
//const rf_render_key = ref(0)
//const rf_item_info = ref()
let sorted_data_info = []
let list_items = []
let list_fields = []
const sw_list_table = ref()

// -----------------------------------------------
// 既定計算 computed(() => {})
// -----------------------------------------------
// const state_xxxxx = computed(() => { return true or false; });
// -----------------------------------------------
// 監視
// -----------------------------------------------
//watch( props.item_info, () => {})
// -----------------------------------------------
// コンポーネントがマウントされる直前に呼び出されるフックを登録します。
// -----------------------------------------------
onBeforeMount(() => {
    sorted_data_info = props.data_list[0]
    //console.log("sw-form-viewer:onBeforeMount:sorted_data_info="+sorted_data_info)
    if( sorted_data_info !== undefined ){
        sorted_data_info.sort((a,b) => a.sequence - b.sequence)
    }
    // Header
    for( let i=0;i<sorted_data_info.length;i++ ){
        if( !exclude_column( sorted_data_info[i]) ){
            let field = set_header(sorted_data_info[i])
            if( Object.keys(field).length !== 0 ){
                list_fields.push(field)
            }
        }
    }
    // Body
    for( let j=0;j<props.data_list.length;j++ ){
        let item = set_body(props.data_list[j])
        //console.log(JSON.stringify(item))
        list_items.push(item)
    }
})

// -----------------------------------------------
// コンポーネントがマウントされた後に呼び出されるコールバックを登録します。
// -----------------------------------------------
// onMounted(() => {
//     rf_item_info.value = props.data_list;
// })
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
const set_header = (data_info) => {
    let field = {}
    //短いテキスト
    if( data_info.type == "type_short_text" ){
        field.key = data_info.uuid
        field.label = data_info.name
        //field.sortable = true
    //長いテキスト
    } else if( data_info.type == "type_long_text" ){
        field.key = data_info.uuid
        field.label = data_info.name
    //数値
    } else if( data_info.type == "type_numeric" ){
        field.key = data_info.uuid
        field.label = data_info.name
        if( data_info.unit !== "" ){
            field.label += "("+data_info.unit+")"
        }
        field.class = "text-end"
        //field.sortable = true
    //単一選択
    } else if( data_info.type == "type_single_select" ){
        field.key = data_info.uuid
        field.label = data_info.name
        //field.sortable = true
    //複数選択
    } else if( data_info.type == "type_multi_select" ){
        field.key = data_info.uuid
        field.label = data_info.name
    //スイッチ
    } else if( data_info.type == "type_switch" ){
        field.key = data_info.uuid
        field.label = data_info.name
        //field.sortable = true
    //日付
    } else if( data_info.type == "type_date" ){
        field.key = data_info.uuid
        field.label = data_info.name
        //field.sortable = true
    //時刻
    } else if( data_info.type == "type_time" ){
        field.key = data_info.uuid
        field.label = data_info.name
        //field.sortable = true
    //日時
    } else if( data_info.type == "type_datetime" ){
        field.key = data_info.uuid
        field.label = data_info.name
        //field.sortable = true
    //写真
    } else if( data_info.type == "type_picture" ){
        field.key = data_info.uuid
        field.label = data_info.name
    //パスワード
    } else if( data_info.type == "type_password" ){
        field.key = data_info.uuid
        field.label = data_info.name
    //氏名
    } else if( data_info.type == "type_full_name" ){
        field.key = data_info.uuid
        field.label = data_info.name.join(" ")
        //field.sortable = true
    //電話番号
    } else if( data_info.type == "type_phone_number" ){
        field.key = data_info.uuid
        field.label = data_info.name
        //field.sortable = true
    //メールアドレス
    } else if( data_info.type == "type_mail_address" ){
        field.key = data_info.uuid
        field.label = data_info.name
        //field.sortable = true
    //プルダウン
    } else if( data_info.type == "type_pulldown" ){
        field.key = data_info.uuid
        field.label = data_info.name
        //field.sortable = true
    //URL
    } else if( data_info.type == "type_url" ){
        field.key = data_info.uuid
        field.label = data_info.name
        //field.sortable = true
    //マークダウン
    } else if( data_info.type == "type_markdown" ){
        field.key = data_info.uuid
        field.label = data_info.name
    //表
    } else if( data_info.type == "type_table" ){
        field.key = data_info.uuid
        field.label = data_info.name
    //ファイル
    } else if( data_info.type == "type_file" ){
        field.key = data_info.uuid
        field.label = data_info.name
    //サイン
    } else if( data_info.type == "type_sign" ){
        field.key = data_info.uuid
        field.label = data_info.name
    //ラベル
    } else if( data_info.type == "type_label" ){
        null;
    //参照リンク
    } else { //if( data_info.type == "type_link" ){
        null;
    }
    return field;
}
const set_body = (data_info) => {
    let item = {}
    for( let i=0;i<data_info.length;i++ ){
        if( !exclude_column(data_info[i]) ){
            item[data_info[i].uuid] = {}
            item[data_info[i].uuid].type = data_info[i].type
            //短いテキスト
            if( data_info[i].type == "type_short_text" ){
                item[data_info[i].uuid].data = data_info[i].value
            //長いテキスト
            } else if( data_info[i].type == "type_long_text" ){
                item[data_info[i].uuid].data = data_info[i].value
            //数値
            } else if( data_info[i].type == "type_numeric" ){
                item[data_info[i].uuid].data = data_info[i].value
            //単一選択
            } else if( data_info[i].type == "type_single_select" ){
                item[data_info[i].uuid].data = data_info[i].value
            //複数選択
            } else if( data_info[i].type == "type_multi_select" ){
                item[data_info[i].uuid].data = data_info[i].value.join(" ")
            //スイッチ
            } else if( data_info[i].type == "type_switch" ){
                item[data_info[i].uuid].data = data_info[i].value
            //日付
            } else if( data_info[i].type == "type_date" ){
                item[data_info[i].uuid].data = data_info[i].value
            //時刻
            } else if( data_info[i].type == "type_time" ){
                item[data_info[i].uuid].data = data_info[i].value
            //日時
            } else if( data_info[i].type == "type_datetime" ){
                item[data_info[i].uuid].data = data_info[i].value
            //写真
            } else if( data_info[i].type == "type_picture" ){
                item[data_info[i].uuid].data = data_info[i].value
            //パスワード
            } else if( data_info[i].type == "type_password" ){
                item[data_info[i].uuid].data = "********"
            //氏名
            } else if( data_info[i].type == "type_full_name" ){
                item[data_info[i].uuid].data = data_info[i].value.join(" ")
            //電話番号
            } else if( data_info[i].type == "type_phone_number" ){
                item[data_info[i].uuid].data = data_info[i].value
            //メールアドレス
            } else if( data_info[i].type == "type_mail_address" ){
                item[data_info[i].uuid].data = data_info[i].value
            //プルダウン
            } else if( data_info[i].type == "type_pulldown" ){
                item[data_info[i].uuid].data = data_info[i].value
            //URL
            } else if( data_info[i].type == "type_url" ){
                item[data_info[i].uuid].data = data_info[i].value
            //マークダウン
            } else if( data_info[i].type == "type_markdown" ){
                item[data_info[i].uuid].data = "---"
            //表
            } else if( data_info[i].type == "type_table" ){
                item[data_info[i].uuid].data = "---"
            //ファイル
            } else if( data_info[i].type == "type_file" ){
                item[data_info[i].uuid].data = data_info[i].value
            //サイン
            } else if( data_info[i].type == "type_sign" ){
                item[data_info[i].uuid].data = data_info[i].value
            //ラベル
            } else if( data_info[i].type == "type_label" ){
                null;
            //参照リンク
            } else { //if( data_info[i].type == "type_link" ){
                null;
            }
        }
    }
    return item;
}
const exclude_column = (data_info) => {
    if( props.exclude_columns == null ){
        return false
    }
    if( props.exclude_columns.includes(data_info.uuid) ){
        return true
    } else {
        return false
    }
}
const get_data = (value) => {
    if( typeof value == "object" ){
        return value.data
    }
    return "";
}
const is_picture = (value) => {
    if( typeof value == "object" ){
        //console.log("is_picture="+JSON.stringify(value))
        if( value.type == "type_picture" || value.type == "type_sign" ){
            return true
        }
    }
    return false
}
const get_picture = (value) => {
    if( typeof value == "object" ){
        if( value.type == "type_picture" ){
            //console.log("get_picture="+value.data)
            return value.data
        }
        if( value.type == "type_sign" ){
            //console.log("get_picture="+value.data)
            return value.data
        }
    }
    return ""
}
const is_file = (value) => {
    if( typeof value == "object" ){
        if( value.type == "type_file" ){
            //console.log("is_file="+JSON.stringify(value))
            return true
        }
    }
    return false
}
const get_file_name = (value) => {
    if( typeof value == "object" ){
        if( value.type == "type_file" ){
            if( Array.isArray(value.data) ){
                if( value.data[0].name !== undefined ){
                    let ret = ""
                    for( let i=0;i<value.data.length;i++ ){
                        ret = ret + value.data[i].name + " "
                    }
                    return ret;
                }
            }
        }
    }
    return "";
}
// -----------------------------------------------
// パブリック関数
// -----------------------------------------------
const get_selected_data = () => {
    for( let i=0;i<props.data_list.length;i++ ){
        if( sw_list_table.value.isRowSelected(i) ){
            return props.data_list[i]
        }
    }
    return null
}
defineExpose({
    get_selected_data
});
</script>

<style scoped>
.item-viewer {
    text-align: left;
    margin: 0px;
    padding: 4px;
}
</style>
      