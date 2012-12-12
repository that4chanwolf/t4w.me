/*
 * t4w.me 
 *
 * Because you totally give a shit about if my site is a botnet
 *
 * Requires: cluster, express, ejs, some built-in things (fs, os, util, etc.)
 *
 * Views:
 * 	/ - Home
 * 	/about - About
 * 	/projects - Projects (like this one)
 * 	/subs - For our subgroup
 * 	/source - Source code for the website
 *	/xdcc - XDCC packlist for [t4w]Horo
 */
 
 (function main() { // We quine now?
	var modules = { // Modules all in a convienient place
		fs: require('fs'),
		util: require('util'),
		os: require('os'),
		express: require('express'),
		cluster: require('cluster'),
		ejs: require('ejs')
	};

	if(modules["cluster"].isMaster) { // Forking
		modules["os"].cpus().forEach(function() {
			modules["cluster"].fork();
		});
		return;
	}

	modules["util"].puts("Process started with a pid of " + process.pid);

	var app = modules["express"]();

	app.configure(function() {
		app.set('views', __dirname + '/views');
		app.use('/assets', modules["express"].static(__dirname + '/assets'));
		app.use('/ddl', modules["express"].directory('/home/t4w/t4w/Horo'));
		app.use('/ddl', modules["express"].static('/home/t4w/t4w/Horo'));
		app.set('view engine', 'ejs');
		app.use(modules["express"].bodyParser());
		app.use(modules["express"].cookieParser());
		app.use(modules["express"].static(__dirname + '/assets'));
		app.use(modules["express"].favicon(__dirname + '/favicon.ico'));
		app.use(modules["express"].logger());
		app.engine('ejs', modules["ejs"].renderFile);
		app.use(function fuckyou(req, res, next) { // Because I can shitpost in my code too, derpcat
			if(/MSIE/i.test(req.headers.userAgent) || /Trident/i.test(req.headers.userAgent)) { // No IE allowed
				res.status(404).send("404, decent browser not found");
			} else {
				res.header('X-Favorite-Apple', 'Honeycrisp');
				res.removeHeader('X-Powered-By');
				next();
			}
		});
	});

	app.get('/', function(req, res) { // Home
		modules["fs"].readFile(__dirname + '/links.json', 'utf8', function(err, data) {
			if(err) {
				res.status(500).write(err.toString());
				return res.end();
			}
			var links = JSON.parse(data);
			res.render('main', {
				title: "Home",
				header: "T4W",
				subtitle: "",
				ctype: "home",
				links: links,
				img: '',
				imgid: ''
			});
		});
	});

	app.get('/about', function(req, res) { // About
		modules["fs"].readFile( __dirname + '/about.txt', 'utf8', function(err, data) {
			if(err) {
				res.status(500).write(err.toString());
				return res.end();
			}
			var description = data.trim();
			res.render('main', {
				title: "About",
				header: "About",
				subtitle: "",
				ctype: "about",
				description: description,
				img: '',
				imgid: ''
			});
		});
	});

	app.get('/projects', function(req, res) { // Projects
		modules["fs"].readFile( __dirname + '/projects.json', 'utf8', function(err, data) {
			if(err) {
				res.status(500).write(err.toString());
				return res.end();
			}
			var projects = JSON.parse(data);
			res.render('main', {
				title: "Projects",
				header: "Projects",
				subtitle: "",
				ctype: "projects",
				projects: projects,
				img: '',
				imgid: ''
			});
		});
	});

	/*app.get('/subs', function(req, res) { // Subs
		module["fs"].readFile( __dirname + '/subs.json', 'utf8', function(err, data) {
			if(err) {
				res.status(500).write(err.toString());
				return res.end();
			}
			var subs = JSON.parse(data);
			res.render('subs', {
				title: ''
			});
		});
	});/* Soon (tm) */

	app.get('/source', function(req, res) { // Source code
		main.toString().split("\n").forEach(function(line) {
			res.write(line + "\n");
		});
		res.end();
	});

	app.get('/hisao-bot', function(req, res) { // Hisao-bot responses
		modules["fs"].readFile('/home/t4w/bots/Hisao-bot/responses.txt', 'utf8', function(err, data) {
			if(err) {
				return res.status(500).send("<h1>An error has occurred.</h1>");
			}
			data = JSON.parse(data);
			var response = '';
			data.forEach(function(line) {
				response += line + '\n<br />';
			});
			return res.send(response);
		});
	});
	
	app.get('/xdcc', function(req, res) { // XDCC list
		modules["fs"].readFile('/home/t4w/iroffer-dinoex/list.txt', 'utf8', function(err, data) {
			if(err) {
				return res.status(500).send("<h1>An error has occurred.</h1>");
			}
			res.write(data);
			return res.end();
		});
	});

	app.get('/*', function(req, res) { // 404
		res.status(404).send("<h1>404!</h1>");
	});


	app.listen(80);

})();
 
 
 