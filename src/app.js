import React, {Component} from "react";
import { Message, Form } from "semantic-ui-react";

class AppContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            url: '',
            submitSuccess: "false",
            submitFail: "false",
            shortUrl: ''
        };
    }

    urlChangeHandler = (event) => {
        this.setState({url: event.target.value});
    }

    handleURLSubmit = (event) => {
        event.preventDefault();

        const data = new FormData();
        data.append('url', this.state.url);
        console.log(data);

        const axios = require('axios');
        var self = this;
        axios.post('/api.php', data,
            { headers: { 'Content-Type': 'multipart/form-data' } })
            .then(function (response) {
                self.setState({
                    shortUrl: 'http://localhost/'+response.data.short_url,
                });
            })
            .catch(function (error) {
                self.setState({
                    submitSuccess: false,
                    submitFalse: true
                });
                console.log(error);
            });

        console.log(this.state);
    }


    render() {
        let message = "";
        if (this.state.submitSuccess && !this.state.submitFail) {
            message = <Message
                    positive
                    header="Your user registration was successful"
                    content="You may now log-in with the username you have chosen"
                />;
        } else if (!this.state.submitSuccess && this.state.submitFail) {
            message = <Message
                negative
                header="Missing fields!"
            />;
        }

        return (

            <form onSubmit={this.handleURLSubmit}>
                <label>
                    URL:
                </label>
                <input id="url" type="text" onChange={this.urlChangeHandler}/>
                <input type="submit" value="Submit" />
                <h3><a href={this.state.shortUrl}>{this.state.shortUrl}</a></h3>
            </form>
        );
    }
}

export default AppContainer;
