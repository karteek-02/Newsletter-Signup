const express = require("express");

 const bodyparser = require("body-parser");

 const request = require("request");

 const app= express();
 
 app.use(express.static("Public"));

 app.use(bodyparser.urlencoded({extended: true}));             

 app.get("/", function(req,res){                              
    res.sendFile(__dirname + "./Public/index.html");

 });


 app.post("/",function(req,res){

   var firstname=req.body.fname;

   var lastname=req.body.lname;

   var emailid=req.body.usersemail;

   const data = {
      members: [
        {
          email_address: emailid,
          status: 'subscribed',
          merge_fields: {
            FNAME: firstname,
            LNAME: lastname
          }
        }
      ]
    };

    const postData = JSON.stringify(data);

  const options = {

    url : `${process.env.MAILCHIMP_API_URL}`, 
    method: 'POST',
    headers: {

      Authorization: `auth ${process.env.API_KEY}`
    },
    body: postData
  }

  request(options, (err, response, body) => {

   if(err) {
       res.redirect("fail.html");
   } else {

       if(response.statusCode === 200) {
           res.redirect("success.html");
       }
       else {
           res.redirect("fail.html");
       }
   }
 })
});

 app.listen(3000, function(){
    console.log("Yes! this port now works.")
 });