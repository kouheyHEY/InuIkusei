class DispContent {
    /**
     * ウインドウに表示する内容のエンティティ
     * 
     */
    constructor(isList, isLine, isMenu) {
        /** @type {string[]} 表示文字列 */
        this.dispStringList = null;
        /** @type {object[]} 表示対象のオブジェクト */
        this.dispObjectList = null;
        /** @type {number} 表示内容のタイプ */
        this.dispObjectType = null;

        // リスト形式か、文章形式か、選択可能形式か
        this.isList = isList;
        this.isLine = isLine;
        this.isMenu = isMenu;
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

}