(function(){

var firebase = new Firebase("https://crackling-fire-1294.firebaseio.com/");


var Step = function (name, sectionId) {
	
	this.getName = function () {
		return name;
	} 
	this.getId = function () {
		return sectionId;
	}
	//hide the section with id = sectionId
	this.hide =  function () {
		console.log( "yes" );
		$( sectionId ).addClass( "left" );
		setTimeout( function (){
			$( sectionId ).addClass( "hidden" );
		}, 50 );
	}
	//show the section with id = sectionId
	this.show = function () {
		setTimeout( function (){
			$( sectionId ).removeClass( "hidden" );
			setTimeout( function (){
				$( sectionId ).removeClass( "right" );
			}, 50 );
		}, 300);
	}
}

var ProgramSteps = function (){
	var ARTICLE_STEP = 0;
	var FRONT_STEP = 1;
	var SIDE_STEP = 2;
	var EMAIL_STEP = 3;
	var DISPLAY_STEP = 4;

	var currentStep = 0;

	var isTable = false;
	var front = null;
	var side = null;
	var email = null;

	var steps = [
		new Step ("Article of Furniture", "#furniture-types"),
		new Step ("Front View", "#image-list"),
		new Step ("Side View", "#image-list"),
		new Step ("Email", "#email"),
		new Step ("Fusion Complete", "#display-furniture")
	];

	this.setStep = function( stepNum ){
		if ( steps[currentStep].getId() != steps[stepNum].getId() ){
			steps [currentStep].hide();
		}
		steps [stepNum].show();
		currentStep = stepNum;
		$( "#steps > *" ).removeClass( "active" )
		$( "#steps" ).append("<span class='active'>" + (stepNum + 1) + ". " + steps [stepNum].getName() + "</span>");
	}

	this.start = function (){
		this.setStep (ARTICLE_STEP);
	}

	this.setIsTable = function (isTrue){
		isTable = isTrue;
		this.setStep (FRONT_STEP);
	}

	this.setSide = function (itemText){
		console.log( "currentStep" );
		if (currentStep == FRONT_STEP){
			this.front = itemText;
			this.setStep (SIDE_STEP);
		}
		else if (currentStep == SIDE_STEP){
			this.side = itemText;
			this.setStep (EMAIL_STEP);
		}
	}

	this.setEmail = function (emailTyped){
		email = emailTyped;
		this.submit();
		this.setStep( DISPLAY_STEP );
	}

	this.submit = function (){
		var table = isTable ? 1 : 2;
		var url = "https://www.wolframcloud.com/objects/3e4dcd10-28d8-44cd-9e9e-9851af261134?url1=" 
		+ front + "&url2=" + side + "&email=" + email + "&table=" + table;
		$.get(url, function( data ) {
	 		alert( "Data Loaded: " + data );
			// decode data here
		});
	}
}


$( document ).ready( function (){
	var programSteps = new ProgramSteps ();

	$( "#chair" ).click( function(){
		programSteps.setIsTable (false);
	})

	$( "#table" ).click( function(){
		programSteps.setIsTable (true);
	})

	$( ".image-item" ).click( function (){
		$( this ).addClass( "active" );
		var image = $( this ).find( ".image" );
		var rawVal = image.css("background-image");
		var url = "http://fusion-furniture.azurewebsites.net/" + rawVal.substring(4, rawVal.length-1); 

		programSteps.setSide(url);
	})

	var emailDefaultText = "Email to...";
	
	var editEmail = $( "#edit-email" );
	editEmail.text( emailDefaultText );

	editEmail.focus( function (){
		if (editEmail.text() === emailDefaultText){
			editEmail.text("");
		}
	})

	$( "#edit-email" ).blur( function (){
		if (editEmail.text() === ""){
			editEmail.text( emailDefaultText );
		}
	})

	$( "#select-email" ).click( function (){
		var email = editEmail.text();
		if (email === "" || email === emailDefaultText){

		}
		
		programSteps.setEmail();
	})

	console.log( "1" );
	programSteps.start ();

});


})();