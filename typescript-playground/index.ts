class Test {
    constructor(private id: number) {
        console.log('Hallo München!', this.id)
    }

    test() {
        console.log('test')
    }
}

let test = new Test(42);