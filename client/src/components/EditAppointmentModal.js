import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, FileText, Phone, Mail, Receipt, Stethoscope } from 'lucide-react';
import './EditAppointmentModal.css';

const EditAppointmentModal = ({ isOpen, onClose, onSave, appointment, patient }) => {
  const [formData, setFormData] = useState({
    receiptId: '',
    doctorName: '',
    appointmentDate: '',
    appointmentTime: '',
    appointmentType: 'consultation',
    duration: '30',
    notes: '',
    priority: 'normal'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Generate receipt ID
  const generateReceiptId = () => {
    const prefix = 'APT';
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}-${timestamp}-${random}`;
  };

  // Populate form with existing appointment data
  useEffect(() => {
    if (appointment) {
      setFormData({
        receiptId: appointment.receiptId || generateReceiptId(),
        doctorName: appointment.doctorName || '',
        appointmentDate: appointment.appointmentDate || '',
        appointmentTime: appointment.appointmentTime || '',
        appointmentType: appointment.appointmentType || 'consultation',
        duration: appointment.duration || '30',
        notes: appointment.notes || '',
        priority: appointment.priority || 'normal'
      });
    } else {
      // Generate new receipt ID for new appointments
      setFormData(prev => ({
        ...prev,
        receiptId: generateReceiptId()
      }));
    }
  }, [appointment]);

  const appointmentTypes = [
    { value: 'consultation', label: 'General Consultation' },
    { value: 'followup', label: 'Follow-up' },
    { value: 'checkup', label: 'Regular Check-up' },
    { value: 'emergency', label: 'Emergency' },
    { value: 'procedure', label: 'Medical Procedure' },
    { value: 'therapy', label: 'Therapy Session' },
    { value: 'vaccination', label: 'Vaccination' },
    { value: 'surgery', label: 'Surgery' }
  ];

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30'
  ];

  const doctors = [
    'Dr. Sarah Johnson',
    'Dr. Michael Chen',
    'Dr. Emily Rodriguez',
    'Dr. David Thompson',
    'Dr. Lisa Anderson',
    'Dr. James Wilson',
    'Dr. Maria Garcia',
    'Dr. Robert Brown'
  ];

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
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.doctorName.trim()) {
      newErrors.doctorName = 'Doctor name is required';
    }

    if (!formData.appointmentDate) {
      newErrors.appointmentDate = 'Appointment date is required';
    } else {
      const selectedDate = new Date(formData.appointmentDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.appointmentDate = 'Appointment date cannot be in the past';
      }
    }

    if (!formData.appointmentTime) {
      newErrors.appointmentTime = 'Appointment time is required';
    }

    if (!formData.appointmentType) {
      newErrors.appointmentType = 'Appointment type is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const appointmentData = {
        ...formData,
        patientId: patient?.id,
        patientName: patient?.name,
        id: appointment?.id || Date.now(),
        status: appointment?.status || 'scheduled',
        createdAt: appointment?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      onSave(appointmentData);
      handleClose();
      
    } catch (error) {
      console.error('Error saving appointment:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      receiptId: '',
      doctorName: '',
      appointmentDate: '',
      appointmentTime: '',
      appointmentType: 'consultation',
      duration: '30',
      notes: '',
      priority: 'normal'
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container edit-appointment-modal">
        <div className="modal-header">
          <h2>{appointment ? 'Edit Appointment' : 'New Appointment'}</h2>
          <button className="close-button" onClick={handleClose}>
            <X size={20} />
          </button>
        </div>

        {patient && (
          <div className="patient-info-section">
            <div className="patient-avatar">
              <img src={patient.avatar} alt={patient.name} />
            </div>
            <div className="patient-details">
              <h3>{patient.name}</h3>
              <div className="patient-contact">
                <div className="contact-item">
                  <Phone size={14} />
                  <span>{patient.phone}</span>
                </div>
                <div className="contact-item">
                  <Mail size={14} />
                  <span>{patient.email}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="appointment-form">
          {/* Receipt ID Section */}
          <div className="form-section">
            <h4>Appointment Details</h4>
            <div className="form-group">
              <label htmlFor="receiptId">
                <Receipt size={16} />
                Receipt ID
              </label>
              <input
                type="text"
                id="receiptId"
                name="receiptId"
                value={formData.receiptId}
                readOnly
                className="readonly-field"
              />
              <small className="field-note">Auto-generated unique identifier</small>
            </div>
          </div>

          {/* Doctor and Type Section */}
          <div className="form-section">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="doctorName">
                  <Stethoscope size={16} />
                  Doctor Name *
                </label>
                <select
                  id="doctorName"
                  name="doctorName"
                  value={formData.doctorName}
                  onChange={handleInputChange}
                  className={errors.doctorName ? 'error' : ''}
                >
                  <option value="">Select Doctor</option>
                  {doctors.map(doctor => (
                    <option key={doctor} value={doctor}>{doctor}</option>
                  ))}
                </select>
                {errors.doctorName && (
                  <span className="error-message">{errors.doctorName}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="appointmentType">
                  <User size={16} />
                  Appointment Type *
                </label>
                <select
                  id="appointmentType"
                  name="appointmentType"
                  value={formData.appointmentType}
                  onChange={handleInputChange}
                  className={errors.appointmentType ? 'error' : ''}
                >
                  {appointmentTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                {errors.appointmentType && (
                  <span className="error-message">{errors.appointmentType}</span>
                )}
              </div>
            </div>
          </div>

          {/* Date and Time Section */}
          <div className="form-section">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="appointmentDate">
                  <Calendar size={16} />
                  Appointment Date *
                </label>
                <input
                  type="date"
                  id="appointmentDate"
                  name="appointmentDate"
                  value={formData.appointmentDate}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  className={errors.appointmentDate ? 'error' : ''}
                />
                {errors.appointmentDate && (
                  <span className="error-message">{errors.appointmentDate}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="appointmentTime">
                  <Clock size={16} />
                  Appointment Time *
                </label>
                <select
                  id="appointmentTime"
                  name="appointmentTime"
                  value={formData.appointmentTime}
                  onChange={handleInputChange}
                  className={errors.appointmentTime ? 'error' : ''}
                >
                  <option value="">Select time</option>
                  {timeSlots.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
                {errors.appointmentTime && (
                  <span className="error-message">{errors.appointmentTime}</span>
                )}
              </div>
            </div>
          </div>

          {/* Additional Details Section */}
          <div className="form-section">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="duration">
                  <Clock size={16} />
                  Duration (minutes)
                </label>
                <select
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="90">1.5 hours</option>
                  <option value="120">2 hours</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="priority">
                  Priority Level
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                >
                  <option value="low">Low</option>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notes Section */}
          <div className="form-section">
            <div className="form-group">
              <label htmlFor="notes">
                <FileText size={16} />
                Notes & Instructions
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Add any special instructions, symptoms, or notes for this appointment..."
                rows="4"
              />
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={handleClose}>
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : (appointment ? 'Update Appointment' : 'Save Appointment')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAppointmentModal;