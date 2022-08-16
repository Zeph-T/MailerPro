import examplesRouter from './api/controllers/examples/router';
import campaignsRouter from './api/controllers/campaigns/router';
import usersRouter from './api/controllers/users/router';

export default function routes(app) {
  app.use('/Y/examples', examplesRouter);
  app.use('/campaigns', campaignsRouter);
  app.use('/users', usersRouter);
}


/*
Endpoint : "/users/register",
type : "POST",
body : {
  name : "",
  email : "",
  password : ""
}
response :
  if success:
    data : user Object
  if error : {
    data : {error : message}
  }

Endpoint : "/users/login",
type : "POST",
body : {
  email : "",
  password : ""
}
response :
  if success:
    data : {token : token}
  if error : {
    data : {error : message}
  }

Endpoint : "/campaigns",
type : "GET",
response :
  if success:
    data : [campaign Object]
  if error : {
    data : {error : message}
  }

Endpoint : "/campaigns/createEmailCampaign",
type : "POST",
body : same data present inside the campaign schema
response :
  if success:
    data : campaign Object
  if error : {
    data : {error : message}
  }

Endpoint : "/campaigns/updateEmailCampaign",
type : "POST",
body : same data present inside the campaign schema
response :
  if success:
    data : campaign Object
  if error : {
    data : {error : message}
  }

Endpoint : "/createTag",
type : "POST",
body : same as tag schema
response :
  if success:
    data : tag Object
  if error : {
    data : {error : message}
  }

Endpoint : "/createContactField",
type : "POST",
body : same data present inside the campaign schema
response :
  if success:
    data : ContactField Object
  if error : {
    data : {error : message}
  }

Endpoint : "/createTemplate",
type : "POST",
body : same data present inside the template schema
response :
  if success:
    data : template Object
  if error : {
    data : {error : message}
  }

Endpoint : "/createContact",
type : "POST",
body : same data present inside the contact schema and also from the contactFields schema
response :
  if success:
    data : contact Object
  if error : {
    data : {error : message}
  }


*/
