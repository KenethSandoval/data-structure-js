// Create default array
const defaultArray = [2, 8, 1, 6, 3, 7, 5, 9];
let $container = displayArray(defaultArray);
let miliseconds = { value: 500 };

function unsort(arr) {
  $container = displayArray(arr);
}

function getArrayValue() {
  return $container;
}

function getTimeout() {
  return miliseconds;
}

$(document).ready( () => {
  //side Menu
  $('#close-menu').click( () => {
    $('#settings').css('transform', 'translateX(-400px)');
    $('header').animate({ opacity: 1 }, { duration: 400 });
    $('main').animate({ opacity: 1 }, { duration: 400 });   
  });


  $('#settings-btn').click(() => {
    $('#settings').css('transform', 'translateX(400px)');
    $("header").animate({ opacity: 0.5 }, { duration: 400 });
    $("main").animate({opacity: 0.5}, {duration: 400});
  });

  //Save Settings Button
  $('#save-settings').click(() => {
    try {
     if($('#arr').val() != '') {
       let arr = parse($('#arr').val());
       $container = displayArray(arr);
       sorted = false;
     }

     miliseconds.value = $("#timeout").val() !== '' ? $("#timeout").val() : miliseconds.value;

      $('p#success').text('Saved!');
    }catch(err) {
     $('p#success').text("");
     $('#settings-error').text(err); 
     console.log(err);
    }
  });

});
