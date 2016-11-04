var data = { updates: [
    {
        name: 'Jane Doe',
        update: 'Just Made my Breakfaast',
        from: 'Web',
        location: 'Canada'
    },
    {
        name: 'John Doe',
        update: 'What is going on with the weather?',
        from: 'Phone'
    }
]};
var source = $('#template').html();
var template = Handlebars.compile(source);
$('.updates').append(template(data));



/*(function (){
    $.ajax({
        url: 'js/data.json'
    }).done(function (data) {
        var  json = JSON.parse(data);
        console.log(json);
    });
})()*/
