/**
 * Entry point of the Election app.
 */
import * as path from 'path';
// eslint-disable-next-line import/no-extraneous-dependencies
import { BrowserWindow, app, ipcMain, dialog } from 'electron';
import * as nodeEnv from '_utils/node-env';
import { autoUpdater } from "electron-updater";
import log from 'electron-log';
log.transports.file.resolvePath = () => path.join('/home/sir/development/electron-autoupdate', 'logs/main.log');
console.log("tjeanre");

log.info('Hello, log');
log.warn('Some problem appears');
log.info("Application version " + app.getVersion());

let mainWindow: Electron.BrowserWindow | undefined;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      devTools: nodeEnv.dev,
      preload: path.join(__dirname, './preload.bundle.js'),
      webSecurity: nodeEnv.prod,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile('index.html').finally(() => { /* no action */ });

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = undefined;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  if (nodeEnv.dev || nodeEnv.prod) createWindow();
  console.log("1");

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows.length === 0) {
    createWindow();
  }
  });
}).finally(() => {
mainWindow?.webContents.openDevTools()
  
  /* no action */ });

 app.on('ready', () => { 
  autoUpdater.checkForUpdatesAndNotify()
})

autoUpdater.on('error',(error, message) => {
log.info("error: " + error);
log.info("message: " + message);

})
autoUpdater.on('update-available', () => {
log.info('update-available');
})

autoUpdater.on('checking-for-update', () => {
log.info('checking-for-update');
})

autoUpdater.on('download-progress', () => {
log.info('download-progress');
})

autoUpdater.on('download-progress', (progress)=> {
log.info('download-progress')
log.info(progress);
})


autoUpdater.on('update-downloaded', () => {
log.info('update-downloaded');

    const dialogOpts = {
      type: "info",
      buttons: ["Restart", "Later"],
      title: "Application Update",
      message:  "releaseName",
      detail:
        "A new version has been downloaded. Restart the application to apply the updates."
    };
    dialog.showMessageBox(dialogOpts).then((returnValue) => {
      console.log(returnValue);
      if (returnValue.response === 0) autoUpdater.quitAndInstall();
    });
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('renderer-ready', () => {
  // eslint-disable-next-line no-console
  console.log('Renderer is ready.');
});



// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

// eslint-disable-next-line import/prefer-default-export
export const exportedForTests = nodeEnv.test ? { createWindow } : undefined;
