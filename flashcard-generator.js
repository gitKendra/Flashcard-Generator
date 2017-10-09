// Add all required files and packages
var BasicCard = require('./BasicCard.js');
var ClozeCard = require('./ClozeCard.js');
var basic = require('./basic.json');
var cloze = require('./cloze.json');
var fs = require('fs');
var inquirer = require('inquirer');

// Create arrays to store flashcards
var basicArr = [];
var clozeArr = [];

// Add basic flash cards from file
for(var i = 0; i < basic.length; i++){
	var newBasicCard = new BasicCard(basic[i].front, basic[i].back);
	basicArr.push(newBasicCard);
}

// Add cloze flash cards from file
for(var i = 0; i < cloze.length; i++){
	var newClozeCard = new ClozeCard(cloze[i].text, cloze[i].cloze);
	clozeArr.push(newClozeCard);
}

// Quiz user on flashcards
inquirer.prompt([
{
	type: 'list',
	name: 'cardType',
	message: 'Choose which type of flashcard:',
	choices: ['Basic card', 'Cloze card'],
}
]).then(function(answers){
	console.log("");
	if(answers.cardType === 'Basic card')
		askBasicCard(basicArr.length);
	else
		askClozeCard(clozeArr.length);
});

// Recursive function to ask user questions in the basicArr.
var askBasicCard = function(numCards){
	// Condition for when to stop asking questions
	if(numCards === 0){
		return;
	}
	numCards--;
	inquirer.prompt([
	{
		name: 'flashcard',
		message: basicArr[numCards].front + "\nAnswer:",
	}
	]).then(function(ans){
		if(ans.flashcard === basicArr[numCards].back){
			console.log("Correct!\n\n++++++++++++++++++++\n");
		}
		else{
			console.log("Incorrect. " + basicArr[numCards].back + " is the correct answer.\n++++++++++++++++++++\n");
		}
		askBasicCard(numCards);
	});	
}

// Recursive function to ask user questions in the clozeArr.
var askClozeCard = function(numCards){
	if(numCards === 0){
		return;
	}
	numCards--;
	inquirer.prompt([
	{
		name: 'flashcard',
		message: clozeArr[numCards].partial,
	}
	]).then(function(ans){
		if(ans.flashcard === clozeArr[numCards].cloze){
			console.log("Correct! " + clozeArr[numCards].fullText);
		}
		else{
			console.log("Incorrect. " + clozeArr[numCards].fullText);
		}
		askClozeCard(numCards);
	});
}
