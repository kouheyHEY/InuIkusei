const C_DB = {
    /** テーブル名 */
    TABLE_NAME: {
        /** テーブル名 キャラステータステーブル */
        CHARA_STT: "charaSttTable",
        /** テーブル名 テキストテーブル */
        TEXT: "textTable",
        /** テーブル名 メニュー定義テーブル */
        MENU_DEF: "menuDefTable",
        /** テーブル名 進行状況テーブル */
        PROG_STT: "progSttTable",
    },

    /** 項目名 キャラステータステーブル */
    COL_NAME_CHARA_STT: {
        /** キャラID */
        CHARA_ID: "charaId",
        /** キャラ名 */
        CHARA_NAME: "charaName",
        /** 攻撃 */
        ATK: "atk",
        /** 防御 */
        DEF: "def",
        /** 体力 */
        HP: "hp",
        /** やる気 */
        YP: "yp",
        /** 運 */
        LUK: "luk",
    },

    /** 項目名 テキストテーブル */
    COL_NAME_TEXT: {
        /** テキストID */
        TEXTID: "textId",
        /** テキスト本文 */
        TEXT: "text",
        /** 前テキストID */
        PREVTEXTID: "prevTextId",
        /** 次テキストID */
        NEXTTEXTID: "nextTextId",
    },

    /** 項目名 メニュー定義テーブル */
    COL_NAME_MENU_DEF: {
        /** メニューID */
        MENUID: "menuId",
        /** 項目ID */
        MENUCOLID: "menuColId",
        /** メニュー名 */
        MENUNAME: "menuName",
        /** 項目名 */
        MENUCOLNAME: "menuColName",
        /** 親メニューID */
        PARENTMENUID: "parentMenuId",
        /** 親項目ID */
        PARENTCOLID: "parentColId",
        /** 子メニューID */
        CHILDMENUID: "childMenuId",
        /** 子項目ID */
        CHILDCOLID: "childColId",
        /** 項目詳細 */
        COLDETAIL: "colDetail",

    },

    /** メニューID タイトル */
    MENU_ID_TITLE: 0,
    /** メニューID キャラステータス */
    MENU_ID_CHARA_STT: 1,
    /** メニューID 育成メニュー */
    MENU_ID_IKUSEI_MENU: 2,
    /** メニューID 外出メニュー */
    MENU_ID_OUT_MENU: 3,
    /** メニューID 通販 */
    MENU_ID_SHOP: 4,
    /** メニューID 育成2 */
    MENU_ID_IKUSEI_2: 5,
    /** メニューID 鍛錬 */
    MENU_ID_TRA: 6,
    /** メニューID 生活 */
    MENU_ID_LIFE: 7,

    /** 項目名 進行状況テーブル */
    COL_NAME_PROG_STT: {
        /** フラグID */
        FLGID: "FlgId",
        /** フラグ名 */
        FLGNAME: "FlgName",
        /** フラグ状況 */
        FLGSTT: "FlgStt",

    },

}