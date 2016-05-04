class BaseCommander {
    constructor(_commandMap = {}) {
        this._commandMap = _commandMap;
    }
    get commandMap() { return this._commandMap; }
    set commandMap(value) {
        this._commandMap = {};
        Object.keys(value).forEach(key => {
            this._commandMap[key] = value[key].name;
        });
    }
    exec(commandArgument) {
        const commandName = commandArgument.split(' ')[0];
        const command = this.commandMap[commandName];
        if (typeof command !== undefined) {
            return this[command](commandArgument.slice(commandName.length + 1));
        }
        return false;
    }
}
//# sourceMappingURL=base-commander.js.map