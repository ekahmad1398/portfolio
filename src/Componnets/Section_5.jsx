import React from 'react'
import { useState } from 'react'




const Section_5 = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [messageError, setMessageError] = useState('')
  const [submitMessage, setSubmitMessage] = useState('')

  const handleSubmit = (e) => {
  e.preventDefault();

  if (!name) setNameError('Name is required');
  else setNameError('');

  if (!email) setEmailError('Email is required');
  else setEmailError('');

  if (!message) setMessageError('Message is required');
  else setMessageError('');

  if (name && email && message) {
    setSubmitMessage('Form submitted successfully!');
    setName(''); 
    setEmail('');
    setMessage('');
  } else {
    setSubmitMessage('');
  }
};

  return (
    <div>
      <section className="sec-5" id="contact">
        <div className="contact-container">
          <h2>Get In Touch</h2>

          <form   onSubmit={handleSubmit} id="contact-form" className="contact-form">
            <input value={name} onChange={(e) => setName(e.target.value)} id="text" type="text"  placeholder="Your Name"  />
            <p id="text-error">{nameError}</p>

            <input value={email} onChange={(e) => setEmail(e.target.value)} id="email" type="email" placeholder="Your Email" />
            <p id="email-error">{emailError}</p>

            <textarea value={message} onChange={(e) => setMessage(e.target.value)} id="textarea" placeholder="Your Message" ></textarea>
            <p id="textarea-error">{messageError}</p>

            <button id="submit" type="submit">Send Message</button>
            <p id="submit-error">{submitMessage}</p>
          </form>
        </div>
      </section>
    </div>
  )
}


export default Section_5
