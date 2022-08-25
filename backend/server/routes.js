import examplesRouter from "./api/controllers/examples/router";
import campaignsRouter from "./api/controllers/campaigns/router";
import usersRouter from "./api/controllers/users/router";
import tagRouter from "./api/controllers/tag/router";
import contactRouter from "./api/controllers/contact/router";
import contactFieldRouter from "./api/controllers/contactFields/router";
import dashboardRouter from "./api/controllers/dashboard/router";
import tempalateRouter from "./api/controllers/templates/router";

export default function routes(app) {
  app.use("/Y/examples", examplesRouter);
  app.use("/campaigns", campaignsRouter);
  app.use("/dashboard", dashboardRouter);
  app.use("/users", usersRouter);
  app.use("/tags", tagRouter);
  app.use("/contact", contactRouter);
  app.use("/contactFields", contactFieldRouter);
  app.use("/template", tempalateRouter);
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
params: {
  page : 1(default),
  limit : 10(default)
}
response :
  if success:
    data : {
      campaigns: [campaigns],
      total: total
    }
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
body : same data present inside the campaign schema + .id
response :
  if success:
    data : updated campaign Object
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
