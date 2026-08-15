#!/usr/bin/env python3
"""Measure the visible height of every frame in a horizontal sprite sheet.

Edit the configuration below, then run this file directly in Spyder (F5).
"""

from __future__ import annotations

from pathlib import Path
from statistics import fmean

from PIL import Image, UnidentifiedImageError


# -----------------------------------------------------------------------------
# CONFIGURATION
# A relative filename is resolved from the folder containing this script.
# You can also paste a full Windows path, for example:
# INPUT_FILENAME = r"C:\Sprites\PrincessWalking.png"
# -----------------------------------------------------------------------------
INPUT_FILENAME = r"C:\Users\Uporabnik\Documents\JS\The Pitiful Chasm Clamber\Assets\Graphics\SheetSequences\PrincessSwim.png"
FRAME_WIDTH = 64
ALPHA_THRESHOLD = 0  # Ignore pixels with alpha <= this value; try 8 for fringes.


def input_path() -> Path:
    path = Path(INPUT_FILENAME).expanduser()
    if path.is_absolute():
        return path

    script_folder = (
        Path(__file__).resolve().parent if "__file__" in globals() else Path.cwd()
    )
    return script_folder / path


def visible_height(frame: Image.Image, alpha_threshold: int) -> int:
    alpha = frame.getchannel("A")

    if alpha_threshold == 0:
        bounds = alpha.getbbox()
    else:
        lookup = [0 if value <= alpha_threshold else 255 for value in range(256)]
        bounds = alpha.point(lookup).getbbox()

    return 0 if bounds is None else bounds[3] - bounds[1]


def main() -> None:
    source_path = input_path()

    if FRAME_WIDTH <= 0:
        raise ValueError("FRAME_WIDTH must be greater than zero")
    if not 0 <= ALPHA_THRESHOLD <= 254:
        raise ValueError("ALPHA_THRESHOLD must be between 0 and 254")
    if not source_path.is_file():
        raise ValueError(f'input file not found: "{source_path}"')

    try:
        with Image.open(source_path) as source:
            has_alpha = "A" in source.getbands() or "transparency" in source.info
            if not has_alpha:
                raise ValueError(
                    "the image has no transparency/alpha channel; visible sprite "
                    "bounds cannot be separated from its background"
                )

            if source.width % FRAME_WIDTH != 0:
                raise ValueError(
                    f"sheet width ({source.width}px) is not divisible by frame "
                    f"width ({FRAME_WIDTH}px)"
                )

            sheet = source.convert("RGBA")
            frame_count = sheet.width // FRAME_WIDTH
            if frame_count == 0:
                raise ValueError("the sheet contains no complete frames")

            heights = []
            for index in range(frame_count):
                left = index * FRAME_WIDTH
                frame = sheet.crop((left, 0, left + FRAME_WIDTH, sheet.height))
                heights.append(visible_height(frame, ALPHA_THRESHOLD))

    except (OSError, UnidentifiedImageError) as error:
        raise ValueError(f'could not read "{source_path}": {error}') from error

    print(f"Sprite sheet:    {source_path}")
    print(f"Frames:         {len(heights)}")
    print(f"Minimum height: {min(heights)} px")
    print(f"Maximum height: {max(heights)} px")
    print(f"Average height: {fmean(heights):.2f} px")
    print("Frame heights:  " + ", ".join(map(str, heights)) + " px")

    empty_frames = [str(index + 1) for index, height in enumerate(heights) if height == 0]
    if empty_frames:
        print(
            "Warning: fully transparent frame(s) were included as height 0: "
            + ", ".join(empty_frames)
        )


if __name__ == "__main__":
    try:
        main()
    except ValueError as error:
        print(f"Error: {error}")
