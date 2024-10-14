/** アクションマネージャ */
class ActionManager {
    /** 行動オブジェクトの型定義 */
    /** @typedef {Object} ActionObj */
    /** @property {BaseModel} 行動元オブジェクト */
    /** @property {BaseModel} 行動先オブジェクト */
    /** @property {BaseModel} 行動オブジェクト */


    /**
     * コンストラクタ
     * @param {Phaser.Scene} scene シーン
     */
    constructor(scene) {
        this.scene = scene;

        // 行動オブジェクトのリスト
        this.actionList = [];

    }

    /**
     * 行動オブジェクトを追加
     * @param {ActionObj} actionObj 行動オブジェクト
     */
    addActionObj(actionObj) {
        this.actionList.push(actionObj);
    }

    /** 行動オブジェクトをもとに行動を実行 */
    executeActionObj(actionObj) {
    }

    /** 行動オブジェクトのリストを順に実行 */
    executeActionObjList() {
        for (const actionObj of this.actionList) {
            this.executeActionObj(actionObj);
        }
    }

}