# Shared-Session
###### ![N|Solid](https://www.livecoding.tv/static/img/icons/coding_categories_small/meteor-js-sm.png) MeteorJS Package - matguig

> Easily share a session, between the server side and the client side.
----
```sh
$ meteor add matguig:shared-session
```

### Todos
- Write Tests

Basic hello world example
---
#### Client side
```javascript
import { Template } from 'meteor/templating';
import { sharedSession } from 'meteor/matguig:shared-session';

import './main.html';

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  sharedSession.set("counter", 0);
});

Template.hello.helpers({
  counter() {
    return sharedSession.get("counter");
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    sharedSession.set("counter", sharedSession.get("counter") + 1);

    // Display debug on Server Side console
    Meteor.call("whatEverMethod");
  },
});
```

#### Server side
```javascript
import { Meteor } from 'meteor/meteor';
import { sharedSession } from "meteor/matguig:shared-session/server/shared-session.js";

Meteor.methods({

    whatEverMethod() {
        var sharedSessionClientInstance = sharedSession.instance();
        console.log( sharedSessionClientInstance.get("counter") );
    }

});
```

Prototype of the public Methods
---
#### Client & Server side
- Create or update an entry for the current connection
    - **_boolean_**         sharedSession.set( **_string_** key , **_mixed_** value [, **_object_** options] );
- Return value or null by using key
    - **_mixed_**|**_null_** sharedSession.get( **_string_** key );
- Return mongo collection of all current connexion entries
    - **_Cursor_**          sharedSession.getAll( );
- Delete an entry by using key
    - **_boolean_**         sharedSession.delete( **_string_** key );
#### Server side
- Remove all current shared session
    - **_boolean_**         sharedSession.clearAll( );
#### Server side Static Method
- Retrieve shared Session instance of an specific connection id.
    - **_sharedSession_**           sharedSession.instance( [**_string_** uid] );

License
----
MIT
