(function(){


var firebase = new Firebase("https://crackling-fire-1294.firebaseio.com/");




var Steps = function (){
	this.currentStep = 0;
	this.stepDisplay = $( "#stepDisplay" );

	this.setStep = function( stepNum ){
		this.currentStep = stepNum;
		if (this.stepNum == 0){
			$( "#furniture-type" ).removeClass( "hidden" );
		} 
		else {
			$( "#furniture-type" ).addClass( "hidden" );
		}

		if (this.currentStep == 3){
			$( "#complete" ).removeClass( "hidden" );
			submit ();
		}
		else {
			$( "#complete" ).addClass( "hidden" );
		}
	}

	this.setIsTable = function (isTrue){
		this.isTable = isTrue;
		this.setStep (1);
	}

	this.setSide = function (itemText){
		if (currentStep == 1){
			this.firstSide = itemText;
			this.setStep (2);
		}
		else if (currentStep == 2){
			this.secondSide = itemText;
			this.setStep (3);
		}
	}

	this.submit = function (){
		var url = "https://www.wolframcloud.com/objects/3e4dcd10-28d8-44cd-9e9e-9851af261134?url1=" 
		+ firstSide + "&url2=" + secondSide + "&email=" + email + "&table=" + isTable;
		$.get(url, function( data ) {
 		alert( "Data Loaded: " + data );
		// decode data here
});
	}

	this.isTable = 0;
	this.firstSide = null;
	this.secondSide = null;
	this.email = null;

}


$( document ).ready( function (){
	var steps = new Steps ();

	$( ".image-item" ).click( function (){
		$( this ).addClass( "active" );
		var image = $( this ).find( "#image" );
		var rawVal = image.css("background-image");
		var url = "http://fusion-furniture.azurewebsites.net/" + rawVal.substring(4, rawVal.length-1); 
		steps.setSide(url);
	})

	$( "#chair" ).click( function(){
		steps.setIsTable (false);
	})

	$( "#table" ).click( function(){
		steps.setIsTable (true);
	})





});
})();