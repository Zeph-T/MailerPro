import examplesRouter from './api/controllers/examples/router';

export default function routes(app) {
  app.use('/Y/examples', examplesRouter);
}


/*
Endpoint : "/createEmailCampaign",
type : "POST",
body : same data present inside the campaign schema
response :
  if success:
    data : campaign Object
  if error : {
    data : {error : message}
  }

Endpoint : "/updateEmailCampaign",
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
