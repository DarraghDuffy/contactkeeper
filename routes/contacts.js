const express = require('express');
const auth = require('../middleware/auth');
const config = require('config');

const Contact = require('../models/Contact');
const User = require('../models/User');

const { check, validationResult } = require('express-validator');

const router = express.Router();

//@route  GET api/contacts
//@desc   Get All user contacts
//@access Private

router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contacts);
    // res.send('Get all users contact');
  } catch (err) {
    console.log(err.msg);
    res.status(500).json({ msg: 'Server Error' });
  }
});

//@route  POST api/contacts
//@desc   Auth user and get token
//@access Private

// name: { type: String, required: true },
// email: { type: String, required: true },
// phone: { type: String },
// type: { type: String, default: 'personal' },

router.post(
  '/',
  [auth, [check('name', 'Name is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, type, phone } = req.body;
    try {
      let contact;
      contact = new Contact({ name, email, phone, type, user: req.user.id });
      const newContact = await contact.save();
      res.status(201).json(newContact);
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ message: 'Server Error' });
    }
  }
);

//@route  PUT api/contacts/:id
//@desc   Update Contact
//@access Private

router.put(
  '/:id',
  [auth, [check('name', 'Name is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, type, phone } = req.body;

    const contactFields = { name, email, type, phone };

    if (name) contactFields.name = name;
    if (email) contactFields.email = email;
    if (type) contactFields.type = type;
    if (phone) contactFields.phone = phone;

    try {
      let contact = await Contact.findById(req.params.id);

      if (!contact) {
        return res.status(404).json({ msg: 'Contact not found' });
      }

      //Ensure user owns contact
      if (contact.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'Not authorized' });
      }
      contact = await Contact.findByIdAndUpdate(
        req.params.id,
        { $set: contactFields },
        { new: true }
      );

      res.status(200).json(contact);
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ message: 'Server Error' });
    }
  }
);

//@route  DELETE api/contacts/:id
//@desc   Delete Contact
//@access Private

router.delete('/:id', [auth], async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ msg: 'Contact not found' });
    }

    //Ensure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Contact.findByIdAndRemove(req.params.id);
    res.status(200).json({ msg: 'Contact removed' });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
