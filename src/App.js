import React, {
  Component
} from 'react';
import axios from 'axios';
import Loading from './Components/Loading';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
    Row,
    Col,
    Jumbotron,
    Button
} from 'reactstrap';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: false
    }

    this.loadMore = this.loadMore.bind(this);
  }

  loadUser(){
    this.setState({
        loading: true
    });
    const apiUrl = 'https://api.randomuser.me/?nat=US&results=10';
    axios(apiUrl).then(response =>
      this.setState({
        users: [...this.state.users, ...response.data.results],
        loading: false
      }));
  }

  loadMore(e) {
    e.preventDefault();
    this.loadUser();
    console.log('More data Loaded..')
  }

  componentWillMount() {
    this.loadUser();
  }

  render() {
    const {loading, users} = this.state; 
    let data = users.map( user => (
            <tbody key={user.id.value}>
                <tr>
                    <th>{ user.name.first }</th>
                    <td>{ user.cell }</td>
                    <td>{ user.email }</td>
                </tr>
            </tbody>
        )
    );

    return <div>
        <Container>
            <Row>
                <Col>
                    <div className="alert alert-primary p-2 mb-0 mt-3">
                        <form onSubmit={this.loadMore}>
                            <Row>
                                <Col>
                                    <h4>User Data&nbsp;&nbsp;<small className="badge badge-dark">Showing: {users.length}</small></h4>
                                </Col>
                                <Col>
                                    <p className="text-right mb-0">
                                        <button className="btn btn-light">Load More</button>
                                    </p>
                                </Col>
                            </Row>
                        </form>
                    </div>
                    <div className="card card-primary">
                        <div className="card-body">
                            {!loading ? <table className="table table-bordered table-striped"><thead><tr><th>Name</th><th>Cell No.</th><th>Email Id</th></tr></thead>{data}</table> : <Loading message="Loading.! Please Wait....." />}
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    </div>;
  }
}

export default App;