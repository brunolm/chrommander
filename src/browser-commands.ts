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

  private async newTab(commandArgument: string) {
    if (commandArgument && !/^.*?\:\/\//.test(commandArgument)) {
      commandArgument = `http://${commandArgument}`;
    }
    chrome.tabs.create({ url: commandArgument || 'about:blank' });
    return true;
  }
  private async pin(commandArgument: string, pinned = true) {
    const currentTab = await Core.getCurrentTab();
    chrome.tabs.update(currentTab.id, { pinned });
    return true;
  }
  private async unpin(commandArgument: string) {
    return this.pin(commandArgument, false);
  }
  private async duplicate(commandArgument: string) {
    const currentTab = await Core.getCurrentTab();
    chrome.tabs.duplicate(currentTab.id);
    return true;
  }

  private async newWindow(commandArgument: string, incognito = false) {
    if (commandArgument && !/^.*?\:\/\//.test(commandArgument)) {
      commandArgument = `http://${commandArgument}`;
    }
    chrome.windows.create({ url: commandArgument || 'about:blank', incognito });
    return true;
  }
  private async incognito(commandArgument: string) {
    return this.newWindow(commandArgument, true);
  }

  private async history(commandArgument: string) {
    return this.newTab('chrome://history/');
  }
  private async downloads(commandArgument: string) {
    return this.newTab('chrome://downloads/');
  }
  private async bookmarks(commandArgument: string) {
    return this.newTab('chrome://bookmarks/');
  }
  private async extensions(commandArgument: string) {
    return this.newTab('chrome://extensions/');
  }
  private async settings(commandArgument: string) {
    return this.newTab('chrome://settings/');
  }
  private async passwords(commandArgument: string) {
    return this.newTab('chrome://settings/passwords');
  }
  private async autofill(commandArgument: string) {
    return this.newTab('chrome://settings/autofill');
  }
  private async clear(commandArgument: string) {
    return this.newTab('chrome://settings/clearBrowserData');
  }

  private async zoom(commandArgument: string) {
    const currentTab = await Core.getCurrentTab();
    chrome.tabs.setZoom(currentTab.id, parseFloat(commandArgument) / 100.0 || 0);
    return true;
  }
}
