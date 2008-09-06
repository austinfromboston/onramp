function wait( timeout ) {
  var start = new Date();
  var now = null;

  do { now = new Date(); } 
  while(now-start < timeout);
}
