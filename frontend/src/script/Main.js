import React from 'react';
import {Button, Table} from 'react-bootstrap';
import axios from 'axios';
import DocumentCreate from './DocumentCreate';
import DocumentUpdate from './DocumentUpdate';

class Main extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            changeState : 'main',
            documents : '',
            selectId : '',
            userName : ''
        }

        this.onChangeState = this.onChangeState.bind(this);
    }

    onChangeState = (status) => {
        this.setState({ changeState : status});

            axios.get("http://localhost:8080/")
                .then( (res) => {
                    //this.setState({ documents : res.data});
            });


    }
    onUpdateDocument = (selectId) => {
        this.setState({ selectId : selectId, changeState : 'update'});
    }

	componentDidMount(){
		axios.get("http://localhost:8080/")
			.then( (res) => {
				//this.setState({ documents : res.data});
				console.log( res.data);
		});
	}

    render() {
        return (
            <div className="main">
                { this.state.changeState === 'main' &&
                    <div>
                        <Button type="button" className="mb-2 document-input-page-btn" onClick={(event) => {this.onChangeState('create')}}>
                            글 등록
                        </Button>
                        {
                        this.state.userName === '' ?
                            <a href="http://localhost:8080/oauth2/authorization/google" role="button">Google Login</a>
                        :
                            <div>
                            <span>Logged in as : </span>
                            <span id="user">{this.state.userName}</span>
                            <a href="/logout" role="button">Logout</a>
                            </div>
                        }
                        <div className="document-main contents-main">
                            {
                                this.state.documents.length === 0?
                                        <div>문서가 존재하지 않습니다.</div>
                                        :
                                        <Table striped bordered hover size="sm">
                                            <thead>
                                                <tr>
                                                    <th>게시글 번호</th>
                                                    <th>제목</th>
                                                    <th>작성자</th>
                                                    <th>최근 수정일</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {this.state.documents.map((document, index) => (
                                                <tr key={document.id}>
                                                    <td>{document.id}</td>
                                                    <td onClick={(event) => this.onUpdateDocument(document.id)}>{document.title}</td>
                                                    <td>{document.author}</td>
                                                    <td>{document.modifiedDate}</td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </Table>
                            }
                        </div>
                    </div>
                }
                {this.state.changeState === 'create' &&
                    <div>
                        <DocumentCreate onChangeState={this.onChangeState}/>
                    </div>
                }
                {this.state.changeState === 'update' &&
                    <div>
                        <DocumentUpdate onChangeState={this.onChangeState} id={this.state.selectId} />
                    </div>
                }
            </div>
        );
    }
}

export default Main;