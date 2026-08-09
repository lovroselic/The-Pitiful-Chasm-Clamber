/*jshint browser: true */
/*jshint -W097 */
/*jshint -W117 */
/*jshint -W061 */

"use strict";
console.log("%cMAP for ThePitifulChasmClamber loaded.", "color: #888");

/** Map definitions */
const MAP = {
    1: {
        name: "Start",
        data: '{"width":"17","height":"12","map":"B$ABAA2BB5AA63BB2AA23䁡A䁡AA12䁩䁩2AA15BABB8AA2BAA2BB9ABB8䁡䁩BB11AA2BB2ABB10䁩BB5AA2BAA2BB2"}',
        wall: "BrownishMossy_128",
        start: '[180,1]',
        mask: '[]',
        maskdecals: '[[144,0,0,0,64],[161,0,0,0,64],[178,0,0,0,64],[195,0,0,0,64],[2,0,1,0,320],[6,0,2,0,320],[10,0,3,0,320],[14,0,4,0,320],[147,0,0,0,64],[164,0,0,0,64],[181,0,0,0,64]]',
        connections: '["-1","2","3","-1"]',
    }
    ,
    2: {
        name: "Pool",
        data: '{"width":"17","height":"12","map":"B$AA39BAA70BB3AA50BB21AA2BB3AA2BB11A"}',
        wall: "BrownishMossy_128",
        start: '[123,1]',
        mask: '[]',
        maskdecals: '[]',
        connections: '["-1","-1","-1","1"]',
    }
    ,
    3: {
        name: "Below",
        data: '{"width":17,"height":12,"map":"AA153B䁡䁡2BB2AA20BB4$BB4ABB14AA3"}',
        wall: "BrownishMossy_128",
        start: '[23,1]',
        mask: '[]',
        maskdecals: '[[8,0,0,0,64],[25,0,0,0,64]]',
        connections: '["1","-1","-1","-1"]',
    }
};