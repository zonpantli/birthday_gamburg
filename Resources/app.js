Titanium.UI.setBackgroundColor('#cf5a62');

var win = Ti.UI.createWindow();

var scrollView = Ti.UI.createScrollView({
  contentHeight:'auto',
  showVerticalScrollIndicator:false,
	showHorizontalScrollIndicator:false
});

var collageView = Ti.UI.createImageView({
  image:'images/collage.jpg',
  widht:320,
  height:1340
});

var greeters = [
  [84,0,79,108,"Miika и Treugonik","двадцать четыре плюс грамулька, это Матулка Матулка"],
  [189,38,70,93,"Heidi","Welcome to the iAge, Dana. :) U might wanna download \"Shazam\" and you'll know your music..."],
  [10,104,93,116,"Ilmari","DANA YOU ARE TO MOST WONDERFUL JEW I HAVE EVER MET!"],
  [118,136,107,137,"Sirpa","My greeting made it to the background, Suckers!"],
  [248,144,73,143,"Irina","**\nDana!\n\nLet your life be like a symphony\nWith smoothy screen touching i-phony...\n\n**"],
  [13,250,103,131,"Nora","D ear friend,\nA dorable and\nN everending\nA nniversary"],
  [116,280,95,151,"Anastasia","Tanti auguri дружок, c твоим новым годом! <3"],
  [220,348,100,131,"Katariina","They say, Steve Jobs cried when he saw this little device, it was so perfect. Not that your present should be anything less. Happy Birthday!"],
  [0,454,135,131,"Hanna","Don't let anything stop you from being the coolest kid in town – wherever you are! Happy birthday beautiful XXX"],
  [222,532,98,134,"Samuli","животное поздравления"],
  [133,607,89,138,"Saara","Dana oot tärkee, valtaisat onnittelut, ei se mitään, että 30 lähenee!"],
  [0,631,129,151,"Maria","happy Bogdana-day let the power of Google Calendar be with you!"],
  [226,677,96,199,"Olli & Anne","Happy iBirthday! Jättionnittelut!"],
  [116,754,81,190,"Minna","I need no say anything, I have an AXE!"],
  [0,800,101,106,"Olaya","Happy birthday, Dana! Have a great time with your present and in the party! So, when is the b'day actually?"],
  [203,874,106,135,"Melania","Happy birthday, Dana!"],
  [28,941,71,116,"Saara","Hey Dana! This is my virtual hug from Amsterdam, have a sunny birthday picnic! We'll celebrate it again when I'm back in Helsinki! :)"],
  [99,1023,71,109,"Egor","FOOBARZAZEVY"],
  [178,1013,137,130,"Maxim","Дорогая наша Дана!\nБыть счастливой и красивой\nЯ желаю-поздравляю!"],
  [0,1162,84,142,"Antti","I'll fuck you from Berlin. Damn you auto-correct. Happy Bday Dana!"],
  [94,1175,79,143,"Christine","Many birthday wishes to you my wonderful, beautiful friend from Nine and Lili"],
  [237,1164,83,137,"Antti & Ninni","Iloista synttäriä Dana!"]
]

for (var i=0; i < greeters.length; i++) {
  (function(g) {
    gView = Ti.UI.createView({
      left:g[0],
      top:g[1],
      width:g[2],
      height:g[3]
    });
    
    gView.addEventListener('click', function() {
      var a = Titanium.UI.createAlertDialog({
    		title:g[4],
    		message:g[5]
    	});
    	a.show();
    	setTimeout(function()
    	{
    		a.hide();
    	},5000);
    	Titanium.Media.vibrate();
    });
    
    collageView.add(gView);
  })(greeters[i]);
};


// animatsii koteiki

// treugolnik
var treugolnik = Ti.UI.createView({
  left:0,
  top:0,
  width:80,
  height:96
});
var treugolnikPeek = Ti.UI.createImageView({
  image:'images/treugolnik.png',
  width:116,
  height:131,
  left:-116,
  top:160
});
collageView.add(treugolnik);
collageView.add(treugolnikPeek);
var aTreu = Ti.UI.createAnimation({
  left:0,
  duration:2000,
  autoreverse:true,
  curve:Ti.UI.ANIMATION_CURVE_EASE_IN
});
var treuMau = Titanium.Media.createSound({
  url:'sounds/treugolnik.mp3',
});
treugolnik.addEventListener('click', function() {
  treugolnikPeek.animate(aTreu);
  setTimeout(function() {
    treuMau.play();
  }, 1500);
});

// sibas
var sibas = Ti.UI.createView({
  left:182,
  top:1212,
  width:51,
  height:128
});
var sibasFly = Ti.UI.createImageView({
  image:'images/sibas.png',
  width:150,
  height:186,
  left:320,
  top:881
});
collageView.add(sibas);
collageView.add(sibasFly);
var transformSibas = Titanium.UI.create2DMatrix();
transformSibas = transformSibas.rotate(-90);
var aSibas = Ti.UI.createAnimation({
  transform:transformSibas,
  left:-50,
  top:1360,
  duration:4000,
  curve:Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
});
sibas.addEventListener('click', function() {
  sibasFly.animate(aSibas);
  setTimeout(function() {
    sibasFly.top = 881;
    sibasFly.left = 320;
  }, 4000);
});



// music
var music = Titanium.Media.createSound({
  url:'sounds/kroko.mp3',
  looping:true
});
music.play();


win.add(scrollView);
scrollView.add(collageView);
win.open();
