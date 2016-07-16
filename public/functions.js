//set affix height

$('#nav').affix({
      offset: {
        top: $('header').height()
      }

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
            $('#placeholderspace').animate({height:'150px'});
        } else {
            $('.navbar-default').removeClass('on');
        }
    });



// Smooth scroll
$(document).ready(function(){
  // Add smooth scrolling to all links
  $("a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){
   
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
});
