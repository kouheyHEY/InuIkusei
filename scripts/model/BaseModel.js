/**
 * Modelのベースクラス
 */
class BaseModel {
    constructor() {

    }

    /**
     * 子クラスで実装。
     * 全てのプロパティをオブジェクトで取得する
     */
    getAllProps() {
        throw new Error("[BaseModel]実装されていません");
    }

    /**
     * 子クラスで実装。
     * 全てのプロパティをオブジェクトからセットする
     */
    setAllProps(obj) {
        throw new Error("[BaseModel]実装されていません");
    }

    /**
     * 子クラスで実装。
     * 全てのプロパティ名を配列で取得する
     */
    getPropNames() {
        throw new Error("[BaseModel]実装されていません");
    }
}