import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';

if (started) {
  app.quit();
}

declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string;
declare const MAIN_WINDOW_VITE_NAME: string;

let panelWindow: BrowserWindow | null = null;
let controllerWindow: BrowserWindow | null = null;

const loadRenderer = (window: BrowserWindow, hash = ''): void => {
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    window.loadURL(`${MAIN_WINDOW_VITE_DEV_SERVER_URL}${hash}`);
  } else {
    window.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
      hash ? { hash: hash.replace('#', '') } : undefined,
    );
  }
};

const createWindow = (): void => {
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 850,
    resizable: true,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  panelWindow = mainWindow;

  loadRenderer(mainWindow);

  // Uncomment to open DevTools during debugging:
  // mainWindow.webContents.openDevTools();
};

const createControllerWindow = (): void => {
  if (controllerWindow && !controllerWindow.isDestroyed()) {
    controllerWindow.focus();
    return;
  }

  controllerWindow = new BrowserWindow({
    width: 360,
    height: 820,
    title: 'Panel Controller',
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  controllerWindow.on('closed', () => {
    controllerWindow = null;
  });
  loadRenderer(controllerWindow, '#controller');
};

ipcMain.on('controller-update', (_event, update) => {
  if (panelWindow && !panelWindow.isDestroyed()) {
    panelWindow.webContents.send('controller-update', update);
  }
  if (controllerWindow && !controllerWindow.isDestroyed()) {
    controllerWindow.webContents.send('controller-update', update);
  }
});

app.on('ready', () => {
  createWindow();
  createControllerWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});