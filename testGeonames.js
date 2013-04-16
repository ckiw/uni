var http; // Notre objet XMLHttpRequest

function createRequestObject()
{
    var http;
    if (window.XMLHttpRequest)
    { // Mozilla, Safari, IE7 ...
        http = new XMLHttpRequest();
    }
    else if (window.ActiveXObject)
    { // Internet Explorer 6
        http = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return http;
}

function validateJSON(jsonText)
{
    return !(/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(
        jsonText.replace(/"(\\.|[^"\\])*"/g, '')))
    && eval('(' + jsonText + ')');
} // validateJSON(jsonText)

var lat=50.64;    
var lng=3.00;

function gestionClicLocal(jsonText){
	var lieu = eval(jsonText);
	if (lieu !== false)
	{
	    var str = lieu.geonames[0].countryName+' '+lieu.geonames[0].adminName1+' '+lieu.geonames[0].name;

	    
	    document.getElementById('resultat').innerHTML = str;
	}
	else
	{
	    document.getElementById('resultat').innerHTML = "JSON invalide";
	}
}

function gestionClic()
{
    http = createRequestObject();
    http.open('GET','http://api.geonames.org/findNearbyPlaceNameJSON?lat='+lat+'&lng='+lng+'&username=wildkiw' , true);
    http.onreadystatechange = (function()
    {    
        if (http.readyState === 4)
        {
            if (http.status === 200)
            {
                var lieu = validateJSON(http.responseText);
                if (lieu !== false)
                {
                    //var str = lieu.countryName+' '+lieu.adminName1+' '+lieu.name;
                    var str = lieu.geonames[0].name;
                    
                    document.getElementById('resultat').innerHTML = str;
                }
                else
                {
                    document.getElementById('resultat').innerHTML = "JSON invalide";
                }
            }
            else
            {
                alert('Pas glop pas glop');
            }
        }
    });
    http.send(null);
} // gestionClic()