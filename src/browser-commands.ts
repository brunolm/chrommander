class BrowserCommands extends BaseCommander {
  constructor() {
    super();
    super.commandMap = {
      'tab': this.newTab,
      'pin': this.pin,
      'unpin': this.unpin,
      'dup': this.duplicate,

      'window': this.newWindow,
      'private': this.incognito,

      'history': this.history,
      'downloads': this.downloads,
      'bookmarks': this.bookmarks,
      'extensions': this.extensions,
      'settings': this.settings,
      'passwords': this.passwords,
      'autofill': this.autofill,
      'clear': this.clear,

      'zoom': this.zoom,
    };
  }

  private newTab(commandArgument: string) {
    if (commandArgument && !/^.*?\:\/\//.test(commandArgument)) {
      commandArgument = `http://${commandArgument}`;
    }
    chrome.tabs.create({ url: commandArgument || 'about:blank' });
    return true;
  }
  private pin(commandArgument: string, pinned = true) {
    chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
      chrome.tabs.update(tabs[0].id, { pinned });
    });
    return true;
  }
  private unpin(commandArgument: string) {
    return this.pin(commandArgument, false);
  }
  private duplicate(commandArgument: string) {
    chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
      chrome.tabs.duplicate(tabs[0].id);
    });
    return true;
  }

  private newWindow(commandArgument: string, incognito = false) {
    if (commandArgument && !/^.*?\:\/\//.test(commandArgument)) {
      commandArgument = `http://${commandArgument}`;
    }
    chrome.windows.create({ url: commandArgument || 'about:blank', incognito });
    return true;
  }
  private incognito(commandArgument: string) {
    return this.newWindow(commandArgument, true);
  }

  private history(commandArgument: string) {
    return this.newTab('chrome://history/');
  }
  private downloads(commandArgument: string) {
    return this.newTab('chrome://downloads/');
  }
  private bookmarks(commandArgument: string) {
    return this.newTab('chrome://bookmarks/');
  }
  private extensions(commandArgument: string) {
    return this.newTab('chrome://extensions/');
  }
  private settings(commandArgument: string) {
    return this.newTab('chrome://settings/');
  }
  private passwords(commandArgument: string) {
    return this.newTab('chrome://settings/passwords');
  }
  private autofill(commandArgument: string) {
    return this.newTab('chrome://settings/autofill');
  }
  private clear(commandArgument: string) {
    return this.newTab('chrome://settings/clearBrowserData');
  }

  private zoom(commandArgument: string) {
    chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
      chrome.tabs.setZoom(tabs[0].id, parseFloat(commandArgument) || 0);
    });
    return true;
  }
}
