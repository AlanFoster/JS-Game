var SequentialIdGenerator = function() {
    var count = 0;
    return {
        next: function() {
            return ++count;
        }
    };
};

exports.Generator = SequentialIdGenerator;