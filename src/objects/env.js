/**
 * Envelope: v12.07.13
 * Envelope generator
 */
"use strict";

var timbre = require("../timbre");
// __BEGIN__

var Envelope = (function() {
    var Envelope = function() {
        initialize.apply(this, arguments);
    }, $this = timbre.fn.buildPrototype(Envelope, {
        base: "kr-ar",
        properties: {
            table: {
                set: function(value) {
                    var dx, name, _ = this._;
                    if (typeof value === "string") {
                        if (value === "~") {
                            name = _.tableName;
                            if (name.charAt(0) === "~") {
                                name = name.substr(1);
                            } else {
                                name = "~" + name;
                            }
                        } else {
                            name = value;
                        }
                        
                        if ((dx = Envelope.AmpTables[name]) !== undefined) {
                            if (typeof dx === "function") dx = dx();
                            _.tableName = name;
                            _.table = dx;
                        }
                    }
                },
                get: function(value) { return this._.tableName; }
            },
            delay: {
                set: function(value) {
                    if (typeof value === "number") this._.delay = value;
                },
                get: function() { return this._.delay; }
            },
            reversed: {
                set: function(value) {
                    this._.reversed = !!value;
                },
                get: function() { return this._.reversed; }
            },
            currentTime: {
                get: function() { return this._.currentTime; }
            }
        }, // properties
    });
    
    
    var initialize = function(_args) {
    };
    
    return Envelope;
}());
timbre.fn.register("env", Envelope);

Envelope.AmpSize = 512;
Envelope.AmpTables = {};
Envelope.AmpTables["linear"] = function() {
    var l, i;
    l = new Float32Array(Envelope.AmpSize);
    for (i = 0; i < Envelope.AmpSize; ++i) {
        l[i] = i / Envelope.AmpSize;
    }
    return l;
};

(function(list) {
    list.forEach(function(db) {
        Envelope.AmpTables[db + "db"] = function() {
            var l, i;
            l = new Float32Array(Envelope.AmpSize);
            for (i = 0; i < Envelope.AmpSize; ++i) {
                l[Envelope.AmpSize-i] = Math.pow(10, (db * (i/Envelope.AmpSize) / -20));
            }
            return l;
        };
        Envelope.AmpTables["~" + db + "db"] = function() {
            var l, i;
            l = new Float32Array(Envelope.AmpSize);
            for (i = 0; i < Envelope.AmpSize; ++i) {
                l[i] = 1 - Math.pow(10, (db * (i/Envelope.AmpSize) / -20));
            }
            return l;
        };
    });
}([24,32,48,64,96]));

// __END__
