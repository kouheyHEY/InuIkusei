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
        /** @type {object[]} これまでの表示コンテンツ履歴 */
        this.dispContentHist = [];

        // リスト形式か、文章形式か、選択可能形式か
        this.isList = isList;
        this.isLine = isLine;
        this.isMenu = isMenu;

        // 使用シーン
        this.scene = scene;
    }

    /**
     * 表示対象オブジェクトを追加する
     * @param {object} dispObj 表示対象のオブジェクト
     */
    addContent(dispObj) {
        // 表示対象オブジェクトを追加
        this.dispObjectList.push(dispObj);
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

    /**
     * 表示対象オブジェクトを追加する
     * @param {object[]} dispObj 表示対象のオブジェクトのリスト
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
     * 指定したインデックスの要素の子メニューがあれば取得する
     * @param {number} idx 子メニューを取得する要素のインデックス番号
     * @returns 子メニューのDispContent、遷移先メニュー無しの場合はnull
     */
    getChildContent(idx) {
        // 子メニューを取得する要素
        const choosedCtt = this.dispObjectList[idx];
        /** 現在の表示コンテンツのタイプ */
        const type = this.dispObjectType;

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
                    // 履歴がある場合は履歴を返す
                    const histObj = ObjectUtil.deepCopy(this.dispContentHist[this.dispContentHist.length - 1]);
                    return Object.assign(new DispContent(), histObj);
                }
            } else {
                if (type == C_COMMON.WINDOW_CONTENT_TYPE_TEXTLIST) {
                    // テキストリスト形式の場合、エラー
                    throw new Error(
                        '[DispContent]テキストリストは子メニューを取得できません。');
                }

                /** @type {DispContent} 子メニューのインスタンス */
                const childContent = new DispContent(false, true, true, this.dispObjectType, this.scene);

                if (type == C_COMMON.WINDOW_CONTENT_TYPE_MENU) {
                    // メニューリストの場合
                    if (
                        choosedCtt.getChildColId() == C_DB.CHILDCOLID_USEITEM ||
                        choosedCtt.getChildColId() == C_DB.CHILDCOLID_EQPITEM ||
                        choosedCtt.getChildColId() == C_DB.CHILDCOLID_SPITEM
                    ) {
                        // 子メニューがアイテムの場合、対象のアイテム一覧を取得
                        childContent.setContentType(C_COMMON.WINDOW_CONTENT_TYPE_ITEM);
                        const itemList = this.itemDao.getByType(C_DB.ITEMTYPE_USEITEM);
                        // 「戻る」を追加
                        itemList.push(C_COMMON.WINDOW_MENU_BACK);
                        // インスタンスにセット
                        childContent.addContentList(itemList);

                    } else if (choosedCtt.getChildColId() == C_DB.CHILDCOLID_SPRT) {
                        // 子メニューが味方キャラの場合、味方キャラ一覧を取得
                        childContent.setContentType(C_COMMON.WINDOW_CONTENT_TYPE_CHARA);
                        const charaList = this.charaSttDao.getByType(C_DB.CHARATYPE_SPRT);
                        // 「戻る」を追加
                        charaList.push(C_COMMON.WINDOW_MENU_BACK);
                        // インスタンスにセット
                        childContent.addContentList(charaList);
                    } else {
                        // 子メニューがそれ以外（メニュー）の場合
                        childContent.setContentType(C_COMMON.WINDOW_CONTENT_TYPE_MENU);
                        // メニュー一覧を取得しインスタンスにセット
                        childContent.addContentList(
                            this.menuDefDao.getMenuById(choosedCtt.getChildMenuId())
                        );
                    }
                } else if (type == C_COMMON.WINDOW_CONTENT_TYPE_ITEM) {
                    // アイテムリストの場合
                    // 子メニューのタイプをキャラリストに設定
                    childContent.setContentType(C_COMMON.WINDOW_CONTENT_TYPE_CHARA);
                    const charaList = this.charaSttDao.getByType(C_DB.CHARATYPE_SPRT);
                    // 「戻る」を追加
                    charaList.push(C_COMMON.WINDOW_MENU_BACK);
                    // インスタンスにセット
                    childContent.addContentList(charaList);
                } else if (type == C_COMMON.WINDOW_CONTENT_TYPE_CHARA) {
                    // キャラリストの場合
                    // nullを返す
                    childContent = null;
                }

                return childContent;
            }
        }
    }

    /** コンテンツを初期化する */
    initContent() {
        this.dispStringList = [];
        this.dispObjectList = [];
        this.dispObjectType = null;
        this.dispContentHist = [];

        this.isList = isList;
        this.isLine = isLine;
        this.isMenu = isMenu;
    }

}