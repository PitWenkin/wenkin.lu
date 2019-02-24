var colorThief = undefined;
OLEFA.registerModule('site-custom', function (resolve, reject) {
  var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
  if (isIE11) {
    OLEFA.snackbar.show({message: "Däi Browser ass leider ze al, a wäert dës Säit net richteg duerstellen."});
  };
  jQuery('div#fieldset select').each(function(){
    var label = jQuery(this).siblings('label[for="'+this.id+'"]');
    var text = label.text();
    text = text.replace(":","");
    jQuery(this).find('option').first().text(text);
    jQuery(this).attr('aria-label', text);
  });
  var pl = jQuery('input#search_keyword').attr('placeholder');
  jQuery('input#search_keyword').attr('aria-label', pl);
  colorThief = new ColorThief();
  jQuery('div#serien_baselist li').each(function(){
    bgColor(jQuery(this));
  });
  if (jQuery('div.media_volume').length == 1) {
    var vD = jQuery('div.media_volume');
    var v = vD.data('volume');
    jQuery('div.othervolume > a').each(function() {
      var ova = jQuery(this);
      var ov = ova.data('volume');
      if (ov == v-1) {
        ova.text('Vireschte Band: '+ova.text());
        ova.addClass('previous');
      }
      if (ov == v+1) {
        ova.text('NÃ¤chste Band: '+ova.text());
        ova.addClass('next');
      }
    });
  };
});

function bgColor(li) {
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
