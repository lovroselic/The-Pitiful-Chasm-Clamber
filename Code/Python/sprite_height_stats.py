#!/usr/bin/env python3
"""Measure the visible width and height of every frame in a horizontal sprite sheet.

Edit the configuration below, then run this file directly in Spyder (F5).
"""

from __future__ import annotations

from pathlib import Path
from statistics import fmean

from PIL import Image, UnidentifiedImageError


# -----------------------------------------------------------------------------
# CONFIGURATION
# -----------------------------------------------------------------------------

INPUT_FILENAME = (
    r"C:\Users\Uporabnik\Documents\JS\The Pitiful Chasm Clamber"
    r"\Assets\Graphics\SheetSequences\Cat.png"
)

FRAME_WIDTH = 64

# Ignore pixels whose alpha is at or below this value.
# Use 0 for every visible pixel, or try 8 to ignore faint antialiasing fringes.
ALPHA_THRESHOLD = 0


def input_path() -> Path:
    path = Path(INPUT_FILENAME).expanduser()

    if path.is_absolute():
        return path

    script_folder = (
        Path(__file__).resolve().parent
        if "__file__" in globals()
        else Path.cwd()
    )

    return script_folder / path


def visible_size(
    frame: Image.Image,
    alpha_threshold: int,
) -> tuple[int, int]:

    alpha = frame.getchannel("A")

    if alpha_threshold == 0:
        bounds = alpha.getbbox()
    else:
        lookup = [
            0 if value <= alpha_threshold else 255
            for value in range(256)
        ]
        bounds = alpha.point(lookup).getbbox()

    if bounds is None:
        return 0, 0

    left, top, right, bottom = bounds

    width = right - left
    height = bottom - top

    return width, height


def main() -> None:
    source_path = input_path()

    if FRAME_WIDTH <= 0:
        raise ValueError("FRAME_WIDTH must be greater than zero")

    if not 0 <= ALPHA_THRESHOLD <= 254:
        raise ValueError("ALPHA_THRESHOLD must be between 0 and 254")

    if not source_path.is_file():
        raise ValueError(f'Input file not found: "{source_path}"')

    try:
        with Image.open(source_path) as source:

            has_alpha = (
                "A" in source.getbands()
                or "transparency" in source.info
            )

            if not has_alpha:
                raise ValueError(
                    "The image has no transparency/alpha channel; "
                    "visible sprite bounds cannot be separated "
                    "from the background."
                )

            if source.width % FRAME_WIDTH != 0:
                raise ValueError(
                    f"Sheet width ({source.width}px) is not divisible by "
                    f"frame width ({FRAME_WIDTH}px)."
                )

            sheet = source.convert("RGBA")
            frame_count = sheet.width // FRAME_WIDTH

            if frame_count == 0:
                raise ValueError("The sheet contains no complete frames.")

            widths = []
            heights = []

            for index in range(frame_count):
                left = index * FRAME_WIDTH

                frame = sheet.crop(
                    (
                        left,
                        0,
                        left + FRAME_WIDTH,
                        sheet.height,
                    )
                )

                width, height = visible_size(
                    frame,
                    ALPHA_THRESHOLD,
                )

                widths.append(width)
                heights.append(height)

    except (OSError, UnidentifiedImageError) as error:
        raise ValueError(
            f'Could not read "{source_path}": {error}'
        ) from error

    print(f"Sprite sheet:    {source_path}")
    print(f"Frames:          {len(widths)}")

    print()
    print(f"Minimum width:   {min(widths)} px")
    print(f"Maximum width:   {max(widths)} px")
    print(f"Average width:   {fmean(widths):.2f} px")
    print("Frame widths:    " + ", ".join(map(str, widths)) + " px")

    print()
    print(f"Minimum height:  {min(heights)} px")
    print(f"Maximum height:  {max(heights)} px")
    print(f"Average height:  {fmean(heights):.2f} px")
    print("Frame heights:   " + ", ".join(map(str, heights)) + " px")

    empty_frames = [
        str(index + 1)
        for index, (width, height) in enumerate(zip(widths, heights))
        if width == 0 and height == 0
    ]

    if empty_frames:
        print(
            "\nWarning: fully transparent frame(s) were included "
            "as size 0 × 0: "
            + ", ".join(empty_frames)
        )


if __name__ == "__main__":
    try:
        main()
    except ValueError as error:
        print(f"Error: {error}")