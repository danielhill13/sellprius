var express = require("express"),
    router  = express.Router(),
    Contact = require("../models/contact");

//CONTACT ROUTES
//INDEX
router.get("/", function(req, res){
    res.render('login')
});
router.post("/admin", function(req, res){
    console.log(req.body.validate);
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
    var newContact = {email: email, phone: phone, message: message, contactType: contactType, license: license}
    console.log(req.body.contact.validate);
    if(req.body.contact.validate == 8){

        Contact.create(newContact, function(err, newDestination){
            if(err){
                console.log(err);
            } else {
                res.send("Thank you, I'll be in touch!");
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
// router.put("/:id", middleware.checkDestinationOwnership, function(req, res){
//     Destination.findByIdAndUpdate(req.params.id, req.body.destination, function(err, updatedDestination){
//         if(err){
//             res.redirect("/destinations");
//         } else {
//             res.redirect("/destinations/" + req.params.id);
//         }
//     });
// });
//DESTROY
// router.delete("/:id", middleware.checkDestinationOwnership, function(req, res){
//     Destination.findByIdAndRemove(req.params.id, function(err){
//         if(err){
//             console.log("Issue deleting object");
//             res.redirect("/destinations");
//         } else{
//             res.redirect("/destinations");
//         }
//     })
// });

module.exports = router;