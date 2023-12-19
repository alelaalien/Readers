import { useState } from "react"

export default function CommentCard(comment){
    
    const [isEditting, setHandlingEditting] = useState(false);

    comment = comment.comment;
    return (
            <>
                    <textarea>
                    {comment.content } 
                    </textarea>
                    <div>
                        <button wire:click="sendCommentEditted"> Save changes </button>
                        <button wire:click="discardCommentEditting"> Discard</button>
                    </div>
            
                <p class="mb-1">  {comment.content }  </p>
            
            </>
    )
}