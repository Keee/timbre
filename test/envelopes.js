tests = (function() {
    "use strict";
    
    var i = 0, tests = [];
    
    tests[i] = function() {
        var synth, tri, env;
        synth = T("*", tri = T("tri" , 1340, 0.5),
                       env = T("adsr", 500, 500));
        
        synth.onplay = function() { env.bang(); };
        synth.onbang = function() {
            env.status === "s" ? env.keyoff() : env.bang();
        };
        env.onA     = function() { tri.freq = 1340; };
        env.onD     = function() { tri.freq =  880; };
        env.onS     = function() { tri.freq =  660; };
        env.onR     = function() { tri.freq =  440; };
        env.onended = function() { synth.pause(); };
        env.delayTime = 100;
        
        synth.listener = T("rec", 3000).listen(env).off();
        
        return synth;
    }; tests[i++].desc = "adsr: delay->a->d->end";
    
    tests[i] = function() {
        var synth, tri, env;
        synth = T("*", tri = T("tri" , 1340, 0.5),
                       env = T("adsr", 500, 500, 0.25, 500));
        
        synth.onplay = function() { env.bang(); };
        synth.onbang = function() {
            env.status === "s" ? env.keyoff() : env.bang();
        };
        env.onA     = function() { tri.freq = 1340; };
        env.onD     = function() { tri.freq =  880; };
        env.onS     = function() { tri.freq =  660; };
        env.onR     = function() { tri.freq =  440; };
        env.onended = function() { synth.pause(); };
        
        synth.listener = T("rec", 5000).listen(env).off();
        
        return synth;
    }; tests[i++].desc = "adsr: a->d->s->r";

    tests[i] = function() {
        var synth, tri, env;
        synth = T("*", tri = T("tri" , 1340, 0.5),
                       env = T("adsr", 500, 500, 0.5, 500));
        
        synth.onplay = function() { env.bang(); };
        synth.onbang = function() {
            env.status === "s" ? env.keyoff() : env.bang();
        };
        env.onA     = function() { tri.freq = 1340; };
        env.onD     = function() { tri.freq =  880; };
        env.onS     = function() { tri.freq =  660; };
        env.onR     = function() { tri.freq =  440; };
        env.onended = function() { synth.pause(); };
        env.sustainTime = 3000;
        env.reversed = true;
        
        synth.listener = T("rec", 5000).listen(env).off();
        
        return synth;
    }; tests[i++].desc = "adsr: sustain-rate & reversed";

    tests[i] = function() {
        var synth, tri, env;
        synth = T("*", tri = T("tri" , 1340, 0.5),
                       env = T("perc", 500));
        
        synth.onplay = function() { env.bang(); };
        synth.onbang = function() { env.bang(); };
        env.onended = function() { synth.pause(); console.log(env.currentTime); };
        env.iteration = 30;
        env.decayRate = 0.45;
        
        synth.listener = T("rec", 3000).listen(env).off();
        
        return synth;
    }; tests[i++].desc = "perc:";

    tests[i] = function() {
        var synth, tri, env;
        synth = T("*", T("HPF", 8000, T("noise")),
                  env = T("perc", 30), 0.1)        
        
        synth.onplay = function() { env.bang(); };
        synth.onbang = function() { env.bang(); };
        env.iteration = 0;
        env.decayRate = 0;
        
        synth.listener = T("rec", 3000).listen(env).off();
        
        return synth;
    }; tests[i++].desc = "perc:";
    
    return tests;
}());