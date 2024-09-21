class ObjectUtil {
    /**
     * オブジェクトをディープコピーする（プリミティブ、配列、オブジェクト、インスタンス可）
     * @param {*} obj ディープコピー対象のオブジェクト
     * @returns コピー後のオブジェクト
     */
    static deepCopy(obj) {
        // プリミティブ型やnullはそのまま返す
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }

        // Dateオブジェクトの場合は新しいインスタンスを作成して返す
        if (obj instanceof Date) {
            return new Date(obj.getTime());
        }

        // Arrayの場合は各要素をディープコピー
        if (Array.isArray(obj)) {
            return obj.map(item => ObjectUtil.deepCopy(item));
        }

        // クラスのインスタンスの場合は同じクラスの新しいインスタンスを生成して返す
        if (obj instanceof Object && obj.constructor !== Object) {
            const newInstance = new obj.constructor();
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    newInstance[key] = ObjectUtil.deepCopy(obj[key]);
                }
            }
            return newInstance;
        }

        // 通常のオブジェクトの場合
        const copy = {};
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                copy[key] = ObjectUtil.deepCopy(obj[key]);
            }
        }
        return copy;
    }
}