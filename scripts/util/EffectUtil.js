class EffectUtils {
    /**
     * アイテムの効果を対象に適用する（現状消費アイテムと特別アイテムのみ）
     * @param {ItemDefModel} itemDef 使用アイテム定義
     * @param {object} target 対象オブジェクト
     */
    static applyItemEffect(itemDef, target) {

        if (target instanceof CharaSttModel) {
            // 対象オブジェクトがキャラクターの場合
            for (let i = 0; i < C_DB.TARGETCOLNUM; i++) {
                // 効果対象項目を取得
                const getTargetColMethod = `getTargetCol${i + 1}`;
                const getEffectValMethod = `getEffectVal${i + 1}`;
                const targetCol = itemDef[getTargetColMethod]();
                const effectVal = Number(itemDef[getEffectValMethod]());

                // 効果を適用
                target[targetCol] += effectVal;
            }
        }
    }

    /**
     * アクションの効果を対象に適用する
     * @param {object} action アクション定義
     * @param {object} target 対象オブジェクト
     */
    static applyActionEffect(action, target) {

    }
}