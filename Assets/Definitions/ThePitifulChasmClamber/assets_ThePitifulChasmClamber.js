/*jshint browser: true */
/*jshint -W097 */
/*jshint -W117 */
/*jshint -W061 */
//Assets for ThePitifulChasmClamber
"use strict";



/** END */

LoadSheetSequences = [
    { srcName: "Princess.png", count: 26, name: "PrincessWalking", trim: false },
    { srcName: "PrincessIdle.png", count: 11, name: "PrincessIdle", trim: false },
    { srcName: "PrincessSwim.png", count: 11, name: "PrincessSwim", trim: false },
    { srcName: "PrincessDuck.png", count: 11, name: "PrincessDuck", trim: false },
    { srcName: "PrincessFall.png", count: 11, name: "PrincessFall", trim: false },
    { srcName: "PrincessJump.png", count: 20, name: "PrincessJump", trim: false },
    { srcName: "PrincessClimb.png", count: 20, name: "PrincessClimb", trim: false },
    { srcName: "PrincessRope.png", count: 2, name: "PrincessRope", trim: false },
    { srcName: "DinoDragon.png", count: 15, name: "DinoDragon", trim: false },
    { srcName: "Cat.png", count: 17, name: "Cat", trim: false },

    //borders
    { srcName: "MossyBorders.png", count: 5, name: "MossyBorders", trim: false },
];

LoadFonts = [
    { srcName: "C64_Pro-STYLE.ttf", name: "C64" },
    { srcName: "ArcadeClassic.ttf", name: "Arcade" },
    { srcName: "Chasm.ttf", name: "Chasm" },
];

LoadTextures = [
    { srcName: "Title/PCC_title_768.webp", name: "Title" },

    //
    { srcName: "Wall/BrownishMossy_128.jpg", name: "BrownishMossy_128" },
    { srcName: "Wall/BrownishMossy_64.jpg", name: "BrownishMossy_64" },
    { srcName: "Wall/DarkRedBricks_128.jpg", name: "DarkRedBricks_128" },
    { srcName: "Wall/DatkMossy_128.jpg", name: "DatkMossy_128" },

    //levels
    { srcName: "Mask/Level_1.webp", name: "Level_1" },
    { srcName: "Mask/Level_2.webp", name: "Level_2" },
    { srcName: "Mask/Level_3.webp", name: "Level_3" },
    { srcName: "Mask/Level_4.webp", name: "Level_4" },
];

LoadAudio = [
    { srcName: "Arise.mp3", name: "Title" },
    { srcName: "death.mp3", name: "Death" },
    { srcName: "thud.mp3", name: "Thud" },
    { srcName: "Chew.mp3", name: "Chew" },
];

LoadShaders = [
    'vShader2D_1_0.glsl', 'fShader2D_1_0.glsl',
];

LoadSprites = [
    //items
    { srcName: "Items/Rope.webp", name: "Rope" },
    { srcName: "Items/GoldIngot.png", name: "Gold" },
    //UI
    { srcName: "UI/PrincessLives64.png", name: "Lives" },
    //
    { srcName: "Items/Skeleton.png", name: "Skeleton" },
    //mask decals
    { srcName: "MaskDecals/Flower1.png", name: "Flower1" },
    { srcName: "MaskDecals/Fungi1.png", name: "Fungi1" },
    { srcName: "MaskDecals/Fungi101.png", name: "Fungi101" },
    { srcName: "MaskDecals/Fungi101103.png", name: "Fungi101103" },
    { srcName: "MaskDecals/Fungi101123.png", name: "Fungi101123" },
    { srcName: "MaskDecals/Fungi1011231111.png", name: "Fungi1011231111" },
    { srcName: "MaskDecals/Fungi1011232.png", name: "Fungi1011232" },
    { srcName: "MaskDecals/Fungi1011232aa.png", name: "Fungi1011232aa" },
    { srcName: "MaskDecals/Fungi10113213122.png", name: "Fungi10113213122" },
    { srcName: "MaskDecals/Fungi101543.png", name: "Fungi101543" },
    { srcName: "MaskDecals/Fungi102.png", name: "Fungi102" },
    { srcName: "MaskDecals/Fungi1023.png", name: "Fungi1023" },
    { srcName: "MaskDecals/Fungi104.png", name: "Fungi104" },
    { srcName: "MaskDecals/Fungi121.png", name: "Fungi121" },
    { srcName: "MaskDecals/Fungi2.png", name: "Fungi2" },
    { srcName: "MaskDecals/Fungi201.png", name: "Fungi201" },
    { srcName: "MaskDecals/Fungi22221.png", name: "Fungi22221" },
    { srcName: "MaskDecals/Fungus1.png", name: "Fungus1" },
    { srcName: "MaskDecals/Fungus3.png", name: "Fungus3" },
    { srcName: "MaskDecals/Fungus4.png", name: "Fungus4" },
    { srcName: "MaskDecals/GreenWallFungi1.png", name: "GreenWallFungi1" },
    { srcName: "MaskDecals/Ladder1.png", name: "Ladder1" },
    { srcName: "MaskDecals/Lichen.png", name: "Lichen" },
    { srcName: "MaskDecals/Moss1.png", name: "Moss1" },
    { srcName: "MaskDecals/Moss2.png", name: "Moss2" },
    { srcName: "MaskDecals/Moss432.png", name: "Moss432" },
    { srcName: "MaskDecals/Mushroom_233.png", name: "Mushroom_233" },
    { srcName: "MaskDecals/Mushroom_234.png", name: "Mushroom_234" },
    { srcName: "MaskDecals/Mushroom_235.png", name: "Mushroom_235" },
    { srcName: "MaskDecals/Mushroom_236.png", name: "Mushroom_236" },
    { srcName: "MaskDecals/Mushroom_237.png", name: "Mushroom_237" },
    { srcName: "MaskDecals/Mushroom_238.png", name: "Mushroom_238" },
    { srcName: "MaskDecals/Mushroom_239.png", name: "Mushroom_239" },
    { srcName: "MaskDecals/Mushroom_240.png", name: "Mushroom_240" },
    { srcName: "MaskDecals/Mushroom_242.png", name: "Mushroom_242" },
    { srcName: "MaskDecals/Plant1.png", name: "Plant1" },
    { srcName: "MaskDecals/Plant2.png", name: "Plant2" },
    { srcName: "MaskDecals/SideFungus.png", name: "SideFungus" },
    { srcName: "MaskDecals/Spider126.png", name: "Spider126" },
    { srcName: "MaskDecals/Spider129.png", name: "Spider129" },
    { srcName: "MaskDecals/Spider4.png", name: "Spider4" },
    { srcName: "MaskDecals/Spider5.png", name: "Spider5" },
    { srcName: "MaskDecals/WallFungi1.png", name: "WallFungi1" },
    { srcName: "MaskDecals/WallFungi2.png", name: "WallFungi2" },
    { srcName: "MaskDecals/WallFungi3.png", name: "WallFungi3" },
    { srcName: "MaskDecals/WallFungi4.png", name: "WallFungi4" },
    { srcName: "MaskDecals/WallFungi5.png", name: "WallFungi5" },
    { srcName: "MaskDecals/YellowPlant1.png", name: "YellowPlant1" },
    { srcName: "MaskDecals/GnarlyTree_243.png", name: "GnarlyTree_243" },
    { srcName: "MaskDecals/GnarlyTree_244.png", name: "GnarlyTree_244" },
    { srcName: "MaskDecals/GnarlyTree_245.png", name: "GnarlyTree_245" },
    { srcName: "MaskDecals/GnarlyTree_246.png", name: "GnarlyTree_246" },
    { srcName: "MaskDecals/Water64_247.webp", name: "Water64_247" },
    { srcName: "MaskDecals/Water64_248.webp", name: "Water64_248" },
    { srcName: "MaskDecals/Water64_249.webp", name: "Water64_249" },
    { srcName: "MaskDecals/Water64_250.webp", name: "Water64_250" },
    { srcName: "MaskDecals/Water64_251.webp", name: "Water64_251" },
    { srcName: "MaskDecals/SkyGradient.jpg", name: "SkyGradient" },

    //mask elements
    { srcName: "MaskElements/AnotherLedge.png", name: "AnotherLedge" },
    { srcName: "MaskElements/CurvedTriangle.png", name: "CurvedTriangle" },
    { srcName: "MaskElements/FullDeepWedge.png", name: "FullDeepWedge" },
    { srcName: "MaskElements/FullDeepWedge2.png", name: "FullDeepWedge2" },
    { srcName: "MaskElements/Half.png", name: "Half" },
    { srcName: "MaskElements/HalfCorner.png", name: "HalfCorner" },
    { srcName: "MaskElements/HalfRidge.png", name: "HalfRidge" },
    { srcName: "MaskElements/HalfToFull.png", name: "HalfToFull" },
    { srcName: "MaskElements/HalfToHalf.png", name: "HalfToHalf" },
    { srcName: "MaskElements/HalfToZero.png", name: "HalfToZero" },
    { srcName: "MaskElements/HighLedge.png", name: "HighLedge" },
    { srcName: "MaskElements/Hook.png", name: "Hook" },
    { srcName: "MaskElements/InvCurvedTriangle.png", name: "InvCurvedTriangle" },
    { srcName: "MaskElements/InvHalfCorner.png", name: "InvHalfCorner" },
    { srcName: "MaskElements/InvHalfToFull.png", name: "InvHalfToFull" },
    { srcName: "MaskElements/InvHalfToZero.png", name: "InvHalfToZero" },
    { srcName: "MaskElements/InvThirdToFull.png", name: "InvThirdToFull" },
    { srcName: "MaskElements/InvThirdToZero.png", name: "InvThirdToZero" },
    { srcName: "MaskElements/Line.png", name: "Line" },
    { srcName: "MaskElements/LowLedge.png", name: "LowLedge" },
    { srcName: "MaskElements/MiniCorner.png", name: "MiniCorner" },
    { srcName: "MaskElements/Peak.png", name: "Peak" },
    { srcName: "MaskElements/RoughLine.png", name: "RoughLine" },
    { srcName: "MaskElements/Stalag.png", name: "Stalag" },
    { srcName: "MaskElements/Third.png", name: "Third" },
    { srcName: "MaskElements/ThirdRidge.png", name: "ThirdRidge" },
    { srcName: "MaskElements/ThirdToFull.png", name: "ThirdToFull" },
    { srcName: "MaskElements/ThirdToHalf.png", name: "ThirdToHalf" },
    { srcName: "MaskElements/ThirdToThird.png", name: "ThirdToThird" },
    { srcName: "MaskElements/ThirdToZero.png", name: "ThirdToZero" },
    { srcName: "MaskElements/Tit.png", name: "Tit" },
    { srcName: "MaskElements/Triangle.png", name: "Triangle" },
    { srcName: "MaskElements/highLedge2.png", name: "highLedge2" },
    { srcName: "MaskElements/highLedge3.png", name: "highLedge3" },

];

console.log("%cAssets for ThePitifulChasmClamber ready.", "color: orange");