console.info('inside checkin.js');

$(function(){
  $('#checkIn').on('submit', function(e){
    e.preventDefault();
    var 
      $el = $(this),
      $firstName = $el.find('#firstName'),
      $lastName = $el.find('#lastName'),      
      $email = $el.find('#email'),      
        $contribution = $el.find('#contribution'),      
        $bday = $el.find('#bday'),      
        $firstTime = $el.find('#firstTime'),      
        $sex = $el.find('#sex');

    try {
    console.log($firstName.val());
    }
    catch (e) {
      console.log(e.message);
    }
    
    $.ajax({
      data:{
        firstName: $firstName.val(),
        lastName: $lastName.val(),
        email: $email.val(),
        contribution: $contribution.val(),
        bday: $bday.val(),
        firstTime: $firstTime.val(),
        sex: $sex.val()
      },
      type:'POST',
      url: '/users'
    }).done(function(data){
      console.log(data);
    });
    

  });
});