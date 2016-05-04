interface FunctionDictionary {
  [index: string]: (commandArguments: string) => boolean;
}
interface StringDictionary {
  [index: string]: string;
}

class BaseCommander {
  private _commandMap: FunctionDictionary = { };
  private _commandNamesMap: StringDictionary = { };

  public get commandMap() { return this._commandMap; }
  public set commandMap(value: FunctionDictionary) {
    this._commandMap = value;
    this._commandNamesMap = { };
    Object.keys(value).forEach(key => {
      this._commandNamesMap[key] = value[key].name;
    });
  }

  protected get commandNamesMap() { return this._commandNamesMap; }

  public exec(commandArgument: string): boolean {
    const commandName = commandArgument.split(' ')[0];
    const command = this.commandNamesMap[commandName];

    if (typeof command !== undefined) {
      return this[command](commandArgument.slice(commandName.length + 1));
    }

    return false;
  }
}
