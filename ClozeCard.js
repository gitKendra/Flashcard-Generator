// Create constructor
var ClozeCard = function(text, cloze){

	this.partial;
	// Only set partial if given valid flashcard data
	if(text.includes(cloze))
		this.partial = text.replace(cloze, '...');
	else{
		console.log('ERROR: "'+cloze+'" is not contained in "'+text+'"');
	//	throw 'ERROR: "'+cloze+'" is not contained in "'+text+'"'; 
	return;
	}
	this.fullText = text;
	this.cloze = cloze;
}

// Export the constructor
module.exports = ClozeCard;

var card = new ClozeCard("George washington rocks the USA!", "USA");

console.log(card.fullText);
console.log(card.cloze);
console.log(card.partial);