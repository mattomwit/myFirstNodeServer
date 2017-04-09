$(document).ready(function() {

  var $quoteContainer = $('#quoteContainer');
  var $quoteButton = $('#quoteButton');
   $quoteButton.on('click',function(){
      console.log("click!");
  $.ajax({
  type: 'GET',
  dataType: 'json',
  url: 'https://crossorigin.me/http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en',
  success: function(data){
  $quoteContainer.prepend('<div class="well"><strong>'+data.quoteAuthor+' : </strong><br><h2>'+data.quoteText+'</h2><br>Quote link: <a href="'+data.quoteLink+'" target="_blank"><em>'+data.quoteLink+'</em></a></div>')
  }
}); 
});
});