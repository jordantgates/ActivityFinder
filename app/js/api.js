// API object
var api = {
    // get the list of activities, call the callback when complete
    getItems: function(cb) {
        var url = "/api/activities";
        $.ajax({
            url: url,
            dataType: 'json',
            type: 'GET',
            success: function(res) {
                if (cb)
                    cb(true, res);
            },
            error: function(xhr, status, err) {
                // if there is an error, remove the login token
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
            headers: {'Authorization': localStorage.token},
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
              delete localStorage.token;
              delete localStorage.username;
                if (cb)
                    cb(false, status);
            }
        });
    },

    // update an item, call the callback when complete
    updateActivity: function(activity, cb) {
        var url = "/api/activities/" + activity._id;
        $.ajax({
          url: url,
          contentType: 'application/json',
          data: JSON.stringify({
            activity: activity
          }),
          type: 'PUT',
          headers: {'Authorization': localStorage.token},
          success: function(res) {
            if (cb)
              cb(true, res);
          },
          error: function(xhr, status, err) {
            // if there is any error, remove any login token
            delete localStorage.token;
            delete localStorage.username;
            if (cb)
              cb(false, status);
          }
        });
    },

    addLike: function(activityTitle, cb){
        var url = "/api/users/addLike";
        $.ajax({
            url: url,
            contentType: 'application/json',
            data: JSON.stringify({
                activityTitle: activityTitle
            }),
            type: 'PUT',
            headers: {'Authorization': localStorage.token},
            success: function(res) {
            if (cb)
              cb(true, res);
            },
            error: function(xhr, status, err) {
                // if there is any error, remove any login token
                delete localStorage.token;
                delete localStorage.username;
                if (cb)
                    cb(false, status);
            }
        })
    },

    removeLike: function(activityTitle, cb){
        var url = "/api/users/removeLike";
        $.ajax({
            url: url,
            contentType: 'application/json',
            data: JSON.stringify({
                activityTitle: activityTitle
            }),
            type: 'PUT',
            headers: {'Authorization': localStorage.token},
            success: function(res) {
            if (cb)
              cb(true, res);
            },
            error: function(xhr, status, err) {
                // if there is any error, remove any login token
                delete localStorage.token;
                delete localStorage.username;
                if (cb)
                    cb(false, status);
            }
        })
    },

    //get likes for the currently logged in user
    getLikesForUser: function(cb){
        var url = "/api/users/likes";
        $.ajax({
            url: url,
            dataType: 'json',
            type: 'GET',
            headers: {'Authorization': localStorage.token},
            success: function(res){
                if(cb)
                    cb(true, res);
            },
            error: function(xhr, status, err){
                //if error, delete token
                delete localStorage.token;
                delete localStorage.username;
                if(cb)
                    cb(false, status);
            }
        })
    }

};

module.exports = api;
