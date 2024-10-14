/**
 * 味方キャラモデルのサービスクラス
 */
class TblSptCharaService extends BaseService {
    /**
     * 味方キャラの表示ステータスのリストを取得する
     * @param {TblSptCharaModel} model 味方キャラモデル
     * @param {number} width 表示幅
     * @param scene 表示シーン
     * @returns {string[]} 表示するパラメータのリスト
     */
    static getIkuseiDispProps(model, width, scene) {
        const fontStyle = {
            fontSize: C_COMMON.FONT_SIZE_SMALL_2,
            fill: C_COMMON.COMMON_COLOR_WINDOW_FONT,
            fontFamily: C_COMMON.FONT_FAMILY_BIT12
        };

        const dispPropList = [
            [model.name, ''],
            ['体力', `${model.hp}/${model.maxHp}`],
            ['やる気', `${model.maxYp}`],
            ['攻撃', model.atk],
            ['防御', model.def],
            ['運', model.luk],
        ];

        return dispPropList.map(prop =>
            GraphicUtil.adjust2StrBothEnd(scene, prop[0], prop[1],
                width - C_COMMON.WINDOW_PADDING_LINE_SMALL * 2, fontStyle)
        );
    }

    /**
     * 味方キャラの表示ステータスのリストを取得する
     * @param {TblSptCharaModel} model 味方キャラモデル
     * @param {number} width 表示幅
     * @param scene 表示シーン
     * @returns {string[]} 表示するパラメータのリスト
     */
    static getBattleDispProps(model, width, scene) {
        const fontStyle = {
            fontSize: C_COMMON.FONT_SIZE_SMALL,
            fill: C_COMMON.COMMON_COLOR_WINDOW_FONT,
            fontFamily: C_COMMON.FONT_FAMILY_BIT12
        };

        const dispPropList = [
            [model.name, ''],
            ['体力', `${model.hp}/${model.maxHp}`],
            ['やる気', `${model.yp}/${model.maxYp}`]

        ];

        return dispPropList.map(prop =>
            GraphicUtil.adjust2StrBothEnd(scene, prop[0], prop[1],
                width - C_COMMON.WINDOW_PADDING_LINE_SMALL * 2, fontStyle)
        );
    }
}