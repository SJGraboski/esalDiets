//set affix height

$('#nav').affix({
      offset: {
        top: $('header').height()
      }
}); 
// diet search show
$('.dietSearch').focus(function(){
 $('.list-group').show();
});

// diet search hide
$('.dietSearch').focusout(function(){
 $('.list-group').hide();
});

//resize navbar
$(function() {
    var $affixElement = $('#nav');
    $affixElement.width($affixElement.parent().width());
});

$( window ).resize(function() {
    var $affixElement = $('#nav');
    $affixElement.width($affixElement.parent().width());
});

//add class to menu on scroll
$(window).bind('scroll', function() {
        var navHeight = $(window).height() - 500;
        if ($(window).scrollTop() > navHeight) {
            $('.navbar-default').addClass('on');
           //$('#analytics').css('margin-top',120);
           
           //$('#userdata').css('margin-top',200);
        } else {
            $('.navbar-default').removeClass('on');
            //$('#analytics').css('margin-top',0);
        }
    });



// Smooth scroll
$(document).ready(function(){
  // Add smooth scrolling to all links
  $("a.smooth").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top - 110
      }, 800, function(){
   
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
});

