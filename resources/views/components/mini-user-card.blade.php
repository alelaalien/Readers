<div class="container-fluid">  
    <div class="row">
      <div class="col-sm-6">
        <div class="">
          <a href="/user-info/$user->id"> 
            <img src="{{asset('img/users/'.$user->profile_photo_path)}}" alt="user" class="img-fluid rounded-top"/>
          </a>
        </div>
      </div>
      <div class="col-sm-6 row"> 
        <div class="col-sm-12">
            <hr>
            <div class="text-center">{{$user->name}} </div>
            <hr>
            <div class="font-14" >
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae sit eum facilis. Vero eos est velit nostrum aspernatur. Adipisci nobis quisquam eligendi optio beatae dolore sint culpa doloribus recusandae id?
            </div> 
        </div> 
      </div>
    </div>
    <div class="row detail-card">
      <div class="col-sm-6">
        <span>{{__('User since')}}</span>
          <p > {{$user->created_at->format('d-m-Y')}} </p>
      </div> 
      <div class="col-sm-6">
        <span>{{__('Posted books ')}}</span>
        <p class="stat-value">{{$user->books()->count()}}</p>
      </div>
    </div>  
</div> 