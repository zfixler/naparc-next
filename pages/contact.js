import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
//Styled Components
import { Page } from '../components/styled/Pages.styled';
import {
	Form,
	Input,
	Label,
	Message,
	Button,
} from '../components/styled/Contact.styled';

function Contact() {
	//contact form state
	const [formState, setFormState] = useState({
		name: '',
		email: '',
		message: '',
	});
	const [successState, setSuccessState] = useState(false);

	const disabled = formState.name === '' || formState.email === '' || formState.message === '' ? true : false;

	const inputRef = useRef(null)

	//useEffect for initial focus
	useEffect(() => {
		inputRef.current.focus()
	}, [])

	//handle input change
	function handleChange(e) {
		const { name, value } = e.target;
		setFormState((prevState) => {
			return {
				...prevState,
				[name]: value,
			};
		});
	}
	//handle form submission
	async function handleSubmit(e) {
		e.preventDefault();

		const res = await fetch('/api/contact/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify(formState),
		});

		if (res.status === 200) {
			setSuccessState(true);
		}
	}

	return (
		<Page>
			<Head>
				<title>NAPARC Search | Contact</title>
				<meta name="description" content="Contact page for NAPARC Search." />
			</Head>
			{!successState ? (
				<>
					<h1>Contact me!</h1>
					<Form onSubmit={(e) => handleSubmit(e)}>
						<p>Note:</p>
						<p>If your congregation is listed with errors, please check your respective denomination directory before contacting me. My website reflects each denomination directory, which may be the source of the problem. Thank you!</p>
						<Label htmlFor="name">Name</Label>
						<Input ref={inputRef} type="text" name="name" onChange={(e) => handleChange(e)} />
						<Label htmlFor="email">Email</Label>
						<Input
							type="email"
							name="email"
							onChange={(e) => handleChange(e)}
						/>
						<Label htmlFor="message">Message</Label>
						<Message name="message" onChange={(e) => handleChange(e)} />
						<Button disabled={disabled}>Submit</Button>
					</Form>
				</>
			) : (
				<h1>
					Thank you, {formState.name}! I will get back to you as soon as
					possible.
				</h1>
			)}
		</Page>
	);
}

export default Contact;
