// config.jsonからスクリプトファイルのリストを取得する関数
async function getScriptList() {
    const response = await fetch('config/scripts.json');
    const data = await response.json();
    return data.scripts;
}

// スクリプトを読み込む関数
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.type = 'text/javascript';
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// メイン処理
async function loadScripts() {
    try {
        const scriptCategories = await getScriptList();
        for (const category of scriptCategories) {
            try {
                for (const filePath of category.files) {
                    await loadScript(filePath);
                }
            } catch (error) {
                console.error(`カテゴリ "${category.category}" の読み込み中にエラーが発生しました:`, error);
            }
        }
        console.log('すべてのスクリプトが正常に読み込まれました。');
    } catch (error) {
        console.error('スクリプトリストの取得中にエラーが発生しました:', error);
    }
}

// スクリプトの読み込みを開始
loadScripts();