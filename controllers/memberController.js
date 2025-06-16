const Member = require('../models/Member');
const moment = require('moment');

exports.listMembers = async (req, res) => {
  const members = await Member.find().lean();

  res.render('Members/index', { members, moment });
};

exports.showAddMemberForm = (req, res) => {
  res.render('Members/add');
};

exports.addMember = async (req, res) => {
  try {
    const { name, email, phone, membershipExpiry } = req.body;
    const member = new Member({
      name,
      email,
      phone,
      membershipExpiry: new Date(membershipExpiry),
      membershipStart: new Date(),
    });
    await member.save();
    res.redirect('/Members');
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.showEditMemberForm = async (req, res) => {
  const member = await Member.findById(req.params.id);
  if (!member) return res.status(404).send('Member not found');
  res.render('Members/edit', { member });
};

// Members can update only their personal details (name, phone)
exports.updateMember = async (req, res) => {
  try {
    const { name, phone } = req.body;
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).send('Member not found');

    member.name = name;
    member.phone = phone;
    await member.save();
    res.redirect('/Members');
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// Admin can extend membership expiry
exports.extendMembership = async (req, res) => {
  try {
    const { extensionMonths } = req.body;
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).send('Member not found');

    const newExpiry = moment(member.membershipExpiry).add(extensionMonths, 'months').toDate();
    member.membershipExpiry = newExpiry;
    await member.save();
    res.redirect('/Members');
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// Delete member if membership expired
exports.deleteMember = async (req, res) => {
  await Member.findByIdAndDelete(req.params.id);
  res.redirect('/Members');
};
