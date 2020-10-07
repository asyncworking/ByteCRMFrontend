import React from 'react';
import CommentBox from './components/CommentBox';
import NoteBody from "./components/NoteBody";
import CreatedBy from "./components/CreatedBy";


class NoteCard extends React.Component {
  constructor(props) {
    super(props);
    const { _id, content, author, comments } = this.props.card;
    this.state = {
      cardId: _id,
      card: this.props.card,
      content,
      comments,
    }
    this.onContentChange = this.onContentChange.bind(this);
  }

  onContentChange(content){
    let newCard = this.state.card;
    newCard.content = content;
    this.setState({
      content: content,
      card: newCard,
    })
    this.props.onChangeNote(this.state.cardId, newCard)
}

  render() {
    const { _id, content, author, comments } = this.props.card;
    
    return (
      <div>
        <NoteBody 
          content={content}
          onContentChange = {this.onContentChange} 
          />
        <CreatedBy 
          author={author}
        />  
        <CommentBox 
          comments={comments}
        />            
      </div>
    )
  }
}

export default NoteCard;