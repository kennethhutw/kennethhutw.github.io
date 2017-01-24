function MM_openBrWindow(theURL,winName,features) { 
  window.open(theURL,winName,features);
}
function MM_goToURL() { //v3.0
  var i, args=MM_goToURL.arguments; document.MM_returnValue = false;
  for (i=0; i<(args.length-1); i+=2) eval(args[i]+".location='"+args[i+1]+"'");
}
function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}
function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

function MM_callJS(jsStr) { //v2.0
  return eval(jsStr)
}

function MM_popupMsg(msg) { //v1.0
  alert(msg);
}
function MM_changeProp(objId,x,theProp,theValue) { //v9.0
  var obj = null; with (document){ if (getElementById)
  obj = getElementById(objId); }
  if (obj){
    if (theValue == true || theValue == false)
      eval("obj.style."+theProp+"="+theValue);
    else eval("obj.style."+theProp+"='"+theValue+"'");
  }
}
function MM_jumpMenu(targ,selObj,restore){ //v3.0
  eval(targ+".location='"+selObj.options[selObj.selectedIndex].value+"'");
  if (restore) selObj.selectedIndex=0;
}
function MM_nbGroup(event, grpName) { //v6.0
  var i,img,nbArr,args=MM_nbGroup.arguments;
  if (event == "init" && args.length > 2) {
    if ((img = MM_findObj(args[2])) != null && !img.MM_init) {
      img.MM_init = true; img.MM_up = args[3]; img.MM_dn = img.src;
      if ((nbArr = document[grpName]) == null) nbArr = document[grpName] = new Array();
      nbArr[nbArr.length] = img;
      for (i=4; i < args.length-1; i+=2) if ((img = MM_findObj(args[i])) != null) {
        if (!img.MM_up) img.MM_up = img.src;
        img.src = img.MM_dn = args[i+1];
        nbArr[nbArr.length] = img;
    } }
  } else if (event == "over") {
    document.MM_nbOver = nbArr = new Array();
    for (i=1; i < args.length-1; i+=3) if ((img = MM_findObj(args[i])) != null) {
      if (!img.MM_up) img.MM_up = img.src;
      img.src = (img.MM_dn && args[i+2]) ? args[i+2] : ((args[i+1])? args[i+1] : img.MM_up);
      nbArr[nbArr.length] = img;
    }
  } else if (event == "out" ) {
    for (i=0; i < document.MM_nbOver.length; i++) {
      img = document.MM_nbOver[i]; img.src = (img.MM_dn) ? img.MM_dn : img.MM_up; }
  } else if (event == "down") {
    nbArr = document[grpName];
    if (nbArr)
      for (i=0; i < nbArr.length; i++) { img=nbArr[i]; img.src = img.MM_up; img.MM_dn = 0; }
    document[grpName] = nbArr = new Array();
    for (i=2; i < args.length-1; i+=2) if ((img = MM_findObj(args[i])) != null) {
      if (!img.MM_up) img.MM_up = img.src;
      img.src = img.MM_dn = (args[i+1])? args[i+1] : img.MM_up;
      nbArr[nbArr.length] = img;
  } }
}
function MM_displayStatusMsg(msgStr) { //v1.0
  window.status=msgStr;
  document.MM_returnValue = true;
}
function MM_showHideLayers() { //v9.0
  var i,p,v,obj,args=MM_showHideLayers.arguments;
  for (i=0; i<(args.length-2); i+=3) 
  with (document) if (getElementById && ((obj=getElementById(args[i]))!=null)) { v=args[i+2];
    if (obj.style) { obj=obj.style; v=(v=='show')?'block':(v=='hide')?'none':v; }
    obj.display=v; }
}
//------------------------------------自訂function------------------------------------

function showbar(id){		
	var obj = document.getElementById(id);			
	if(obj.style.display == "block"){
		obj.style.display = "none";						
	}else{
		obj.style.display = "block";	
	}		
}

//改變視窗大小
function maxWindow() {
  window.moveTo(0,0);
  window.resizeTo(screen.width, screen.height-30);
}

//扣除header,footer高度，讓content自動佔滿一個瀏覽器畫面，用於css expression
function adjustContentHeight(){
	var headerHeight=document.getElementById('header').offsetHeight;
	var footerHeight=document.getElementById('footer').offsetHeight;
	var contentHeight=document.getElementById('content').offsetHeight;
	if(	contentHeight > document.body.offsetHeight-headerHeight-footerHeight ){ 
	contentHeight = "auto";
	document.getElementById('footer').style.top=headerHeight+contentHeight;
	}else{
		contentHeight=document.body.offsetHeight-headerHeight-footerHeight;
	}
	return (contentHeight);
}

//扣除header,footer高度，讓content自動佔滿一個瀏覽器畫面，用於html頁面
function adjustContentHeight2(contentID){
	var viewportwidth; 
	var viewportheight; 
	var header=document.getElementById("header");
	var footer=document.getElementById("footer");

// the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight 

if (typeof window.innerWidth != 'undefined') 
{ 
      viewportwidth = window.innerWidth, 
      viewportheight = window.innerHeight 
} 

// IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document) 

else if (typeof document.documentElement != 'undefined' 
     && typeof document.documentElement.clientWidth != 
     'undefined' && document.documentElement.clientWidth != 0) 
{ 
       viewportwidth = document.documentElement.clientWidth, 
       viewportheight = document.documentElement.clientHeight 
} 

// older versions of IE 

else 
{ 
       viewportwidth = document.getElementsByTagName('body')[0].clientWidth, 
       viewportheight = document.getElementsByTagName('body')[0].clientHeight 
} 
document.getElementById(contentID).clientHeight =viewportheight -header.clientHeight-footer.clientHeight-10;
}

//（一個頁面內）動態iFrame尺寸
function getIFrameSize(iframeId){
	var f= document.getElementById(iframeId);
	var header=document.getElementById("header");
	var footer=document.getElementById("footer");
  	var viewportwidth; 
	var viewportheight; 

// the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight 
if (typeof window.innerWidth != 'undefined') 
{ 
      viewportwidth = window.innerWidth;
      viewportheight = window.innerHeight;
} 

// IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document) 
else if (typeof document.documentElement != 'undefined'  && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0) { 
       viewportwidth = document.documentElement.clientWidth; 
       viewportheight = document.documentElement.clientHeight;
} 

// older versions of IE 
else { 
       viewportwidth = document.getElementsByTagName('body')[0].clientWidth; 
       viewportheight = document.getElementsByTagName('body')[0].clientHeight;
} 
  f.width="100%";
  f.height=viewportheight -header.clientHeight-footer.clientHeight-10;
}

//依據iframe內容，動態決定iFrame尺寸(無法跨網域)
function dnyIframeSize(iframeId){
	var getFFVersion=navigator.userAgent.substring(navigator.userAgent.indexOf("Firefox")).split("/")[1];
	alert("getFFVersion="+getFFVersion);
	//extra height in px to add to iframe in FireFox 1.0+ browsers
	var FFextraHeight=getFFVersion>=0.1? 16 : 0 ;
  var pTar = null;
  if (document.getElementById){
    pTar = document.getElementById(iframeId);
  }
  else{
    eval('pTar = ' + iframeId + ';');
  }

  if (pTar && !window.opera){
    //begin resizing iframe
    pTar.style.display="block"
    if (pTar.contentDocument && pTar.contentDocument.body.offsetHeight){
      //ns6 syntax
      pTar.height = pTar.contentDocument.body.offsetHeight+FFextraHeight; 
    }
    else if (pTar.Document && pTar.Document.body.scrollHeight){
      //ie5+ syntax
      pTar.height = pTar.Document.body.scrollHeight;
    }   
  }
}

//依據iframe內容，動態決定iFrame尺寸(無法跨網域)
function SetWinHeight(obj){
	var win=document.getElementById(obj);
	if (document.getElementById){
	  if (win && !window.opera){
	   if (win.contentDocument && win.contentDocument.body.offsetHeight){
		    win.height = win.contentDocument.body.offsetHeight; 
	   }else if(win.Document && win.Document.body.scrollHeight){
		    win.height = win.Document.body.scrollHeight;
	   }
	  }
	}
}