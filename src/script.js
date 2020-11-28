exports.mod = (mod_info) => {
    logger.logInfo("[MOD] LocationsWaveEditor");
	let ModPath = `user/mods/${mod_info.author}-${mod_info.name}-${mod_info.version}/`;
	let locationNames = fileIO.readDir(ModPath + "locations"); // this.Locations[location]
	let config = require("../config.json");
	for(let locationName of locationNames){
		let Waves = fileIO.readDir(ModPath + "locations/" + locationName);
		if(Waves.length <= 0) continue;
		
		if(config.overrideWaves){
			//Clear Waves Now
			location_f.handler.Locations[locationName].base.waves = [];
		}
		let countWaves = location_f.handler.Locations[locationName].base.waves.length;
		for(let wave of Waves){
			let LoadFile = require("../locations/" + locationName + "/" + wave);
			
			if(Object.prototype.toString.call(LoadFile) == '[object Array]')
			{
				// its an array so load it as its an array
				for(let waveInfo of LoadFile){
					let WaveStruct = {
						number: countWaves,
						time_min: waveInfo.TimeFromMatchStart.minimum,
						time_max: waveInfo.TimeFromMatchStart.maximum,
						slots_min: waveInfo.SpawnedAmount.minimum,
						slots_max: waveInfo.SpawnedAmount.maximum,
						SpawnPoints: waveInfo.SpawnPoints,
						BotSide: waveInfo.BotSide,
						BotPreset: waveInfo.BotPreset,
						WildSpawnType: waveInfo.WildSpawnType,
						isPlayers: waveInfo.isPlayers,
					};
					location_f.handler.Locations[locationName].base.waves.push(WaveStruct);
					countWaves++;
				}
			} else {
				let WaveStruct = {
					number: countWaves,
					time_min: LoadFile.TimeFromMatchStart.minimum,
					time_max: LoadFile.TimeFromMatchStart.maximum,
					slots_min: LoadFile.SpawnedAmount.minimum,
					slots_max: LoadFile.SpawnedAmount.maximum,
					SpawnPoints: LoadFile.SpawnPoints,
					BotSide: LoadFile.BotSide,
					BotPreset: LoadFile.BotPreset,
					WildSpawnType: LoadFile.WildSpawnType,
					isPlayers: LoadFile.isPlayers,
				};
				
				location_f.handler.Locations[locationName].base.waves.push(WaveStruct);
				//Apply New Wave Now
				countWaves++;
			}
			
		}
		logger.logInfo("Waves now in count " + countWaves + " on map " + locationName);
	}
	
	logger.logSuccess("[MOD] LocationsWaveEditor; Applied");
}