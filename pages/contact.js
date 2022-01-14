import React, { useState } from 'react';
//Styled Components
import { Page } from '../components/styled/Pages.styled';
import {
	Form,
	Input,
	Label,
	Message,
	Button,
} from '../components/styled/Contact.styled';

function contact() {
	const [formState, setFormState] = useState({
		name: '',
		email: '',
		message: '',
	});
	const [successState, setSuccessState] = useState(false);

	function handleChange(e) {
		const { name, value } = e.target;
		setFormState((prevState) => {
			return {
				...prevState,
				[name]: value,
			};
		});
	}

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
			{!successState ? (
				<>
					<h1>Contact me!</h1>
					<Form onSubmit={(e) => handleSubmit(e)}>
						<Label htmlFor="name">Name</Label>
						<Input type="text" name="name" onChange={(e) => handleChange(e)} />
						<Label htmlFor="email">Email</Label>
						<Input
							type="email"
							name="email"
							onChange={(e) => handleChange(e)}
						/>
						<Label htmlFor="message">Message</Label>
						<Message name="message" onChange={(e) => handleChange(e)} />
						<Button>Submit</Button>
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

export default contact;
