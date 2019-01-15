"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Test = /** @class */ (function () {
    function Test(id) {
        this.id = id;
        console.log('Hallo München!', this.id);
    }
    Test.prototype.test = function () {
        console.log('test');
    };
    return Test;
}());
exports.Test = Test;
//# sourceMappingURL=test.js.map