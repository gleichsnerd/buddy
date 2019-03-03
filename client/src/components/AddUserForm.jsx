import React from 'react';

class AddUserForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '', 
            password: '',
            passwordConfirmation: ''
        };

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({[event.target.name] : event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.auth.register(
            this.state.email, 
            this.state.password, 
            this.state.passwordConfirmation
        ).then( _ => {
            this.props.onSubmit(this.state.email, this.state.password);
        }).catch(error => {
            console.log(error);
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Email
                    <input 
                        type="text" 
                        name="email" 
                        value={this.state.email} 
                        onChange={this.handleChange} />
                </label>
                <label>
                    Password
                    <input 
                        type="text" 
                        name="password"
                        value={this.state.password} 
                        onChange={this.handleChange} />
                </label>
                <label>
                    Password Confirmation
                    <input
                        type="text"
                        name="passwordConfirmation"
                        value={this.state.passwordConfirmation}
                        onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default AddUserForm;