const commands = {
	ACTIVATE: "activate",
	STOP: "stop",
	RELOAD_CONFIG: "reload_config"
};

const commandTypes = {
	NOTIFICATION: "noitification",
	ACTION: "action" 
};

const CONTENT_SCRIPT_FILE_PATH = "src/ResponseAgent.js"; // Resolved relative to the Extension base URL :( 

export {
	commandTypes,
	commands,
	CONTENT_SCRIPT_FILE_PATH,
};
