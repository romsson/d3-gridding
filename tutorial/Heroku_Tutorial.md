How to set up a website in Heroku

This tutorial assumes that somewhere in your local machine you have created a website already that you want to publish in Heroku. So instead of creating html and css files from scratch we will go directly to the website. This turotial assumes as well that packages such as Node.js and npm are installed too on your computer.  

The first step is to sign up via: 

https://signup.heroku.com/account

In this very first step we have to choose the buildpack. In our case, I have picked Node.js as the base language in which the website is powered. There are other options such as PhP, Ruby or Python, but we will stick to Node.js for the moment. 

In order to manage the build process, we have to install the Heroku command line. In the development website:

https://devcenter.heroku.com/articles/getting-started-with-java#set-up

Pick the operating system from the drop down list and click again on the option chosen. Proceed with the installation as usual, by double clicking the installation package. 

To start, open the terminal and type:

$ heroku 

And then log in via:

$ heroku login

It will ask for the login details, same as those introduced above in the sign up step. The login will enable both heroku and git. Once this is done, click on the banned "I have installed Heroku" in the development website we were in. 

Now, for doing the transfer between our local website and the heroku servers, we need two ingredients. One called Express will enable the website in the context of Node.js buildpack. The other one, Git, will communicate changes made on the local files with Heroku and it will also send the files to the public server. 

Let's start with Express. Wherever you have your folder with the website we install Express by typing: 

$ npm install -g express-generator

We create a folder where the new app will be allocated: 

$ mkdir name_of_the_website
$ cd name_of_the_website

Inside we generate an express site: 

$ express -c name_of_the_website

Express generates a set of files and subfolders as follows: 

   create : .
   create : ./package.json
   create : ./app.js
   create : ./public
   create : ./routes
   create : ./routes/index.js
   create : ./routes/users.js
   create : ./views
   create : ./views/index.jade
   create : ./views/layout.jade
   create : ./views/error.jade
   create : ./bin
   create : ./bin/www
   create : ./public/javascripts
   create : ./public/images
   create : ./public/stylesheets
   create : ./public/stylesheets/style.css
   
Then install dependencies via: 

$ cd express_example && npm install

To see the template running on your local machine, run: 

$ DEBUG=name_of_the_website:* npm start

The default Express site will appear by clicking on http://127.0.0.1:3000
   
The backbone of the local app is now defined. This structure will be subject to adding new files and modifications on these files, so we need Git to keep track of the changes and transfer the files to the Heroku server. 

For this, we initialize Git by doing: 

$ git init
$ git add .
$ git commit -m 'initial commit'

Before replacing the template Express app with our website files, there is some fine tuning in Node.js to be done. Despite the help of Express, there is an additional module to run in order to properly update the website while doing modifications. For this we install the following: 

$ npm install -g nodemon

And we apply it to our template: 

$ DEBUG=name_of_the_website nodemon npm start

We can start replacing and adding our html files into the template. Express is designed to work with files in .jade format. To spare the conversion of .html files into .jade files we will make some modifications so that Express reads directly .htmls. In our directory we will change the following in app.js file: 

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

And installing ejs:

$ npm install ejs

In this way the view engine will be html instead of jade. So, in /views we can now paste our main .html file, or the usual index.html. In this way Express reads index.html in its original html format. 

In addition, looking at the directory tree in our template, there are dedicated folders to allocate specific files such as .css, .js or images. We must adapt some paths in order to allow Express to find static files included into our original .html. This is already done by a command line in app.js: 

app.use(express.static(path.join(__dirname, 'public')));

The static files must be referenced in the .html file as being in the same directory as index.html, although Express will go to find them in the /public directory. An example of the code included into index.html is as follows: 

<script type="text/javascript" src="./d3.min.js"></script>
<script src="./topojson.js"></script>
<link type="text/css" rel="stylesheet" href="./bas.css">

Bear in mind again that these files are not located in /views but in /public. 

Once all our files are copied into the Express template, add.js has been properly modified and paths have been changed accordingly to the /public folder, we are ready to register all these changes in Git and publish the website in Heroku. To this end we add the new files into Git and we register the changes with somme comments: 

$ git add *
$ git commit *

The set up is ready to be uploaded to Heroku. We can do this with this command: 

$ heroku apps:create 

You will see the following link to the new public website: 

https://cryptic-spire-27248.herokuapp.com/ | https://git.heroku.com/cryptic-spire-27248.git

However it is still empty. Git allows us to transfer the files with a 'push' command: 

$ git push heroku master


































