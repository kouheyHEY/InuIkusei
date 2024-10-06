class EffectUtils {
    /**
     * アイテムの効果を対象に適用する
     * @param {TblItemModel} itemModel 使用アイテム
     * @param {BaseModel} target 使用対象
     */
    static applyItemEffect(itemModel, target) {
        // 対象項目を取得
        const effectColList = itemModel.trgtCols.split(C_COMMON.SIGN_PIPE);
        const effectValList = itemModel.efctVals.split(C_COMMON.SIGN_PIPE);
        console.log(effectColList);
        console.log(effectValList);

        // 適用が不可能な場合は処理を終了する
        if (effectColList.length != effectValList.length) {
            throw new Error('[EffectUtils.applyItemEffect]アイテムの効果項目と効果量の長さが違います');
        }
        for (let i = 0; i < effectColList.length; i++) {
            // ターゲットに効果を適用する
            target[effectColList[i]] = Number(target[effectColList[i]]) + Number(effectValList[i]);
            // HP, YPは最大値を超えないようにする
            if (effectColList[i] == 'hp') {
                target.hp = Math.min(target.hp, target.maxHp);
            } else if (effectColList[i] == 'yp') {
                target.yp = Math.min(target.yp, target.maxYp);
            }
        }
    }

    /**
     * アクションの効果を対象に適用する
     * @param {object} action アクション定義
     * @param {object} target 対象オブジェクト
     */
    static applyActionEffect(action, target) {
        console.log('applyActionEffect')
    }
}