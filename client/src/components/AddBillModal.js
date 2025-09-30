import React, { useState } from 'react';
import { X, User, DollarSign, Calendar, FileText, Plus, Trash2 } from 'lucide-react';
import './AddBillModal.css';

const AddBillModal = ({ isOpen, onClose, onSave, patients = [] }) => {
  const [formData, setFormData] = useState({
    patientId: '',
    patientName: '',
    amount: '',
    dueDate: '',
    issueDate: new Date().toISOString().split('T')[0],
    description: '',
    services: [{ name: '', cost: '' }],
    status: 'pending'
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Auto-fill patient name when patient is selected
    if (name === 'patientId') {
      const selectedPatient = patients.find(p => p.id === value);
      if (selectedPatient) {
        setFormData(prev => ({
          ...prev,
          patientName: selectedPatient.name
        }));
      }
    }
  };

  const handleServiceChange = (index, field, value) => {
    const updatedServices = [...formData.services];
    updatedServices[index][field] = value;
    setFormData(prev => ({
      ...prev,
      services: updatedServices
    }));

    // Calculate total amount
    const totalAmount = updatedServices.reduce((sum, service) => {
      return sum + (parseFloat(service.cost) || 0);
    }, 0);
    
    setFormData(prev => ({
      ...prev,
      amount: totalAmount.toFixed(2)
    }));
  };

  const addService = () => {
    setFormData(prev => ({
      ...prev,
      services: [...prev.services, { name: '', cost: '' }]
    }));
  };

  const removeService = (index) => {
    if (formData.services.length > 1) {
      const updatedServices = formData.services.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        services: updatedServices
      }));

      // Recalculate total amount
      const totalAmount = updatedServices.reduce((sum, service) => {
        return sum + (parseFloat(service.cost) || 0);
      }, 0);
      
      setFormData(prev => ({
        ...prev,
        amount: totalAmount.toFixed(2)
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.patientId) newErrors.patientId = 'Patient is required';
    if (!formData.amount || parseFloat(formData.amount) <= 0) newErrors.amount = 'Valid amount is required';
    if (!formData.dueDate) newErrors.dueDate = 'Due date is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    
    // Validate services
    const hasEmptyServices = formData.services.some(service => 
      !service.name.trim() || !service.cost || parseFloat(service.cost) <= 0
    );
    if (hasEmptyServices) newErrors.services = 'All services must have a name and valid cost';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const billData = {
        ...formData,
        id: `BILL-${String(Date.now()).slice(-3).padStart(3, '0')}`,
        amount: parseFloat(formData.amount),
        services: formData.services.map(s => s.name),
        createdAt: new Date().toISOString()
      };
      
      onSave(billData);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      patientId: '',
      patientName: '',
      amount: '',
      dueDate: '',
      issueDate: new Date().toISOString().split('T')[0],
      description: '',
      services: [{ name: '', cost: '' }],
      status: 'pending'
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content add-bill-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            <FileText className="modal-icon" />
            Create New Bill
          </h2>
          <button className="close-btn" onClick={handleClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-section">
            <h3 className="section-title">
              <User size={16} />
              Patient Information
            </h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="patientId">Patient *</label>
                <select
                  id="patientId"
                  name="patientId"
                  value={formData.patientId}
                  onChange={handleInputChange}
                  className={errors.patientId ? 'error' : ''}
                  required
                >
                  <option value="">Select a patient</option>
                  {patients.map(patient => (
                    <option key={patient.id} value={patient.id}>
                      {patient.name} - {patient.id}
                    </option>
                  ))}
                </select>
                {errors.patientId && <span className="error-message">{errors.patientId}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="patientName">Patient Name</label>
                <input
                  type="text"
                  id="patientName"
                  name="patientName"
                  value={formData.patientName}
                  readOnly
                  className="readonly-input"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">
              <FileText size={16} />
              Services & Billing
            </h3>
            
            <div className="services-container">
              {formData.services.map((service, index) => (
                <div key={index} className="service-row">
                  <div className="form-group flex-1">
                    <label>Service Name *</label>
                    <input
                      type="text"
                      value={service.name}
                      onChange={(e) => handleServiceChange(index, 'name', e.target.value)}
                      placeholder="e.g., Consultation, X-Ray, Blood Test"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Cost *</label>
                    <input
                      type="number"
                      value={service.cost}
                      onChange={(e) => handleServiceChange(index, 'cost', e.target.value)}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                  <button
                    type="button"
                    className="remove-service-btn"
                    onClick={() => removeService(index)}
                    disabled={formData.services.length === 1}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              
              <button
                type="button"
                className="add-service-btn"
                onClick={addService}
              >
                <Plus size={16} />
                Add Service
              </button>
              
              {errors.services && <span className="error-message">{errors.services}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="amount">Total Amount *</label>
                <div className="amount-input">
                  <DollarSign size={16} className="amount-icon" />
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className={errors.amount ? 'error' : ''}
                    readOnly
                  />
                </div>
                {errors.amount && <span className="error-message">{errors.amount}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">
              <Calendar size={16} />
              Dates & Details
            </h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="issueDate">Issue Date</label>
                <input
                  type="date"
                  id="issueDate"
                  name="issueDate"
                  value={formData.issueDate}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="dueDate">Due Date *</label>
                <input
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleInputChange}
                  className={errors.dueDate ? 'error' : ''}
                  required
                />
                {errors.dueDate && <span className="error-message">{errors.dueDate}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Brief description of services provided..."
                rows="3"
                className={errors.description ? 'error' : ''}
                required
              />
              {errors.description && <span className="error-message">{errors.description}</span>}
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Create Bill
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBillModal;