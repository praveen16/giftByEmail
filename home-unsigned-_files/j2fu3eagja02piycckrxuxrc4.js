raptor.defineClass("raptor.tracking.core.Tracker",function(f){var j=f.require("ebay.cookies"),n=function(c){var a=$trk=this;f.extend(a,a.config=c);a.image=$("<img/>").css("display","none");a.rover.sync&&a.image.attr("src",a.rover.sync);f.bind(a,document,"click",a.onBody);f.bind(a,document,"mousedown",a.onMouse);f.bind(a,document,"rover",a.onRover);f.bind(a,document,"track",a.onTrack);a.originalPSI=a.currentPSI=c.psi;$("body").bind("TRACKING_UPDATE_PSI",function(b,d){if(d&&d.psi)a.currentPSI=d.psi;
d&&d.callback&&typeof d.callback=="function"&&d.callback.call(a)})};f.extend(n.prototype,{codes:["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","-","_","!"],sizes:{p:4,c:1,m:3,l:3},start:{p:1,c:5,m:6,l:9},target:function(c){return c.tagName?c:c.target},attrib:function(c,a){return c.getAttribute?c.getAttribute(a):
null},valid:function(c,a){return a&&a.indexOf(".ebay.")>0?c:null},trackable:function(c){var a=this,b=c.tagName;return b.match(/^a$|area/i)?a.valid(b,b.href):b.match(/input/)&&b.type.match(/submit/i)&&b.form?a.valid(b,form.action):null},click:function(c){for(var a=this,b=a.target(c),d=null;b&&b.tagName;b=b.parentNode){d=d||a.trackable(b);if(a.attrib(b,"_sp"))return a.clickElement(b,d)}a.pid&&a.track(a.pid)},clickElement:function(c,a){var b=this,d=b.attrib(c,"_sp");b.track(d.split(";")[0],a?b.attrib(a,
"_l"):null)},track:function(c,a){var b=this,d=c.split(".");c.match(/p\d+/)||d.push(b.pid);a&&d.push(a);for(var e=j.readCookie("ds2","sotr"),k=b.chars(e&&e.charAt(0)=="b"?e:"bzzzzzzzzzzz"),g=0,l=d.length;g<l;g++){var m=d[g].match(/([pcml])(\d+)/);if(m!=null){var h=m[1],o=b.sizes[h];h=b.start[h];for(var p=b.chars(b.encode(m[2],o)),i=0;i<o;i++)k[h+i]=p[i]}}g=0;l=k.length;for(e="";g<l;)e=e.concat(k[g++]);j.writeCookielet("ds2","sotr",e);f.log("debug","track",d.join("."),e)},chars:function(c){for(var a=
0,b=c.length,d=[];a<b;)d.push(c.charAt(a++));return d},encode:function(c,a){for(var b=this.codes,d="";c>=64;c=c/64|0)d=b[c%64]+d;d=(c>=0?b[c]:"")+d;return d.concat("zzzz").substring(0,a)},onBody:function(c){this.click(c)},onMouse:function(){j.writeCookielet("ebay","psi",this.currentPSI);f.log("debug","psi",this.currentPSI)},onTrack:function(c,a){var b=a.trksid;b&&this.track(b,a.trklid)},onRover:function(c,a){var b=this,d=a.imp,e=$uri(b.rover.uri+(d?b.rover.imp:b.rover.clk));if(d)e.params.imp=d;delete a.imp;
e.params.trknvp=e.encodeParams(a);e.params.ts=(new Date).valueOf().toString();b.image.attr("src",e.getUrl(),e.params);f.log("debug",e.getUrl())}});return n});
raptor.defineClass("raptor.tracking.idmap.IdMap",function(d){var f=d.require("ebay.cookies"),g=function(){};d.extend(g,{roverService:function(a){var b=this;b.url=$uri(a||"");b.url.protocol.match(/https/)||f.readCookie("dp1","idm")||d.bind(b,window,"load",b.sendRequest)},sendRequest:function(){this.url.appendParam("cb","raptor.require('raptor.tracking.idmap.IdMap').handleResponse");$.ajax({url:this.url.getUrl(),dataType:"jsonp",jsonp:false})},handleResponse:function(a){var b=this;b.image=$("<img/>").css("display",
"none");for(var c=0,e=a.length-1;c<e;c++)a[c]&&b.image.attr("src",a[c]);e&&b.setCookieExpiration(a[e])},setCookieExpiration:function(a){typeof a=="number"&&a>0&&f.writeCookielet("dp1","idm","1",a/86400,"")}});return g});raptor.require("raptor.tracking.idmap.IdMap");
