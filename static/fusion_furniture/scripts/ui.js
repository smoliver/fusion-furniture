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
			front = itemText;
			this.setStep (SIDE_STEP);
		}
		else if (currentStep == SIDE_STEP){
			side = itemText;
			this.setStep (EMAIL_STEP);
		}
	}

	this.setEmail = function (emailTyped){
		email = emailTyped;
		this.submit();
		this.setStep( DISPLAY_STEP );
	}

	var parseImage = function (rawString){
		var start = rawString.indexOf('"', 0);
		var end = rawString.indexOf('"', start + 1);
		var concatStr = rawString.substr(start + 1, end - 1);
		
		var finishedStr = concatStr.replace(/(\\r\\n|\\n|\\r)/gm,"");
		return finishedStr;
	}

	this.submit = function (){
		var table = isTable ? 1 : 0;
		var url = "https://www.wolframcloud.com/objects/3e4dcd10-28d8-44cd-9e9e-9851af261134?url1=" 
		+ front + "&url2=" + side + "&email=" + email + "&table=" + table;
		console.log(url);
		$.get(url, function( data ) {
	 		var srcDescription = "data:image/png;base64,"
			var displayImage = $( "#display-furniture img" );
			var imageText = parseImage(data);
			displayImage.attr( "src", srcDescription + imageText );
			hide( "#loading" )
			show( displayImage );
		});
	}
}

function hide (id){
	$( id ).addClass( "left" );
		setTimeout( function (){
			$( id ).addClass( "hidden" );
		}, 50 );
}

function show (id) {
	setTimeout( function (){
		$( id ).removeClass( "hidden" );
		setTimeout( function (){
			$( id ).removeClass( "right" );
		}, 50 );
	}, 300);
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
		var url = rawVal.substring(4, rawVal.length-1); 

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
		
		programSteps.setEmail(email);
	})

	programSteps.start ();

});


})();