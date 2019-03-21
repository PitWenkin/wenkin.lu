var colorThief = undefined;
OLEFA.registerModule('site-custom', function (resolve, reject) {
  jQuery('div#fieldset select').each(function(){
    //Adding ARIA labels for searchform selects
    var label = jQuery(this).siblings('label[for="'+this.id+'"]');
    var text = label.text();
    text = text.replace(":","");
    jQuery(this).find('option').first().text(text);
    jQuery(this).attr('aria-label', text);
  });
  //Adding ARIA labels for searchform text input
  var pl = jQuery('input#search_keyword').attr('placeholder');
  jQuery('input#search_keyword').attr('aria-label', pl);
  colorThief = new ColorThief();
  jQuery('div#serien_baselist li').each(function(){
    //Applying background color to each record
    bgColor(jQuery(this));
  });
  if (jQuery('div.media_volume').length == 1) {
    //for books belonging to a serie, tries to display previous and next book
    var vD = jQuery('div.media_volume');
    var v = vD.data('volume');
    jQuery('div.othervolume > a').each(function() {
      var ova = jQuery(this);
      var ov = ova.data('volume');
      if (ov == v-1) {
        ova.text(previousband+': '+ova.text());
        ova.addClass('previous');
      }
      if (ov == v+1) {
        ova.text(nextband+': '+ova.text());
        ova.addClass('next');
      }
    });
  };
  jQuery(document).on('olefa-baselist-load', function(e, data) {
    //Custom "error-message" for seach results returning nothing
    jQuery(document).off('olefa-baselist-load');
    jQuery(document).on('olefa-baselist-load', function(e, data) {
      if (data.json.counter == 0) {
         OLEFA.snackbar.show({message: OLEFA.i18n.get('nothing_found')});
      }
    });
  });
});
var $buoop = {
  required:{
    e:-4,
    i:12,
    f:-5,
    o:-3,
    s:-1,
    c:-5
  },
  insecure:true,
  api:2019.03,
  nomessage: true,
  onshow: function(infos){
    OLEFA.snackbar.show({message: oldbrowser});
  }
};
//Showing warning message for older browsers, that some stuff might not look good 
function $buo_f(){ 
  var e = document.createElement("script"); 
  e.src = "//browser-update.org/update.min.js"; 
  document.body.appendChild(e);
};
try {document.addEventListener("DOMContentLoaded", $buo_f,false)}
catch(e){window.attachEvent("onload", $buo_f)}

function bgColor(li) {
  //selects image in current li an calculate the median color
  //uses the median color to set background color of whole li
  var palette = colorThief.getPalette(jQuery(li).find('img') [0], 2);
  if (palette) {
    for (var i = 1; i < palette.length; ++i) {
      var delta = 0;
      delta += Math.abs(palette[0][0] - palette[i][0]);
      delta += Math.abs(palette[0][1] - palette[i][1]);
      delta += Math.abs(palette[0][2] - palette[i][2]);
      if (delta < 100) {
        palette[i][0] = (128 + palette[0][0]) % 255;
        palette[i][1] = (128 + palette[0][1]) % 255;
        palette[i][2] = (128 + palette[0][2]) % 255
      }
    }
    var color= 'rgba('+palette[0][0]+','+palette[0][1]+','+palette[0][2]+', 0.2)';
    jQuery(li).css('background-color', color);
    color= 'rgba('+palette[0][0]+','+palette[0][1]+','+palette[0][2]+', 0.1)';
    jQuery(li).css('border-color', color);
  }
};
