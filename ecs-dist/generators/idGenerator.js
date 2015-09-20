"use strict";

var SequentialIdGenerator = function SequentialIdGenerator() {
    var count = 0;
    return {
        next: function next() {
            return ++count;
        }
    };
};

module.exports = SequentialIdGenerator;