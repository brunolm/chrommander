class BaseCommander {
    constructor() {
        this._commandMap = {};
        this._commandNamesMap = {};
    }
    get commandMap() { return this._commandMap; }
    set commandMap(value) {
        this._commandMap = value;
        this._commandNamesMap = {};
        Object.keys(value).forEach(key => {
            this._commandNamesMap[key] = value[key].name;
        });
    }
    get commandNamesMap() { return this._commandNamesMap; }
    exec(commandArgument) {
        const commandName = commandArgument.split(' ')[0];
        const command = this.commandNamesMap[commandName];
        if (typeof command !== undefined) {
            return this[command](commandArgument.slice(commandName.length + 1));
        }
        return false;
    }
}
//# sourceMappingURL=base-commander.js.map