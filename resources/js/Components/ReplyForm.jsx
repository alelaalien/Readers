export default function ReplyForm()
{
    return(
        <form   >
            
            <div className="form-group" > 
                
                <textarea wire:model="modelContent" className="form-control" rows="3" placeholder="Write your comment here"></textarea>
                {/* @error('modelContent') */}
                {/* <span className="text-danger">{{ $message }}</span> */}
                {/* @enderror */}
            </div>
            
            {/* @if(auth()->check()) */}
        
                <button type="submit" className="btn btnsend comment-btn">Send</button>
                {/* @if($errors->any()) */}
                    <div className="text-danger">
                        <ul>
                            {/* @foreach ($errors->all() as $error) */}
                                {/* <li>{{ $error }}</li> */}
                            {/* @endforeach */}
                        </ul>
                    </div>
                {/* @endif */}
            {/* @else */}
            <span> You must to be registered to comment </span>
            {/* @endif */}
        </form>
 
    )
}