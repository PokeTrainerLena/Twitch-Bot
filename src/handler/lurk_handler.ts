export class LurkHandler{

    private users: string[];
    private date: number[];
    private lurkType: string[];

    constructor(startNames?: string[]) {
        //!startNames ? this.users = [] : this.users = startNames;
        this.users = [];
        this.date = [];
        this.lurkType = [];
    }

    /**
     * Add a new user
     * @param {String} newUser 
     */
    add(newUser: string | [string], lurkType: string | [string]) {
        if (typeof newUser === "string" && typeof lurkType === "string") {
            if (!this.users.find(user => user === newUser)) {
                this.users.push(newUser);
                this.date.push(Date.now());
                this.lurkType.push(lurkType);
            }
        } else if (Array.isArray(newUser) && Array.isArray(lurkType)) {
            /*newUser.forEach(user => {
                if (!this.users.find(username => username === user)) {
                    this.users.push(user);
                    this.date.push(Date.now());
                    this.lurkType.push(lurkType);
                }
            });*/
            while (newUser.length > 0) {
                let sUser = newUser.pop();
                let sLurkType = lurkType.pop();
                if (!this.users.find(user => user === sUser)) {
                    this.users.push(sUser!);
                    this.date.push(Date.now());
                    this.lurkType.push(sLurkType!);
                }
            }

        }
    }


    remove(username: string) {
        if (this.users.find(user => user === username)) {
            const posIndex = this.users.findIndex(user => user === username);
            this.users.splice(posIndex, 1);
            this.date.splice(posIndex, 1);
            this.lurkType.splice(posIndex, 1);
        }
    }

    /**
     * 
     * @returns {number}
     */
    getLength() {
        return this.users.length;
    }

    getUser() {
        return this.users;
    }

    findUser(username: string) {
        if (this.users.find(user => user === username)) {
            return true;
        }
        return false;
    }

    getLurkType(username: string) {

        if (this.users.find(user => user === username)) {
            const posIndex = this.users.findIndex(user => user === username);
            return this.lurkType[posIndex];
        }
        return "lurk";


    }



    clear() {
        this.users = [];
        this.date = [];
        this.lurkType = [];
    }

    getRandom() {
        return this.users[this.getRandomInt(this.users.length)];
    }

    getRandomInt(max: number) {
        return Math.floor(Math.random() * max);
    }
}