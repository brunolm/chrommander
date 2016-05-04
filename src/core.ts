namespace Core {
  export function getCurrentTab(): Promise<chrome.tabs.Tab> {
    return new Promise((resolve) => {
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        return resolve(tabs[0]);
      });
    });
  }

  export function parseLink(link: string) {
    if (link && !/^.*?\:\/\//.test(link)) {
      link = `http://${link}`;
    }
    return link;
  }

  export enum Keys {
    Enter = 0x001C,
    ArrowDown = 0xE050,
    ArrowUp = 0xE048,
  }
}

interface FunctionDictionary {
  [index: string]: (commandArguments: string) => Promise<boolean>;
}
interface StringDictionary {
  [index: string]: string;
}
