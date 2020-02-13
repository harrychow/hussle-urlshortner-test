import React, {Component} from "react";

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
            });
    }


    render() {
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
