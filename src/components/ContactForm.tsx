import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import emailjs from '@emailjs/browser';


type FormStatus = 'idle' | 'sending' | 'success' | 'error';

const FormContainer = styled.div`
  background: #ECE9D8;
  border: 2px solid #0054E3;
  border-radius: 0;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  padding: 20px;
  min-width: 400px;
  font-family: 'Tahoma', 'Segoe UI', 'Arial', sans-serif;
`;

const TitleBar = styled.div`
  background: linear-gradient(to right, #0054E3, #4A90E2);
  color: white;
  padding: 8px 12px;
  margin: -20px -20px 20px -20px;
  font-weight: bold;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
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

const Button = styled.button<{ disabled?: boolean }>`
  padding: 8px 16px;
  border: 1px solid #A0A0A0;
  background: ${props => props.disabled ? '#C0C0C0' : '#ECE9D8'};
  color: #000;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  font-family: 'Tahoma', 'Segoe UI', 'Arial', sans-serif;
  font-size: 12px;
  min-width: 80px;
  
  &:hover:not(:disabled) {
    background: #D4D0C8;
  }
  
  &:active:not(:disabled) {
    background: #C0C0C0;
  }
`;

const StatusMessage = styled.div<{ type: 'success' | 'error' }>`
  font-size: 11px;
  margin-top: 8px;
  padding: 6px 8px;
  border-radius: 3px;
  background: ${props => props.type === 'success' ? '#E8F5E8' : '#FFEBEE'};
  color: ${props => props.type === 'success' ? '#2E7D32' : '#C62828'};
  border: 1px solid ${props => props.type === 'success' ? '#A5D6A7' : '#EF9A9A'};
`;

const HoneypotField = styled.div`
  display: none;
`;

interface ContactFormProps {
  onClose?: () => void;
}

export default function ContactForm({ onClose }: ContactFormProps) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');



  // EmailJS configuration
  const PUBLIC_KEY = '2xv-bpv_GBb7NxBpS';
  const SERVICE_ID = 'service_asgma6f';
  const TEMPLATE_IDS = ['template_piwuaz9', 'template_13lsdyg'] as const;

  // Parallel email sending to multiple templates
  const handleEmailTemplateParallel = async (
    serviceId: string,
    templateIds: readonly string[],
    formEl: HTMLFormElement
  ) => {
    // Fire both sends at once
    return Promise.all(templateIds.map(id => emailjs.sendForm(serviceId, id, formEl)));
  };

  // Safer variant that doesn't cancel other sends on failure
  const handleEmailTemplateParallelSafe = async (
    serviceId: string,
    templateIds: readonly string[],
    formEl: HTMLFormElement
  ) => {
    const results = await Promise.allSettled(
      templateIds.map(id => emailjs.sendForm(serviceId, id, formEl))
    );

    // Surface any failures
    const errors = results
      .map((r, i) => (r.status === 'rejected' ? { templateId: templateIds[i], reason: r.reason } : null))
      .filter(Boolean);

    return { results, errors };
  };

  // Basic form validation
  const validate = (form: HTMLFormElement) => {
    const name = (form.elements.namedItem('name') as HTMLInputElement)?.value?.trim();
    const email = (form.elements.namedItem('email') as HTMLInputElement)?.value?.trim();
    const title = (form.elements.namedItem('title') as HTMLInputElement)?.value?.trim();
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement)?.value?.trim();

    if (!name || !email || !title || !message) {
      return 'Please fill out all fields.';
    }
    
    // Simple email validation
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return 'Please enter a valid email address.';
    }
    
    return null;
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!formRef.current) return;

    // Honeypot: if bots fill this hidden field, we silently "succeed"
    const botField = (formRef.current.elements.namedItem('company') as HTMLInputElement)?.value;
    if (botField) {
      setStatus('success');
      return;
    }

    const validationError = validate(formRef.current);
    if (validationError) {
      setErrorMsg(validationError);
      setStatus('error');
      return;
    }

    setStatus('sending');
    setErrorMsg('');

    try {
      // Initialize EmailJS (safe to call multiple times)
      emailjs.init({ publicKey: PUBLIC_KEY });

      // Send to both templates in parallel
      const { errors } = await handleEmailTemplateParallelSafe(SERVICE_ID, TEMPLATE_IDS, formRef.current);

      // Check if there were any failures
      if (errors.length > 0) {
        console.warn('Some email templates failed:', errors);
        // You can still show success if at least one worked, or show a warning
      }

      setStatus('success');
      formRef.current.reset();
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err?.text || 'Something went wrong sending your message.');
      console.error('EmailJS error:', err);
    }
  };

  const isSending = status === 'sending';

  return (
    <FormContainer>
      <TitleBar>
        <span>📧 Contact Form</span>
        {onClose && <CloseButton onClick={onClose}>✕</CloseButton>}
      </TitleBar>
      
      <form ref={formRef} onSubmit={onSubmit}>
        {/* Hidden fields for EmailJS */}
        <input type="hidden" name="time" value={new Date().toString()} />
        
        {/* Honeypot field to catch bots */}
        <HoneypotField>
          <label>
            Company
            <input name="company" type="text" autoComplete="off" tabIndex={-1} />
          </label>
        </HoneypotField>

        <FormGroup>
          <Label htmlFor="name">Name:</Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Your name"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="email">Email:</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="title">Subject:</Label>
          <Input
            id="title"
            name="title"
            type="text"
            required
            placeholder="What's this about?"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="message">Message:</Label>
          <TextArea
            id="message"
            name="message"
            required
            placeholder="Tell me everything..."
          />
        </FormGroup>

        <Button type="submit" disabled={isSending}>
          {isSending ? 'Sending...' : 'Send Message'}
        </Button>

        {/* Status messages */}
        {status === 'success' && (
          <StatusMessage type="success">
            ✅ Message sent successfully! Check your inbox.
          </StatusMessage>
        )}
        
        {status === 'error' && (
          <StatusMessage type="error">
            ❌ {errorMsg || 'Could not send message. Please try again.'}
          </StatusMessage>
        )}
      </form>
    </FormContainer>
  );
}
