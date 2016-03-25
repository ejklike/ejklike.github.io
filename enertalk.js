initialize();

// Global variables for keeping tokens and device id
var AUTH_CODE = "eaff11bc073186b50a51106a502963e21b4e5abac7fc5c6607645eddb8f46697";
var ACCESS_TOKEN;
var DEVICE_ID;

// TODO Please replace with your client_id, secret, and redirect URI
var CLIENT_ID = "ZXVuamlraW1AZG0uc251LmFjLmtyX3Rlc3Q=";
var CLIENT_SECRET = "w71024tu5kh8548mp7xf4c74qi8bq1p48366on3";
var REDIRECT_URI = "http://ejklike.github.io/enertalk.html";

// Define String.startsWith method
if (!String.prototype.startsWith)
{
    String.prototype.startsWith = function(searchString, position){
        position = position || 0;
        return this.substr(position, searchString.length) === searchString;
    };
}

/**
 * Initialize Enertalk sample page
 */
function initialize()
{
    // Check if there's an auth code passed in the URL
    parseAuthCodeFromUrl();
}


/*************************
 * AUTHENTICATION SECTION
 *************************/

/**
 * Show Enertalk Login UI
 */
function enertalkLogin()
{
    var authUri = "https://enertalk-auth.encoredtech.com/login";
    var clientIdParam = "?client_id=" + CLIENT_ID;
    var redirectUriParam = "&redirect_uri=" + REDIRECT_URI;

    var responseTypeParam = "&response_type=code";
    var appVersionParam = "&app_version=web";
    var backUrlParam = "&back_url=/authorization";
    
    // Show Enertalk Sign-in page
    var loginUri = authUri + 
        clientIdParam + 
        redirectUriParam + 
        responseTypeParam + 
        appVersionParam + 
        backUrlParam; 
    
    window.open(loginUri, '_blank', 'location-no');
}
 
/**
 * Parse auth code from re-directed URL
 */
function parseAuthCodeFromUrl()
{
    var expectedUrl = "http://ejklike.github.io/enertalk.html";
    
    var currentUri = window.location.href;
    console.log(": " + currentUri);

    if (currentUri.startsWith(expectedUrl))
    {
        AUTH_CODE = currentUri.split("code=")[1];

        // Update html page with retrieved token info
        updateLoginAndTokenElements();
    }
}

/**
 * Update login and token elements on html page
 */
function updateLoginAndTokenElements()
{
    if(!AUTH_CODE)
    {
        console.error("Authorization Code NOT available");
        
        return;
    }
    
    console.log("Authorization Code: " + AUTH_CODE);
    
    // Hide login button and show login string
    document.getElementById("auth-login-button").style.display = "none";
    document.getElementById("login-string").style.display = "block";
    
    // Show token UIs
    document.getElementById("auth-tokens").style.display = "block";
    document.getElementById("authorization-code").innerHTML = AUTH_CODE;
}

/**
 * Update access token from auth code
 */
function updateAccessTokenFromAuthCode()
{
    var httpRequest = new XMLHttpRequest();
    
    // Handler on http loaded
    httpRequest.onload = function()
    {
        if (httpRequest.readyState === 4 && httpRequest.status === 200)
        {
            var response = JSON.parse(httpRequest.responseText);
            
            ACCESS_TOKEN = response.access_token;
            console.log("Access Token: " + ACCESS_TOKEN);
            
            if (ACCESS_TOKEN)
            {
                // Hide the token button and display access token instead
                document.getElementById("get-access-token-button").style.display = "none";
                document.getElementById("access-token-string").innerHTML = ACCESS_TOKEN;
                
                // Show Enertalk API and Card section
                document.getElementById("enertalk-api").style.display = "block";
                document.getElementById("enertalk-card").style.display = "block";
            }
        }
    }
    
    // Send request
    var tokenUrl = "https://enertalk-auth.encoredtech.com/token";
    httpRequest.open("POST", tokenUrl);
    httpRequest.setRequestHeader("Content-Type", "application/json");
    
    var postData = JSON.stringify(
    {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'authorization_code',
        code: AUTH_CODE
    });
    
    httpRequest.send(postData);
}

/*************************
 * ENERTALK API SECTION
 *************************/

/**
 * Show API result for given apiName
 * @param {String} apiName api name to be accessed
 */
function showApiResult(apiName)
{
    console.log("showApiResult for " + apiName + " API");
    
    if (!ACCESS_TOKEN)
    {
        // If access token is not available, stop processing
        window.alert("Access token NOT available :(")
        
        return;
    }
    
    if (DEVICE_ID)
    {
        // If device id is available, send API request
        sendApiRequest(apiName);
    }
    else
    {
        // Otherwise, get device id first and the send request
        retrieveDeviceIdAndSendApiRequest(apiName);
    }
}

/**
 * Update API elements on html page for given API name and result
 * @param {String} apiName
 * @param {String} apiResult
 */
function updateApiElement(apiName, apiResult)
{   
    console.log("updateApiView for " + apiName);
    
    var resultString = '';
    for (var param in apiResult)
    {
        resultString += param + ' ' + apiResult[param] + '<br />';
    }
    
    document.getElementById(apiName).innerHTML = resultString;
}

/**
 * Send API request with given API name
 * @param {String} apiName
 */
function sendApiRequest(apiName)
{
    var httpRequest = new XMLHttpRequest();
    httpRequest.onload = function()
    {
        if (httpRequest.readyState === 4 && httpRequest.status === 200)
        {   
            var response = JSON.parse(httpRequest.responseText);

            console.log(response);
            updateApiElement(apiName, response);
        }
        else
        {
            console.log("httpRequest.readyState: " + httpRequest.readyState);
            console.log("httpRequest.status: " + httpRequest.status);
        }
    }
    
    // API url to send API request
    var apiUrl = "https://api.encoredtech.com:8082/1.2/devices/" + DEVICE_ID;
        
    // Append api name to it unless it's API for deviceInfo
    if (apiName !== 'deviceInfo')
    {
        apiUrl += '/' + apiName;
    }
    
    httpRequest.open("GET", apiUrl);
    httpRequest.setRequestHeader("Authorization", "Bearer " + ACCESS_TOKEN);
    
    httpRequest.send();
}

/**
 * Retrieve device id and send api request
 * @param {String} apiName 
 */
function retrieveDeviceIdAndSendApiRequest(apiName)
{   
    var httpRequest = new XMLHttpRequest();
    httpRequest.onload = function()
    {
        if (httpRequest.readyState === 4 && httpRequest.status === 200)
        {   
            var response = JSON.parse(httpRequest.responseText);
            
            DEVICE_ID = response.uuid;
            console.log("Device ID: " + DEVICE_ID);
            
            if (DEVICE_ID)
            {
                sendApiRequest(apiName);
            }
        }
        else
        {
            console.log("httpRequest.readyState: " + httpRequest.readyState);
            console.log("httpRequest.status: " + httpRequest.status);
        }
    }
        
    var deviceUuidUrl = "https://enertalk-auth.encoredtech.com/uuid";
    httpRequest.open("GET", deviceUuidUrl);
    httpRequest.setRequestHeader("Authorization", "Bearer " + ACCESS_TOKEN);
    
    httpRequest.send();
}