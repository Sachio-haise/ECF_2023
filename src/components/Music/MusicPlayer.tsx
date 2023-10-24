import React from 'react'
import Player, {
    PlayerInterface,Track,  TrackModel} from 'react-material-music-player'

function MusicPlayer() {
    PlayerInterface.setPlaylist([new Track(
        '1',
        '/next.svg',
        '68 Choral',
        'Bach',
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/Yodel_Sound_Effect.mp3',
    )])



    // wait 3 seconds
window.setTimeout(
    () =>
      // adds music at end of playlist
      PlayerInterface.playLater([
        new TrackModel(
            '1',
            '/next.svg',
            '68 Choral',
            'Bach',
            'https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/Yodel_Sound_Effect.mp3',
        ),
      ]),
    3000 // 3 seconds
  );

  // wait 6 seconds
  window.setTimeout(
    () =>
      // add music after current track
      PlayerInterface.playNext([
        new TrackModel(
            '1',
            '/next.svg',
            '68 Choral',
            'Bach',
            'https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/Yodel_Sound_Effect.mp3',
        ),
      ]),
    6000 // 6 seconds
  );

  window.setTimeout(
    () =>
      // add music after current track
      PlayerInterface.play(null),
    9000 // 8 seconds
  );
  return (
    <div>
       <Player/>
    </div>
  )
}

export default MusicPlayer
