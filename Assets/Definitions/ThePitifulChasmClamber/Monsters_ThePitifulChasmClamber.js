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
        behaviourArguments: [Infinity, ["wanderer1D"], 10000, ["wanderer1D"]],
        preventRotation: true,
        fly: true,
        flyOffsetY: 40,
    },
    Cat: {
        name: "Cat",
        category: "enemy",
        assetName: "Cat",
        w: 64,
        h: 64,
        innerH: 34,
        innerW: 60,
        dirRef: RIGHT,
        animate: true,
        fps: 60,
        speed: 2.0 * 64,
        behaviourArguments: [Infinity, ["wanderer1D"], 10000, ["wanderer1D"]],
        preventRotation: true,
        fly: false,
    },
    Bat: {
        name: "Bat",
        category: "enemy",
        assetName: "Bat",
        w: 64,
        h: 64,
        innerH: 40,
        innerW: 51,
        dirRef: RIGHT,
        animate: true,
        fps: 60,
        speed: 2.5 * 64,
        behaviourArguments: [Infinity, ["wanderer1D"], 10000, ["wanderer1D"]],
        preventRotation: true,
        fly: true,
        flyOffsetY: 40,
    },
    Shark: {
        name: "Shark",
        category: "enemy",
        assetName: "Shark",
        w: 64,
        h: 64,
        innerH: 30,
        innerW: 64,
        dirRef: RIGHT,
        animate: true,
        fps: 60,
        speed: 3.0 * 64,
        behaviourArguments: [Infinity, ["wanderer1D"], 10000, ["wanderer1D"]],
        preventRotation: true,
        fly: true,
        flyOffsetY: 0,
    },
    Spider: {
        name: "Spider",
        category: "enemy",
        assetName: "Spider",
        w: 64,
        h: 64,
        innerH: 32,
        innerW: 58,
        dirRef: RIGHT,
        animate: true,
        fps: 60,
        speed: 2.5 * 64,
        behaviourArguments: [Infinity, ["wanderer1D"], 10000, ["wanderer1D"]],
        preventRotation: true,
        fly: false,
    },
    Aligator: {
        name: "Aligator",
        category: "enemy",
        assetName: "Aligator",
        w: 64,
        h: 64,
        innerH: 13,
        innerW: 64,
        dirRef: RIGHT,
        animate: true,
        fps: 60,
        speed: 3.0 * 64,
        behaviourArguments: [Infinity, ["wanderer1D"], 10000, ["wanderer1D"]],
        preventRotation: true,
        fly: false,
    },
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
        constructor: $2D_SwingingRope,
    },
    Baloon: {
        swingLength: 1.5,        // grids 2.5
        spriteName: "Rope",
        parentSpriteName: "Baloon",
        w: 5,
        dirRef: DOWN,
        animate: false,
        static: false,
        preventRotation: true,
        constructor: $2D_Traveller,
        behaviourArguments: [Infinity, ["wanderer1D"], 10000, ["wanderer1D"]],
        speed: 2.0 * 64,
    }
};

const GOLD_ITEM_TYPE = {
    Gold: {
        name: "Gold",
        spriteName: "Gold",
        category: "gold",
        score: 1,
    },
    GoldPrincess: {
        name: "GoldPrincess",
        spriteName: "GoldPrincess",
        category: "gold",
        score: 100,
    },
    SilverPrincess: {
        name: "SilverPrincess",
        spriteName: "SilverPrincess",
        category: "gold",
        score: 50,
    },
    BronzePrincess: {
        name: "BronzePrincess",
        spriteName: "BronzePrincess",
        category: "gold",
        score: 25,
    },
    Diamond: {
        name: "Diamond",
        spriteName: "Diamond",
        category: "gold",
        score: 15,
    },
    Emerald: {
        name: "Emerald",
        spriteName: "Emerald",
        category: "gold",
        score: 10,
    },
    Ruby: {
        name: "Ruby",
        spriteName: "Ruby",
        category: "gold",
        score: 5,
    },
    Amethyst: {
        name: "Amethyst",
        spriteName: "Amethyst",
        category: "gold",
        score: 2,
    },
};