const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    loadJsonData: (filePath) => ipcRenderer.invoke('load-json-data', filePath)
});
