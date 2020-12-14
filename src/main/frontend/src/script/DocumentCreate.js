import React from 'react';
import {Form, Col, Button} from 'react-bootstrap';
import axios from 'axios';

class DocumentCreate extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            documentCreate : this.props.documentCreate,
            title : '',
            author : '',
            content : ''
        };
        this.documentChange = this.documentChange.bind(this);
        this.submitDocument = this.submitDocument.bind(this);
        this.onCancelDocument = this.onCancelDocument.bind(this);
    }

    onCancelDocument = (status) => {
    	this.props.onChangeState( status);
    }

    submitDocument = event => {

    	const posts = {
    	    "title" : this.state.title,
    	    "author" : this.state.author,
    	    "content" : this.state.content
    	}

        axios.post("http://ec2-3-36-7-213.ap-northeast-2.compute.amazonaws.com:8080/api/v1/posts", posts)
            .then(response => {
            alert('글이 등록되었습니다.');
                this.props.onChangeState( 'main');
            })
            .catch((error) => {
                console.log(error.response);
            });
    };

    documentChange = event => {
        this.setState({ [event.target.name]:event.target.value});
    };

    render() {
        return (
        	<div className="document-main contents-main">
	            <Form.Group>
	            <br />
	            <Form.Row>
                    <Form.Label column="sm" lg={2}>
                        제목
                    </Form.Label>
                    <Col>
                        <Form.Control size="sm" type="text" name="title" placeholder="제목" onChange={this.documentChange}/>
                    </Col>
	            </Form.Row>
                <Form.Row>
                    <Form.Label column="sm" lg={2}>
                        작성자
                    </Form.Label>
                    <Col>
                        <Form.Control size="sm" type="text" name="author" placeholder="작성자" onChange={this.documentChange}/>
                    </Col>
	            </Form.Row>
                <Form.Row>
                    <Form.Label column="sm" lg={2}>
                        내용
                    </Form.Label>
                    <Col>
                        <Form.Control size="sm" type="text" name="content" placeholder="내용" onChange={this.documentChange}/>
                    </Col>
	            </Form.Row>

	            <br />
	            <div>
                    <Button type="submit" className="mb-2 document-input-page-btn" onClick={(event) => {this.submitDocument(event)}}>
                        저장
                    </Button>
                    <Button type="button" className="mb-2 document-input-page-btn" onClick={(event) => {this.onCancelDocument('main')}}>
                        취소
                    </Button>
                </div>
	          </Form.Group>
          </div>
        );
    }




}

export default DocumentCreate;