function isValidDomainName(domain) { 
    var re = new RegExp(/^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,6})$/); 
    return domain.match(re);
}

function isValidIpAddress(address) {

   ipParts = address.split('/');
   if (ipParts.length > 2) return false;
   if (ipParts.length == 2) {
      num = parseInt(ipParts[1]);
      if (num <= 0 || num > 32)
         return false;
   }

   if (ipParts[0] == '0.0.0.0' ||
       ipParts[0] == '255.255.255.255' )
      return false;

   addrParts = ipParts[0].split('.');
   if ( addrParts.length != 4 ) return false;
   for (i = 0; i < 4; i++) {
      if (isNaN(addrParts[i]) || addrParts[i] =="")
         return false;
      num = parseInt(addrParts[i]);
      if ( num < 0 || num > 255 )
         return false;
   }
   return true;
}

function isValidHostName(hostname){
	if(!hostname)
		return false;//empty
	else if(isValidIpAddress(hostname))
		return true;
	else if(isValidDomainName(hostname))
		return true;
	else
		return false;//invalid ip or domain name
}

function test_ipv6(ip)
{
  // Test for empty address
  if (ip.length<3)
  {
	return ip == "::";
  }

  // Check if part is in IPv4 format
  if (ip.indexOf('.')>0)
  {
        lastcolon = ip.lastIndexOf(':');

        if (!(lastcolon && isValidIpAddress(ip.substr(lastcolon + 1))))
            return false;

        // replace IPv4 part with dummy
        ip = ip.substr(0, lastcolon) + ':0:0';
  } 

  // Check uncompressed
  if (ip.indexOf('::')<0)
  {
    var match = ip.match(/^(?:[a-f0-9]{1,4}:){7}[a-f0-9]{1,4}$/i);
    return match != null;
  }

  // Check colon-count for compressed format
  if (substr_count(ip, ':'))
  {
    var match = ip.match(/^(?::|(?:[a-f0-9]{1,4}:)+):(?:(?:[a-f0-9]{1,4}:)*[a-f0-9]{1,4})?$/i);
    return match != null;
  } 

  // Not a valid IPv6 address
  return false;
}

function isValidIpAddress6(address) {
   ipParts = address.split('/');
   if (ipParts.length > 2) return false;
   if (ipParts.length == 2) {
      num = parseInt(ipParts[1]);
      if (num <= 0 || num > 128)
         return false;
   }

   return test_ipv6(ipParts[0]);
}

function getlength(number) {
 return number.toString().length;
}

function generateQuickGuid() {
 return Math.random().toString(36).substring(2, 15) +
     Math.random().toString(36).substring(2, 15);
}

/* Base64 Encode */
function Base64Encode(input) {
// Create Base64 Object
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}};
 var encodedString = Base64.encode(input);
 return encodedString;
}

/* Base64 Decode */
function Base64Decode(s){
// Create Base64 Object
    var e={},i,b=0,c,x,l=0,a,r='',w=String.fromCharCode,L=s.length;
    var A="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for(i=0;i<64;i++){e[A.charAt(i)]=i;}
    for(x=0;x<L;x++){
        c=e[s.charAt(x)];b=(b<<6)+c;l+=6;
        while(l>=8){((a=(b>>>(l-=8))&0xff)||(x<(L-2)))&&(r+=w(a));}
    }
    return r;
}

/* Jump to label */
function jumpWithId(id) {
   var top = document.getElementById(id).offsetTop; //Getting Y of target element
   window.scrollTo(0, top);                        //Go there directly or some transition

}

/* Check object does exist or not */
function isObjExist(id){
   //Attempt to get the element using document.getElementById
   var element = document.getElementById(id);

   //If it isn't "undefined" and it isn't "null", then it exists.
   if(typeof(element) != 'undefined' && element)
       return true;
   else
       return false;
}

/* Check variable does exist or not */
function isVarValid(str){
   if(typeof str != "undefined" && str)
       return true;
   else
       return false;
}

/* Change option list to specific value index */
function changeOption2ValueWithId(id, val){
   var sel = document.getElementById(id);
   var opts = sel.options;
   for (var opt, j = 0; opt = opts[j]; j++){
       if (opt.value == val) {
           sel.selectedIndex = j;
           break;
       }
   }
}

/* Change option list to specific value index */
function changeOption2innerTextWithId(id, val){
   var sel = document.getElementById(id);
   var opts = sel.options;
   for (var opt, j = 0; opt = opts[j]; j++){
       if (opt.innerText == val) {
           sel.selectedIndex = j;
           break;
       }
   }
}

/* Compare strings with length */
function strncmp(str1, str2, n) {
    str1 = str1.substring(0, n);
    str2 = str2.substring(0, n);
    return ( ( str1 == str2 ) ? 0 :
        (( str1 > str2 ) ? 1 : -1 ));
}

/* Resize iframe */
  function resizeIframe(obj) {
    obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
  }


//WLAN validation

/* Count UTF-8 string bytes */
//only work when charset=UTF-8
function lengthInUtf8Bytes(str) {
  // Matches only the 10.. bytes that are non-initial characters in a multi-byte sequence.
  var m = encodeURIComponent(str).match(/%[89ABab]/g);
  return str.length + (m ? m.length : 0);
}

/* Check SSID is valid or not */
//The SSID can be 0-32 octets with an unspecified or UTF8 encoding.
//We do not accept empty SSID here.
function isValidSSID(str) {
   	if(str === "")//is empty
    	return false;
	if(str.length > 32)
    	return false;
	for(i=0; i<str.length; i++){
		if(lengthInUtf8Bytes(str[i]) != 1)
			return false;
	}
	return true;
}

/* Check WPA-PSK passphrase is valid or not */
//WPA-PSK passphrase may be entered either as a string of 64 hexadecimal digits,
//or as a passphrase of 8 to 63 printable ASCII characters
function isValidWPA(str) { return /\b[0-9A-F]{64}\b/gi.test(str) | /^[\u0020-\u007e\u00a0-\u00ff]{8,63}$/.test(str); }


// Create Element.remove() function if not exist
// IE11 does not natively support Element.remove() method
if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function() {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}

function isValidPrintableASCII(str){
	if(!str)
		return false;
	var re = /^[\x20-\x7F]*$/;
	return str.match(re);
}

function isValidPrintableASCIIWithoutSpace(str){
	if(!str)
		return false;
	var re = /^[\x21-\x7F]*$/;
	return str.match(re);
}
