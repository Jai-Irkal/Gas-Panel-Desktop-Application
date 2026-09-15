// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron';
import type { ControllerUpdate } from './types/controller';

// Expose safe APIs to renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  sendControllerUpdate: (update: ControllerUpdate) => {
    ipcRenderer.send('controller-update', update);
  },
  onControllerUpdate: (listener: (update: ControllerUpdate) => void) => {
    const handler = (_event: Electron.IpcRendererEvent, update: ControllerUpdate) => listener(update);
    ipcRenderer.on('controller-update', handler);
    return () => ipcRenderer.removeListener('controller-update', handler);
  },
});