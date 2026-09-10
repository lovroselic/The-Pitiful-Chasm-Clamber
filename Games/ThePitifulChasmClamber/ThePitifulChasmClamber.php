<!DOCTYPE html>
<?php include_once $_SERVER['DOCUMENT_ROOT'] . '/Include/globals.php';?>
<html lang="en">

<head>
    <?php include_once $GL_root . $GL_path . '/Include/head_includes.php';?>

    <meta name="description"
        content="Climb, swing and survive 45 levels in The Pitiful Chasm Clamber, a free retro arcade platformer where the Princess must collect every treasure." />

    <meta name="keywords"
        content="The Pitiful Chasm Clamber, PCC, retro arcade platformer, browser game, Pitfall, Pitfall II -inspired game, JavaScript game, WebGL game, indie game, LaughingSkull" />

    <link rel="canonical" href="https://www.laughingskull.org/Games/ThePitifulChasmClamber/ThePitifulChasmClamber.php">
    <title>The Pitiful Chasm Clamber</title>
</head>

<body>
    <?php include_once $GL_root . $GL_path . '/Include/header.php';?>
    <?php include_once $GL_root . $GL_path . '/Include/resolutionAlert.php';?>
    <?php include_once $GL_root . $GL_path . '/Games/ThePitifulChasmClamber/ThePitifulChasmClamber.html.php';?>
    <?php include_once $GL_root . $GL_path . '/Include/footer.php';?>

    <!-- JS -->
    <script src="/Code/JS/Library/Engine/Prototype_6_01.js" type="text/javascript"></script>
    <script src="/Code/JS/Library/Engine/ENGINE_5_05.js" type="text/javascript"></script>
    <script src="/Code/JS/Library/Engine/GRID_4_06.js" type="text/javascript"></script>
    <script src="/Code/JS/Library/Engine/MAZE_5_00.js" type="text/javascript"></script>
    <script src="/Code/JS/Library/Engine/BWT_1_00.js" type="text/javascript"></script>
    <script src='/Code/JS/Library/Engine/IndexArrayManagers_4_03.js'></script>
    <script src='/Code/JS/Library/Engine/AI_3_03.js'></script>
    <script src="/Code/JS/Library/Engine/WebGL_2_05.js" type="text/javascript"></script>
    <script src="/Code/JS/Library/Engine/DEBUG_1_00.js" type="text/javascript"></script>
    <script src="/Assets/Definitions/ThePitifulChasmClamber/assets_ThePitifulChasmClamber.js" type="text/javascript">
    </script>
    <script src="/Assets/Definitions/ThePitifulChasmClamber/MAP_ThePitifulChasmClamber.js" type="text/javascript">
    </script>
    <script src="/Assets/Definitions/ThePitifulChasmClamber/Monsters_ThePitifulChasmClamber.js" type="text/javascript">
    </script>
    <script src="/Code/JS/Library/Engine/MAP and SPAWN tools_3_00.js" type="text/javascript"></script>
    <script src="/Code/JS/Library/Misc/score_1_05.js" type="text/javascript"></script>
    <script src="/Games/ThePitifulChasmClamber/ThePitifulChasmClamber.js" type="text/javascript"></script>
</body>

</html>