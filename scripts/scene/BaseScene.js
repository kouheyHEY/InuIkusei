/**
 * シーンの親クラス
 */
class BaseScene extends Phaser.Scene {
    /**
     * コンストラクタ
     * @param {string} sceneName シーン名
     */
    constructor(sceneName) {
        super({ key: sceneName });
    }

    /**
     * シーン遷移時のパラメータを受け取る
     * @param {Object} param 遷移元から受け取ったパラメータ
     */
    init(param) {
        this.param = param;
    }

    /**
     * 以下の流れで実行。
     * ０．インスタンス変数の初期化
     *      this.initInstVal
     * １．各エリアの初期描画
     *      this.initArea
     */
    create() {
        // インスタンス変数の初期化
        this.initInstVal();

        // 各エリアの初期描画
        this.initArea();
    }

    /**
     * 子クラスで実装。
     * 処理更新用メソッド、毎フレーム実行される。
     */
    update() {
        throw new Error(
            `[${this.constructor.name}.update]${C_COMMON.MSG_ERR_NOIMPL}`);
    }

    /**
     * 子クラスで実装。
     * インスタンス変数の初期化。
     */
    initInstVal() {
        throw new Error(
            `[${this.constructor.name}.initInstVal]${C_COMMON.MSG_ERR_NOIMPL}`);
    }
    /**
     * 子クラスで実装。
     * 各アエリアの初期描画
     */
    initArea() {
        throw new Error(
            `[${this.constructor.name}.initArea]${C_COMMON.MSG_ERR_NOIMPL}`);
    }
}