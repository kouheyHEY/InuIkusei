class DaoManager {
    constructor() {
        // Daoのマッピングを定義
        this.daoMap = {};
    }

    /**
     * daoを取得する
     * @param {string} daoName dao名
     * @returns 取得したdao
     */
    getDao(daoName) {
        const dao = this.daoMap[daoName];
        if (dao) {
            return dao;
        } else {
            throw new Error(`[DaoManager]Daoが見つかりません:${daoName}`);
        }
    }

    /**
     * daoをセットする
     * @param {string} daoName dao名
     * @param {object} daoObject daoオブジェクト
     */
    setDao(daoName, daoObject) {
        if (typeof daoName !== 'string' || !daoObject) {
            throw new Error('[DaoManager]dao名もしくはdao自体が無効です');
        }
        this.daoMap[daoName] = daoObject;
    }
}