class System {

    public isDarwin() {
        return process.platform === 'darwin';
    }

    public isLinux() {
        return process.platform === 'linux';
    }

    public isWin() {
        // It was taken from https://github.com/jonschlinkert/is-windows/blob/master/index.js
        return process.platform === 'win32' || process.env.OSTYPE === 'cygwin' || process.env.OSTYPE === 'msys';
    }

}

let system = new System();
export { system };

