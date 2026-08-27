/*jshint browser: true */
/*jshint -W097 */
/*jshint -W117 */
/*jshint -W061 */

"use strict";

/** textures */
const TEXTURE_LIST = [
    "BrownishMossy_128", "DarkRedBricks_128", "DatkMossy_128", "BrownishMossy_64",
    "Wall128_306", "Wall128_307", "Wall128_308", "Wall128_309", "Wall128_310", "Wall128_311", "Wall128_312", "Wall128_313", "Wall128_314", "Wall128_315", "Wall128_316", "Wall128_317",
    "Wall128_318", "Wall128_319", "Wall128_320", "Wall128_321", "Wall128_322", "Wall128_323", "Wall128_324", "Wall128_325", "Wall128_326", "Wall128_327", "Wall128_328", "Wall128_329",
    "Wall128_330", "Wall128_331", "Wall128_332", "Wall128_333", "Wall128_334", "Wall128_335", "Wall128_336"
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
    "AnotherLedge", "CurvedTriangle", "FullDeepWedge", "FullDeepWedge2", "Half", "HalfCorner", "HalfRidge", "HalfToFull", "HalfToHalf", "HalfToZero", "HighLedge", "Hook",
    "InvCurvedTriangle", "InvHalfCorner", "InvHalfToFull", "InvHalfToZero", "InvThirdToFull", "InvThirdToZero", "Line", "LowLedge", "MiniCorner", "Peak", "RoughLine", "Stalag",
    "Third", "ThirdRidge", "ThirdToFull", "ThirdToHalf", "ThirdToThird", "ThirdToZero", "Tit", "Triangle", "highLedge2", "highLedge3",
    "Rough1", "Rough2", "Rough3", "Rough4", "RoughCorner", "RoughHalfCorner", "RoughThirdCorner", "RoughThirdToHalf"
];

const MASK_DECALS = [
    "Ladder1",
    "GnarlyTree_243", "GnarlyTree_244", "GnarlyTree_245", "GnarlyTree_246",
    "Water64_247", "Water64_248", "Water64_249", "Water64_250", "Water64_251",
    "SkyGradient",
    "Flower1", "Fungi1", "Fungi101", "Fungi101103", "Fungi101123", "Fungi1011231111", "Fungi1011232", "Fungi1011232aa", "Fungi10113213122", "Fungi101543", "Fungi102", "Fungi1023",
    "Fungi104", "Fungi121", "Fungi2", "Fungi201", "Fungi22221", "Fungus1", "Fungus3", "Fungus4", "GreenWallFungi1", "Lichen", "Moss1",
    "Moss2", "Moss432", "Mushroom_233", "Mushroom_234", "Mushroom_235", "Mushroom_236", "Mushroom_237", "Mushroom_238", "Mushroom_239", "Mushroom_240", "Mushroom_242", "Plant1",
    "Plant2", "SideFungus", "Spider126", "Spider129", "Spider4", "Spider5", "WallFungi1", "WallFungi2", "WallFungi3", "WallFungi4", "WallFungi5", "YellowPlant1",
    "Bush_300", "Bush_301", "Bush_302", "Bush_303", "Bush_304", "Bush_305",
    "Amphor1", "Amphor2", "Amphor3", "Fern1", "Fern2", "Flowers21", "Flowers22", "Log1", "Log13", "Log2", "Log4", "OldSkull",
    "Palm1", "Palm2", "Palm3", "Palm4", "Pot1", "Pot2", "Pot3", "Rock1", "Rock2", "ScaryTree1", "ScaryTree18", "ScaryTree2",
    "ScaryTree3", "ScaryTree4", "ScaryTree5", "ScaryTree6", "ScaryTree7", "SpiderWeb1", "SpiderWeb2", "Stalac1", "Stalac2", "Stalac3", "Trunk1", "Trunk2",
    "Trunk3", "Trunk4", "Vines1", "Vines2", "Vines3", "Vines4", "Vines5", "Vines6"

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