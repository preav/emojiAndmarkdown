var markdown = require( "markdown" ).markdown;
//var webpagePreview = require("webpage-preview");

document.getElementById('send').addEventListener('click', populateMarkdown);

function populateMarkdown() {
	var val = document.getElementById('inpText').value;
	console.log(val)
	document.getElementById('mark').innerHTML = markdown.toHTML(val);
}


// webpagePreview.generatePreview('http://www.google.com/', 
// 	'google', APP_ROOT + '/public/previews', null, null, 
// 	function(error, sizePaths) {
//     if (error) {
//         console.log(error);
//     }
//     else {
//         console.log(sizePaths);
//     }
// });