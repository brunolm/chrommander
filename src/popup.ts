document.addEventListener('DOMContentLoaded', e => {
  const input = document.querySelector('#command') as HTMLInputElement;
  input.focus();

  input.addEventListener('keydown', e => {
    const key: string = e.key || (e as any).code;

    const selectedElement = AutoComplete.getSelectedCommand();

    if (key === Core.Keys[Core.Keys.Enter]) {
      switch (input.value[0]) {
        case '>':
          new BrowserCommands().exec(input.value.slice(1));
          break;
      }
    }
    else if (key === Core.Keys[Core.Keys.ArrowDown]) {
      if (selectedElement) {
        selectedElement.className = '';
        if (selectedElement.nextElementSibling) {
          AutoComplete.selectElement(selectedElement.nextElementSibling as HTMLLIElement);
        }
        else {
          AutoComplete.selectElement(AutoComplete.getFirstElement());
        }
      }
      else {
        AutoComplete.selectFirst();
      }
    }
    else if (key === Core.Keys[Core.Keys.ArrowUp]) {
      if (selectedElement) {
        selectedElement.className = '';
        if (selectedElement.previousElementSibling) {
          AutoComplete.selectElement(selectedElement.previousElementSibling as HTMLLIElement);
        }
        else {
          AutoComplete.selectElement(AutoComplete.getLastElement());
        }
      }
      else {
        AutoComplete.selectLast();
      }
    }
  }, false);
}, false);

namespace AutoComplete {
  const componentSelector = '#suggestions';
  const componentHeight = 300;

  const selectedElementSelector = '#suggestions li.selected';
  const firstElementSelector = '#suggestions li';
  const lastElementSelector = '#suggestions li:last-child';

  export const selectedElementClassName = 'selected';

  export function getSelectedCommand(): HTMLLIElement {
    return document.querySelector(selectedElementSelector) as HTMLLIElement;
  }

  export function getFirstElement(): HTMLLIElement {
    return document.querySelector(firstElementSelector) as HTMLLIElement;
  }

  export function getLastElement(): HTMLLIElement {
    return document.querySelector(lastElementSelector) as HTMLLIElement;
  }

  export function selectFirst() {
    selectElement(getFirstElement());
  }

  export function selectLast() {
    selectElement(getLastElement());
  }

  export function selectElement(element: HTMLLIElement) {
    element.className = 'selected';

    if (!checkVisible(element)) {
      const component = getComponent();
      component.scrollTop = 4 + element.offsetTop - componentHeight - component.offsetTop;
    }
  }

  function getComponent() {
    return document.querySelector(componentSelector) as HTMLUListElement;
  }

  function checkVisible(element: HTMLLIElement) {
    const component = getComponent();
    const start = component.scrollTop + component.offsetTop;
    const end = start + componentHeight;

    return element.offsetTop >= start && element.offsetTop <= end;
  }
}
