var express = require('express');
var path = require('path');
var http = require('http');
var ejs = require('ejs');
var app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');
app.get('/index.html', function (req, res) {
    res.render('index', {
        title: "测试"
    }, function (err, str) {
        res.write(str)
    })
    var Pagelets_list = [
        {name: 'test1', is_end: false},
        {name: 'test2', is_end: false}
    ]
    var data = {is: "true"};
    function is_end(Pagelets) {
        for (var x = 0; x < Pagelets_list.length; x++) {
            if ( Pagelets_list[x].name===Pagelets) {
                Pagelets_list[x].is_end=true;
            }
            else {
                if(Pagelets_list[x].is_end === false)return;
            }
        }
        res.end();
        return;
    }

    function Pagelets(Pagelets) {
        res.write('<script>bigpipe.set("' + Pagelets + '",' + JSON.stringify(data) + ');</script>');
        is_end(Pagelets)
    }

    setTimeout(Pagelets('test1'), 2000);
    setTimeout(Pagelets('test2'), 5000);
});

http.createServer(app).listen(3000);

