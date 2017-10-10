var Flashcard = require('./Flashcard.js');

// Create constructor using inheritance from Flashcard
var ClozeCard = function(text, cloze){
	if(!(this instanceof ClozeCard)){
		return new ClozeCard(text, cloze);
	}
	// Only create flashcard if given valid flashcard data
	if(text !== null && text.includes(cloze))
		Flashcard.call(this, text.replace(cloze, '...'), cloze);
	// Log error and stop constructor if not valid
	else{
		console.log('ERROR: "'+cloze+'" is not contained in "'+text+'"');
		return;
	}
	this.fullText = text;
}

module.exports = ClozeCard;