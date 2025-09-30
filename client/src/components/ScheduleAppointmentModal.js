import React, { useState } from 'react';
import { X, Calendar, Clock, User, FileText, Phone, Mail } from 'lucide-react';
import './ScheduleAppointmentModal.css';

const ScheduleAppointmentModal = ({ isOpen, onClose, onSave, patient }) => {
  const [formData, setFormData] = useState({
    appointmentDate: '',
    appointmentTime: '',
    appointmentType: 'consultation',
    duration: '30',
    notes: '',
    priority: 'normal'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const appointmentTypes = [
    { value: 'consultation', label: 'General Consultation' },
    { value: 'followup', label: 'Follow-up' },
    { value: 'checkup', label: 'Regular Check-up' },
    { value: 'emergency', label: 'Emergency' },
    { value: 'procedure', label: 'Medical Procedure' },
    { value: 'therapy', label: 'Therapy Session' }
  ];

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30'
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
        patientId: patient.id,
        patientName: patient.name,
        id: Date.now(),
        status: 'scheduled',
        createdAt: new Date().toISOString()
      };
      
      onSave(appointmentData);
      
      // Reset form
      setFormData({
        appointmentDate: '',
        appointmentTime: '',
        appointmentType: 'consultation',
        duration: '30',
        notes: '',
        priority: 'normal'
      });
      
    } catch (error) {
      console.error('Error scheduling appointment:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
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
      <div className="modal-container schedule-appointment-modal">
        <div className="modal-header">
          <h2>Schedule Appointment</h2>
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

          <div className="form-row">
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

            <div className="form-group">
              <label htmlFor="duration">Duration (minutes)</label>
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
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority Level</label>
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

          <div className="form-group">
            <label htmlFor="notes">
              <FileText size={16} />
              Additional Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Any additional information or special requirements..."
              rows="4"
            />
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? 'Scheduling...' : 'Schedule Appointment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScheduleAppointmentModal;