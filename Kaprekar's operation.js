/*
Kaprekar's operation
===================================

1. First choose a four digit number where the digits are not all the same (that is not 1111, 2222,...).
2. Then rearrange the digits to get the largest and smallest numbers these digits can make
3. Finally, subtract the smallest number from the largest to get a new number, and carry on repeating the operation for each new number.
4. The process always converges to 6,174 for any starting seed that meets the criteria in (1)
5. It takes at most 7 iterations for the result to converge to 6,174

Write a function called "kaprekarFourDigit()" that takes as it's arguement a four digit number and returns a table showing each iteration of the operation
and it converges to 6,174

*/

function kaprekarFourDigit(num){

	var pattern = '^(\\d)(?!\\1+$)\\d{3}$'; //regex for when all 4 digits are the same
	pattern = new RegExp(pattern);

	if( (!Number.isInteger(num)) || (num<1000) || (num>9999) ){
		return 'Error!:\nOperation requires four digit integer'
	} else if(!pattern.test(num)){
		//if all digits are the same
		return 'Error! \nAll digits are the same, this violates Condition 1'
	} else {
		var numArray = Array.from(num.toString()).map(Number);

		for(var i = 1; i<8; i++){

			sortDescending = parseInt( (numArray.sort().reverse()).join('') );
			sortAscending = parseInt( (numArray.sort()).join('') );
			output = sortDescending - sortAscending;

			console.log('Iteration '+ i + ': ' + sortDescending + ' - ' + sortAscending + ' = ' + output);

			numArray = Array.from(output.toString()).map(Number); //convert output to array so we can continue looping

			if(output === 6174){
				//end function once it converges
				console.log('\n') //leave space after iterations (Aesthetics)
				return 'RESULT: Converges to Kaprekar\'s  constant after '.concat(i, ' iterations');
			}


		}

	}
}


