import { useState } from 'react';
import '../styles/DailyUpdateForm.css';
import eoxsLogo from '../assets/EOXS.png';
import { supabase } from '../supabaseClient';

const DailyUpdateForm = () => {
  const [formData, setFormData] = useState({
    employee_id: '',
    date: new Date().toISOString().split('T')[0],
    team: '',
    project: '',
    update: '',
    blockers: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const handleConfirmSubmit = async () => {
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });
    setShowConfirmation(false);

    try {
      // Format the data exactly as per table structure
      const dataToSubmit = {
        employee_id: formData.employee_id.trim(),
        created_at: new Date().toISOString(),
        date: formData.date,
        team: formData.team.trim(),
        project: formData.project.trim(),
        update: `{${formData.update.trim()}}`,
        blockers: formData.blockers.trim() ? `{${formData.blockers.trim()}}` : null
      };

      // Validate data before submission
      if (!dataToSubmit.employee_id || !dataToSubmit.date || !dataToSubmit.team || 
          !dataToSubmit.project || !dataToSubmit.update) {
        throw new Error('Please fill in all required fields');
      }

      console.log('Submitting data:', dataToSubmit);

      // Insert data into Supabase
      const { data, error } = await supabase
        .from('daily_updates')
        .insert([dataToSubmit])
        .select();

      if (error) {
        console.error('Supabase error details:', error);
        throw error;
      }

      console.log('Submission successful:', data);

      setSubmitStatus({
        type: 'success',
        message: 'Daily update submitted successfully!'
      });

      // Reset form while keeping the date
      setFormData({
        employee_id: '',
        date: new Date().toISOString().split('T')[0],
        team: '',
        project: '',
        update: '',
        blockers: ''
      });

    } catch (error) {
      console.error('Error submitting update:', error);
      setSubmitStatus({
        type: 'error',
        message: `Failed to submit update: ${error.message || 'Please try again.'}`
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="daily-update-container">
      <div className="logo-container">
        <img src={eoxsLogo} alt="EOXS Logo" className="eoxs-logo" />
      </div>
      <form className="daily-update-form" onSubmit={handleSubmit}>
        <div className="form-header">
          <h2>Daily Update Snippet</h2>
          <p className="subtitle">Share your daily progress and challenges</p>
          {submitStatus.message && (
            <div className={`status-message ${submitStatus.type}`}>
              {submitStatus.message}
            </div>
          )}
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="employee_id">Employee ID</label>
            <input
              type="text"
              id="employee_id"
              name="employee_id"
              value={formData.employee_id}
              onChange={handleChange}
              placeholder="Enter your employee ID"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="team">Team</label>
            <select
              id="team"
              name="team"
              value={formData.team}
              onChange={handleChange}
              required
            >
              <option value="">Select your team</option>
              <option value="Administration">Administration</option>
              <option value="Business analyst">Business analyst</option>
              <option value="Content and Lead Conversion">Content and Lead Conversion</option>
              <option value="Clicking">Clicking</option>
              <option value="Data Analytics">Data Analytics</option>
              <option value="Human Resources">Human Resources</option>
              <option value="Innovation Cell">Innovation Cell</option>
              <option value="Marketing">Marketing</option>
              <option value="Product Research 2">Product Research 2</option>
              <option value="PR and Branding">PR and Branding</option>
              <option value="Product Development">Product Development</option>
              <option value="Product Innovation">Product Innovation</option>
              <option value="Sales">Sales</option>
              <option value="Software Development">Software Development</option>
              <option value="Video Editing">Video Editing</option>
              <option value="YFS">YFS</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="project">Project</label>
            <input
              type="text"
              id="project"
              name="project"
              value={formData.project}
              onChange={handleChange}
              placeholder="Enter project name"
              required
            />
          </div>

          <div className="form-group full-width">
            <label htmlFor="update">Daily Update</label>
            <textarea
              id="update"
              name="update"
              value={formData.update}
              onChange={handleChange}
              placeholder="Share your progress and completed tasks"
              required
            />
          </div>

          <div className="form-group full-width">
            <label htmlFor="blockers">Blockers</label>
            <textarea
              id="blockers"
              name="blockers"
              value={formData.blockers}
              onChange={handleChange}
              placeholder="Any challenges or blockers?"
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Update'}
            {!isSubmitting && (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" />
              </svg>
            )}
          </button>
        </div>
      </form>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Submission</h3>
            <p>Are you sure you want to submit this daily update?</p>
            <div className="modal-actions">
              <button 
                className="modal-btn cancel-btn" 
                onClick={() => setShowConfirmation(false)}
              >
                Cancel
              </button>
              <button 
                className="modal-btn confirm-btn" 
                onClick={handleConfirmSubmit}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyUpdateForm; 