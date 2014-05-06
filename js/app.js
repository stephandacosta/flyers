angular.module('flyersDemo', ['flyers'])
.run(function($rootScope){
  sentimentHub = new VGSentimentHub(campaignUid, {
      VGVideo:    { count: 25 },
      Photo:      { count: 20 },
      Twitter:    { count: 20 },
      Instagram:  { count: 20 },
      Youtube:    { count: 30 }
  });

  console.log('creating flying images');
  sentimentHub.on('Done', function(data){
    $rootScope.$apply(function(){
      $rootScope.flyers = data;
    });
  });
  sentimentHub.fetch();
});