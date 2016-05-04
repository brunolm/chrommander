class BaseCommander {
  constructor(private _commandMap = { }) {
  }

  public get commandMap() { return this._commandMap; }
  public set commandMap(value) {
    this._commandMap = { };
    Object.keys(value).forEach(key => {
      this._commandMap[key] = value[key].name;
    });
  }

  public exec(commandArgument: string): boolean {
    const commandName = commandArgument.split(' ')[0];
    const command = this.commandMap[commandName];

    if (typeof command !== undefined) {
      return this[command](commandArgument.slice(commandName.length + 1));
    }

    return false;
  }
}
