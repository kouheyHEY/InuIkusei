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
     * 表示対象オブジェクトを引数のオブジェクトから設定する
     * @param {object} cttObj 表示内容のオブジェクト
     */
    addContentListFromObject(cttObj) {
        this.dispObjectType = cttObj.dispObjectType;
        this.isLine = cttObj.isLine;
        this.isList = cttObj.isList;
        this.isMenu = cttObj.isMenu;
        this.addContentList(cttObj.dispObjectList);
    }

    /**
     * 表示コンテンツの表示種類をセットする
     * @param {boolean} isList リストかどうか
     * @param {boolean} isLine 文章かどうか
     * @param {boolean} isMenu 選択可能かどうか
     */
    setContentProp(isList, isLine, isMenu) {
        this.isList = isList;
        this.isLine = isLine;
        this.isMenu = isMenu;
    }

    /**
     * 表示コンテンツを表すオブジェクトを作成する
     * @param {number} objType 表示オブジェクトのタイプ
     * @param {object[]} objList 表示オブジェクトのリスト
     * @param {boolean} isList リスト形式か
     * @param {boolean} isLine 文章形式化
     * @param {boolean} isMenu 選択可能形式か
     * @returns 表示コンテンツのオブジェクト
     */
    makeCttObj(objType, objList, isList, isLine, isMenu) {
        return {
            dispObjectList: objList,
            dispObjectType: objType,
            isList: isList,
            isLine: isLine,
            isMenu: isMenu,
        };
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
     * @returns 子メニューのオブジェクト、遷移先メニュー無し（戻る押下）の場合は-1、そうでない場合は1
     */
    getChildContent(idx) {
        // 子メニューを取得する要素
        const choosedCtt = this.dispObjectList[idx];
        // 現在の表示コンテンツのタイプ
        const type = this.dispObjectType;
        // 取得する子メニュー
        let childObj = null;

        if (type == C_COMMON.WINDOW_CONTENT_TYPE_LINE) {
            // 文章だった場合はエラー
            throw new Error(
                '[DispContent]文章コンテンツの子メニューは取得できません。');
        } else {
            // 表示コンテンツがリスト形式の場合

            if (choosedCtt == C_COMMON.WINDOW_MENU_BACK) {
                // 戻る選択肢の場合
                if (this.dispContentHist.length == 0) {
                    // 履歴がない場合は-1を返す
                    childObj = C_COMMON.CHILDMENU_NULL_BACK;
                } else {
                    // 履歴がある場合は履歴のオブジェクトを返す
                    childObj = Object.assign({}, this.dispContentHist[idx]);
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
                        const itemList = this.scene.itemDao.getByType(-choosedCtt.getChildColId());
                        // 「戻る」を追加
                        itemList.push(C_COMMON.WINDOW_MENU_BACK);

                        childObj = this.makeCttObj(C_COMMON.WINDOW_CONTENT_TYPE_ITEM, itemList, true, false, true);

                    } else if (choosedCtt.getChildColId() == C_DB.CHILDCOLID_SPRT) {
                        // 子メニューが味方キャラの場合、味方キャラ一覧を取得
                        const charaList = this.scene.charaSttDao.getByType(C_DB.CHARATYPE_SPRT);
                        // 「戻る」を追加
                        charaList.push(C_COMMON.WINDOW_MENU_BACK);

                        childObj = this.makeCttObj(C_COMMON.WINDOW_CONTENT_TYPE_CHARA, charaList, true, false, true);
                    } else {
                        // 子メニューがそれ以外（メニュー）の場合
                        childObj = this.makeCttObj(C_COMMON.WINDOW_CONTENT_TYPE_MENU, this.scene.menuDefDao.getMenuById(choosedCtt.getChildMenuId()), true, false, true);

                    }
                } else if (type == C_COMMON.WINDOW_CONTENT_TYPE_ITEM) {
                    // アイテムリストの場合
                    // 子メニューのタイプをキャラリストに設定
                    const charaList = this.scene.charaSttDao.getByType(C_DB.CHARATYPE_SPRT);
                    // 「戻る」を追加
                    charaList.push(C_COMMON.WINDOW_MENU_BACK);

                    childObj = this.makeCttObj(C_COMMON.WINDOW_CONTENT_TYPE_CHARA, charaList, true, false, true);
                } else if (type == C_COMMON.WINDOW_CONTENT_TYPE_CHARA) {
                    // キャラリストの場合、1を返す
                    childObj = C_COMMON.CHILDMENU_NULL_NEXT;
                }
            }
        }
        return childObj;
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