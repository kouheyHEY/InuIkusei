/**
 * フィールドモデルのサービスクラス
 */
class MstFieldService extends BaseService {
    /** フィールドの中から指定されたIDのフィールドを取得する
     * @param {number} id 取得するフィールドのID
     * @param {Phaser.Scene} scene シーン
     * @returns {MstFieldModel} フィールドモデル
     */
    static getById(id, scene) {
        return scene.mstFieldDao.getById(id);
    }

    /** フィールドの中からランダムにn個のフィールドを取得する
     * @param {number} n 取得するフィールドの数
     * @param {Phaser.Scene} scene シーン
     * @returns {MstFieldModel[]} フィールドモデルのリスト
     */
    static getRandomN(n, scene) {
        let fieldList = scene.mstFieldDao.getAll();
        let randomFieldList = [];
        for (let i = 0; i < n; i++) {
            let randomIndex = Math.floor(Math.random() * fieldList.length);
            randomFieldList.push(fieldList[randomIndex]);
            fieldList.splice(randomIndex, 1);
        }
        return randomFieldList;
    }
}