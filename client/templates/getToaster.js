function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if( userAgent.match( /iPad/i ) || userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i ) )
  {
    return 'iOS';
  }
  else if( userAgent.match( /Android/i ) )
  {
    return 'Android';
  }
  else
  {
    return 'unknown';
  }
}


  Template.getToaster.rendered = function () {
    var os = getMobileOperatingSystem();
      if(os==="iOS") {
        window.location="https://appsto.re/us/_W1Pr.i";
      } else if(os==="Android") {
        window.location="https://play.google.com/store/apps/details?id=com.uklooney.flyingtoast&hl=en";
      } else {
        $('.tabs a.active').removeClass('active');
        $('.tabs a:first-child').addClass('active');
        Router.go('/');
      }
  }

