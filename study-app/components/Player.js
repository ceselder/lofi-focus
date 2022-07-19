import { React, useEffect, useState } from 'react'

export default  function Player() {
    return (<audio id="youtube" autoplay controls loop></audio>)
}

async function getYoutubeAudioSrc(videoID)
{
  const audio_streams = {}
  const response = await fetch("https://images" + ~~(Math.random() * 33) + "-focus-opensocial.googleusercontent.com/gadgets/proxy?container=none&url=" + encodeURIComponent(`https://www.youtube.com/watch?hl=en&v=${videoID}`))
    if (response.ok) {
      response.text().then(data => {
  
        var regex = /(?:ytplayer\.config\s*=\s*|ytInitialPlayerResponse\s?=\s?)(.+?)(?:;var|;\(function|\)?;\s*if|;\s*if|;\s*ytplayer\.|;\s*<\/script)/gmsu;
  
        data = data.split('window.getPageData')[0];
        data = data.replace('ytInitialPlayerResponse = null', '');
        data = data.replace('ytInitialPlayerResponse=window.ytInitialPlayerResponse', '');
        data = data.replace('ytplayer.config={args:{raw_player_response:ytInitialPlayerResponse}};', '');
  
  
        var matches = regex.exec(data);
        var data = matches && matches.length > 1 ? JSON.parse(matches[1]) : false;
  
        var streams = [],
          result = {};
  
        if (data.streamingData) {
  
          if (data.streamingData.adaptiveFormats) {
            streams = streams.concat(data.streamingData.adaptiveFormats);
          }
  
          if (data.streamingData.formats) {
            streams = streams.concat(data.streamingData.formats);
          }
  
        } else {
          return false;
        }
  
        streams.forEach(function(stream, n) {
          var itag = stream.itag * 1,
            quality = false;
          switch (itag) {
            case 139:
              quality = "48kbps";
              break;
            case 140:
              quality = "128kbps";
              break;
            case 141:
              quality = "256kbps";
              break;
            case 249:
              quality = "webm_l";
              break;
            case 250:
              quality = "webm_m";
              break;
            case 251:
              quality = "webm_h";
              break;
          }
          if (quality) audio_streams[quality] = stream.url;
        });

        const resp = audio_streams['256kbps'] || audio_streams['128kbps'] || audio_streams['48kbps']
        console.log(resp)
        return resp
    })
    }
}