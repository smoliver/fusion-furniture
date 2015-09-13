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

		if (this.currentStep == 4){
			$()
		}
	}

	this.setTable = function (isTrue){
		this.isTable = isTrue
		this.setStep (1);
	}

	this.setSide = function (item){
		item.
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
		item.
	})

	$( "#chair" ).click( function(){
		steps.setTable (false);
	})

	$( "#table" ).click( function(){
		steps.setTable (true);
	})








});
})();