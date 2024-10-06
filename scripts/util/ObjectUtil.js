class ObjectUtil {
    /**
     * オブジェクトをディープコピーする（プリミティブ、配列、オブジェクト、インスタンス可）
     * @param {*} obj ディープコピー対象のオブジェクト
     * @returns コピー後のオブジェクト
     */
    static deepCopy(obj) {
        // プリミティブ型または null の場合はそのまま返す
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }

        // 日付オブジェクトの場合
        if (obj instanceof Date) {
            return new Date(obj.getTime());
        }

        // 配列の場合
        if (Array.isArray(obj)) {
            return obj.map(item => this.deepCopy(item));
        }

        // オブジェクトの場合
        if (obj.constructor === Object) {
            const copiedObj = {};
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    copiedObj[key] = this.deepCopy(obj[key]);
                }
            }
            return copiedObj;
        }

        // カスタムクラスのインスタンスの場合
        const copiedInstance = Object.create(Object.getPrototypeOf(obj));
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                copiedInstance[key] = this.deepCopy(obj[key]);
            }
        }
        return copiedInstance;
    }
}