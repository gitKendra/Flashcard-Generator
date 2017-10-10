var Flashcard = require('./Flashcard.js');

// Create constructor using inheritance from Flashcard
var BasicCard = function(front, back){
	if(!(this instanceof BasicCard)){
		return new BasicCard(front, back);
	}
	Flashcard.call(this, front, back);
}

module.exports = BasicCard;