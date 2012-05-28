tests = (function() {
    "use strict";
    
    var i = 0, tests = [];
    
    tests[i] = function() {
        var t, synth, env;

        t = T("interval", 1000, function(count) {
            console.log(this.count, this.currentTime);
            env.bang();
        });
        
        synth = T("*", T("tri" , 1340, 0.5),
                       env = T("perc", 450));
        
        synth.onplay  = synth.onon   = function() { t.on() ; };
        synth.onpause = synth.onoff  = function() { t.off(); };
        synth.onbang  = function() { t.bang(); };
        
        return synth;
    }; tests[i++].desc = "interval";
    
    return tests;
}());