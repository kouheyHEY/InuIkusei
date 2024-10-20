class DispContent {

    /**
     * 表示内容オブジェクトの型定義
     * @typedef {Object} DispContentObj
     * @property {string[]} expl - 説明
     * @property {object[] | null} obj - 表示内容
     * @property {number} dispObjType - 表示内容のタイプ
     * @property {string[]} dispStr - 表示する文字列
     * @property {number} choosedIdx - 選択した内容のインデックス
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
            choosedIdx: 0,
            isList: isList,
            isLine: isLine,
            isMenu: isMenu,
        };

        // 使用シーン
        this.scene = scene;
    }

    /** @type {string[]} */
    get expl() { return this.dispContentObj.expl; }
    set expl(value) { this.dispContentObj.expl = value; }

    /** @type {obect[]} */
    get obj() { return this.dispContentObj.obj; }
    set obj(value) { this.dispContentObj.obj = value; }

    /** @type {number} */
    get dispObjType() { return this.dispContentObj.dispObjType; }
    set dispObjType(value) { this.dispContentObj.dispObjType = value; }

    /** @type {string[]} */
    get dispStr() { return this.dispContentObj.dispStr; }
    set dispStr(value) { this.dispContentObj.dispStr = value; }

    /** @type {boolean} */
    get isList() { return this.dispContentObj.isList; }
    set isList(value) { this.dispContentObj.isList = value; }

    /** @type {boolean} */
    get isLine() { return this.dispContentObj.isLine; }
    set isLine(value) { this.dispContentObj.isLine = value; }

    /** @type {boolean} */
    get isMenu() { return this.dispContentObj.isMenu; }
    set isMenu(value) { this.dispContentObj.isMenu = value; }

    /**
     * 表示対象オブジェクトを追加し、表示文字列、表示説明文を設定する
     * 説明文がない時は空文字を設定する
     * @param {object} dispObj 表示対象のオブジェクト
     */
    addContent(dispObj) {
        this.dispContentObj.obj.push(dispObj);
        const { dispStr, expl } = this.getDisplayInfo(dispObj);
        this.dispContentObj.dispStr.push(dispStr);
        this.dispContentObj.expl.push(expl);
    }

    /**
     * 表示コンテンツを表すオブジェクトを作成する
     * @param {number} objType 表示オブジェクトのタイプ
     * @param {object[]} objList 表示オブジェクトのリスト
     * @param {boolean} isList リスト形式か
     * @param {boolean} isLine 文章形式か
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
            const { dispStr, expl } = this.getDisplayInfo(obj);
            contentObj.dispStr.push(dispStr);
            contentObj.expl.push(expl);
        }
        return contentObj;
    }

    /**
     * 表示対象オブジェクトを追加する
     * @param {object[]} dispObjList 表示対象のオブジェクトのリスト
     */
    addContentList(dispObjList) {
        if (this.dispContentObj.obj.length !== 0) {
            throw new Error('[DispContent.addContentList]既に表示コンテンツが設定済みです。');
        }
        dispObjList.forEach(dispObj => this.addContent(dispObj));
    }

    /**
     * オブジェクトから表示情報を取得する
     * @param {object} obj 表示対象のオブジェクト
     * @returns {{dispStr: string, expl: string}} 表示文字列と説明文
     * @private
     */
    getDisplayInfo(obj) {
        if (typeof obj === 'string') {
            return { dispStr: obj, expl: '' };
        } else if (obj instanceof BaseModel) {
            if (obj instanceof MstMenuModel) {
                return { dispStr: obj.colName, expl: obj.expl };
            } else {
                return { dispStr: obj.name, expl: obj.expl };
            }
        }
        return { dispStr: '', expl: '' };
    }

    /**
     * 表示コンテンツの表示種類をセットする
     * @param {boolean} isList リストかどうか
     * @param {boolean} isLine 文章かどうか
     * @param {boolean} isMenu 選択可能かどうか
     */
    setDispType(isList, isLine, isMenu) {
        Object.assign(this.dispContentObj, { isList, isLine, isMenu });
    }

    /**
     * 表示オブジェクトのタイプをセットする
     * @param {number} type 表示オブジェクトのタイプ
     */
    setObjType(type) {
        this.dispContentObj.dispObjType = type;
    }

    /** 
     * 表示内容を履歴に保存する
     * @param {number} index 選択した要素
     * @param {boolean} isReset 履歴を保存後、現在の表示を削除するかどうか
     */
    archiveContent(index, isReset) {
        // 選択した要素を保存する
        this.dispContentObj.choosedIdx = index;
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
     * 子メニューがない場合（指定した要素がキャラリスト、敵キャラリストなどだった場合）は1を返す
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

        if (choosedCtt == C_COMMON.WINDOW_MENU_BACK) {
            // 戻る選択肢の場合
            if (this.dispContentObjHist.length == 0) {
                // 履歴がない場合は-1を返す
                childObj = C_COMMON.CHILDMENU_NULL_BACK;
            } else {
                // 履歴がある場合は履歴のオブジェクトを返す
                childObj = ObjectUtil.deepCopy(this.dispContentObjHist[idx]);
            }
            return childObj;

        } else if (
            type == C_COMMON.WINDOW_CONTENT_TYPE_CHARA ||
            type == C_COMMON.WINDOW_CONTENT_TYPE_FIELD
        ) {
            // 次の選択肢がない場合は1を返す
            childObj = C_COMMON.CHILDMENU_NULL_NEXT;
            return childObj;

        } else if (type == C_COMMON.WINDOW_CONTENT_TYPE_LINE) {
            // 文章だった場合はエラー
            throw new Error(
                '[DispContent.getChildContent]文章コンテンツの子メニューは取得できません。');
        } else if (type == C_COMMON.WINDOW_CONTENT_TYPE_TEXTLIST) {
            // 現在の表示がテキストリスト形式の場合、エラー
            throw new Error(
                '[DispContent.getChildContent]テキストリストは子メニューを取得できません。');
        }

        const childObjBase = DataIOUtil.getChildCtt(
            { obj: choosedCtt, type: type }, this.scene, true
        );

        childObj = this.createContentObj(childObjBase.type, childObjBase.obj, true, false, true);

        return childObj;
    }

    /**
     * 子メニューを取得し、そのまま設定する
     * @param {number} idx 子メニューを取得するメニューのインデックス
     */
    setChildContent(idx) {
        // 履歴を保存する
        this.archiveContent(idx, false);
        /** @type {DispContentObj} */
        this.dispContentObj = ObjectUtil.deepCopy(this.getChildContent(idx));
    }
    /** コンテンツを初期化 */
    initContent() {
        this.dispContentObj = {
            expl: [], obj: [], dispStr: [],
            dispObjType: C_COMMON.WINDOW_CONTENT_TYPE_LINE,
            isList: false, isLine: true, isMenu: false
        };
    }

    /**
     * 表示コンテンツの数を取得する
     * @returns {number} コンテンツ数
     */
    getContentLength() {
        return this.dispContentObj.obj.length;
    }

    /**
     * 履歴から効果反映対象を取得
     * @returns {BaseModel} 効果反映オブジェクト
     */
    getEffectObj() {
        if (this.dispContentObjHist.length == 0) {
            throw new Error('[DispContent.getEffectObj]履歴がありません。');
        }
        const lastHist = this.dispContentObjHist.at(-1);
        return lastHist.obj[lastHist.choosedIdx];
    }
}