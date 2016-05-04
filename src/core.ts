namespace Core {
  export function getCurrentTab(): Promise<chrome.tabs.Tab> {
    return new Promise((resolve) => {
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        return resolve(tabs[0]);
      });
    });
  }
}
