// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#cf5a62');

var win = Ti.UI.createWindow();

var scrollView = Ti.UI.createScrollView({
  contentHeight:'auto',
  showVerticalScrollIndicator:true,
	showHorizontalScrollIndicator:true
});

var collageView = Ti.UI.createImageView({
  image:'images/collage.jpg',
  widht:320,
  height:1340
});

var greeters = [
  [,,,,"",""],
  [,,,,"",""],
  [,,,,"",""],
  [,,,,"",""],
  [,,,,"",""],
  [,,,,"",""],
  [,,,,"",""],
  [,,,,"",""],
  [,,,,"",""],
  [,,,,"",""],
  [,,,,"",""],
  [,,,,"",""],
  [,,,,"",""],
  [,,,,"",""],
  [,,,,"",""],
  [,,,,"",""],
  [,,,,"",""],
  [,,,,"",""],
  [,,,,"",""],
  [,,,,"",""],
  [,,,,"",""],
  [,,,,"",""]
]






// Animatsii koteiki
// var a = Ti.UI.createAnimation();
// a.top = 400;
// a.left = 300;
// a.duration = 10000;
// treugolnik.animate(a);


// music
var sound = Titanium.Media.createSound({
  url:'sounds/kroko.mp3',
  looping:true
});
sound.play();


win.add(scrollView);
scrollView.add(collageView);
win.open();
