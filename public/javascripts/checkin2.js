/*
 * checkin app
 * @author: dblanchard
 */

var checkInNamespace = (function(win, doc, $){

	var
		// CONFIG
		containerSel = '#checkIn',
		firstNameSel = '#firstName',
		lastNameSel = '#lastName',		
    emailSel = '#email',  
    contributionSel = '#contribution',
    bdaySel = '#bday',
    firstTimeSel = '#firstTime',
    sexSel = '#sex', 
    maleSel = '#male',
    femaleSel = '#female',
    errorsSel = '#errors',  
      
		// PRIVATE VARIABLES
		$container,
		$button,
    $firstName,
    $lastName,
    $email,
    $contribution,
    $bday,
    $firstTime,
    $sex,
    $male,
    $female,
    $errors,  
      
    valid,  
    userError,  

		// PRIVATE METHODS
    validateName = function () {
      $firstName.removeClass('error');
      $lastName.removeClass('error');
      
      var result = true;
      if ($firstName.val().length < 3) {
        valid = false;
        result = false;
        $firstName.addClass('error');
        userError += 'First Name is too short! <br />'
      }
      
      if ($lastName.val().length < 5) {
        valid = false;
        result = false;
        $lastName.addClass('error');
        userError += 'Last Name is too short! <br />'       
      }
      return result;
    },
    
    sendForm = function () {
      $.ajax({
        data:{
          firstName: $firstName.val(),
          lastName: $lastName.val(),
          email: $email.val(),
          contribution: $contribution.val(),
          bday: $bday.val(),
          firstTime: $firstTime.val(),
          sex: $male.val()  //not working, everyone being saved as male
        },
        type:'POST',
        url: '/users'
      }).done(sendCompleteHandler);      
    },
      
    sendCompleteHandler = function(data) {
      console.log(data);
    },  
      
    showErrors = function () {
      $errors.html(userError).show();
    },  
      
		submitHandler = function(e) {
			console.log('form has been submitted');
			e.preventDefault();
      $errors.hide();
      valid = true;
      userError = '';
      
      //validateName();
      if (validateName()) {
        sendForm();
      }
      else {
        showErrors();
      }
		},

		// KICK OFF
		init = function(){

			$container = $(containerSel);
			$firstName = $container.find(firstNameSel);
			$lastName = $container.find(lastNameSel);
			$email = $container.find(emailSel);
			$contribution = $container.find(contributionSel);      
			$bday = $container.find(bdaySel);
			$firstTime = $container.find(firstTimeSel);
			$sex = $container.find(sexSel);
      $male = $container.find(maleSel);
      $female = $container.find(femaleSel);
			$errors = $container.find(errorsSel);
            
			$container.on('submit', submitHandler);
		};

	// EXPOSE WHAT YOU NEED
	return {
		init: init
	}
})(window, document, jQuery);



// This would live somewhere else
$(function(){
	checkInNamespace.init();
});