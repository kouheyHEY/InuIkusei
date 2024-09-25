class BaseService {
    /**
     * ID, 名前, 説明を取得する
     * @param {BaseModel} model モデルのインスタンス 
     */
    static getDispProps(model) {
        return {
            id: model.id,
            name: model.name,
            expl: model.expl
        };
    }
}