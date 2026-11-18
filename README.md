# Trail Cutoff

Check race cutoff times, mark crossings and calculate the pace needed to make the next trail checkpoint.

Use the course’s actual cutoffs to work out the next checkpoint pace. A margin already earned at a marked checkpoint stays fixed while the budget for the next one continues counting down.

## Start a race and mark a checkpoint

1. Enter checkpoints as cumulative distance and cumulative minutes from the start, for example `5|50,12|115,21|200`. Both numbers must rise at each entry.
2. Press **Start** at the start line. The first page replaces **Ready** with the pace budget for checkpoint one.
3. Click when you actually cross a checkpoint. The bar records checkpoints in order and moves to the next one, whichever preview you had on screen.

![The first checkpoint moves from Ready to a required pace, then the second checkpoint appears.](media/guide/start-checkpoint-clock.gif)

## Read the banked margin

1. Turn back to the completed checkpoint. Its signed whole-minute margin compares your recorded crossing time with its cutoff.
2. Turn forward to the next limit. The required pace uses the distance from your last recorded checkpoint and the time still available now.
3. Hold the wheel to undo a mistaken crossing. To reset a race, hold **Start** and click to confirm.

![The second checkpoint’s pace gives way to the first checkpoint’s positive margin and back again.](media/guide/review-checkpoint-margin.gif)

## Example from the emulator

With cutoffs of 50 minutes at 5 km and 115 minutes at 12 km, crossing 5 km at minute 45 banks five minutes. At that moment, 70 minutes remain for the next 7 km, or 10:00/km. The fast button presses in the GIF demonstrate navigation.

## Run in the emulator

Open BUSY Bar Emulator. From this repository, run:

```sh
~/.busy-emulator/bin/busy-emulator dev --once
```

Press **Back** to exit.

The GIFs are excerpts from the emulator recording. Each front-display pixel is shown at 9× its original width and height. The end frames pause for reading.

[Full recording](media/controls.mp4) · [Rear display](screenshots/back-1.png) · [Firmware test](EMULATOR-QA.md) · [MIT license](LICENSE)

## Device settings

Open **Apps → Trail Cutoff → Setup**. Save the fields and reopen the app to use the new values.

- **Distance km | cutoff minutes** (`gates`). Default: `5|50,12|115,21|200`.
