(function(){
	var SOUND_URL = "https://raw.githubusercontent.com/palisadecoronet/hf/master/palihub%20sung.wav";
	var loopTime = 1; // Loop for how long?  -1 is always on.
	var soundURL = null;
	var lastSoundURL = null;
	var receiverName = "";
	var soundLoop = false;
	var soundLocal = false;
	var soundVolume = 1.0;
	var refreshInterval = 100;
	var soundData = null;
	var injector = null;
	var entityID = null;
	var properties = null;	
	
	this.preload = function(pEntityID) {
	};
	
	this.unload = function(){
		if (injector) {
			injector.stop();
			injector = null;
		}
	};
	
    this.enterEntity = function(pEntityID) {	
		//var Me = AccountServices.username;
        entityID = pEntityID;
		var intervalID = Script.setInterval(function() {		
			properties = Entities.getEntityProperties(entityID, ["position"]); 
				try {
					soundURL = SoundCache.getSound(SOUND_URL);
					refreshInterval = Math.min(1000, Math.max(refreshInterval, 10)); // cap updates at min 10 ms
                } catch (e){}
				
			if (!injector) {
				if (soundURL.downloaded) {
					injector = Audio.playSound(soundURL, {
						position: properties.position,
						volume: soundVolume,
						loop: soundLoop,
						localOnly: soundLocal
					});
				}
				lastSoundURL = soundData.soundURL;
			} else {
				if (lastSoundURL != soundData.soundURL) {
					injector.stop();
					injector = null;
					soundURL = SoundCache.getSound(lastSoundURL);
				} else {
				injector.setOptions({
					position: properties.position,
					volume: soundVolume
				});
			}
			}
		}, refreshInterval);
	};
 })
 