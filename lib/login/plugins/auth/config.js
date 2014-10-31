var Confidence = require("confidence");

var store = new Confidence.Store({
    provider: {
        $filter: 'env',
        production: {
            facebook: {
                provider: 'facebook',
                password: 'hapiauth',
                clientId: 'TODO', // fill in your FB ClientId here
                clientSecret: 'TODO', // fill in your FB Client Secret here
                isSecure: false // Terrible idea but required if not using HTTPS
            },
            google: {
                provider: 'google',
                password: 'hapiauth',
                clientId: '434381531393-sfmt080ab3dub2r4arhht267bp2d333u.apps.googleusercontent.com', // fill in your Google ClientId here
                clientSecret: 'PQFSim4dI413Y-zaoRt9QL8G', // fill in your Google Client Secret here
                isSecure: false // Terrible idea but required if not using HTTPS
            }
        },
        staging: {
            facebook: {
                provider: 'facebook',
                password: 'hapiauth',
                clientId: 'TODO', // fill in your FB ClientId here
                clientSecret: 'TODO', // fill in your FB Client Secret here
                isSecure: false // Terrible idea but required if not using HTTPS
            },
            google: {
                provider: 'google',
                password: 'hapiauth',
                clientId: '434381531393-sfmt080ab3dub2r4arhht267bp2d333u.apps.googleusercontent.com', // fill in your Google ClientId here
                clientSecret: 'PQFSim4dI413Y-zaoRt9QL8G', // fill in your Google Client Secret here
                isSecure: false // Terrible idea but required if not using HTTPS
            }
        }, // this is the default configuration if no env.ENVIRONMENT varaible is set.
        $default: {
            facebook: {
                provider: 'facebook',
                password: 'hapiauth',
                clientId: 'TODO', // fill in your FB ClientId here
                clientSecret: 'TODO', // fill in your FB Client Secret here
                isSecure: false // Terrible idea but required if not using HTTPS
            },
            google: {
                provider: 'google',
                password: 'hapiauth',
                clientId: '434381531393-sfmt080ab3dub2r4arhht267bp2d333u.apps.googleusercontent.com', // fill in your Google ClientId here
                clientSecret: 'PQFSim4dI413Y-zaoRt9QL8G', // fill in your Google Client Secret here
                isSecure: false // Terrible idea but required if not using HTTPS
            }
        }
    }
});

var criteria = {
    env: process.env.ENVIRONMENT
};

exports.get = function(key) {
    return store.get(key, criteria);
};
