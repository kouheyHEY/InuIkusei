/**
 * データの入出力用のユーティル
 */
class DataIOUtil {

    /**
     * 対象の子要素を取得する
     * @param {{obj: BaseModel, type: Number}} parentCtt 子要素を取得したい親要素
     * @param {Object} scene 取得対象のシーン
     * @param {boolean} 戻る選択肢を追加するかどうか
     * @returns {{obj: BaseModel[], type: Number}} 取得した子要素とタイプ
     */
    static getChildCtt(parentCtt, scene, addBack) {
        const childObj = {};
        const parentType = parentCtt.type;
        const parentObj = parentCtt.obj;

        let childObjList = null;
        let childObjType = null;

        if (parentType == C_COMMON.WINDOW_CONTENT_TYPE_MENU) {
            // 親要素がメニューの場合
            if (parentObj.childMenuId == C_DB.M_MENU.CHILDMENUID_USEITEM) {
                // 消費アイテムの場合
                childObjList = scene.tblItemDao.getByType(C_DB.T_ITEM.TYPE_USEITEM);
                childObjType = C_COMMON.WINDOW_CONTENT_TYPE_ITEM;
            } else if (parentObj.childMenuId == C_DB.M_MENU.CHILDMENUID_EQPITEM) {
                // 装備アイテムの場合
                childObjList = scene.tblItemDao.getByType(C_DB.T_ITEM.TYPE_EQPITEM);
                childObjType = C_COMMON.WINDOW_CONTENT_TYPE_ITEM;
            } else if (parentObj.childMenuId == C_DB.M_MENU.CHILDMENUID_SPITEM) {
                // 装備アイテムの場合
                childObjList = scene.tblItemDao.getByType(C_DB.T_ITEM.TYPE_SPITEM);
                childObjType = C_COMMON.WINDOW_CONTENT_TYPE_ITEM;
            } else if (parentObj.childMenuId == C_DB.M_MENU.CHILDMENUID_FIELD) {
                // フィールドの場合
                childObjList = MstFieldService.getRandomN(2, scene);
                childObjType = C_COMMON.WINDOW_CONTENT_TYPE_FIELD;
            } else if (parentObj.childMenuId == C_DB.M_MENU.CHILDMENUID_TRAINING) {
                // 鍛練メニューの場合
                childObjList = scene.mstActionDao.getByType(C_DB.M_ACTION.TYPE_TRAINING);
                childObjType = C_COMMON.WINDOW_CONTENT_TYPE_TRAINING;
            } else if (parentObj.childMenuId == C_DB.M_MENU.CHILDMENUID_LIFE) {
                // 生活メニューの場合
                childObjList = scene.mstActionDao.getByType(C_DB.M_ACTION.TYPE_LIFE);
                childObjType = C_COMMON.WINDOW_CONTENT_TYPE_LIFE;
            } else if (parentObj.childMenuId == C_DB.M_MENU.CHILDMENUID_BATTLEACTION) {
                // バトル行動の場合
                // 有効なバトルアクションを取得
                childObjList = scene.tblActionDao.getByType(C_DB.M_ACTION.TYPE_BATTLEACT);
                childObjType = C_COMMON.WINDOW_CONTENT_TYPE_BATTLEACTION;
            } else {
                // メニューの場合
                childObjList = scene.mstMenuDao.getByMenuId(parentObj.childMenuId);
                childObjType = C_COMMON.WINDOW_CONTENT_TYPE_MENU;
            }

        } else if (
            parentType == C_COMMON.WINDOW_CONTENT_TYPE_ITEM ||
            parentType == C_COMMON.WINDOW_CONTENT_TYPE_TRAINING ||
            parentType == C_COMMON.WINDOW_CONTENT_TYPE_LIFE
        ) {
            // 現在の表示がアイテムリスト、鍛練メニュー、生活メニューの場合
            // キャラリストを取得
            childObjList = scene.charaManager.getAllCharacters();
            // 子メニューのタイプをキャラリストに設定
            childObjType = C_COMMON.WINDOW_CONTENT_TYPE_CHARA;
        } else if (
            parentType == C_COMMON.WINDOW_CONTENT_TYPE_BATTLEACTION
        ) {
            // 現在の表示がバトル行動の場合
            // 敵キャラリストを取得
            childObjList = scene.tblEnemyDao.getAll();
            // 子メニューのタイプをキャラリストに設定
            childObjType = C_COMMON.WINDOW_CONTENT_TYPE_CHARA;
        }

        if (addBack) {
            // 戻るを追加する
            childObjList.push(C_COMMON.WINDOW_MENU_BACK);
        }

        childObj.obj = childObjList;
        childObj.type = childObjType;

        return childObj;
    }
}