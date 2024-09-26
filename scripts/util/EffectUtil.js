class EffectUtils {
    /**
     * アイテムの効果を対象に適用する
     * @param {TblItemModel} itemModel 使用アイテム
     * @param {BaseModel} target 使用対象
     */
    static applyItemEffect(itemModel, target) {

        if (!(target instanceof TblSptCharaModel) && !(target instanceof TblEnemyModel)) {
            // 対象が味方キャラ、または敵キャラでない場合、処理を終了
            return;
        }

        // 対象項目を取得
        const effectColList = itemModel.trgtCols.split(C_COMMON.SIGN_PIPE);
        const effectValList = itemModel.efctVals.split(C_COMMON.SIGN_PIPE);

        // 適用が不可能な場合は処理を終了する

        if (effectColList.length != effectValList.length) {
            throw new Error([EffectUtils.applyItemEffect]アイテムの効果項目と効果量の長さが違います);
        }
        // ターゲットに効果を適用する
        for (let i = 0; i < effectColList.length; i++) {
            // 効果反映後のパラメータ
            const effectAfterVal = target[effectColList[i]] + effectValList[i];
            // パラメータを更新
            target[effectColList[i]] = effectAfterVal;
        }

        // アイテムを使用済みにする
    }

    /**
     * アクションの効果を対象に適用する
     * @param {object} action アクション定義
     * @param {object} target 対象オブジェクト
     */
    static applyActionEffect(action, target) {

    }
}