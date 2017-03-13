var casper = require("casper").create({
  verbose: true,
  logLevel: "debug"
});

var url = casper.cli.args[0];

casper.start(url, function(){
    this.echo('Hello, World! The Page title on '+ url +' is ' + this.getTitle());
});

casper.wait(15000, function() {
  this.echo('snapshot taken');
  this.captureSelector('bicycles-2.png', 'body');
});

casper.run(function() {
    this.echo('Everything in the stack has ended.').exit();
});


