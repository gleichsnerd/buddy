# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...



* Web Map *
Without login:
- Home Page
  - Login/ Register

With login:
- Home Page
  - Mailboxes Nearby
  

* Schema *

A _user_
- HAS MANY _mailboxes_
- HAS ONE _address\_book_

A _mailbox_
- BELONGS TO _user_
- HAS MANY _letters_
- HAS ONE _address_
- alias

A _letter_
- BELONGS TO _mailbox_
- HAS ONE _user_ as _sender_
- HAS ONE _user_ as _recipient_
- subject
- body

AN _address_
- BELONGS TO _mailbox_
- longitude
- latitude
- postal_code

AN _address\_book_
- BELONGS TO _user_
- HAS MANY _mailboxes_