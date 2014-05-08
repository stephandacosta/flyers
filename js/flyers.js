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

  init: function($container){
    console.log('creating flying images');
    Flyers.$container = $container;
    sentimentHub.on('Data', Flyers.onData);
    sentimentHub.on('Done', Flyers.onDataDone);
    sentimentHub.fetch();
  },

  // Triggered when data for a particular network is available
  onData: function(network, data){

  },

  // Triggered when we are done fetching data
  onDataDone: function(data){
    Flyers.drawFlyers(data);
  },

  playIfShared: function(item){
  //  uncomment to allow video popup play
  //   var contentId = $.cookie("vgvidid");
  //   if (contentId && item.id == contentId){
  //     ga_events.sboxShareReferral(item.network, item.id);
  //     if (item.type != 'video'){
  //       player.hidePlayerMessage();
  //       player.play(item);
  //       ga_events.shareReferral('content:'+item.network, item.id);
  //       $.cookie("vgvidid", '', {
  //         expires: 0,
  //         domain: cookieDomain,
  //         path: '/'
  //       });
  //     }
  //   }
  },

  // draw the items as desired
  drawItem: function(network, item){
    console.log(item);
  },


  drawFlyers : function (data){
    console.log('flyers function');
    
    var $imgList = $('<ul id="wi-el" class="wi-container"></ul>');

    for (var i = 0 ; i < data.length ; i++){

      var $imgItem = $('<li></li>').css("height","100%");

      // add image to list item
      var photo = data[i].image || data[i].thumb || data[i].profilePic;
      var $img = $("<img />").attr({src: photo});
      $imgItem.append($img);

      // add contributor name to list item
      $imgItem.append($('<h4>' + data[i].contribName + '</h4>'));

      // add text to list item
      $imgItem.append($('<div class="info text"></div>')
      .append(data[i].textHtml));

      // add list item to unsorted list
      $imgList.append($imgItem);

    }

    // add list to container
    Flyers.$container.append($imgList);

    // add navigation buttons to container
    $navig = $("<nav>");
    Flyers.$container.append($navig);
    $navig.append('<div id="nav-prev">prev</div>');
    $navig.append('<div id="nav-next">next</div>');

    Flyers.setNavigation($( '#wi-el' ));


    /* example to add items
    setTimeout(function(){
      
      $el.prepend('<li><img src="images/demo1/3.jpg" alt="image1"/><h4>Coco Loko</h4><p>Total bicycle rights in blog four loko raw denim ex, helvetica sapiente odio placeat.</p></li>');

      // or:
      // $el.append('<li><img src="images/demo1/3.jpg" alt="image1"/><h4>Coco Loko</h4><p>Total bicycle rights in blog four loko raw denim ex, helvetica sapiente odio placeat.</p></li>');
      
      windy.update();

    },2000)
    */


  },

  setNavigation: function($element){

    var windy = $element.windy();
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
        windy.next();
        setTimeout( function() {  
          navnext();
        }, 150 );
      }
    }
    
    function navprev() {
      if( allownavprev ) {
        windy.prev();
        setTimeout( function() {  
          navprev();
        }, 150 );
      }
    }


  }




};