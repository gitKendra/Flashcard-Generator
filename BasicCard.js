// Create Constructor for Basic flashcard
var BasicCard = function(front, back){
	if(!(this instanceof BasicCard)){
		return new BasicCard(front, back);
	}
	this.front = front;
	this.back = back;
}

// Export
module.exports = BasicCard;