"use strict"

// --- COMMANDS ---
export const commands = {
	ACTIVATE: "activate",
	STOP: "stop",
	RELOAD_CONFIG: "reload_config"
};

export const commandTypes = {
	NOTIFICATION: "notification",
	ACTION: "action" 
};

// --- TRANSLATIONS ---
export const Texts = {
	en: {
		ACTIVATE: "Activate",
		STOP: "Stop"
	},
	ro: {
		ACTIVATE: "Activează",
		STOP: "Stop"
	}
};

// --- CONSTANTS ---
export const NOTIFICATION_CLASS_NAME = "_2n_9";
export const HOSTNAME_TARAGET = "www.facebook.com";
const CONTENT_SCRIPT_FILE_NAME = "bundleContentScript.js";
export {CONTENT_SCRIPT_FILE_NAME};
export const CONTENT_SCRIPT_FILE_PATH = `dist/${CONTENT_SCRIPT_FILE_NAME}`; // Resolved relative to the Extension base URL :( 

