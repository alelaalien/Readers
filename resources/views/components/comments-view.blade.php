<div style="margin-top: 4%;">  
 <div class="container"> 
    <div class="row">
        <div class="col-lg-12 mx-auto" style="padding: 0!important;">
            <!--  comentarios -->       
            <div class="card">
                <div class="card-header">
                    {{__('Comments')}}
                </div>
                <div class="card-body"> 
                    <!-- formulario para agregar un comentario --> 
                   
                    @livewire('comment-form', ['modelGroup' => $data, 'modelContent' => 'content',
                                'action' => 'saveComment'])
                </div> 
       
                @livewire('comment-list', ['comments' => $comments, 'data' => $data])
            </div>
           
        </div>
    </div>
</div>
</div>
