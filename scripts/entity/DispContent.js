class DispContent {

    /**
     * ウインドウに表示する内容のエンティティ
     * @param {boolean} isList リストかどうか
     * @param {boolean} isLine 文章かどうか
     * @param {boolean} isMenu 選択可能かどうか
     * @param {number} type 表示コンテンツタイプ
     * @param {Phaser.Scene} scene 使用シーン
     */
    constructor(isList, isLine, isMenu, type, scene) {
        /** @type {string[]} 表示文字列 */
        this.dispStringList = [];
        /** @type {object[]} 表示対象のオブジェクト */
        this.dispObjectList = [];
        /** @type {number} 表示内容のタイプ */
        this.dispObjectType = type;
        /** @type {string[]} 表示内容の説明文 */
        this.dispDetailList = [];
        /** @type {object[]} これまでの表示コンテンツ履歴 オブジェクト形式 */
        this.dispContentHist = [];

        // リスト形式か、文章形式か、選択可能形式か
        this.isList = isList;
        this.isLine = isLine;
        this.isMenu = isMenu;

        // 使用シーン
        this.scene = scene;
    }

    /**
     * 表示対象オブジェクトを追加し、表示文字列、表示説明文を設定する
     * 説明文がない時は空文字を設定する
     * @param {object} dispObj 表示対象のオブジェクト
     */
    addContent(dispObj) {
        // 表示対象オブジェクトを追加
        this.dispObjectList.push(dispObj);
        if (typeof dispObj == 'string') {
            // 文字列の場合
            // 表示文字列をそのまま設定
            this.dispStringList.push(dispObj);
            this.dispDetailList.push('');
        } else if (typeof dispObj == 'object') {
            // オブジェクトの場合は細かく判定

            if (dispObj instanceof MenuDefModel) {
                // メニュー定義の場合
                // 表示文字列を設定
                this.dispStringList.push(dispObj.getMenuColName());
                this.dispDetailList.push(dispObj.getColDetail());
            } else if (dispObj instanceof ItemModel) {
                // アイテムの場合
                // 表示文字列を設定
                this.dispStringList.push(dispObj.getItemName());
                // アイテムの説明文を取得
                const itemDef = this.scene.itemDefDao.getById(dispObj.getItemId())[0];
                this.dispDetailList.push(itemDef.getItemDetail());
            } else if (dispObj instanceof CharaSttModel) {
                //　キャラの場合
                // 表示文字列を設定
                this.dispStringList.push(dispObj.getCharaName());
                this.dispDetailList.push('');
            }
        }
    }

    /**
     * 表示対象オブジェクトを追加する
     * @param {object[]} dispObjList 表示対象のオブジェクトのリスト
     */
    addContentList(dispObjList) {
        if (this.dispObjectList.length != 0) {
            // 空でない場合はエラー
            throw new Error('[DispContent]表示コンテンツが空ではないです。');
        }
        for (const dispObj of dispObjList) {
            this.addContent(dispObj);
        }
    }

    /**
     * 表示対象オブジェクトのタイプ
     * @param {number} type 表示対象オブジェクトのタイプ
     */
    setContentType(type) {
        this.dispObjectType = type;
    }

    /**
     * 表示内容の項目数
     */
    contentLength() {
        return this.dispObjectList.length;
    }

    /** 
     * 表示内容を履歴に保存する
     */
    archiveContent() {
        // 保存するオブジェクト
        const archiveObj = {
            dispObjectList: this.dispObjectList,
            dispStringList: this.dispStringList,
            dispDetailList: this.dispDetailList,
            dispObjectType: this.dispObjectType,
            isList: this.isList,
            isLine: this.isLine,
            isMenu: this.isMenu
        };

        // オブジェクトをディープコピーする
        const copyObj = ObjectUtil.deepCopy(archiveObj);

        // オブジェクトを履歴に保存する
        this.dispContentHist.push(copyObj);

        // 現在の値をリセットする
        this.initContent();
    }

    /** 表示内容を履歴から復元する */
    restoreContent() {
        // 履歴がない場合はエラー
        if (this.dispContentHist.length == 0) {
            throw new Error('[DispContent]履歴がありません。');
        }

        // 履歴から復元対象を取得
        Object.assign(this, this.dispContentHist.pop());
    }

    /**
     * 指定したインデックスの要素の子メニューがあれば取得する。
     * {dispObjectList: 子メニュー, dispContentType: 表示形式, isList, isLine, isMenu}
     * @param {number} idx 子メニューを取得する要素のインデックス番号
     * @returns 子メニューのオブジェクト、遷移先メニュー無しの場合はnull
     */
    getChildContent(idx) {
        // 子メニューを取得する要素
        const choosedCtt = this.dispObjectList[idx];
        /** 現在の表示コンテンツのタイプ */
        const type = this.dispObjectType;
        const childObj = {
            dispObjectList: [],
            dispObjectType: null,
            isList: false,
            isLine: true,
            isMenu: false,
        };

        if (type == C_COMMON.WINDOW_CONTENT_TYPE_LINE) {
            // 文章だった場合はエラー
            throw new Error(
                '[DispContent]文章コンテンツの子メニューは取得できません。');
        } else {
            // 表示コンテンツがリスト形式の場合

            if (choosedCtt == C_COMMON.WINDOW_MENU_BACK) {
                // 戻る選択肢の場合
                if (this.dispContentHist.length == 0) {
                    // 履歴がない場合はエラー
                    throw new Error(
                        '[DispContent]子メニューを取得できません。');
                } else {
                    // 履歴がある場合は履歴のオブジェクトを返す
                    return Object.assign(childObj, this.dispContentHist[idx]);
                }
            } else {
                if (type == C_COMMON.WINDOW_CONTENT_TYPE_TEXTLIST) {
                    // テキストリスト形式の場合、エラー
                    throw new Error(
                        '[DispContent]テキストリストは子メニューを取得できません。');
                }

                if (type == C_COMMON.WINDOW_CONTENT_TYPE_MENU) {
                    // メニューリストの場合
                    if (
                        choosedCtt.getChildColId() == C_DB.CHILDCOLID_USEITEM ||
                        choosedCtt.getChildColId() == C_DB.CHILDCOLID_EQPITEM ||
                        choosedCtt.getChildColId() == C_DB.CHILDCOLID_SPITEM
                    ) {
                        // 子メニューがアイテムの場合、対象のアイテム一覧を取得
                        const itemList = this.itemDao.getByType(C_DB.ITEMTYPE_USEITEM);
                        // 「戻る」を追加
                        itemList.push(C_COMMON.WINDOW_MENU_BACK);
                        childObj.dispObjectList = itemList;

                        childObj.dispObjectType = C_COMMON.WINDOW_CONTENT_TYPE_ITEM;
                        childObj.isList = true;
                        childObj.isLine = false;
                        childObj.isMenu = true;
                        return childObj;

                    } else if (choosedCtt.getChildColId() == C_DB.CHILDCOLID_SPRT) {
                        // 子メニューが味方キャラの場合、味方キャラ一覧を取得
                        const charaList = this.charaSttDao.getByType(C_DB.CHARATYPE_SPRT);
                        // 「戻る」を追加
                        charaList.push(C_COMMON.WINDOW_MENU_BACK);
                        childObj.dispObjectList = charaList;

                        childObj.dispObjectType = C_COMMON.WINDOW_CONTENT_TYPE_CHARA;
                        childObj.isList = true;
                        childObj.isLine = false;
                        childObj.isMenu = true;
                        return childObj;
                    } else {
                        // 子メニューがそれ以外（メニュー）の場合
                        // メニュー一覧を取得
                        childObj.dispObjectList = this.scene.menuDefDao.getMenuById(choosedCtt.getChildMenuId());

                        childObj.dispObjectType = C_COMMON.WINDOW_CONTENT_TYPE_MENU;
                        childObj.isList = true;
                        childObj.isLine = false;
                        childObj.isMenu = true;
                        return childObj;

                    }
                } else if (type == C_COMMON.WINDOW_CONTENT_TYPE_ITEM) {
                    // アイテムリストの場合
                    // 子メニューのタイプをキャラリストに設定
                    const charaList = this.charaSttDao.getByType(C_DB.CHARATYPE_SPRT);
                    // 「戻る」を追加
                    charaList.push(C_COMMON.WINDOW_MENU_BACK);
                    childObj.dispObjectList = charaList;

                    childObj.dispObjectType = C_COMMON.WINDOW_CONTENT_TYPE_CHARA;
                    childObj.isList = true;
                    childObj.isLine = false;
                    childObj.isMenu = true;
                    return childObj;
                } else if (type == C_COMMON.WINDOW_CONTENT_TYPE_CHARA) {
                    // キャラリストの場合
                    // nullを返す
                    childContent = null;
                }

                return childContent;
            }
        }
    }

    /**
     * 子メニューを取得し、そのまま設定する
     * @param {number} idx 子メニューを取得するメニューのインデックス
     */
    setChildContent(idx) {
        /** @type {object} */
        const childObj = this.getChildContent(idx);
        // 履歴を保存する
        this.archiveContent();

        this.dispObjectType = childObj.dispObjectType;
        this.addContentList(childObj.dispObjectList);
        this.isLine = childObj.isLine;
        this.isList = childObj.isList;
        this.isMenu = childObj.isMenu;

    }

    /**
     * 項目の説明を表示する
     * @param {number} idx 説明を表示したいコンテンツのインデックス番号
     */
    getDetail(idx) {
        const dispObj = this.dispObjectList[idx];
        if (typeof dispObj == 'string') {
            // 文字列の場合
            // 表示文字列をそのまま設定
            this.dispStringList.push(dispObj);
        } else if (typeof dispObj == 'object') {
            // オブジェクトの場合は細かく判定

            if (dispObj instanceof MenuDefModel) {
                // メニュー定義の場合
                // 表示文字列を設定
                this.dispStringList.push(dispObj.getMenuColName());
            } else if (dispObj instanceof ItemModel) {
                // アイテムの場合
                // 表示文字列を設定
                this.dispStringList.push(dispObj.getItemName());
            } else if (dispObj instanceof CharaSttModel) {
                //　キャラの場合
                // 表示文字列を設定
                this.dispStringList.push(dispObj.getCharaName());
            }
        }
    }

    /** コンテンツを初期化する（履歴は初期化しない） */
    initContent() {
        this.dispStringList = [];
        this.dispObjectList = [];
        this.dispObjectType = null;
        this.dispDetailList = [];
    }
}