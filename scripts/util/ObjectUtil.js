class ObjectUtil {
    /**
     * オブジェクトをディープコピーする（プリミティブ、配列、オブジェクト、インスタンス可）
     * @param {*} obj ディープコピー対象のオブジェクト
     * @returns コピー後のオブジェクト
     */
    static deepCopy(obj) {
        if (obj === null || typeof obj !== "object") {
            // プリミティブ値はそのまま返す
            return obj;
        }

        if (Array.isArray(obj)) {
            // 配列の場合、各要素を再帰的にコピー
            return obj.map(item => ObjectUtil.deepCopy(item));
        }

        if (obj.constructor && obj.constructor !== Object) {
            // 自作クラスのインスタンスの場合、インスタンスを新たに作成
            return new obj.constructor(...Object.values(obj));
        }

        // 通常のオブジェクトの場合
        const copiedObj = {};
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                copiedObj[key] = ObjectUtil.deepCopy(obj[key]);
            }
        }

        return copiedObj;
    }
}