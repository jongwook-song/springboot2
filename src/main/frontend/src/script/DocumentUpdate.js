import React from 'react';
import {Form, Col, Button} from 'react-bootstrap';
import axios from 'axios';

class DocumentUpdate extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            documentCreate : this.props.documentCreate,
            title : '',
            author : '',
            content : ''
        };
        this.documentChange = this.documentChange.bind(this);
        this.updateDocument = this.updateDocument.bind(this);
        this.onCancelDocument = this.onCancelDocument.bind(this);
        this.onDeleteDocument = this.onDeleteDocument.bind(this);
    }

    onCancelDocument = (status) => {
    	this.props.onChangeState( status);
    }

    onDeleteDocument = (status) => {
        axios.delete("http://ec2-3-36-7-213.ap-northeast-2.compute.amazonaws.com:8080/api/v1/posts/"+this.props.id)
            .then(response => {
            alert('글이 삭제되었습니다.');
                this.props.onChangeState( status);
            })
            .catch((error) => {
                console.log(error.response);
            });
    }

    documentChange = event => {
        this.setState({ [event.target.name]:event.target.value});
    };

    updateDocument = (status, event) => {

    	const posts = {
    	    "title" : this.state.title,
    	    "content" : this.state.content
    	}

        axios.put("http://ec2-3-36-7-213.ap-northeast-2.compute.amazonaws.com/api/v1/posts/"+this.props.id, posts)
            .then(response => {
            alert('글이 수정되었습니다.');
                this.props.onChangeState( status);
            })
            .catch((error) => {
                console.log(error.response);
            });
    };
    componentDidMount(){
       axios.get("http://ec2-3-36-7-213.ap-northeast-2.compute.amazonaws.com:8080/posts/update/"+this.props.id)
            .then( (res) => {
                this.setState({ title : res.data.title,
                                content : res.data.content,
                                author : res.data.author});
        });
    }

    render() {
        return (
        	<div className="document-main contents-main">
	            <Form.Group>
	            <br />
	            <Form.Row>
                    <Form.Label column="sm" lg={2}>
                        게시글 번호
                    </Form.Label>
                    <Col>
                        <Form.Control size="sm" type="text" name="no" placeholder="게시글 번호" readOnly value={this.props.id}/>
                    </Col>
	            </Form.Row>
                <Form.Row>
                    <Form.Label column="sm" lg={2}>
                        제목
                    </Form.Label>
                    <Col>
                        <Form.Control size="sm" type="text" name="title" placeholder="제목" onChange={this.documentChange} value={this.state.title}/>
                    </Col>
	            </Form.Row>
                <Form.Row>
                    <Form.Label column="sm" lg={2}>
                        작성자
                    </Form.Label>
                    <Col>
                        <Form.Control size="sm" type="text" name="author" placeholder="작성자" readOnly value={this.state.author}/>
                    </Col>
	            </Form.Row>
                <Form.Row>
                    <Form.Label column="sm" lg={2}>
                        내용
                    </Form.Label>
                    <Col>
                        <Form.Control size="sm" type="text" name="content" placeholder="내용" onChange={this.documentChange} value={this.state.content}/>
                    </Col>
	            </Form.Row>

	            <br />
	            <div>
                    <Button type="submit" className="mb-2 document-input-page-btn" onClick={(event) => {this.updateDocument('main', event)}}>
                        저장
                    </Button>
                    <Button type="button" className="mb-2 document-input-page-btn" onClick={(event) => {this.onCancelDocument('main')}}>
                        취소
                    </Button>
                    <Button type="button" className="mb-2 document-input-page-btn" onClick={(event) => {this.onDeleteDocument('main')}}>
                        삭제
                    </Button>
                </div>
	          </Form.Group>
          </div>
        );
    }
}

export default DocumentUpdate;