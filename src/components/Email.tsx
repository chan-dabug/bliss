import React, { useState } from 'react';
import styled from 'styled-components';
import sanitizeHtml from 'sanitize-html';

type EmailProps = {
    onClose: () => void;
    embedded?: boolean; // New prop to control styling when embedded in other modals
};

const EmailContainer = styled.div<{ embedded?: boolean }>`
  background: #ECE9D8;
  border: ${props => props.embedded ? 'none' : '2px solid #0054E3'};
  border-radius: 0;
  box-shadow: ${props => props.embedded ? 'none' : '2px 2px 4px rgba(0, 0, 0, 0.3)'};
  padding: ${props => props.embedded ? '0' : '20px'};
  min-width: 400px;
  font-family: 'Tahoma', 'Segoe UI', 'Arial', sans-serif;
`;

const TitleBar = styled.div<{ embedded?: boolean }>`
  background: linear-gradient(to right, #0054E3, #4A90E2);
  color: white;
  padding: 8px 12px;
  margin: ${props => props.embedded ? '0 0 20px 0' : '-20px -20px 20px -20px'};
  font-weight: bold;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseButton = styled.button`
  background: #ECE9D8;
  border: 1px solid #A0A0A0;
  color: #000;
  padding: 2px 6px;
  cursor: pointer;
  font-size: 12px;
  
  &:hover {
    background: #D4D0C8;
  }
  
  &:active {
    background: #C0C0C0;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 4px;
  font-weight: bold;
  font-size: 12px;
  color: #000;
`;

const Input = styled.input`
  width: 100%;
  padding: 6px 8px;
  border: 1px solid #A0A0A0;
  background: white;
  font-family: 'Tahoma', 'Segoe UI', 'Arial', sans-serif;
  font-size: 12px;
  box-sizing: border-box;
  
  &:focus {
    outline: 2px solid #0054E3;
    border-color: #0054E3;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 120px;
  padding: 6px 8px;
  border: 1px solid #A0A0A0;
  background: white;
  font-family: 'Tahoma', 'Segoe UI', 'Arial', sans-serif;
  font-size: 12px;
  resize: vertical;
  box-sizing: border-box;
  
  &:focus {
    outline: 2px solid #0054E3;
    border-color: #0054E3;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 20px;
`;

const Button = styled.button<{ primary?: boolean }>`
  padding: 6px 16px;
  border: 1px solid #A0A0A0;
  background: ${props => props.primary ? '#ECE9D8' : '#ECE9D8'};
  color: #000;
  cursor: pointer;
  font-family: 'Tahoma', 'Segoe UI', 'Arial', sans-serif;
  font-size: 12px;
  min-width: 80px;
  
  &:hover {
    background: ${props => props.primary ? '#D4D0C8' : '#D4D0C8'};
  }
  
  &:active {
    background: #C0C0C0;
  }
`;

const ErrorMessage = styled.div`
  color: #D32F2F;
  font-size: 11px;
  margin-top: 4px;
`;

const SuccessMessage = styled.div`
  color: #388E3C;
  font-size: 11px;
  margin-top: 4px;
`;

export const Email: React.FC<EmailProps> = ({ onClose, embedded = false }) => {
    const [formData, setFormData] = useState({
        to: 'chanboswell@gmail.com',
        subject: '',
        message: ''
    });
    
    const [errors, setErrors] = useState<{[key: string]: string}>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const validateForm = () => {
        const newErrors: {[key: string]: string} = {};
        
        if (!formData.to.trim()) {
            newErrors.to = 'Recipient email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.to)) {
            newErrors.to = 'Please enter a valid email address';
        }
        
        if (!formData.subject.trim()) {
            newErrors.subject = 'Subject is required';
        }
        
        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

    const handleSend = () => {
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        
        try {
            // Create mailto link with sanitized data
            const sanitizedTo = sanitizeHtml(formData.to);
            const sanitizedSubject = sanitizeHtml(formData.subject);
            const sanitizedMessage = sanitizeHtml(formData.message);
            
            const mailtoLink = `mailto:${sanitizedTo}?subject=${encodeURIComponent(sanitizedSubject)}&body=${encodeURIComponent(sanitizedMessage)}`;
            
            // Open default email client
            window.open(mailtoLink);
            
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                onClose();
            }, 2000);
            
        } catch (error) {
            console.error('Error sending email:', error);
            setErrors({ general: 'Failed to send email. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        onClose();
    };

    return (
        <EmailContainer embedded={embedded}>
            <TitleBar embedded={embedded}>
                <span>📧 Send Email</span>
                {!embedded && <CloseButton onClick={onClose}>✕</CloseButton>}
            </TitleBar>
            
            <FormGroup>
                <Label htmlFor="to">To:</Label>
                <Input
                    id="to"
                    name="to"
                    type="email"
                    value={formData.to}
                    onChange={handleInputChange}
                    placeholder="Enter recipient email"
                />
                {errors.to && <ErrorMessage>{errors.to}</ErrorMessage>}
            </FormGroup>
            
            <FormGroup>
                <Label htmlFor="subject">Subject:</Label>
                <Input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Enter email subject"
                />
                {errors.subject && <ErrorMessage>{errors.subject}</ErrorMessage>}
            </FormGroup>
            
            <FormGroup>
                <Label htmlFor="message">Message:</Label>
                <TextArea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Enter your message here..."
                />
                {errors.message && <ErrorMessage>{errors.message}</ErrorMessage>}
            </FormGroup>
            
            {errors.general && <ErrorMessage>{errors.general}</ErrorMessage>}
            {showSuccess && <SuccessMessage>Email opened successfully!</SuccessMessage>}
            
            <ButtonGroup>
                <Button onClick={handleCancel}>
                    Cancel
                </Button>
                <Button primary onClick={handleSend} disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send'}
                </Button>
            </ButtonGroup>
        </EmailContainer>
    );
};