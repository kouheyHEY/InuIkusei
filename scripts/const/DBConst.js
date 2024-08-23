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
        /* テーブル名 アイテムテーブル */
        ITEM: "itemTable"
    },

    /** 項目名 CharaSttテーブル */
    COL_NAME_CHARASTT: {
        /** キャラID */
        CHARAID: "charaId",
        /** キャラ名 */
        CHARANAME: "charaName",
        /** 最大体力 */
        MAXHP: "maxHp",
        /** 体力 */
        HP: "hp",
        /** 最大やる気 */
        MAXYP: "maxYp",
        /** やる気 */
        YP: "yp",
        /** 運 */
        LUK: "luk",
        /** 攻撃力 */
        ATK: "atk",
        /** 防御力 */
        DEF: "def",
        /** 装備1id */
        EQP1: "eqp1",
        /** 装備2id */
        EQP2: "eqp2",
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

    /** 項目名 Itemテーブル */
    COL_NAME_ITEM: {
        /** アイテムID */
        ITEMID: "itemId",
        /** アイテム名 */
        ITEMNAME: "itemName",
        /** アイテム種別 */
        ITEMTYPE: "itemType",
        /** 効果対象項目ID */
        TARGETCOLID: "targetColId",
        /** 効果量 */
        EFFECTVAL: "effectVal",
    },


}