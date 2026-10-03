import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('assessmentApp', {
  getAppVersion: (): Promise<string> => ipcRenderer.invoke('app:get-version'),
});
