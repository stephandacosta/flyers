/* 
code based on plugin: https://github.com/codrops/Windy
created by Codrops
License: http://tympanus.net/codrops/licensing/

Background Pattern(s) from http://subtlepatterns.com/
http://creativecommons.org/licenses/by-sa/3.0/deed.en_US

normalize.css by Nicolas Gallagher: http://github.com/necolas/normalize.css
*/


var Flyers = {
  $container: $("body"),
  
  firstCall : true,


  init: function($container){
    console.log('creating flying images');
    Flyers.$container = $container;
    Flyers.layout();
    Flyers.windy = $('#wi-el').windy();
    sentimentHub.on('Data', Flyers.onData);
    sentimentHub.on('Done', Flyers.onDataDone);
    sentimentHub.fetch();
  },

  // Triggered when data for a particular network is available
  onData: function(network, data){
    $.each(data, function(key, item){
      Flyers.drawItem(network, item, key);

      // let the library know we have used this item
      sentimentHub.markDataItemAsUsed(item);

      Flyers.playIfShared(item);
    });
  },

  // Triggered when we are done fetching data
  onDataDone: function(data){
  },

  playIfShared: function(item){
    var contentId = $.cookie("vgvidid");
    if (contentId && item.id == contentId){
      ga_events.sboxShareReferral(item.network, item.id);
      if (item.type != 'video'){
        player.hidePlayerMessage();
        player.play(item);
        ga_events.shareReferral('content:'+item.network, item.id);
        $.cookie("vgvidid", '', {
          expires: 0,
          domain: cookieDomain,
          path: '/'
        });
      }
    }
  },

  // draw the items as desired
  drawItem: function(network, item, key){

    var $listItem = $('<li></li>').css("height","100%");

    // add image to list item
    var photo = item.image || item.thumb || item.profilePic;
    var $imgWrapper = $('<div class="imgWrapper">')
    .css('background-image','url(' + photo + ')');
    $listItem.append($imgWrapper);

    // add contributor name to list item
    $listItem.append($('<h4>' + item.contribName + '</h4>'));

    // add text to list item
    $listItem.append($('<div class="info text"></div>')
    .append(item.textHtml));

    // add list item to unsorted list
    $('#wi-el').append($listItem);

    if (key === 0 && Flyers.firstCall){
      Flyers.windy = $('#wi-el').windy();
      Flyers.firstCall = false;
    } else {
      Flyers.windy.update();
    }

  },


  layout: function(){
    var $List = $('<ul id="wi-el" class="wi-container"></ul>');
    // add list to container
    Flyers.$container.append($List);

    // add navigation buttons to container
    $navig = $("<nav>");
    Flyers.$container.append($navig);
    $navig.append('<div id="nav-prev">prev</div>');
    $navig.append('<div id="nav-next">next</div>');

    Flyers.setNavigation($( '#wi-el' ));

  },


  setNavigation: function($element){
    var allownavnext = false;
    allownavprev = false;

    $( '#nav-prev' ).on( 'vmousedown', function( event ) {
      event.preventDefault();
      allownavprev = true;
      navprev();
    })
    .on( 'vmouseup vmouseleave', function( event ) {
      event.preventDefault();
      allownavprev = false;
    });

    $( '#nav-next' ).on( 'vmousedown', function( event ) {
      event.preventDefault();
      allownavnext = true;
      navnext();
    })
    .on( 'vmouseup vmouseleave', function( event ) {
      event.preventDefault();
      allownavnext = false;
    });

    function navnext() {
      if( allownavnext ) {
        Flyers.windy.next();
        setTimeout( function() {  
          navnext();
        }, 150 );
      }
    }
    
    function navprev() {
      if( allownavprev ) {
        Flyers.windy.prev();
        setTimeout( function() {  
          navprev();
        }, 150 );
      }
    }

  }

};