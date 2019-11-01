var express = require("express"),
    router  = express.Router(),
    Contact = require("../models/contact");

//CONTACT ROUTES
//INDEX
router.get("/", function(req, res){
    res.render('login')
});
router.post("/admin", function(req, res){
    if(req.body.validate == process.env.VALIDATOR){
        Contact.find({}, function(err, contact){
            if(err){
                console.log(err);
            } else {
                res.render("contacts", {contact: contact});
            }
        }); 
    } else {
        res.redirect("/");
    }
});
    //NEW
// router.get("/new", middleware.isLoggedIn, function(req, res){
//     res.render("destinations/new");
// });
//CREATE
router.post("/", function(req, res){
    // req.body.destination.body = req.sanitize(req.body.destination.body);
    var email = req.sanitize(req.body.contact.email);
    var phone = req.sanitize(req.body.contact.phone);
    var message = req.sanitize(req.body.contact.message);
    var contactType = req.sanitize(req.body.contact.contactType);
    var license = req.sanitize(req.body.contact.license);
    var newContact = {email: email, phone: phone, message: message, contactType: contactType, license: license, contacted: 'no', danielnotes: "no notes yet"}
    if(req.body.contact.validate == 8){

        Contact.create(newContact, function(err, newDestination){
            if(err){
                console.log(err);
            } else {
                res.send("<h1>Thank you, I will be in touch!</h1><br>" + "<a href='/'>Back to Car Information</a>");
            }
        })
    } else {
        res.redirect("/")
    }
    })
// //SHOW
// router.get("/:id", function(req, res){
//     Destination.findById(req.params.id).populate("comments").exec(function(err, foundDestination){
//         if(err){
//             console.log(err);
//             res.redirect("/destinations");
//         }else {
//             res.render("destinations/show", {destination: foundDestination});
//         }
//     })
// });
//EDIT - takes me to edit destinations page
// router.get("/:id/edit", middleware.checkDestinationOwnership, function(req, res){
//     Destination.findById(req.params.id, function(err, foundDestination){
//         res.render("destinations/edit", {destination: foundDestination});
//         });
//     });
//UPDATE
router.put("/:id/contacted",  function(req, res){
    if(req.body.danielnotes.length > 1){
        var updatedContact = {
            danielnotes: req.body.danielnotes
        }
    }
    if(req.body.contactedThePerson == 'on'){
        updatedContact.contacted = 'yes';
    }
    if(updatedContact){

        Contact.findByIdAndUpdate(req.params.id, updatedContact, function(err, updatedContact){
            if(err){
                res.redirect("/");
            } else {
                Contact.find({}, function(err, contact){
                    if(err){
                        console.log(err);
                    } else {
                        res.render("contacts", {contact: contact});
                    }
                });         }
            });
        } else{
            res.send("Need a notes entry to submit, we don't want to overwrite notes with a blank value")
        }
        });
        //DESTROY
        router.delete("/:id", function(req, res){
            Contact.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log("Issue deleting object");
            res.redirect("/contact");
        } else{
            Contact.find({}, function(err, contact){
                if(err){
                    console.log(err);
                } else {
                    res.render("contacts", {contact: contact});
                }
            });         }
    })
});

module.exports = router;