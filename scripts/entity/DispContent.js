class DispContent {

    /**
     * 表示内容オブジェクトの型定義
     * @typedef {Object} DispContentObj
     * @property {string[]} expl - 説明
     * @property {object[] | null} obj - 表示内容
     * @property {number} dispObjType - 表示内容のタイプ
     * @property {string[]} dispStr - 表示する文字列
     * @property {boolean} isList - リスト形式の表示かどうか
     * @property {boolean} isLine - 1行形式の表示かどうか
     * @property {boolean} isMenu - メニュー形式の表示かどうか
     */

    /**
     * ウインドウに表示する内容のエンティティ
     * @param {boolean} isList リストかどうか
     * @param {boolean} isLine 文章かどうか
     * @param {boolean} isMenu 選択可能かどうか
     * @param {number} type 表示コンテンツタイプ
     * @param {Phaser.Scene} scene 使用シーン
     */
    constructor(isList, isLine, isMenu, type, scene) {

        /** @type {DispContentObj[]} 表示コンテンツの履歴 */
        this.dispContentObjHist = [];

        /** @type {DispContentObj} */
        this.dispContentObj = {
            expl: [],
            obj: [],
            dispObjType: type,
            dispStr: [],
            isList: isList,
            isLine: isLine,
            isMenu: isMenu,
        };

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
        this.dispContentObj.obj.push(dispObj);
        if (typeof dispObj == 'string') {
            // 文字列の場合
            // 表示文字列をそのまま設定
            this.dispContentObj.dispStr.push(dispObj);
            this.dispContentObj.expl.push('');
        } else if (typeof dispObj == 'object') {
            // オブジェクトの場合
            /** @type {BaseModel} */
            const obj = dispObj;

            // 表示名と説明をセット
            this.dispContentObj.dispStr.push(obj.getName());
            this.dispContentObj.expl.push(obj.getExpl());
        }
    }

    /**
     * 表示対象オブジェクトを追加する
     * @param {object[]} dispObjList 表示対象のオブジェクトのリスト
     */
    addContentList(dispObjList) {
        if (this.dispObjectList.length != 0) {
            // 空でない場合はエラー
            throw new Error('[DispContent.addContentList]既に表示コンテンツが設定済みです。');
        }
        for (const dispObj of dispObjList) {
            this.addContent(dispObj);
        }
    }

    /**
     * 表示コンテンツの表示種類をセットする
     * @param {boolean} isList リストかどうか
     * @param {boolean} isLine 文章かどうか
     * @param {boolean} isMenu 選択可能かどうか
     */
    setDispType(isList, isLine, isMenu) {
        this.dispContentObj.isList = isList;
        this.dispContentObj.isLine = isLine;
        this.dispContentObj.isMenu = isMenu;
    }

    /**
     * 表示オブジェクトのタイプをセットする
     * @param {number} type 表示オブジェクトのタイプ
     */
    setObjType(type) {
        this.dispContentObj.dispObjType = type;
    }

    /**
     * 表示コンテンツを表すオブジェクトを作成する
     * @param {number} objType 表示オブジェクトのタイプ
     * @param {object[]} objList 表示オブジェクトのリスト
     * @param {boolean} isList リスト形式か
     * @param {boolean} isLine 文章形式化
     * @param {boolean} isMenu 選択可能形式か
     * @returns {DispContentObj} 表示コンテンツのオブジェクト
     */
    createContentObj(objType, objList, isList, isLine, isMenu) {
        const contentObj = {
            expl: [],
            obj: objList,
            dispObjType: objType,
            dispStr: [],
            isList: isList,
            isLine: isLine,
            isMenu: isMenu,
        };

        for (const obj of objList) {
            if (typeof obj == 'string') {
                // 文字列の場合
                // 表示文字列をそのまま設定
                contentObj.dispStr.push(obj);
                contentObj.expl.push('');
            } else {
                // 文字列以外の場合
                if (obj instanceof BaseModel) {
                    if (obj instanceof MstMenuModel) {
                        // メニューマスタの場合
                        // 表示名と説明をセット
                        contentObj.dispStr.push(obj.colName);
                        contentObj.expl.push(obj.expl);
                    } else {
                        // それ以外の場合
                        // 表示名と説明をセット
                        contentObj.dispStr.push(obj.name);
                        contentObj.expl.push(obj.expl);
                    }
                }
            }
        }

        return contentObj;
    }

    /** 
     * 表示内容を履歴に保存する
     * @param {boolean} isReset 履歴を保存後、現在の表示を削除するかどうか
     */
    archiveContent(isReset) {
        // オブジェクトをディープコピーする
        const copyObj = ObjectUtil.deepCopy(this.dispContentObj);

        // オブジェクトを履歴に保存する
        this.dispContentObjHist.push(copyObj);

        if (isReset) {
            // 現在の値をリセットする
            this.initContent();
        }
    }

    /** 表示内容を履歴から復元する */
    restoreContent() {
        // 履歴がない場合はエラー
        if (this.dispContentObjHist.length == 0) {
            throw new Error('[DispContent.restoreContent]履歴がありません。');
        }

        // 履歴から復元対象を取得し、セット
        Object.assign(this.dispContentObj, this.dispContentObjHist.pop());
    }

    /**
     * 指定したインデックスの要素の子メニューがあれば取得する。
     * @param {number} idx 子メニューを取得する要素のインデックス番号
     * @returns {DispContentObj} 子メニューのオブジェクト、遷移先メニュー無し（戻る押下）の場合は-1、そうでない場合は1
     */
    getChildContent(idx) {
        if (idx < 0 || idx >= this.dispContentObj.obj.length) {
            throw new Error('[DispContent.getChildContent]インデックスが不正です。');
        }

        // 子メニューを取得する要素
        const choosedCtt = this.dispContentObj.obj[idx];
        // 現在の表示コンテンツのタイプ
        const type = this.dispContentObj.dispObjType;
        /** @type {DispContentObj} 取得する子メニュー */
        let childObj = null;

        if (type == C_COMMON.WINDOW_CONTENT_TYPE_LINE) {
            // 文章だった場合はエラー
            throw new Error(
                '[DispContent.getChildContent]文章コンテンツの子メニューは取得できません。');
        } else {
            // 表示コンテンツがリスト形式の場合
            if (choosedCtt == C_COMMON.WINDOW_MENU_BACK) {
                // 戻る選択肢の場合
                if (this.dispContentObjHist.length == 0) {
                    // 履歴がない場合は-1を返す
                    childObj = C_COMMON.CHILDMENU_NULL_BACK;
                } else {
                    // 履歴がある場合は履歴のオブジェクトを返す
                    childObj = ObjectUtil.deepCopy(this.dispContentObjHist[idx]);
                }
            } else {
                if (type == C_COMMON.WINDOW_CONTENT_TYPE_TEXTLIST) {
                    // テキストリスト形式の場合、エラー
                    throw new Error(
                        '[DispContent.getChildContent]テキストリストは子メニューを取得できません。');
                } else if (type == C_COMMON.WINDOW_CONTENT_TYPE_MENU) {
                    // メニューリストの場合
                    if (
                        choosedCtt.getChildMenuId() == C_DB.CHILDMENUID_USEITEM ||
                        choosedCtt.getChildMenuId() == C_DB.CHILDMENUID_EQPITEM ||
                        choosedCtt.getChildMenuId() == C_DB.CHILDMENUID_SPITEM
                    ) {
                        // 子メニューがアイテムの場合、対象のアイテム一覧を取得
                        const itemList = this.scene.tblItemDao.getByType(-choosedCtt.getChildMenuId());
                        // 「戻る」を追加
                        itemList.push(C_COMMON.WINDOW_MENU_BACK);
                        // 子メニューを設定
                        childObj = this.createContentObj(C_COMMON.WINDOW_CONTENT_TYPE_ITEM, [], true, false, true);

                    } else if (choosedCtt.getChildMenuId() == C_DB.CHILDMENUID_SPRT) {
                        // 子メニューが味方キャラの場合、味方キャラ一覧を取得
                        const charaList = this.scene.tblSptCharaDao.getAll();
                        // 「戻る」を追加
                        charaList.push(C_COMMON.WINDOW_MENU_BACK);
                        // 子メニューを設定
                        childObj = this.createContentObj(C_COMMON.WINDOW_CONTENT_TYPE_CHARA, charaList, true, false, true);
                    } else {
                        // 子メニューがそれ以外（メニュー）の場合
                        childObj = this.createContentObj(C_COMMON.WINDOW_CONTENT_TYPE_MENU, this.scene.MstMenuDao.getByMenuId(choosedCtt.getChildMenuId()), true, false, true);

                    }
                } else if (type == C_COMMON.WINDOW_CONTENT_TYPE_ITEM) {
                    // アイテムリストの場合
                    // 子メニューのタイプをキャラリストに設定
                    const charaList = this.scene.tblSptCharaDao.getAll();
                    // 「戻る」を追加
                    charaList.push(C_COMMON.WINDOW_MENU_BACK);
                    // 子メニューを設定
                    childObj = this.createContentObj(C_COMMON.WINDOW_CONTENT_TYPE_CHARA, charaList, true, false, true);
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
        // 履歴を保存する
        this.archiveContent(false);
        /** @type {DispContentObj} */
        this.dispContentObj = ObjectUtil.deepCopy(this.getChildContent(idx));
    }

    /** コンテンツを初期化する（シーン設定と履歴は初期化しない） */
    initContent() {
        this.dispContentObj = {
            expl: [],
            obj: [],
            dispObjType: C_COMMON.WINDOW_CONTENT_TYPE_LINE,
            dispStr: [],
            isList: false,
            isLine: true,
            isMenu: false,
        };
    }
}