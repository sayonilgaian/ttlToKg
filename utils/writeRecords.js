import fs from 'fs';

let currentHistory = [];

export default async function updateHistoryAndSave(newRecord = {}) {
	// 1. Load the current history from the file.
	try {
		const historyData = fs.readFileSync('./history.json', 'utf8');
		currentHistory = JSON.parse(historyData);
	} catch (error) {
		if (error.code === 'ENOENT') {
			// File doesn't exist yet; start with an empty history.  This is important!
			currentHistory = [];
		} else {
			console.error('Error loading history:', error);
			currentHistory = [];
		}
	}

	// 2.  Update the history
	currentHistory.push(newRecord);

	// 3. Save the *updated* history back to the file.
	const historyJson = JSON.stringify(currentHistory, null, 4); // Convert to JSON string
	fs.writeFileSync('./history.json', historyJson); // Overwrite the file

	console.log('History updated and saved.'); //  Add a log to confirm saving
}
