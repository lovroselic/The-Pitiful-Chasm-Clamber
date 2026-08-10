/*jshint browser: true */
/*jshint -W097 */
/*jshint -W117 */
/*jshint -W061 */
"use strict";

/////////////////////////////////////////////////
/*
      
TODO:
    * 
known bugs: 
    
    * i don't do bugs

retests:
    * all completed

 */
////////////////////////////////////////////////////

const DEBUG = {
    SETTING: true,
    FPS: true,
    VERBOSE: true,
    _2D_display: true,
    INVINCIBLE: false,
    keys: false,
    max17: false,
    calledFunction() {
        const caller = new Error().stack
            ?.split("\n")[2]
            ?.trim();

        console.log("Called by:", caller);
    },
    calledStack(begin = 0, end = 3) {
        const off = 2;
        const stack = new Error().stack
            ?.split("\n")
            .filter(line => !/^Error\b/.test(line))
            .slice(off + begin, off + end)
            .join("\n");

        console.log(stack);
    }
};

const INI = {
    SCREEN_BORDER: 64,
    WALKING_SPEED: 64 * 1.5,
    CLIMBING_SPEED: 64 * 1.5,
    SWIMMING_SPEED: 64 * 1.5,
    TEXT_SIZE: 13,
    JUMP_SPEED: 64 * 4.0,               // converts charged power into pixels/second
    LADDER_EXIT: 64 * 2.0,              // converts charged power into pixels/second
    SIDE_DRIFT: 64 * 0.25,
    GRAVITY: 500,                       // pixels/second² 500
};

const PRG = {
    VERSION: "0.3.6",
    NAME: "The Pitiful Chasm Clamber",
    YEAR: "2026",
    SG: "ThePitifulChasmClamber",
    CSS: "color: #239AFF;",
    COLOR: "#239AFF",
    INIT() {
        console.star(PRG.COLOR);
        console.title(`${PRG.NAME} ${PRG.VERSION} by Lovro Selic, ${"\u00A9"} LaughingSkull ${PRG.YEAR} on ${navigator.userAgent}`);
        console.star(PRG.COLOR);
        $("#title").html(PRG.NAME);
        $("#version").html(`${PRG.NAME} V${PRG.VERSION} <span style='font-size:14px'>&copy</span> LaughingSkull ${PRG.YEAR}`);
        $("input#toggleAbout").val("About " + PRG.NAME);
        $("#about fieldset legend").append(" " + PRG.NAME + " ");

        ENGINE.autostart = true;
        ENGINE.start = PRG.start;
        ENGINE.readyCall = GAME.setup;
        ENGINE.setGridSize(64);
        ENGINE.setSpriteSheetSize(64);
        ENGINE.init();
    },
    setup() {

        $("#engine_version").html(ENGINE.VERSION);
        $("#grid_version").html(GRID.VERSION);
        $("#maze_version").html(DUNGEON.VERSION);
        $("#iam_version").html(IndexArrayManagers.VERSION);
        $("#lib_version").html(LIB.VERSION);
        $("#webgl_version").html(WebGL.VERSION);
        $("#maptools_version").html(MAP_TOOLS.VERSION);

        $("#toggleHelp").click(function () {
            $("#help").toggle(400);
        });
        $("#toggleAbout").click(function () {
            $("#about").toggle(400);
        });
        $("#toggleVersion").click(function () {
            $("#debug").toggle(400);
        });

        //boxes
        ENGINE.gameWIDTH = 1088;
        ENGINE.titleWIDTH = ENGINE.gameWIDTH + 2 * INI.SCREEN_BORDER;
        ENGINE.sideWIDTH = INI.SCREEN_BORDER;
        ENGINE.gameHEIGHT = 768;
        ENGINE.titleHEIGHT = 96;
        ENGINE.bottomHEIGHT = 80;
        ENGINE.bottomWIDTH = ENGINE.titleWIDTH;
        MAP_TOOLS.INI.FOG = false;
        GRID.SETTING.COLLISION_STEP = 16;
        //GRID.WALL_COLLISION_TOLERANCE = 1.01

        $("#bottom").css("margin-top", ENGINE.gameHEIGHT + ENGINE.titleHEIGHT + ENGINE.bottomHEIGHT);
        $(ENGINE.gameWindowId).width(ENGINE.gameWIDTH + 2 * ENGINE.sideWIDTH + 4);
        ENGINE.addBOX("TITLE", ENGINE.titleWIDTH, ENGINE.titleHEIGHT, ["title", "smalltitle", "score", "level", "hiscore", "time", "jump"], null);
        ENGINE.addBOX("LSIDE", INI.SCREEN_BORDER, ENGINE.gameHEIGHT, ["Lsideback",], "side");
        ENGINE.addBOX("ROOM", ENGINE.gameWIDTH, ENGINE.gameHEIGHT, ["background", "grid", "coord", "3d_webgl", "fill", "info", "text", "FPS", "button", "click"], "side");
        ENGINE.addBOX("SIDE", ENGINE.sideWIDTH, ENGINE.gameHEIGHT, ["sideback"], "fside");
        ENGINE.addBOX("DOWN", ENGINE.bottomWIDTH, ENGINE.bottomHEIGHT, ["bottom", "bottomText", "subtitle", "lives",], null);

        MAP_TOOLS.use2D();

        /** dev settings */
        if (DEBUG.VERBOSE) {
            WebGL.VERBOSE = true;
            ENGINE.verbose = true;
            MAP_TOOLS.INI.VERBOSE = true;
            AI.VERBOSE = true;
        }
    },
    start() {
        console.star(PRG.COLOR);
        console.chapter(`${PRG.NAME} ${PRG.VERSION} STARTED!`);
        console.star(PRG.COLOR);
        $(ENGINE.topCanvas).off("mousemove", ENGINE.mouseOver);
        $(ENGINE.topCanvas).off("click", ENGINE.mouseClick);
        $(ENGINE.topCanvas).css("cursor", "");
        $("#startGame").addClass("hidden");
        ENGINE.disableDefaultKeys();
        TITLE.startTitle();
    }
};

const HERO = {
    construct() {
        this.player = null;
        this.dead = false;
        this.setMode("idle", RIGHT);


        //binds
        this.handleFinishedJump = this.handleFinishedJump.bind(this);
    },
    setMode(mode = "idle", dir = RIGHT) {
        /**
         * idle
         * jumping
         * falling, idle but straight
         */
        if (mode === this.mode) return;
        this.mode = mode;

        switch (this.mode) {
            case "idle":
                this.player?.sprite.setAsset("PrincessIdle");
                this.player?.sprite.setDirRef(dir);
                break;

            case "walking":
                this.player.sprite.setAsset("PrincessWalking", false);
                this.player.sprite.setDirRef(dir);
                break;

            case "climbing":
                this.player.sprite.setAsset("PrincessClimb", false);
                this.player.sprite.setDirRef(dir);
                break;

            case "jumping":
                this.player.sprite.setAsset("PrincessJump");
                this.player.sprite.setDirRef(dir);
                break;

            case "falling":
                this.player.sprite.setAsset("PrincessFall");
                this.player.sprite.setDirRef(DOWN);
                break;

            case "ducking":
                this.player.sprite.setAsset("PrincessDuck");
                this.player.sprite.setDirRef(DOWN);
                break;

            case "swimming":
                this.player.sprite.setAsset("PrincessSwim");
                this.player.sprite.setDirRef(dir);
                break;


            default: throw new Error(`Hero mode not suported: ${this.mode}`);
        }

        this.player?.sprite.update(dir);
        console.warn("set mode", this.mode, "pos", this.player?.sprite.pos);
    },
    concludeAction() {

        //conclusion for walking, 
        if (["walking", "ducking"].includes(this.mode)) {
            this.setMode("idle", this.player.sprite.dir);
            this.player.motion.deactivate();
            return;
        }

        //conclusion for climbing, swimming
        if (["climbing", "swimming"].includes(this.mode)) {
            this.player.motion.deactivate(true);                // keep props
            return;
        }
    },
    die() {
        if (DEBUG.VERBOSE) console.red("HERO.die");


        if (HERO.dead) return;
        HERO.dead = true;
        //this.row = INI.MAX_ROW;
    },
    async death() {
        ENGINE.GAME.ANIMATION.stop();
        GAME.lives--;
        if (DEBUG.VERBOSE) console.red(`HERO.death, lives: ${GAME.lives}`);
        await AUDIO_TOOLS.playAndWait(AUDIO.Chew);
        await AUDIO_TOOLS.playAndWait(AUDIO.Death);
        HERO.finalDeath();
    },
    finalDeath() {
        console.red("HERO.finalDeath");
        if (GAME.lives > 0) return GAME.continueLevel(GAME.level);
        GAME.checkScore();
        TITLE.hiscore();
        TITLE.startTitle();
    },
    async manage(lapsedTime) {
        //console.warn("manage", lapsedTime);
        await GRID.translateSpritePosition(HERO.player, lapsedTime, HERO.handleFinishedJump, true, false);
        this.player.collisionToEntity();

        //update animations even if not moving for selected modes
        // modes not updated: climbing,
        if (["idle", "ducking"].includes(this.mode)) this.player.sprite.updateAnimation(lapsedTime);

        //debug
        this.paintLanding([this.player.sprite.pos]);
    },
    completeLevel() {
        GAME.levelComplete = true;
        GAME.level = Math.min(INI.MAX_LEVEL, ++GAME.level);
        if (DEBUG.VERBOSE) console.ok(`level completed, next one: ${GAME.level}`);
        GAME.levelStart(GAME.level);
    },
    playerSetUp() {
        const map = MAP[GAME.level].map;
        const start_dir = map.startPosition.vector;
        const start_grid = Grid.toClass(map.startPosition.grid);
        HERO.player = new $2D_player(start_grid, start_dir, HERO_TYPE.Princess, map.GA, map, true);
        //HERO.player.addDeathTexture(SPRITE.FleaSkeleton);
        //this.row = INI.MAX_ROW;
        if (GAME.time) GAME.time.unregister();
        if (DEBUG.VERBOSE) console.note("playerSetUp, HERO set to start grid");
    },
    handleHoleMove(grid) { },
    getWho(grid) {
        const map = MAP.main.map;
        const IA = map.enemyIA;
        const who = IA.unroll(grid)[0] || null;     //expected only one
        return who;
    },
    handleEmptyMove(grid) { },
    handleMaskMove(grid) { },
    handleReservedMove(grid) {
        GAME.score += INI.SCORE_GOAL;
        TITLE.score();
        GAME.timeRemains = GAME.time.remains();
        HERO.player.sprite.hide();
        GAME.time.stop();
        GAME.time.deactivate();
        AUDIO.LevelUp.play();
        ENGINE.GAME.pauseBlock();
        ENGINE.GAME.paused = true;
        ENGINE.GAME.ANIMATION.next(GAME.goalReachedRun);
    },
    async handleOutOfBounds(context) {
        console.warn("handleOutOfBounds", context);
        //ENGINE.GAME.ANIMATION.stop();                                       // not sure if really required
        let map = MAP[GAME.level].map;
        const pos = this.player.sprite.pos;
        let grid = GRID.pointToGrid(pos);
        console.log("handleOutOfBounds grid", grid, "pos", pos);

        let connectionIndex;
        if (grid.x === 0) connectionIndex = 3;                              //west
        else if (grid.y === 0) connectionIndex = 0;                         // north
        else if (grid.x === map.width - 1) connectionIndex = 1;             // east
        else if (grid.y === map.height - 1) connectionIndex = 2;            // south

        const nextLevel = parseInt(MAP[GAME.level].connections[connectionIndex], 10);
        if (nextLevel <= 0) throw new Error(`wrong or not existing connection ${nextLevel}`);

        GAME.STORE.storeIAM(MAP[GAME.level].map);                           // store old map
        GAME.level = nextLevel;
        const level = GAME.level;


        // prepare new map 
        if (!MAP[level].map) {
            console.log("preparing new map");
            GAME.STORE.clearPools();
            await GAME.loadNewLevel(level);
            GAME.STORE.linkMap(MAP[level].map);
        } else {
            await GAME.createBitmaps(level);
            console.log("reloading map");
            GAME.reloadIAM(level);                                  // or reload stored IAM
        }

        map = MAP[level].map;

        if (grid.x === 0) grid.x = map.width - 1;                   //west
        else if (grid.y === 0) grid.y = map.height - 1;             // north
        else if (grid.x === map.width - 1) grid.x = 0;              // east
        else if (grid.y === map.height - 1) grid.y = 0;             // south

        //console.log("level", level, "new grid", grid);

        this.player.setGrid(grid);
        if (this.mode !== "falling") {
            this.setMode("idle", this.player.sprite.dir);
            this.player.motion.deactivate();
        }
        this.player.setMap(MAP[level].map);

        //console.error(" new pos:  this.player.sprite.pos", this.player.sprite.pos, "grid", this.player.sprite.pos.toGrid());

        GAME.drawFirstFrame(level);
        return { finished: false, pos: this.player.sprite.pos };
    },
    handleCarry() { },
    handleDuck() {
        this.setMode("ducking", this.player.sprite.dir);
    },
    handleJump(dir) {
        if (this.mode === "swimming") return;
        this.performJump(dir, INI.JUMP_SPEED);
    },
    handleMove(dir) {
        if (this.mode === "swimming") {
            return this.handleSwimming(dir);
        }

        if (dir.y !== 0) return this.handleVerticalMove(dir);       // x-only here

        if (this.mode === "climbing") {
            const sideGrid = GRID.pointToGrid(this.player.sprite.pos).add(dir);
            //console.log("moving of climbing test", sideGrid);
            return this.performJump(dir, INI.LADDER_EXIT); // moving from ladder

        }

        // only horizontal moves below
        if (!["idle", "walking",].includes(this.mode)) return;                              // only selected modes
        this.startWalking(dir);
    },
    handleSwimming(dir) {
        console.warn("handleSwimming", dir, "this.player.motion", this.player.motion);
        const mode = "swimming";
        this.setMode(mode);
        this.player.motion.setType(mode);   
        this.player.sprite.setDir(dir);                        // no importance, but aligned with mode, just in case
        this.player.motion.setVelocity({ x: dir.x * INI.SWIMMING_SPEED, y: dir.y * INI.SWIMMING_SPEED });
        this.player.motion.setAcceleration({ x: 0, y: 0 });
        this.player.motion.activate();
    },
    handleVerticalMove(dir) {
        //console.info("handling vertical move", dir);

        // block incompatible modes
        if (this.mode === "climbing") {
            this.player.motion.velocity.y = Math.abs(this.player.motion.velocity.y) * Math.sign(dir.y);;
            return this.player.motion.activate();
        }


        //
        const pos = this.player.sprite.pos;
        let grid = GRID.pointToGrid(pos);
        const GA = this.player.map.GA;
        if (!GA.isStair(grid)) {
            if (dir.y === 1) grid = grid.add(DOWN);
            if (GA.isStair(grid)) {
                this.player.sprite.pos = GRID.gridToCenterPX(grid);
                const gs2 = (ENGINE.INI.GRIDPIX >>> 1) * GRID.SETTING.WALL_COLLISION_TOLERANCE;
                this.player.sprite.pos = Point.rounded(this.player.sprite.pos.translate(UP, gs2));              //if ladder is below feet, move to that grid, top-wise
            } else return;                                                                                      // no climbing possible if not on stairs, or above them
        } else {
            this.player.sprite.pos = GRID.centerPointToGrid(this.player.sprite.pos);    //to grid center
        }

        console.info(".. where we are", grid, "is stair", GA.isStair(grid));
        this.startClimbing(dir);
    },
    startClimbing(dir) {
        this.player.sprite.setDir(dir);
        const speed = INI.CLIMBING_SPEED;
        const mode = "climbing";
        this.setMode(mode, dir);
        this.player.motion.setType(mode);                           // no importance, but aligned with mode, just in case
        this.player.motion.setVelocity({ x: 0, y: dir.y * speed });
        console.log("velocity", this.player.motion.velocity.y);
        this.player.motion.setAcceleration({ x: 0, y: 0 });
        this.player.motion.activate();
    },
    handleNothingWasPressed() { },
    startWalking(dir) {
        //console.info("startWalking", this.player.sprite.pos);
        this.player.sprite.setDir(dir);
        const speed = INI.WALKING_SPEED;
        const mode = "walking";
        this.setMode(mode, dir);
        this.player.motion.setType(mode);                           // no importance, but aligned with mode, just in case
        this.player.motion.setVelocity({ x: dir.x * speed, y: 0 });
        this.player.motion.setAcceleration({ x: 0, y: 0 });
        this.player.motion.activate();
    },
    performJump(dir, speed) {
        if (this.player.motion.active) return;
        const component = speed * Math.SQRT1_2;                     // cos(45°) and sin(45°)
        const mode = "jumping";
        this.setMode(mode, dir);
        this.player.motion.setType(mode);                           // no importance, but aligned with mode, just in case
        this.player.motion.setVelocity({ x: dir.x * component, y: -component });
        this.player.motion.setAcceleration({ x: 0, y: INI.GRAVITY });
        this.player.motion.activate();
    },
    handlePositionCollision(context) {
        console.error("handlePositionCollision", context);
        const entity = context.entity;
        const motion = entity.motion;
        let contact = Point.rounded(context.collision.contact);
        const gs2 = (ENGINE.INI.GRIDPIX >>> 1) * GRID.SETTING.WALL_COLLISION_TOLERANCE;             // ~ half grid
        const gs4 = gs2 >>> 1;                                                                      // ~ quarter grid    
        let origin = Point.rounded(context.currentPos.translate(DOWN, gs2));
        let candidate = Point.rounded(context.candidatePos.translate(DOWN, gs2));
        let candidateSide = candidate.translate(entity.sprite.dir, gs4);
        const type = context.collision.type;

        switch (type) {

            case "outOfBounds": return this.handleOutOfBounds(context);

            case "blocked":
                switch (this.mode) {
                    case "climbing":
                    case "swimming":
                        return { finished: false, pos: context.currentPos, };
                    case "walking":
                        this.setMode("idle", this.player.sprite.dir);
                        this.player.motion.deactivate();
                        return { finished: false, pos: context.currentPos, };
                    case "jumping":
                        motion.velocity.x = 0;                                                                      // stop side movement
                        motion.velocity.y = Math.abs(motion.velocity.y);                                            // keep speed down or revert from up
                        this.setMode("falling", DOWN);
                        motion.setType("falling");
                        motion.setAcceleration({ x: 0, y: INI.GRAVITY });
                        return { finished: false, pos: context.currentPos, };

                };

            case "surface":
                this.setMode("idle", this.player.sprite.dir);
                this.player.motion.deactivate();
                contact = ENGINE.adjustPointToUpperGrid(contact);                                                   // adjust
                //console.warn("contact", contact, contact.to_Grid());
                contact.y--;                                                                                        //one px up, out of wall
                const finalSafePos = contact.translate(UP, gs2);
                return { finished: true, pos: finalSafePos, };

            case "unsupported":
                switch (this.mode) {
                    case "walking":
                        motion.velocity.x = entity.sprite.dir.x * INI.SIDE_DRIFT;                                     // slight side movement
                        motion.velocity.y = Math.abs(motion.velocity.y);                                            // keep speed down or revert from up
                        this.setMode("falling", DOWN);
                        motion.setType("falling");
                        motion.setAcceleration({ x: 0, y: INI.GRAVITY });
                        return { finished: false, pos: candidateSide, };
                }

            case "water":
                this.setMode("swimming", this.player.sprite.dir);
                const newGrid = context.collision.contact.to_Grid();
                const newPos = GRID.gridToCenterPX(newGrid);
                console.log("context.candidatePos", context.candidatePos, "water grid", newGrid, newPos);
                this.player.motion.deactivate();
                return { finished: false, pos: newPos, };

            default: throw new Error(`handlePositionCollision wrong event type ${type}`);
        }
    },
    paintLanding(points) {
        ENGINE.clearLayer("fill");
        const CTX = LAYER.fill;
        CTX.fillStyle = "#e60b0b";
        for (const point of points) {
            let p = point.toViewportCopy();
            CTX.pixelAtPoint(p, 6);
        }
    },
    handleFinishedJump(result) {
        console.error("handleFinishedJump", result);
        const sprite = this.player.sprite;
        const grid = sprite.getGrid();
        this.player.moveState.reset(grid);
        this.player.checkEndMove();
    },
};

const GAME = {
    time: null,
    realSpeed: null,
    highSpeed: null,
    restarted: false,
    timerRunning: false,
    levelComplete: false,
    timeRemains: null,
    start() {
        if (DEBUG.VERBOSE) console.log("GAME started");
        if (AUDIO.Title) {
            AUDIO.Title.pause();
            AUDIO.Title.currentTime = 0;
        }
        $(ENGINE.topCanvas).off("mousemove", ENGINE.mouseOver);
        $(ENGINE.topCanvas).off("click", ENGINE.mouseClick);
        $(ENGINE.topCanvas).css("cursor", "");
        ENGINE.hideMouse();
        ENGINE.GAME.pauseBlock();
        ENGINE.GAME.paused = true;

        let GameRD = new RenderData("Chasm", 45, "#fF2010", "text", "#f38982", 3, 3, 4);
        ENGINE.TEXT.setRD(GameRD);
        ENGINE.watchVisibility(ENGINE.GAME.lostFocus);
        ENGINE.GAME.setGameLoop(GAME.run);
        ENGINE.GAME.start(16);
        GAME.extraLife = SCORE.extraLife.clone();
        GAME.level = 2; //1
        GAME.lives = 3; //3
        GAME.score = 0;

        const storeList = ["ENEMY2D"];
        GAME.STORE = new Store(storeList);

        GAME.fps = new FPS_short_term_measurement(300);
        if (DEBUG._2D_display) GRID.grid();

        GAME.levelStart(GAME.level);
    },
    WebGL_settings() {
        WebGL.INI.BACKGROUND_ALPHA = 0.0;
    },
    async loadNewLevel(level) {
        if (DEBUG.VERBOSE) console.log("Loading new level", level);
        await GAME.initLevel(level);
    },
    async levelStart(level) {
        if (DEBUG.VERBOSE) console.log("Starting level", level);
        GAME.prepareForRestart();
        HERO.construct();
        await GAME.initLevel(level);
        GAME.continueLevel(level);
    },
    continueLoadedLevel(level) {
        if (DEBUG.VERBOSE) console.log("Continue LOADED level", level);
    },
    continueLevel(level) {
        if (DEBUG.VERBOSE) console.log("Continue level", level);
        GAME.clearPools();
        SPAWN_TOOLS_2D.spawn(level);
        HERO.dead = false;
        HERO.setMode("idle", RIGHT);
        HERO.playerSetUp();
        GAME.setCameraView();
        GAME.setWorld();
        GAME.levelExecute();
        AI.initialize(HERO.player, "2D");
        AI.immobileWander = false;
    },
    clearPools() {
        ENEMY2D.clearAll();
    },
    levelExecute() {
        if (DEBUG.VERBOSE) {
            console.line();
            console.log("\nExecute level", GAME.level, "\n\n");
            console.line();
        }

        ENGINE.VIEWPORT.reset();
        ENGINE.VIEWPORT.check(HERO.player.actor.pos);
        ENGINE.VIEWPORT.alignToPosition(HERO.player.actor.pos, HERO.player.actor.vPos);
        GAME.time = new CountDown("main", INI.LEVEL_TIME, GAME.completedTime, true);
        GAME.drawFirstFrame(GAME.level);
        ENGINE.GAME.resume();
    },
    setCameraView() {
        WebGL.hero.camera2D = new $2D_Camera(ENGINE.gameWIDTH, ENGINE.gameHEIGHT);
        WebGL.camera = WebGL.hero.camera2D;
    },
    async initLevel(level) {
        if (DEBUG.VERBOSE) console.info("init level", level);
        this.newDungeon(level);
        this.buildWorld(level);
        ENGINE.VIEWPORT.setMax({ x: MAP[level].pw, y: MAP[level].ph });
        await this.createBitmaps(level);
    },
    async createBitmaps(level) {
        await BITMAP.store(TEXTURE[`Level_${level}`], "screen");
    },
    setWorld() {
        WebGL.init2D('webgl');
    },
    buildWorld(level) {
        if (DEBUG.VERBOSE) console.info(" ******** building world, room/dungeon/level:", level);
        WebGL.init_required_IAM(MAP[level].map, HERO);
        //SPAWN_TOOLS_2D.spawn(level);
    },
    newDungeon(level) {
        MAP_TOOLS.unpack(level);
        MAP[level].unpacked = false;
    },
    prepareForRestart() {
        let clear = ["background", "text", "FPS", "button", "bottomText", "fill"];
        ENGINE.clearManylayers(clear);
        TITLE.blackBackgrounds();
        ENGINE.TIMERS.clear();
        GAME.STORE.clearPools();
    },
    reloadIAM(level) {
        if (DEBUG.VERBOSE) console.log("reloading IAM");
        GAME.STORE.loadIAM(MAP[level].map);
        GAME.STORE.linkMap(MAP[level].map);
    },
    async setup() {
        console.log("GAME SETUP started");
        $("#conv").remove();
        GAME.WebGL_settings();
        WebGL.setContext('webgl');
        await ASSET.convertToTextures();
    },
    setTitle() {
        const text = GAME.generateTitleText();
        const RD = new RenderData("Chasm", 18, "#0E0", "bottomText");
        const SQ = new RectArea(0, 0, LAYER.bottomText.canvas.width, LAYER.bottomText.canvas.height);
        GAME.movingText = new MovingText(text, 4, RD, SQ);
    },
    generateTitleText() {
        let text = `${PRG.NAME} ${PRG.VERSION
            }, a game by Lovro Selič, (C) LaughingSkull ${PRG.YEAR}. 
             
            Music: 'Arise' written and performed by LaughingSkull, (C) 2007 Lovro Selič. `;
        text += "     ENGINE, SPEECH, GRID, MAZE, Burrows-Wheeler RLE Compression, WebGL, shaders and GAME code by Lovro Selič using JavaScript and GLSL. ";
        text += "     glMatrix library by Brandon Jones and Colin MacKenzie IV. Thanks. ";
        text = text.split("").join(String.fromCharCode(8202));
        return text;
    },
    runTitle() {
        if (ENGINE.GAME.stopAnimation) return;
        GAME.movingText.process();
        GAME.titleFrameDraw();
    },
    titleFrameDraw() {
        GAME.movingText.draw();
    },
    drawFirstFrame(level) {
        if (DEBUG.VERBOSE) console.log("drawing first frame");
        if (DEBUG._2D_display) GRID.paintCoord("coord", MAP[GAME.level].map);

        TITLE.firstFrame();
        ENGINE.VIEWPORT.changed = true;
        ENGINE.VIEWPORT.alignToPosition(HERO.player.actor.pos, HERO.player.actor.vPos);
        GAME.updateVieport();
    },
    async run(lapsedTime) {
        if (ENGINE.GAME.stopAnimation) return;
        const date = Date.now();
        GAME.respond(lapsedTime);
        ENGINE.TIMERS.update();
        await HERO.manage(lapsedTime);
        ENEMY2D.manage(lapsedTime, HERO.player);
        GAME.frameDraw(lapsedTime);
        HERO.concludeAction(lapsedTime);
        if (HERO.dead) IAM.checkIfProcessesComplete([EXPLOSION3D], HERO.death);
        if (GAME.completed) GAME.won();
    },
    frameDraw(lapsedTime) {
        GAME.updateVieport();
        WebGL.render2DScene(MAP[GAME.level].map);
        TITLE.time();
        if (DEBUG.FPS) {
            GAME.FPS(lapsedTime);
        }
    },
    updateVieport() {
        if (!ENGINE.VIEWPORT.changed) return;
        ENGINE.VIEWPORT.change(BITMAP.screen, "background");
        ENGINE.VIEWPORT.changed = false;
    },
    respond(lapsedTime) {
        if (HERO.dead) return;
        if (GAME.levelComplete) return;

        HERO.player.respond(lapsedTime);
        WebGL.GAME.respond(lapsedTime);
        ENGINE.GAME.respond(lapsedTime);

        const map = ENGINE.GAME.keymap;

        //debug
        if (map[ENGINE.KEY.map.F7]) {
            if (!DEBUG.keys) return;
        }
        if (map[ENGINE.KEY.map.F8]) {
            if (!DEBUG.keys) return;

            ENGINE.GAME.keymap[ENGINE.KEY.map.F8] = false;

            console.log("\nDEBUG:");
            console.log("#######################################################");

            console.log("#######################################################");
        }
        if (map[ENGINE.KEY.map.F9]) {
            ENGINE.GAME.keymap[ENGINE.KEY.map.F9] = false;

            if (!DEBUG.keys) return;

            console.log("\nDEBUG:");
            console.log("#######################################################");

            console.log("#######################################################");
        }

        return;
    },
    FPS(lapsedTime) {
        let CTX = LAYER.FPS;
        CTX.fillStyle = "white";
        ENGINE.clearLayer("FPS");
        let fps = 1000 / lapsedTime || 0;
        GAME.fps.update(fps);
        CTX.fillText(GAME.fps.getFps(), 5, 10);
    },
    gameOverRun(lapsedTime) {
        if (ENGINE.GAME.stopAnimation) return;
        if (ENGINE.GAME.keymap[ENGINE.KEY.map.enter]) {
            ENGINE.GAME.ANIMATION.waitThen(TITLE.startTitle);
        }
        const date = Date.now();
        WebGL.GAME.setThirdPerson();
        EXPLOSION3D.manage(date);
        ENTITY3D.manage(lapsedTime, date, [HERO.invisible, HERO.dead]);
        GAME.lifeLostFrameDraw(lapsedTime);
    },
    checkScore() {
        SCORE.checkScore(GAME.score);
        SCORE.hiScore();
    },
    completedTime() {
        console.error("completed time", GAME.time.remains());
        //
    },
    goalReachedRun() {
        if (ENGINE.GAME.stopAnimation) return;
        if (GAME.timeRemains > 0) {
            GAME.timeRemains--;
            GAME.score += INI.SCORE_PER_SECOND;
            GAME.goalReachedFrameDraw();
        } else {
            GAME.timeRemains = null;
            HERO.completeLevel();
            HERO.playerSetUp();
            ENGINE.GAME.resume();
        }
    },
    goalReachedFrameDraw() {
        TITLE.time();
        TITLE.score();
    }
};

const TITLE = {
    startTitle() {
        if (DEBUG.VERBOSE) console.log("TITLE started");
        //if (AUDIO.Title) AUDIO.Title.play(); //dev

        ENGINE.GAME.pauseBlock();
        TITLE.clearAllLayers();
        TITLE.blackBackgrounds();
        TITLE.titlePlot();
        ENGINE.draw("background", (ENGINE.gameWIDTH - TEXTURE.Title.width) / 2, (ENGINE.gameHEIGHT - TEXTURE.Title.height) / 2, TEXTURE.Title);
        $("#DOWN")[0].scrollIntoView();
        ENGINE.topCanvas = ENGINE.getCanvasName("ROOM");
        TITLE.drawButtons();
        GAME.setTitle();
        ENGINE.GAME.start(16);
        ENGINE.GAME.ANIMATION.next(GAME.runTitle);
    },
    clearAllLayers() {
        ENGINE.layersToClear = new Set(["text",
            "sideback", "button", "title", "FPS", "info", "subtitle", "smalltitle",
            "score", "level", "hiscore",
            "lives", "time", "jump",
            "fill",
            "grid", "coord",
            "bottomText"]);
        ENGINE.clearLayerStack();
        WebGL.transparent();
    },
    blackBackgrounds() {
        this.topBackground();
        this.bottomBackground();
        this.sideBackground();
        ENGINE.fillLayer("background", "#000");
    },
    topBackground() {
        const CTX = LAYER.title;
        CTX.fillStyle = "#000";
        CTX.roundRectLegacy(0, 0, ENGINE.titleWIDTH, ENGINE.titleHEIGHT, { upperLeft: 20, upperRight: 20, lowerLeft: 0, lowerRight: 0 }, true, true);
    },
    bottomBackground() {
        const CTX = LAYER.bottom;
        CTX.fillStyle = "#000";
        CTX.roundRectLegacy(0, 0, ENGINE.bottomWIDTH, ENGINE.bottomHEIGHT, { upperLeft: 0, upperRight: 0, lowerLeft: 20, lowerRight: 20 }, true, true);
    },
    sideBackground() {
        ENGINE.fillLayer("sideback", "#000");
        ENGINE.fillLayer("Lsideback", "#000");
    },
    makeGrad(CTX, x, y, w, h) {
        const f1 = -0.0010;
        const f2 = 0.00015;
        const grad = CTX.createLinearGradient(x, y, x * f1 + w, y * f2 + h);
        //const grad = CTX.createLinearGradient(x, y, w, h);

        grad.addColorStop(0.000, "#c25c28");
        grad.addColorStop(0.025, "#b03519");
        grad.addColorStop(0.050, "#860d0d");
        grad.addColorStop(0.075, "#810000");
        grad.addColorStop(0.100, "#990000");

        grad.addColorStop(0.125, "#B00000");
        grad.addColorStop(0.150, "#C80000");
        grad.addColorStop(0.175, "#DD1200");
        grad.addColorStop(0.200, "#EF2A00");
        grad.addColorStop(0.225, "#FF4400");

        grad.addColorStop(0.250, "#FF6000");
        grad.addColorStop(0.275, "#FF7A00");
        grad.addColorStop(0.300, "#FF9500");
        grad.addColorStop(0.325, "#FFB000");
        grad.addColorStop(0.350, "#FFD000");

        grad.addColorStop(0.375, "#EFFF00");
        grad.addColorStop(0.400, "#CFFF00");
        grad.addColorStop(0.425, "#AAFF00");
        grad.addColorStop(0.450, "#82F800");
        grad.addColorStop(0.475, "#5CEB00");

        grad.addColorStop(0.500, "#32D900");
        grad.addColorStop(0.525, "#18C800");
        grad.addColorStop(0.550, "#00B800");
        grad.addColorStop(0.575, "#00A828");
        grad.addColorStop(0.600, "#00994A");

        grad.addColorStop(0.625, "#008C66");
        grad.addColorStop(0.650, "#007F7F");
        grad.addColorStop(0.675, "#007399");
        grad.addColorStop(0.700, "#0068B0");
        grad.addColorStop(0.725, "#005FC8");

        grad.addColorStop(0.750, "#00a9dd");
        grad.addColorStop(0.775, "#00ddcb");
        grad.addColorStop(0.800, "#00dd76");
        grad.addColorStop(0.825, "#07dd00");
        grad.addColorStop(0.850, "#72dd00");

        grad.addColorStop(0.875, "#97dd00");
        grad.addColorStop(0.900, "#d6dd00");
        grad.addColorStop(0.925, "#dda600");
        grad.addColorStop(0.950, "#edb819");
        grad.addColorStop(0.975, "#f9c529");
        grad.addColorStop(1.000, "#f9c829");

        return grad;
    },
    titlePlot() {
        const CTX = LAYER.title;
        const fs = 32;
        CTX.font = fs + "px Chasm";
        CTX.textAlign = "center";
        let txt = CTX.measureText(PRG.NAME);
        let x = ENGINE.titleWIDTH / 2;
        let y = fs * 1.75;
        let gx = x - txt.width / 2;
        let gy = y - fs;
        let grad = this.makeGrad(CTX, gx, gy + 10, gx, gy + fs);
        CTX.fillStyle = grad;
        GAME.grad = grad;
        CTX.shadowColor = "#666666";
        CTX.shadowOffsetX = 2;
        CTX.shadowOffsetY = 2;
        CTX.shadowBlur = 3;
        CTX.fillText(PRG.NAME, x, y);
    },
    smalTitle() {
        ENGINE.clearLayer("smalltitle");
        const CTX = LAYER.smalltitle;
        const fs = INI.TEXT_SIZE;
        CTX.font = fs + "px Chasm";
        CTX.textAlign = "center";
        const smallTitle = MAP[GAME.level].name;
        let txt = CTX.measureText(smallTitle);
        let x = ENGINE.titleWIDTH / 2;
        let y = fs + 4;
        let gx = x - txt.width / 2;
        let gy = y - fs;
        let grad = this.makeGrad(CTX, gx, gy + 2, gx, gy + fs);
        CTX.fillStyle = grad;
        GAME.grad = grad;
        CTX.shadowColor = "#666666";
        CTX.shadowOffsetX = 1;
        CTX.shadowOffsetY = 1;
        CTX.shadowBlur = 1;
        CTX.fillText(smallTitle, x, y);
    },
    drawButtons() {
        ENGINE.clearLayer("button");
        FORM.BUTTON.POOL.clear();
        let x = 8;
        const w = 100;
        const h = 24;
        const F = 1.5;
        let y = 768 - 3 * (F * h);

        const buttonColors = new ColorInfo("#F00", "#A00", "#222", "#666", 13);
        const musicColors = new ColorInfo("#0E0", "#090", "#222", "#666", 13);

        y += F * h;
        FORM.BUTTON.POOL.push(new Button("Start game", new Area(x, y, w, h), buttonColors, GAME.start));

        y += F * h;
        FORM.BUTTON.POOL.push(new Button("Title music", new Area(x, y, w, h), musicColors, TITLE.music));

        FORM.BUTTON.draw();
        $(ENGINE.topCanvas).on("mousemove", { layer: ENGINE.topCanvas }, ENGINE.mouseOver);
        $(ENGINE.topCanvas).on("click", { layer: ENGINE.topCanvas }, ENGINE.mouseClick);
    },
    firstFrame() {
        TITLE.score();
        TITLE.stage();
        TITLE.hiscore();
        //TITLE.lives();
        //TITLE.time();
        //TITLE.jumpPower();
        TITLE.smalTitle();
    },
    music() {
        AUDIO.Title.play();
    },
    /* jumpPower() {
        const CTX = LAYER.time;
        ENGINE.clearLayer("jump");
        const x = 64;
        const h = 12;
        const y = ENGINE.titleHEIGHT - h - 1 - 16;
        const w = ENGINE.gameWIDTH;
        const fraction = HERO.jumpPower / INI.MAX_JUMP_POWER;
        ENGINE.percentBar(fraction, y, CTX, w, ["green", "yellow", "red"], h, x, 0);
    }, */
    time() {
        const CTX = LAYER.time;
        ENGINE.clearLayer("time");
        const x = 400 + 32;
        const fs = INI.TEXT_SIZE;
        const y = ENGINE.titleHEIGHT / 2 + fs / 4;
        CTX.font = fs + "px Chasm";
        CTX.textAlign = "left";
        CTX.fillStyle = "rgb(11, 239, 11)";
        if (!GAME.time.active) CTX.fillStyle = "rgb(228, 193, 19)";
        CTX.shadowColor = "#24843a";
        CTX.shadowOffsetX = 1;
        CTX.shadowOffsetY = 1;
        CTX.shadowBlur = 1;
        const time = GAME.time.time();
        CTX.fillText(`Time: ${time.m.toString().padStart(2, "0")}:${time.s.toString().padStart(2, "0")}`, x, y);

    },
    score() {
        ENGINE.clearLayer("score");
        const CTX = LAYER.score;
        const fs = INI.TEXT_SIZE;;
        const x = 64;
        const y = ENGINE.titleHEIGHT / 2 + fs / 4;
        CTX.font = fs + "px Chasm";
        CTX.textAlign = "left";
        CTX.fillStyle = "rgb(10, 149, 10)";
        CTX.shadowColor = "#666";
        CTX.shadowOffsetX = 1;
        CTX.shadowOffsetY = 1;
        CTX.shadowBlur = 1;
        CTX.fillText(`Score: ${GAME.score.toString().padStart(5, "0")}`, x, y);
        if (GAME.score >= GAME.extraLife[0]) {
            GAME.lives++;
            GAME.extraLife.shift();
            TITLE.lives();
            AUDIO.ExtraLife.play();
        }
    },
    stage() {
        ENGINE.clearLayer("level");
        const CTX = LAYER.level;
        const fs = INI.TEXT_SIZE;;
        const x = 240 + 32;
        const y = ENGINE.titleHEIGHT / 2 + fs / 4;
        CTX.font = fs + "px Chasm";
        CTX.textAlign = "left";
        CTX.fillStyle = "#146dfb";
        CTX.shadowColor = "#666";
        CTX.shadowOffsetX = 1;
        CTX.shadowOffsetY = 1;
        CTX.shadowBlur = 1;
        CTX.fillText(`Room: ${GAME.level.toString().padStart(1, "0")}`, x, y);
    },
    hiscore() {
        ENGINE.clearLayer("hiscore");
        const CTX = LAYER.hiscore;
        const fs = INI.TEXT_SIZE;;
        const x = ENGINE.gameWIDTH + INI.SCREEN_BORDER;;
        const y = ENGINE.titleHEIGHT / 2 + fs / 4;
        CTX.font = fs + "px Chasm";
        CTX.textAlign = "right";
        CTX.fillStyle = "#dc0d0d";
        CTX.shadowColor = "#666";
        CTX.shadowOffsetX = 1;
        CTX.shadowOffsetY = 1;
        CTX.shadowBlur = 1;
        let HS;
        const index = SCORE.SCORE.name[0].indexOf("&nbsp");
        if (index > 0) {
            HS = SCORE.SCORE.name[0].substring(0, SCORE.SCORE.name[0].indexOf("&nbsp"));
        } else {
            HS = SCORE.SCORE.name[0];
        }
        const text = "HISCORE: " + SCORE.SCORE.value[0].toString().padStart(5, "0") + " by " + HS;
        CTX.fillText(text, x, y);
    },
    lives() {
        ENGINE.clearLayer("lives");
        if (GAME.lives < 1) return;
        const CTX = LAYER.lives;
        const cX = ENGINE.bottomWIDTH / 2;
        const y = ENGINE.bottomHEIGHT / 2;
        const spread = ENGINE.spreadAroundCenter(GAME.lives - 1, cX, 72);
        for (let x of spread) {
            ENGINE.spriteDraw("lives", x, y, SPRITE.Lives);
        }
    }
};

// -- main --
$(() => {
    PRG.INIT();
    PRG.setup();
    ENGINE.LOAD.preload();
    UNIFORM.setup();
    SCORE.init("SC", "PCC", 10, 1000);
    SCORE.loadHS();
    SCORE.hiScore();
    SCORE.extraLife = [Infinity];
});