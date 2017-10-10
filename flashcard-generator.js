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

// Variable to store the array of flashcards
var arr;

// Add basic flash cards from file
for(var i = 0; i < basic.length; i++){
	var newBasicCard = new BasicCard(basic[i].front, basic[i].back);
	basicArr.push(newBasicCard);
}

// Add cloze flash cards from file
for(var i = 0; i < cloze.length; i++){
	var newClozeCard = new ClozeCard(cloze[i].fullText, cloze[i].back);
	clozeArr.push(newClozeCard);
}

var promptCreateCard = function(){
	inquirer.prompt([
	{
		type: 'list',
		name: 'cardType',
		message: 'Would you like to create a flashcard?',
		choices: ['Yes, a basic card', 'Yes, a cloze card', 'No']
	},
	]).then(function(answer){
		if(answer.cardType === 'No'){
			// Store flashcards to JSON files
			fs.writeFile('basic.json', JSON.stringify(basicArr, null, 2), 'utf8', (err)=>{
 	 			if (err) throw err;});
			fs.writeFile('cloze.json', JSON.stringify(clozeArr, null, 2), 'utf8', (err)=>{
 	 			if (err) throw err;});
			askQuiz();
		}
		else if(answer.cardType === 'Yes, a basic card'){
			addBasicCard();
		}
		else{
			addClozeCard();
		}
	});
}

// Function prompt user for info and add a basic flashcard
var addBasicCard = function(){
	inquirer.prompt([
	{
		name: 'front',
		message: 'Front of card',
	},
	{
		name: 'back',
		message: 'Back of card:'
	}
	]).then(function(ans){
		var newBasicCard = new BasicCard(ans.front, ans.back);
		basicArr.push(newBasicCard);
		promptCreateCard();
	});
}

// Function prompt user for info and add a cloze flashcard
var addClozeCard = function(){
	inquirer.prompt([
	{
		name: 'text',
		message: 'Full text:',
	},
	{
		name: 'cloze',
		message: 'Cloze:'
	}
	]).then(function(ans){
		var newClozeCard = new ClozeCard(ans.text, ans.cloze);
		clozeArr.push(newClozeCard);
		promptCreateCard();
	});
}

// Quiz user on flashcards
var askQuiz = function(){
	inquirer.prompt([
	{
		type: 'list',
		name: 'cardType',
		message: 'Choose which type of flashcard to use:',
		choices: ['Basic card', 'Cloze card'],
	},
	{
		type: 'confirm',
		name: 'confirm_quiz',
		message: 'Ready to play?',
		default: true
	}
	]).then(function(answers){
		console.log("");
		if(answers.confirm_quiz){
			if(answers.cardType === 'Basic card')
				arr = basicArr;
			else
				arr = clozeArr;
		quiz(arr.length);
		}
		else{
			console.log("Restart the program when ready to play.");
		}
	});
}

// Recursive fucntion that goes through array of flashcards
var quiz = function(numCards){
	if(numCards === 0){
		return;
	}
	var idx = arr.length - numCards;
	inquirer.prompt([
	{
		name: 'question',
		message: arr[idx].front + "\nAnswer:",
	}
	]).then(function(ans){
		if(ans.question === arr[idx].back){
			console.log("Correct!\n");
			console.log("++++++++++++++++++++\n");
		}
		else{
			console.log("Incorrect. " + arr[idx].back + " is the correct answer.")
			console.log("++++++++++++++++++++\n");
		}
		numCards--;
		quiz(numCards);
	});	
}

promptCreateCard();

module.exports = {
	basicArr: basicArr,
	clozeArr: clozeArr
}

