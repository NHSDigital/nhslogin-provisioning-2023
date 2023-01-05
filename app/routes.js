// External dependencies
const express = require('express');
const router = express.Router();


// connect to Notify
/* 
 var NotifyClient = require('notifications-node-client').NotifyClient,
    notify = new NotifyClient(process.env.NOTIFYAPIKEY); 
 */

 // Create new variables
const notify = require('notifications-node-client').NotifyClient;
const request = require('request');

// Notify integration
const notifyClient = new notify(process.env.NOTIFYAPIKEY);

// Notify OTP code
router.post('/createaccount/v1/setup/verification', function (req, res) {
    console.log('method called');
    // if(req.body.phoneNumber === '07791463997'){
    notifyClient.sendSms('42016552-237d-40ef-9ced-c4f3a4b20aad', req.body.phoneNumber)
      .then(function (response) {
        console.log('success')
        res.redirect('/createaccount/v1/setup/otp');
      }).catch(function (error) {
        console.log('notify-error' + error)
        res.redirect('/createaccount/v1/setup/otp');
      });
    // }
    //res.redirect('/set-up/v4/register-enter-OTP');
  });


//Notify initial email
/*  router.get('/createaccount/v1/index', function (req, res) {
    var emailSent = req.query.emailSent
    console.log('render', req.query.emailSent)
    res.render('/createaccount/v1/index', { emailSent: emailSent }, function (err, html) {
        res.send(html)
    })
})    */

router.post('/createaccount/v1/index', function (req, res) {

    notifyClient.sendEmail(
        '2056c36d-b9de-4891-862c-3ef0e12c1aac',
        req.body.emailAddress, {
        personalisation: {
            'UserFirstName': req.body.UserFirstName,
            'UserLastName': req.body.UserLastName
        },
        reference: ''
    })
    .then(function (response) {
        console.log('success')
        res.redirect('/createaccount/v1/index?emailSent=true');
      }).catch(function (error) {
        console.log('notify-error' + error)
        res.redirect('/createaccount/v1/index?emailSent=true');
      });
    // }
    //res.redirect('/set-up/v4/register-enter-OTP');
/*     
  });
        .then(response => console.log('response'))
        .catch(err => console.error('error', err))

    console.log(req.body.emailAddress) */

    // This is the URL the users will be redirected to once the email has been sent
    res.redirect('/createaccount/v1/index?emailSent=true');

})


//Notify success email 
router.post('/createaccount/v1/setup/passwordset', function (req, res) {

    notifyClient.sendEmail(
        '151389a8-2d91-412b-bf1c-aa8b14c02f8e',
        req.body.emailAddress, {
        personalisation: {
            'UserFirstName': req.body.UserFirstName,
            'UserLastName': req.body.UserLastName
        },
        reference: ''
    })
    .then(function (response) {
        console.log('success')
        res.redirect('/createaccount/v1/setup/success?emailSent=true');
      }).catch(function (error) {
        console.log('notify-error' + error)
        res.redirect('/createaccount/v1/setup/success?emailSent=true');
      }); 
/*    }
    res.redirect('/createaccount/v1/setup/success');
     
  });
        .then(response => console.log('response'))
        .catch(err => console.error('error', err))

    console.log(req.body.emailAddress) */

    // This is the URL the users will be redirected to once the email has been sent
    res.redirect('/createaccount/v1/setup/success?emailSent=true');

})



// Add your routes here - above the module.exports line

module.exports = router;

