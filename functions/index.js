const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const cors = require('cors')({ origin: true });

const SENDGRID_API_KEY = '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'


const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(SENDGRID_API_KEY);

exports.httpEmail = functions.https.onRequest((req, res) => {

  cors( req, res, () => {

    const toName  = req.body.toName;
    const toEmail = req.body.toEmail;

    const msg = {
      to: 'casper90.n.olsen@gmail.com',
      from: 'feedbackangular@gmail.com',
      subject:  'New Follower',
      // text: `Hey ${toName}. You have a new follower!!! `,
      // html: `<strong>Hey ${toName}. You have a new follower!!!</strong>`,

      // custom templates
      templateId: 'd-ba44116b6e314cdaa9c013e8e91154ac',
      substitutionWrappers: ['{{', '}}'],
      substitutions: {
        name: toName
        // and other custom properties here
      }
    };

    return sgMail.send(msg)

      .then(() => res.status(200).send('email sent!') )
      .catch(err => res.status(400).send(err) )

  });

});



exports.firestoreEmail = functions.firestore
  .document('users/{userId}/followers/{followerId}')
  .onCreate(event => {

    const userId = event.params.userId;

    const db = admin.firestore()

    return db.collection('users').doc(userId)
      .get()
      .then(doc => {

        const user = doc.data()

        const msg = {
          to: 'casper90.n.olsen@gmail.com',
          from: 'feedbackangular@gmail.com',
          password: 'Angular1',
          subject:  'New Follower',
          // text: `Hey ${toName}. You have a new follower!!! `,
          // html: `<strong>Hey ${toName}. You have a new follower!!!</strong>`,

          // custom templates
          templateId: '300e1045-5b30-4f15-8c43-41754b73fe4f',
          substitutionWrappers: ['{{', '}}'],
          substitutions: {
            name: user.displayName
            // and other custom properties here
          }
        };

        return sgMail.send(msg)
      })
      .then(() => console.log('email sent!') )
      .catch(err => console.log(err) )


  });


/*

exports.firestoreEmail = functions.firestore
  .document('users/{userId}/followers/{followerId}')
  .onCreate(event => {

      const userId = event.params.userId;

      const db = admin.firestore();

      return db.collection('users').doc(userId)
        .get()
        .then(doc => {

          const user = doc.data()

          const msg = {
            to: 'casper90.n.olsen@gmail.com',//user.email,
            from: 'caspero90.n.olsen@gmail.com',
            subject: 'Hardcode',

            templateId: 'd-ba44116b6e314cdaa9c013e8e91154ac',
            substitutionWrappers: ['{{','}}'],
            substitutions: {
              //use the <%variable%> tag
            }

          };

          return sgMail.send(msg)
        })
        .then(() => console.log('email sent'))
        .catch(err => console.log(err))
  });







 */


