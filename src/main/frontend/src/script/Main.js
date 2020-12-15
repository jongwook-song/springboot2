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
            userName : '',
            userEmail : ''
        }

        this.onChangeState = this.onChangeState.bind(this);
    }

    onChangeState = (status) => {
        this.setState({ changeState : status});

            axios.get("/main")
                .then( (res) => {
                    this.setState({ documents : res.data.list});
            });


    }
    onUpdateDocument = (selectId) => {
        this.setState({ selectId : selectId, changeState : 'update'});
    }

	componentDidMount(){
		axios.get("/main")
			.then( (res) => {
				this.setState({ documents : res.data.list});
                if( res.data.user !== undefined){
                    this.setState({ userName : res.data.user.name,
                                    userEmail : res.data.user.email});
                }
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
                            <div>
                                <a href="http://ec2-3-36-7-213.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/google" role="button">Google Login</a>
                                <a href="http://ec2-3-36-7-213.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/naver" role="button">Naver Login</a>
                            </div>
                        :
                            <div>
                            <span>Logged in as : </span>
                            <span id="user">{this.state.userName}</span>
                            <a href="http://ec2-3-36-7-213.ap-northeast-2.compute.amazonaws.com:8080/logout" role="button">Logout</a>
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