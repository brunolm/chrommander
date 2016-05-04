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
    newTab(commandArgument) {
        if (!/^.*?\:\/\//.test(commandArgument)) {
            commandArgument = `http://${commandArgument}`;
        }
        chrome.tabs.create({ url: commandArgument || 'about:blank' });
        return true;
    }
    newWindow(commandArgument, incognito = false) {
        if (!/^.*?\:\/\//.test(commandArgument)) {
            commandArgument = `http://${commandArgument}`;
        }
        chrome.windows.create({ url: commandArgument || 'about:blank', incognito: incognito });
        return true;
    }
    incognito(commandArgument) {
        return this.newWindow(commandArgument, true);
    }
    history(commandArgument) {
        return this.newTab('chrome://history/');
    }
    downloads(commandArgument) {
        return this.newTab('chrome://downloads/');
    }
    bookmarks(commandArgument) {
        return this.newTab('chrome://bookmarks/');
    }
    extensions(commandArgument) {
        return this.newTab('chrome://extensions/');
    }
    settings(commandArgument) {
        return this.newTab('chrome://settings/');
    }
    pin(commandArgument, pinned = true) {
        chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
            chrome.tabs.update(tabs[0].id, { pinned: pinned });
            debugger;
        });
        return true;
    }
    unpin(commandArgument) {
        return this.pin(commandArgument, false);
    }
    zoom(commandArgument) {
        chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
            chrome.tabs.setZoom(tabs[0].id, parseFloat(commandArgument) || 0);
        });
        return true;
    }
    clear(commandArgument) {
        return this.newTab('chrome://settings/clearBrowserData');
    }
    duplicate(commandArgument) {
        chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
            chrome.tabs.duplicate(tabs[0].id);
        });
        return true;
    }
    passwords(commandArgument) {
        return this.newTab('chrome://settings/passwords');
    }
    autofill(commandArgument) {
        return this.newTab('chrome://settings/autofill');
    }
}
//# sourceMappingURL=browser-commands.js.map