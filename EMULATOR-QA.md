# Emulator verification

On-device state and physical controls exercised in the firmware emulator.

Started the race, recorded checkpoint one and inspected its margin and the pace needed for checkpoint two.

18 distinct frames were recorded on firmware 1.3.1. App io.ncoooooper.trailcutoff exited: finished; heap peak 84.4 of 128 KiB. Screenshots are in screenshots/ and the recording is in media/.

## Display capture

Firmware 1.3.1 rendered both README examples. Each square in a guide GIF is one front LED in a 16 × 16 cell. The production archive was built from the source in this repository.

## Screen transition capture

Firmware 1.3.1 rendered the display sequences in the README. The guide uses a 14 × 14 lit area inside each 16 × 16 cell. Input sequences, frame counts and the release archive checksum are in [the capture record](media/screen-transitions.json).
