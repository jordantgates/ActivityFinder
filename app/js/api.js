// API object
var api = {
    // get the list of activities, call the callback when complete
    getItems: function(cb) {
        var url = "/api/activities";
        $.ajax({
            url: url,
            dataType: 'json',
            type: 'GET',
            //headers: {'Authorization': localStorage.token},
            success: function(res) {
                if (cb)
                    cb(true, res);
            },
            error: function(xhr, status, err) {
                // if there is an error, remove the login token
                delete localStorage.token;
                if (cb)
                    cb(false, status);
            }
        });
    },
    
    createActivity: function(activity, cb) {
        var url = "/api/activities";
        $.ajax({
            url: url,
            contentType:'application/json',
            type: 'POST',
            data:JSON.stringify({
                'activity': {
                    'title': activity.title,
                    'description': activity.description,
                    'tags': activity.tags,
                    'price': activity.price,
                    'address': activity.address
                }
            }),
            success: function(res) {
                if (cb)
                    cb(true, res);
            },
            error: function(xhr, status, err) {
                if (cb)
                    cb(false, status);
            }
        });
    }
};

module.exports = api;