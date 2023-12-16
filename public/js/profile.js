$(function(){
  
  $(".nav-profile a").on('click', function(event) {
    
    if($('#side-col').hasClass('expanded'))

    $('#side-col').removeClass('expanded');

    if (this.hash !== "") {
    
      event.preventDefault(); 

      var hash = this.hash;
 
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){

        window.location.hash = hash;  
      });
    }  
});

$(".mobile-nav-toggle").on('click', function(){

    !$('#side-col').hasClass('expanded')?
        $('#side-col').addClass('expanded'):
        $('#side-col').removeClass('expanded');   
     
})

$('.btn_up-to').on('click', function(){
    $("html, body").animate({ scrollTop: 0 }, "smoth");
})
 
 $('.btn-edit-profile').click(function(){
   
  
  $(this).children().first().html() == 'Enable editting' ?

  $(this).children().first().html('Finish editting') :
  
  $(this).children().first().html('Enable editting'); 

 })
 
})
  

function hidePrev(element){

  // elementToHide = $(element).parent().prev();

  // $(elementToHide).addClass('d-none');
 
}

 

function checkMax(element){

    field = $(element).attr('name');

    field == 'title' ? max = 250 : max = 500;

    $(element).attr('maxlength', max);

    span = $('#span_' + field); 

    left = max - $(element).val().length;

    $(span).html(left + '/' + max); 
}

function showPrev(button){

  // var target = $(button).data('target');

  // $('p#' + target).removeClass('d-none');
   

}

$('.custom-control-input').change(function(){

  var on = $('.on-' +  $(this).attr('id'));

  console.log(on);

  if( $(this).prop('checked') ) {
     


}
})