/*jshint browser: true */
/*jshint -W097 */
/*jshint -W117 */
/*jshint -W061 */

"use strict";

/** textures */
const TEXTURE_LIST = [
    "BrownishMossy_128", "DarkRedBricks_128", "DatkMossy_128", "BrownishMossy_64",
].sort();

/** Decals */
const DECAL_PAINTINGS = [

].sort();

/** Crests */

const DECAL_CRESTS = [].sort();

//lights
const LIGHT_DECALS = [

].sort();

//panorama
const PANORAMA_DECALS = [

].sort();

//arch
const ARCH_DECALS = [

].sort();;

//sky
const SKY_DECALS = [

].sort();

//mask elements

const MASK_ELEMENTS = [

];

const MASK_DECALS = [
    "Ladder1",
    "GnarlyTree_243", "GnarlyTree_244", "GnarlyTree_245", "GnarlyTree_246",
    //
    "Flower1", "Fungi1", "Fungi101", "Fungi101103", "Fungi101123", "Fungi1011231111", "Fungi1011232", "Fungi1011232aa", "Fungi10113213122", "Fungi101543", "Fungi102", "Fungi1023",
    "Fungi104", "Fungi121", "Fungi2", "Fungi201", "Fungi22221", "Fungus1", "Fungus3", "Fungus4", "GreenWallFungi1", "Lichen", "Moss1",
    "Moss2", "Moss432", "Mushroom_233", "Mushroom_234", "Mushroom_235", "Mushroom_236", "Mushroom_237", "Mushroom_238", "Mushroom_239", "Mushroom_240", "Mushroom_242", "Plant1",
    "Plant2", "SideFungus", "Spider126", "Spider129", "Spider4", "Spider5", "WallFungi1", "WallFungi2", "WallFungi3", "WallFungi4", "WallFungi5", "YellowPlant1"

];

const BORDER_ASSETS = [
    "MossyBorders",
];

const TRIGGER_DECALS = [];
const LAIR_DECALS = [].sort();

const CONTAINER_LIST = [];
if (typeof CONTAINER_ITEM_TYPE !== "undefined") {

    for (const container in CONTAINER_ITEM_TYPE) {
        CONTAINER_LIST.push(container);
    }
}
console.log("%cMAP for MapEditor loaded.", "color: #888");