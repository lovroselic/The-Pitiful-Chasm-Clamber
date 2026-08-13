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
        data: '{"width":"17","height":"12","map":"BIAA22BAA39BAA8BAA9$AA20BAA22BAA6BB10ABB3ABB3ABB3AA2BB12聁聁2BABB9A聁聁19BB2"}',
        wall: "BrownishMossy_128",
        start: '[72,1]',
        carriers: '[[27,"BasicRope"]]',
        mask: '[[27,0,11,0]]',
        maskdecals: '[[158,0,8,0,64],[159,0,8,0,64],[160,0,8,0,64],[161,0,8,0,64],[162,0,8,0,64],[163,0,8,0,64],[164,0,8,0,64],[165,0,8,0,64],[166,0,8,0,64],[167,0,8,0,64],[175,0,8,0,64],[176,0,8,0,64],[177,0,8,0,64],[178,0,8,0,64],[179,0,8,0,64],[180,0,8,0,64],[181,0,8,0,64],[182,0,8,0,64],[183,0,8,0,64],[184,0,8,0,64],[185,0,8,0,64],[0,0,1,0,320],[13,0,4,0,320]]',
        connections: '["-1","4","-1","1"]',
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
    ,
    4: {
        name: "Just East",
        data: '{"width":17,"height":12,"map":"B$AA34BAA100BB33ABB33A"}',
        wall: "BrownishMossy_128",
        start: '[136,1]',
        mask: '[]',
        maskdecals: '[]',
        connections: '["-1","-1","-1","2"]',
    }
};