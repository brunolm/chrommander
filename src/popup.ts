document.addEventListener('DOMContentLoaded', e => {
  const input = document.querySelector('#command') as HTMLInputElement;
  input.focus();

  input.addEventListener('keydown', e => {
    if (e.keyCode === 13) {
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        const currentTab = tabs[0];

        switch (input.value[0]) {
          case '>':
            new BrowserCommands().exec(input.value.slice(1));
            break;
        }
      });
    }
  }, false);
}, false);
