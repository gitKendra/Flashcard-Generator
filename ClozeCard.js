// Create constructor
var ClozeCard = function(text, cloze){
	//
	if(!(this instanceof ClozeCard)){
		return new ClozeCard(text, cloze);
	}
	this.partial;

	// Only set partial if given valid flashcard data
	if(text.includes(cloze))
		this.partial = text.replace(cloze, '...');
	// Log error and stop constructor if not valid
	else{
		console.log('ERROR: "'+cloze+'" is not contained in "'+text+'"');
		return;
	}
	this.fullText = text;
	this.cloze = cloze;
}

// Export the constructor
module.exports = ClozeCard;
