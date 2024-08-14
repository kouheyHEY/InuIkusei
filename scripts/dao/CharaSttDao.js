class CharaSttDao {
    constructor(gameDataManager) {
        /** @type {GameDataManager} ゲームデータ */
        this.gameDataManager = gameDataManager;
    }

    /** モデルクラスを取得する */
    getPlayerModel() {
        const data = this.gameDataManager.getData().player || {};
        return new PlayerModel(data.name, data.level, data.score);
    }

    /** モデルクラスを保存する
     * @param {CharaSttModel} charaSttModel モデルクラス 
     */
    savePlayerModel(playerModel) {
        const data = this.gameDataManager.getData();
        data.player = playerModel.getData();
        this.gameDataManager.saveData(data);
    }
}