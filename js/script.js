
function loadData() {
    var $gMapStreet = $("#street").val();
	var $gMapCity = $("#city").val();
    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');
    var $address = $gMapStreet + " " + $gMapCity;

    $wikiElem.text("");
    $nytElem.text("");


     $greeting.text('So, you want to live at ' + $address + '?');
     $("body").append("<img src='http://maps.googleapis.com/maps/api/streetview?size=600x400&location=" + $address + "' class='bgimg'/>") ;

	
	   $nytHeaderElem.text("New York Times Articles About " + $gMapCity);
	   var $parsedCity = $gMapCity.replace(/\s/g,"+");
		$.getJSON("http://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + $parsedCity +  "&api-key=c68412ec6ec1c6f35187a521eb8a68f4:5:73958317", function( data) {
		$nytElem.append("<ul id='nytimes-articles' class='article-list'>")
		var $articles = data.response.docs.length;
		for ( i = 0; i < $articles; i++) {
		$("#nytimes-articles ul").append("<li class='article'><a href='" + data.response.docs[i].web_url + "'>" + data.response.docs[i].headline.main+ "</a><p>" + data.response.docs[i].snippet + "</p></li>" );
		}
		
		console.log(data.response.docs);
}).error(function() { $nytHeaderElem.text("New York Times Articles Could Not Load");});		

$parsedCity = $gMapCity.replace(/\s/g, "%20"); 
$.ajax({ 
url: "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + $parsedCity + "&format=json&callback=wikiCallback",
dataType: "jsonp",
success: function(data) {
$rArticles = data[1].length ;
for (i =0;i<$rArticles;i++){
$wikiElem.append("<li><a href='" + data[3][i] + "'>" + data[1][i] + "</a></li>");
}

}
});

    return false;
};

$('#form-container').submit(loadData);
