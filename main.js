const { app, BrowserWindow, systemPreferences } = require('electron');

async function requestMicrophonePermission() {
  if (process.platform === 'darwin') {
    const status = await systemPreferences.askForMediaAccess('microphone');
    if (!status) {
      console.warn('Microphone access was denied.');
    }
  }
}

async function createWindow() {
  await requestMicrophonePermission();
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadURL('https://smarter.igo1996.com/ys-part-index-page');

  // Set the application name
  app.setName('TOEFL Dude');

  // Prevent changing the title
  win.on('page-title-updated', (event) => {
    event.preventDefault();
  });
}

app.whenReady().then(createWindow);

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