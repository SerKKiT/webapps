var startEvent = 'click';
        if (navigator.userAgent.match(/iPhone/i) ||
            navigator.userAgent.match(/iPad/i) ||
            navigator.userAgent.match(/Android/i)) {
            startEvent = 'touchend';
        }

        var player = videojs('video',{
            'html5': {
                nativeTextTracks: false,
                nativeAudioTracks: false,
                nativeVideoTracks: false,
                hls: {
                  overrideNative: true,
                }
            },
            
        });

        
		player.ready(function(){
        	
			this.duration(parseInt(this.duration()));

            this.on("play", function(){
                this.poster('');
                var pauseBtn = document.querySelector('button.vjs-playing');
                if (pauseBtn) {
                    pauseBtn.focus();
                }
            });


            var relatedCarousel = $('.vjs-related-carousel-holder',"#video");

   
            
            player.videoJsResolutionSwitcher({
                default: 'high',
                dynamicLabel: true,
            });

            var sources =  [
    { src: "https://cdn-cache.platformcraft.ru/greenatom/kit/chainsawman_video.mp4/chainsawman_video (854x480).mp4", type: "video/mp4", label: "480p" },
    { src: "https:/cdn-cache.platformcraft.ru/greenatom/kit/chainsawman_video.mp4/chainsawman_video (1280x720).mp4", type: "video/mp4", label: "720p" },
    { src: "https://cdn-cache.platformcraft.ru/greenatom/kit/chainsawman_video.mp4/chainsawman_video.mp4", type: "video/mp4", label: "1080p" }
]

player.updateSrc(sources);
      	});
		    
	    

        
        
