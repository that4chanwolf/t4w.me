document.addEventListener('DOMContentLoaded', function() {
	if( !/^(.+)?\.?t4w\.me/.test(document.location.hostname) || window !== window.top) { // HAHAHA, VERY FUNNY GUYS.
		var domain = document.location.hostname.split(".");
		domain = domain[domain.length - 2]
		var t4whtml = '<body> <style> body {  width:100%;  margin-left: auto;  margin-right: auto;  padding-top: 50px;  background-image: url("http://static.nyaa-nyaa.com/img/back.png"); }  .fucku {  background-color: rgb(248, 148, 6);  border-radius: 10px;  width: 85%;  margin: auto;  padding-top: 15px;  padding-bottom: 15px; } .fucku > h1 {  font-family: Ubuntu, "Liberation Sans", Helvetica, Arial, sans-serif;  color: white;  text-align: center;  text-shadow: rgba(0, 0, 0, 0.25) 0px -1px 0px;  font-size: 50px; }  </style>  <div class="fucku">  <h1>Haha, very funny ' + escape(domain.charAt().toUpperCase() + domain.replace(/^./,'')) + '. So mature.</h1> </div> </body>';
		document.body.innerHTML = t4whtml;
		setTimeout(function() {
			return document.location = 'http://t4w.me'; // REAL MATURE.
		}, 5000);
	}
});