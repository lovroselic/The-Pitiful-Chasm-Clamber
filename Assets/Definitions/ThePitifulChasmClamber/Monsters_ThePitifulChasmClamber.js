/*jshint browser: true */
/*jshint -W097 */
/*jshint -W117 */
/*jshint -W061 */

"use strict";
console.log("%cMonsters for Booga loaded.", "color: #888");

const HERO_TYPE = {
    Princess: {
        name: "Princess",
        assetName: "PrincessIdle",
        animate: true,
        dirRef: RIGHT,
        w: 64,
        h: 64,
        fps: 120,
        preventRotation: true,
    }
};

const MONSTER_TYPE = {
    DinoDragon: {
        name: "DinoDragon",
        category: "enemy",
        assetName: "DinoDragon",
        w: 64,
        h: 64,
        innerH: 42,
        innerW: 64,
        dirRef: RIGHT,
        animate: true,
        fps: 60,
        speed: 2.0 * 64,
        behaviourArguments: [Infinity, ["wanderer"], 10000, ["wanderer1D"]],
        preventRotation: true,
        fly: true,
    },
    /* CarniPlant: {
        name: "CarniPlant",
        category: "enemy",
        assetName: "CarniPlant",
        w: 64,
        h: 64,
        dirRef: RIGHT,
        animate: true,
        fps: 12,
        //speed: 1.0 * 64,
        static: true,
        //behaviourArguments: [Infinity, ["wanderer"], 10000, ["hunter2D"]],
        preventRotation: true,
    }, */

};

const SWINGING_ROPE_TYPE = {
    BasicRope: {
        swingLength: 3.5,        // grids
        swingWidth: 5,          // grids
        spriteName: "Rope",
        swingPeriod: 4,         // not tuned
        w: 5,
        dirRef: DOWN,
        animate: false,
        static: true,
        preventRotation: true,
    }
};