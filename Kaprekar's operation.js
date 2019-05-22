/*
Kaprekar's operation
===================================
This a simple but fascinating mathematical procedure that gives a beautiful and surprising result.
There is a nice description on the problem here https://plus.maths.org/content/mysterious-number-6174 
The procedure is described below:

1. First choose a four digit number where the digits are not all the same (that is not 1111, 2222,...), 
   (Additional condition: It can't start with zero)
2. Then rearrange the digits to get the largest and smallest numbers these digits can make
3. Finally, subtract the smallest number from the largest to get a new number, and carry on repeating the operation for
   each new number.
4. The process always converges to 6,174 for any starting seed that meets the criteria in (1)
5. It takes at most 7 iterations for the result to converge to 6,174

Write a function called "kaprekarFourDigit()" that takes as it's arguement any four digit number that does not violate
Condition 1 and returns the procedure given above as well as the number of iterations it took to converge to 6,174.

*/

function kaprekarFourDigit(num){

	var pattern = '^(\\d)(?!\\1+$)\\d{3}$'; //regex for when all 4 digits are the same
	pattern = new RegExp(pattern);

	if( (!Number.isInteger(num)) || (Array.from(num.toString()).length<4) || (Array.from(num.toString()).length>4)){
		//if input argument is out of bounds
		return 'Error!:\nOperation requires four digit integer'
	} else if(!pattern.test(num)){
		//if all digits are the same (violation of Condition 1)
		return 'Error! \nAll digits are the same, this violates Condition 1'
	} else {
		var numArray = Array.from(num.toString()).map(Number);

		for(var i = 1; i<8; i++){

			sortDescending = parseInt( (numArray.sort().reverse()).join('') );
			sortAscending = parseInt( (numArray.sort()).join('') );
			output = sortDescending - sortAscending;

			console.log('Iteration '+ i + ': ' + sortDescending + ' - ' + sortAscending + ' = ' + output);

			//fixes special case where output has less than 4 digits (i.e. starting seed of 1112 gives us "2111 - 1112 = 999")
			if((output <1000) && (output >99)){
				output = output*10;
				//fixes case where output has less than 4 digits (i.e. 999)
			} else if ((output <100) && (output >9)){
				output = output*100;
			} else if (output <10){
				output = output *1000;
			}

			numArray = Array.from(output.toString()).map(Number); //convert output to array so we can continue looping

			if(output === 6174){
				//end function once it converges
				console.log('\n') //leave space after iterations (Aesthetics)
				return 'RESULT: Converges to Kaprekar\'s  constant after '.concat(i, ' iterations');
			} 


		}

	}
}
