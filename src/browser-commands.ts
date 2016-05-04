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

  public newTab(commandArgument: string): boolean {
    if (!/^.*?\:\/\//.test(commandArgument)) {
      commandArgument = `http://${commandArgument}`;
    }
    chrome.tabs.create({ url: commandArgument || 'about:blank' });
    return true;
  }
  private newWindow(commandArgument: string, incognito = false): boolean {
    if (!/^.*?\:\/\//.test(commandArgument)) {
      commandArgument = `http://${commandArgument}`;
    }
    chrome.windows.create({ url: commandArgument || 'about:blank', incognito });
    return true;
  }
  private incognito(commandArgument: string): boolean {
    return this.newWindow(commandArgument, true);
  }
  private history(commandArgument: string): boolean {
    return this.newTab('chrome://history/');
  }
  private downloads(commandArgument: string): boolean {
    return this.newTab('chrome://downloads/');
  }
  private bookmarks(commandArgument: string): boolean {
    return this.newTab('chrome://bookmarks/');
  }
  private extensions(commandArgument: string): boolean {
    return this.newTab('chrome://extensions/');
  }
  private settings(commandArgument: string): boolean {
    return this.newTab('chrome://settings/');
  }
  private pin(commandArgument: string, pinned = true): boolean {
    chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
      chrome.tabs.update(tabs[0].id, { pinned });
      debugger;
    });
    return true;
  }
  private unpin(commandArgument: string): boolean {
    return this.pin(commandArgument, false);
  }
  private zoom(commandArgument: string): boolean {
    chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
      chrome.tabs.setZoom(tabs[0].id, parseFloat(commandArgument) || 0);
    });
    return true;
  }
  private clear(commandArgument: string): boolean {
    return this.newTab('chrome://settings/clearBrowserData');
  }
  private duplicate(commandArgument: string): boolean {
    chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
      chrome.tabs.duplicate(tabs[0].id);
    });
    return true;
  }
  private passwords(commandArgument: string): boolean {
    return this.newTab('chrome://settings/passwords');
  }
  private autofill(commandArgument: string): boolean {
    return this.newTab('chrome://settings/autofill');
  }
}
