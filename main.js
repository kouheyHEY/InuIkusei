const { app, BrowserWindow, ipcMain, Menu, contextBridge } = require('electron');
const path = require('path');
const fs = require('fs');

const gameScale = 0.8;
const gameWidth = 1280 * gameScale;
const gameHeight = 720 * gameScale;
// const gameWidth = 1280;
// const gameHeight = 720;

function createWindow() {
    const win = new BrowserWindow({
        width: gameWidth,  // ウインドウ幅
        height: gameHeight, // ウインドウ高
        useContentSize: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), // Preload script for security
            nodeIntegration: false,
            contextIsolation: true,
        }
    });

    win.loadFile('index.html');

    // メニューバーを非表示にする TODO: リリース時は再表示
    // Menu.setApplicationMenu(null);

    win.webContents.on('did-finish-load', () => {
        // HTMLコンテンツのサイズを取得し、ウィンドウサイズを調整
        win.webContents.executeJavaScript(`
            new Promise((resolve) => {
                const body = document.body;
                const width = body.scrollWidth;
                const height = body.scrollHeight;
                resolve({ width, height });
            });
        `).then(size => {
            win.setContentSize(size.width, size.height);
        });
    });
}

// Electronの準備が完了したらウィンドウを作成
app.on('ready', () => {
    app.commandLine.appendSwitch('disable-gpu-sandbox');
    app.commandLine.appendSwitch('disable-software-rasterizer');
    createWindow();
});


// ファイル読み込みリクエストのハンドリング
ipcMain.handle('load-json-data', async (event, filePath) => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading JSON file:', error);
        return null;
    }
});
