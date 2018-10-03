(function(){
	var SOUND_URL = "https://raw.githubusercontent.com/palisadecoronet/hf/master/palihub%20sung.wav";
	var loopTime = 1; // Loop for how long?  -1 is always on.
	var soundURL = null;
	var lastSoundURL = null;
	var receiverName = "";
	var soundLoop = false;
	var soundLocal = false;
	var soundVolume = 1.0;
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
		properties = Entities.getEntityProperties(entityID, ["position"]); 
		try {
			soundURL = SoundCache.getSound(SOUND_URL);
		} catch (e){}
				
		if (!injector) {
			if (soundURL.downloaded) {
				Script.setTimeout(function () {
				  injector = Audio.playSound(soundURL, {
					position: properties.position,
					volume: soundVolume,
					loop: soundLoop,
					localOnly: soundLocal
				 });
				}, 5000);
			}
			lastSoundURL = soundURL;
		} else {
			if (lastSoundURL != soundURL) {
				injector.stop();
				injector = null;
				try {
					soundURL = SoundCache.getSound(lastSoundURL);
				} catch (e){}
			} else {
				injector.setOptions({
					position: properties.position,
					volume: soundVolume
				});
			}
		}
	};
 })
 