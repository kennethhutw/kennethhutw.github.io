var cookieTools = [];

cookieTools.SetCookie = function (name, value)
{
	var Days = 30;
	var exp = new Date();
	exp.setTime(exp.getTime() +  Days*24*60*60*1000);
	document.cookie = name + " =" + escape(value) + ";expires="+ exp.toGMTString();
};

cookieTools.getCookie = function (name)
{
	var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
	if(arr != null) 
		return unescape(arr[2]);
	return null;
}

cookieTools.delCookie = function (name)
{
	var exp = new Date();
	exp.setTime(exp.getTime() -1);
	var cval = getCookie(name);
	if(cval != null)
		document.cookie = name  + "="+cval+";expires="+exp.toGMTString();
}

cookieTools.request = function (name){
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) 
	   return unescape(r[2]); 
	return null;
}

String.prototype.replaceAll = function(oldStr, newStr){
	 return this.replace(new RegExp(oldStr,"gm"),newStr);
}