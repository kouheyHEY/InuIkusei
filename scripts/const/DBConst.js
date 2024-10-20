const C_DB = {
    /** テーブル名 */
    TABLE_NAME: {
        /** テーブル名 メニューマスタ */
        M_MENU: "MstMenu",
        /** テーブル名 敵キャラマスタ */
        M_ENEMY: "MstEnemy",
        /** テーブル名 テキストマスタ */
        M_TEXT: "MstText",
        /** テーブル名 アイテムマスタ */
        M_ITEM: "MstItem",
        /** テーブル名 フィールドマスタ */
        M_FIELD: "MstFiled",
        /** テーブル名 アクションマスタ */
        M_ACTION: "MstAction",
        /** テーブル名 所持アイテムテーブル */
        T_ITEM: "TblItem",
        /** テーブル名 味方キャラテーブル */
        T_SPT_CHARA: "TblSptChara",
        /** テーブル名 敵キャラテーブル */
        T_ENEMY: "TblEnemy",
        /** テーブル名 アクションテーブル */
        T_ACTION: "TblAction",
    },

    /** 項目名 共通 ID */
    COLNAME_COM_ID: "id",
    /** 項目名 共通 名前 */
    COLNAME_COM_NAME: "name",
    /** 項目名 共通 タイプ */
    COLNAME_COM_TYPE: "type",
    /** 項目名 共通 説明 */
    COLNAME_COM_EXPL: "expl",

    /** メニューマスタ */
    M_MENU: {
        /** メニューID タイトル */
        MENUID_TITLE: 1,
        /** メニューID 育成画面 */
        MENUID_IKUSEISCENE: 2,
        /** メニューID バトル画面 */
        MENUID_BATTLESCENE: 7,

        /** 子メニューID 出発 */
        CHILDMENUID_TOBATTLE: 0,
        /** 子メニューID 行き先 */
        CHILDMENUID_FIELD: -1,
        /** 子メニューID 鍛練メニュー */
        CHILDMENUID_TRAINING: -2,
        /** 子メニューID 生活メニュー */
        CHILDMENUID_LIFE: -3,
        /** 子メニューID 消費アイテム */
        CHILDMENUID_USEITEM: -4,
        /** 子メニューID 装備アイテム */
        CHILDMENUID_EQPITEM: -5,
        /** 子メニューID 特別アイテム */
        CHILDMENUID_SPITEM: -6,
        /** 子メニューID バトル行動メニュー */
        CHILDMENUID_BATTLEACTION: -7,
        /** 子メニューID 所持アイテム */
        CHILDMENUID_BAGITEM: -8,
        /** 子メニューID 敵キャラ */
        CHILDMENUID_ENEMY: -9,

        /** 項目ID はじめから */
        COLID_START: 1,
        /** 項目ID つづきから */
        COLID_CONTINUE: 2,
        /** 項目ID クレジット */
        COLID_CREDIT: 3,
        /** 項目ID おわる */
        COLID_END: 4,
    },

    /** 項目名 メニューID */
    COLNAME_MENUID: "menuId",
    /** 項目名 項目ID */
    COLNAME_COLID: "colId",

    /** アクションマスタ */
    M_ACTION: {
        /** 鍛練アクション */
        TYPE_TRAINING: 1,
        /** 生活アクション */
        TYPE_LIFE: 2,
        /** 戦闘アクション */
        TYPE_BATTLEACT: 3,
    },

    /** 味方キャラテーブル */
    T_SPT_CHARA: {
        /** キャラID 仲間1 */
        ID_SPRT1: 1,
        /** キャラID 仲間2 */
        ID_SPRT2: 2,

        /** キャラ名 未登場 */
        NAME_NULL: "-",
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

    /** アイテムテーブル */
    T_ITEM: {
        /** 所持消費アイテムのタイプ */
        TYPE_USEITEM: '1',
        /** 所持装備アイテムのタイプ */
        TYPE_EQPITEM: '2',
        /** 所持特別アイテムのタイプ */
        TYPE_SPITEM: '3',
    },
}