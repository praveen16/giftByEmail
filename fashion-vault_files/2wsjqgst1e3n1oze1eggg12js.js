define.Class("ebay/context/Context",["raptor"],function(b,c){var a=c("raptor/client/features/Features"),e=function(d){b.extend(this,d);a.call(a,this.features)};return e});
define.Class("raptor/client/features/Features",["raptor"],function(b){var c=function(a){b.extend(this.supported,a)};b.extend(c,{supported:{},supports:function(a){return this.supported[a]}});return c});
