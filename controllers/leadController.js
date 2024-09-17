const Lead = require('../models/lead');

// Get all leads
exports.getAllLeads = async (req, res) => {
  try {
    const leads = await Lead.findAll();
    res.json(leads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get lead by ID
exports.getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findByPk(req.params.id);
    if (lead) {
      res.json(lead);
    } else {
      res.status(404).json({ message: 'Lead not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new lead
exports.createLead = async (req, res) => {
  try {
    const lead = await Lead.create(req.body);
    res.status(201).json(lead);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update lead by ID
exports.updateLead = async (req, res) => {
  try {
    const lead = await Lead.findByPk(req.params.id);
    if (lead) {
      await lead.update(req.body);
      res.json(lead);
    } else {
      res.status(404).json({ message: 'Lead not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete lead by ID
exports.deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByPk(req.params.id);
    if (lead) {
      await lead.destroy();
      res.json({ message: 'Lead deleted' });
    } else {
      res.status(404).json({ message: 'Lead not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
