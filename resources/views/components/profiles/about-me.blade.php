@php $pic = $user->profile_photo_path ?  $user->profile_photo_path : 'back.png'; @endphp
<section id="revelations_of_self" class="about h100">
      <div class="container section-profile-container"> 
        <div class="section-title">
          <h2 class="sections-title">{{__('Revelations of self')}}</h2> 
          <hr class="title-separator">
          @livewire('paragraph', 
                ['section_title' => 'This public space serves as your introduction to those visiting your profile, allowing them to get to know you better.',
                'name' => 'description',  
                'element' => 'p'])
          @livewire('editor-mini-buttons', ['name' => 'description'])
          @livewire('editable-text', ['id' => 'description_l', 'name' => 'description', 'rows' => 6, 'cols' => 1000])
        
        </div> 
        <div class="row">
          <div class="col-lg-4">
            <img src="{{asset('img/users/'.$pic)}}" alt="user" />  
           
          </div>
          <div class="col-lg-8 pt-4 pt-lg-0 content"> 
            @livewire('paragraph', 
            ['section_title' => 'Title the upcoming content', 
            'name' => 'title', 
            'element' => 'h3'])
            @livewire('editor-mini-buttons', ['name' => 'title'])
            @livewire('editable-text', ['id' => 'title_l', 'name' => 'title', 'rows' => 3, 'cols' => 5])
        
            @livewire('paragraph', 
            ['section_title' => 'To complete this section, it is suggested to provide a description that delves into the details.', 
            'name' => 'revelations_of_self', 
            'element' => 'p'])
            @livewire('editor-mini-buttons', ['name' => 'revelations_of_self'])
            @livewire('editable-text', ['id' => 'revelations_of_self_l', 'name' => 'revelations_of_self', 'rows' => 3, 'cols' => 5])
           
          </div>
        </div>
        <div class="row">
           
              @if(auth()->check())
                  @if(auth()->user()->id == request()->segment(2))
                    @livewire('social-medias-form')
                  @endif
                @endif
          </div>  
      </div>
    </section>
  