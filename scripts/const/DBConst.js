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
        /* テーブル名 アイテム定義テーブル */
        ITEM_DEF: "itemDefTable",
        /* テーブル名 アイテムテーブル */
        ITEM: "itemTable"
    },

    /** 項目名 CharaSttテーブル */
    COL_NAME_CHARASTT: {
        /** キャラID */
        CHARAID: "charaId",
        /** キャラタイプ */
        CHARATYPE: "charaType",
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


    /** キャラID 仲間1 */
    CHARAID_SPRT1: 0,
    /** キャラID 仲間2 */
    CHARAID_SPRT2: 1,

    /** キャラタイプ 仲間 */
    CHARATYPE_SPRT: 1,

    /** キャラ名 未登場 */
    CHARANAME_NULL: "---",

    /** キャラ装備 なし */
    EQP_NULL: '-1',

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

    /** 所持消費アイテム一覧の子項目ID */
    CHILDCOLID_USEITEM: '-1',
    /** 所持装備アイテム一覧の子項目ID */
    CHILDCOLID_EQPITEM: '-2',
    /** 所持特別アイテム一覧の子項目ID */
    CHILDCOLID_SPITEM: '-3',
    /** 味方キャラ一覧の子項目ID */
    CHILDCOLID_SPRT: '-4',

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

    /** 項目ID 装備1 */
    COL_ID_EQP1: 6,
    /** 項目ID 装備2 */
    COL_ID_EQP2: 7,

    /** 項目名 進行状況テーブル */
    COL_NAME_PROG_STT: {
        /** フラグID */
        FLGID: "FlgId",
        /** フラグ名 */
        FLGNAME: "FlgName",
        /** フラグ状況 */
        FLGSTT: "FlgStt",

    },

    /** 項目名 ItemDefテーブル */
    COL_NAME_ITEMDEF: {
        /** アイテムID */
        ITEMID: "itemId",
        /** アイテム名 */
        ITEMNAME: "itemName",
        /** アイテム種別 */
        ITEMTYPE: "itemType",
        /** 効果対象項目1 */
        TARGETCOL1: "targetCol1",
        /** 効果量1 */
        EFFECTVAL1: "effectVal1",
        /** 効果対象項目2 */
        TARGETCOL2: "targetCol2",
        /** 効果量2 */
        EFFECTVAL2: "effectVal2",
        /** 効果対象項目3 */
        TARGETCOL3: "targetCol3",
        /** 効果量3 */
        EFFECTVAL3: "effectVal3",
        /** 効果対象項目4 */
        TARGETCOL4: "targetCol4",
        /** 効果量4 */
        EFFECTVAL4: "effectVal4",
        /** 使用アイテムフラグ */
        USEITEMFLG: "useItemFlg",
        /** アイテム詳細 */
        ITEMDETAIL: "itemDetail",
    },

    /** アイテムの効果対象 攻撃 */
    TARGET_ATK: "atk",
    /** アイテムの効果対象 防御 */
    TARGET_DEF: "def",
    /** アイテムの効果対象 運 */
    TARGET_LUK: "luk",
    /** アイテムの効果対象 与ダメージ */
    TARGET_ATKDMG: "atkdmg",
    /** アイテムの効果対象 受ダメージ */
    TARGET_DEFDMG: "defdmg",
    /** アイテムの効果対象 体力 */
    TARGET_HP: "hp",
    /** アイテムの効果対象 やる気 */
    TARGET_YP: "yp",
    /** アイテムの効果対象 最大体力 */
    TARGET_MAXHP: "maxHp",
    /** アイテムの効果対象 最大やる気 */
    TARGET_MAXYP: "maxYp",

    /** アイテム効果対象項目の最大数 */
    TARGETCOLNUM: 4,

    /** 項目名 Itemテーブル */
    COL_NAME_ITEM: {
        /** アイテムID */
        ITEMID: "itemId",
        /** アイテム名 */
        ITEMNAME: "itemName",
        /** アイテム種別 */
        ITEMTYPE: "itemType",
        /** 装備キャラID */
        EQPCHARAID: "eqpCharaId",
    },

    /** 所持消費アイテムのタイプ */
    ITEMTYPE_USEITEM: '1',
    /** 所持装備アイテムのタイプ */
    ITEMTYPE_EQPITEM: '2',
    /** 所持特別アイテムのタイプ */
    ITEMTYPE_SPITEM: '3',
}