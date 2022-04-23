export class LurkHandler {

    private users = [
    ""
    ];

    constructor() {
        this.users=[]
    }

    /**
     * Add a new user
     * @param {String} newUser 
     */
    add(newUser: string) {
        if (!this.users.find(user => user === newUser)) {
            this.users.push(newUser);
        }
    }

    remove(username:string) {
        if (this.users.find(user => user === username)) {
            const posIndex = this.users.findIndex(user => user === username);
            this.users.splice(posIndex, 1);
        }
    }

    /**
     * 
     * @returns {number}
     */
    getLength() {
        return this.users.length;
    }

    get() {
        return this.users;
    }

    clear(){
        this.users=[];
    }
}